import axios from 'axios';
import { BASE_URL } from '../constants/ApiConfig';
import { JobFilterParams, JobForm } from '../interfaces/Job';

export const getJobs = (params: JobFilterParams = { page: 1, order: '1' }) => {
  const { page = 1, summary, order = '1' } = params;
  const queryParams = `?page=${page}${summary ? `&summary=${summary}`: ''}&order=${order}`

  return axios.get(`${BASE_URL}/job${queryParams}`);
}

export const getJob = (id: string) => {
  return axios.get(`${BASE_URL}/job/${id}`);
}

export const deleteJob = (id: number) => {
  return axios.delete(`${BASE_URL}/job/${id}`);
}

export const addJob = (data: JobForm) => {
  return axios.post(`${BASE_URL}/job`, data);
}

export const updateJob = (id: string, data: JobForm) => {
  return axios.put(`${BASE_URL}/job/${id}`, data);
}

export const getProperties = (page: number = 1) => {
  return axios.get(`${BASE_URL}/property?page=${page}`);
}

export const getProperty = (id: string) => {
  return axios.get(`${BASE_URL}/property/${id}`);
}

export const deleteProperty = (id: number) => {
  return axios.delete(`${BASE_URL}/property/${id}`);
}
