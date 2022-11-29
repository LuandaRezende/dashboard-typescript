import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListSales {
   id: number,
   namePerson: number,
   title: string,
   description: number,
   value: number,
}

export interface ISalesDetails {
    id: number,
    personId: number,
    title: string,
    description: string,
    value: number,
}

export interface IQuantitySales {
 id: number,
 value: number,
 name: string
}

export interface IListSales {
  id: number,
  namePerson: number,
  title: string,
  description: number,
  value: number,
}

type TSalesWithTotalCount = {
    listData: IListSales[];
    totalCount: number;
    totalByPagination: number;
    quantitySales: IQuantitySales[]
}

const getAll = async (page = 1, filter = ''): Promise<TSalesWithTotalCount | Error> => {
  try {
    const relativeUrl = `/sales?_page=${page}&_limit=${Environment.LINE_LIMIT}&title_like=${filter}`;
    const { data, headers } = await Api.get(relativeUrl);

    const allPeople = await Api.get('/people');
    const allSales = await Api.get('/sales');

    let totalValues = 0;

    const listData = [];
    const listSales = [];

    for(let i = 0; i < allPeople.data.length; i++){
      for(let j = 0; j < data.length; j++){
        if(allPeople.data[i].id === data[j].personId){
          listData.push({
            id: data[j].id,
            namePerson: allPeople.data[i].fullName,
            value: data[j].value,
            title: data[j].title,
            description: data[j].description,
          });
        }
      }

      for(let j = 0; j < allSales.data.length; j++){
        if(allPeople.data[i].id === allSales.data[j].personId){
          listSales.push({
            id: allSales.data[j].personId,
            name: allPeople.data[i].fullName,
            value: allSales.data[j].value,
          });
        }
      }
    }

    for(let j = 0; j < data.length; j++){
      totalValues = totalValues + data[j].value;
    }

    if(data){
      return{
        listData,
        totalCount: totalValues,
        totalByPagination: Number(headers['x-total-count'] || Environment.LINE_LIMIT),
        quantitySales: listSales
      };
    }

    return new Error('Error to list records.');
  } catch (error) {
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
    return new Error((error as {message: string}).message || 'Error to create records.');
  }
};

const updateById = async (id: number, dataSent: ISalesDetails): Promise<void | Error> => {
  try {
    await Api.put<IListSales>(`/sales/${id}`, dataSent);
  } catch (error) {
    return new Error((error as {message: string}).message || 'Error to update record.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete<IListSales>(`/people/${id}`);
  } catch (error) {
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