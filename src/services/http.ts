import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import httpConfig from '../config/api';

const http = axios.create(httpConfig);

export async function get<T>(
  path: string,
  options: AxiosRequestConfig = {},
): Promise<AxiosResponse<any>> {
  return http.get<T>(path, options);
}

export async function post<T>(
  path: string,
  data: any,
  options: AxiosRequestConfig = {},
): Promise<AxiosResponse<any>> {
  return http.post<T>(path, data, options);
}

export async function put<T>(
  path: string,
  data: any,
  options: AxiosRequestConfig = {},
): Promise<AxiosResponse<any>> {
  return http.put<T>(path, data, options);
}

export async function patch<T>(
  path: string,
  data: any,
  options: AxiosRequestConfig = {},
): Promise<AxiosResponse<any>> {
  return http.patch<T>(path, data, options);
}

export async function del(
  path: string,
  options: AxiosRequestConfig = {},
): Promise<AxiosResponse<any>> {
  return http.delete(path, options);
}
