import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListSales {
   id: number,
   namePerson: number,
   title: string,
   description: number,
   value: string,
}

export interface ISalesDetails {
    id: number,
    idPeople: number,
    title: string,
    description: string,
    value: number,
}

type TSalesWithTotalCount = {
    listData: IListSales[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TSalesWithTotalCount | Error> => {
  try {
    const relativeUrl = `/sales?_page=${page}&_limit=${Environment.LINE_LIMIT}&title_like=${filter}`;
    const { data, headers } = await Api.get(relativeUrl);

    const allPeople = await Api.get('/people');

    const listData = [];

    for(let i = 0; i < allPeople.data.length; i++){
      for(let j = 0; j < data.length; j++){
        if(allPeople.data[i].id === data[j].idPeople){
          listData.push({
            id: data[j].id,
            namePerson: allPeople.data[i].fullName,
            value: data[j].value,
            title: data[j].title,
            description: data[j].description
          });
        }

      }
    }

    if(data){
      return{
        listData,
        totalCount: Number(headers['x-total-count'] || Environment.LINE_LIMIT)
      };
    }

    return new Error('Error to list records.');
  } catch (error) {
    console.log(error);
    return new Error((error as {message: string}).message || 'Error to list records.');
  }
};

const getById = async (id: number): Promise<ISalesDetails | Error> => {
  try {
    const { data } = await Api.get(`/sales/${id}`);

    if(data){
      return data;      
    }

    return new Error('Error to consult records.');
  } catch (error) {
    console.log(error);
    return new Error((error as {message: string}).message || 'Error to create record.');
  }
};

const create = async (dataSent: Omit<ISalesDetails, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IListSales>('/sales', dataSent);

    if(data){
      return data.id;      
    }

    return new Error('Error to create records.');
  } catch (error) {
    console.log(error);
    return new Error((error as {message: string}).message || 'Error to create records.');
  }
};

const updateById = async (id: number, dataSent: ISalesDetails): Promise<void | Error> => {
  try {
    await Api.put<IListSales>(`/sales/${id}`, dataSent);
  } catch (error) {
    console.log(error);
    return new Error((error as {message: string}).message || 'Error to update record.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete<IListSales>(`/people/${id}`);
  } catch (error) {
    console.log(error);
    return new Error((error as {message: string}).message || 'Error to delete record.');
  }
};

export const SalesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};