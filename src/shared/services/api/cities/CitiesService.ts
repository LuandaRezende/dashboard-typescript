import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListCities {
    id: number,
    name: string,
}

export interface ICitiesDetails {
    id: number,
    name: string,
}

type TCitiesWithTotalCount = {
    data: IListCities[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TCitiesWithTotalCount | Error> => {
  try {
    const relativeUrl = `/cities?_page=${page}&_limit=${Environment.LINE_LIMIT}&name_like=${filter}`;
    const { data, headers } = await Api.get(relativeUrl);

    if(data){
      return{
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LINE_LIMIT)
      };
    }

    return new Error('Error to list records.');
  } catch (error) {
    return new Error((error as {message: string}).message || 'Error to list records.');
  }
};

const getById = async (id: number): Promise<ICitiesDetails | Error> => {
  try {
    const { data } = await Api.get(`/cities/${id}`);

    if(data){
      return data;      
    }

    return new Error('Error to consult records.');
  } catch (error) {
    return new Error((error as {message: string}).message || 'Error to create record.');
  }
};

const create = async (dataSent: Omit<ICitiesDetails, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IListCities>('/cities', dataSent);

    if(data){
      return data.id;      
    }

    return new Error('Error to create records.');
  } catch (error) {
    return new Error((error as {message: string}).message || 'Error to create records.');
  }
};

const updateById = async (id: number, dataSent: ICitiesDetails): Promise<void | Error> => {
  try {
    await Api.put<IListCities>(`/cities/${id}`, dataSent);
  } catch (error) {
    return new Error((error as {message: string}).message || 'Error to update record.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete<IListCities>(`/cities/${id}`);
  } catch (error) {
    return new Error((error as {message: string}).message || 'Error to delete record.');
  }
};

export const CitiesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};