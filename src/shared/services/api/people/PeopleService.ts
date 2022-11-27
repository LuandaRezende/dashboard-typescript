import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListPeople {
    id: number,
    fullName: string,
    cityId: number,
    email: string,
}

export interface IPeopleDetails {
    id: number,
    fullName: string,
    cityId: number,
    email: string,
}

type TPeopleWithTotalCount = {
    data: IListPeople[];
    totalCount: number;
    quantityPeople: IQuantityPeopleByCity[]
}

export interface IQuantityPeopleByCity {
  id: number,
  value: number,
  cityName: string
 }

const getAll = async (page = 1, filter = ''): Promise<TPeopleWithTotalCount | Error> => {
  try {
    const relativeUrl = `/people?_page=${page}&_limit=${Environment.LINE_LIMIT}&fullName_like=${filter}`;
    const { data, headers } = await Api.get(relativeUrl);

    if(data){
      const allPeople = await Api.get('/people');
      const allCitys = await Api.get('/citys');

      const listData = [];
      const listCitys = [];

      for(let i = 0; i < allPeople.data.length; i++){
        for(let j = 0; j < data.length; j++){
          if(allPeople.data[i].cityId === data[j].id){
            listData.push({
              id: data[j].id,
              cityName: allCitys.data[j].name,
              value: 1,
            });
          }
        }

        for(let j = 0; j < allCitys.data.length; j++){
          if(allPeople.data[i].cityId === allCitys.data[j].id){
            listCitys.push({
              id: allCitys.data[j].id,
              cityName: allCitys.data[j].name,
              value: 1,
            });
          }
        }
      }
    
      return{
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LINE_LIMIT),
        quantityPeople: listCitys
      };
    }

    return new Error('Error to list records.');
  } catch (error) {
    return new Error((error as {message: string}).message || 'Error to list records.');
  }
};

const getPeopleAutoComplete = async (filter = ''): Promise<TPeopleWithTotalCount | Error> => {
  try {
    const relativeUrl = `/people?&fullName_like=${filter}`;
    const { data, headers } = await Api.get(relativeUrl);

    if(data){
      return{
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LINE_LIMIT),
        quantityPeople: []
      };
    }

    return new Error('Error to list records.');
  } catch (error) {
    return new Error((error as {message: string}).message || 'Error to list records.');
  }
};

const getById = async (id: number): Promise<IPeopleDetails | Error> => {
  try {
    const { data } = await Api.get(`/people/${id}`);

    if(data){
      return data;      
    }

    return new Error('Error to consult records.');
  } catch (error) {
    return new Error((error as {message: string}).message || 'Error to create record.');
  }
};

const create = async (dataSent: Omit<IPeopleDetails, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IListPeople>('/people', dataSent);

    if(data){
      return data.id;      
    }

    return new Error('Error to create records.');
  } catch (error) {
    return new Error((error as {message: string}).message || 'Error to create records.');
  }
};

const updateById = async (id: number, dataSent: IPeopleDetails): Promise<void | Error> => {
  try {
    await Api.put<IListPeople>(`/people/${id}`, dataSent);
  } catch (error) {
    return new Error((error as {message: string}).message || 'Error to update record.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete<IListPeople>(`/people/${id}`);
  } catch (error) {
    return new Error((error as {message: string}).message || 'Error to delete record.');
  }
};

export const PeopleService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getPeopleAutoComplete
};