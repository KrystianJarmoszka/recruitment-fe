import axios, { AxiosRequestConfig } from 'axios';

export class RestApi {
  api;

  constructor(config: AxiosRequestConfig) {
    this.api = axios.create(config);
  }

  get(url: string, config: AxiosRequestConfig) {
    return this.api.get(url, config);
  }

  delete(url: string, config: AxiosRequestConfig) {
    return this.api.delete(url, config);
  }

  post(url: string, data: any, config: AxiosRequestConfig) {
    return this.api.post(url, data, config);
  }

  put(url: string, data: any, config: AxiosRequestConfig) {
    return this.api.put(url, data, config);
  }
}
