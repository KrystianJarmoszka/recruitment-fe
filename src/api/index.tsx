import axios from "axios";
import { BASE_URL } from "../constants/ApiConfig";

export const getJobs = () => {
  return axios.get(`${BASE_URL}/job`);
}

export const getJob = (id: string) => {
  return axios.get(`${BASE_URL}/job/${id}`);
}

export const deleteJob = (id: number) => {
  return axios.delete(`${BASE_URL}/job/${id}`);
}
