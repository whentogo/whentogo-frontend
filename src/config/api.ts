import { AxiosRequestConfig } from 'axios';

const httpConfig: AxiosRequestConfig = {
  baseURL: 'https://api.whentogo.ml/',
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export default httpConfig;
