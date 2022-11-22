import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListCitys {
    id: number,
    name: string,
}

export interface ICitysDetails {
    id: number,
    name: string,
}

type TCitysWithTotalCount = {
    data: IListCitys[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TCitysWithTotalCount | Error> => {
  try {
    const relativeUrl = `/citys?_page=${page}&_limit=${Environment.LINE_LIMIT}&name_like=${filter}`;
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

const getById = async (id: number): Promise<ICitysDetails | Error> => {
  try {
    const { data } = await Api.get(`/citys/${id}`);

    if(data){
      return data;      
    }

    return new Error('Error to consult records.');
  } catch (error) {
    return new Error((error as {message: string}).message || 'Error to create record.');
  }
};

const create = async (dataSent: Omit<ICitysDetails, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IListCitys>('/citys', dataSent);

    if(data){
      return data.id;      
    }

    return new Error('Error to create records.');
  } catch (error) {
    return new Error((error as {message: string}).message || 'Error to create records.');
  }
};

const updateById = async (id: number, dataSent: ICitysDetails): Promise<void | Error> => {
  try {
    await Api.put<IListCitys>(`/citys/${id}`, dataSent);
  } catch (error) {
    return new Error((error as {message: string}).message || 'Error to update record.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete<IListCitys>(`/citys/${id}`);
  } catch (error) {
    return new Error((error as {message: string}).message || 'Error to delete record.');
  }
};

export const CitysService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};