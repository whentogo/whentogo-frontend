import { AxiosRequestConfig } from 'axios';

const httpConfig: AxiosRequestConfig = {
  baseURL: 'https://whentogo.ml/api',
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  validateStatus: () => true,
};

export default httpConfig;
