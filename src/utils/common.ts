import numeral from 'numeral';
import _ from 'lodash';

export function formatNumber(number: number | string) {
  return numeral(number).format('0,0');
}

export function debounce(func: (...args: any) => any, wait: number) {
  return _.debounce(func, wait);
}
