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
}

const getAll = async (page = 1, filter = ''): Promise<TPeopleWithTotalCount | Error> => {
  try {
    const relativeUrl = `/people?_page=${page}&_limit=${Environment.LINE_LIMIT}&fullName_like=${filter}`;
    const { data, headers } = await Api.get(relativeUrl);

    if(data){
      return{
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LINE_LIMIT)
      };
    }

    return new Error('Error to list records.');
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
    console.log(error);
    return new Error((error as {message: string}).message || 'Error to create records.');
  }
};

const updateById = async (id: number, dataSent: IPeopleDetails): Promise<void | Error> => {
  try {
    await Api.put<IListPeople>(`/people/${id}`, dataSent);
  } catch (error) {
    console.log(error);
    return new Error((error as {message: string}).message || 'Error to update record.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete<IListPeople>(`/people/${id}`);
  } catch (error) {
    console.log(error);
    return new Error((error as {message: string}).message || 'Error to delete record.');
  }
};

export const PeopleService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};