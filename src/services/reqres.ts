import { AxiosResponse } from 'axios';
import Logger from '../utils/logger';

const logger = new Logger('HTTP');

export function handleResponse<T>(res: AxiosResponse<T>): T {
  logger.log(res.data);

  if (res.status < 200 && res.status >= 300) {
    logger.warn(res);
    throw new Error(`E_${res.status.toString()}`);
  }

  return res.data;
}

export function generateHeaders() {}
