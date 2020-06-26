import numeral from 'numeral';
import moment from 'moment';
import { isMatch } from 'micromatch';
import _ from 'lodash';

type Primitive = string | number | boolean;

export function formatNumber(number: number | string) {
  return numeral(number).format('0,0');
}

export function debounce(func: (...args: any) => any, wait: number) {
  return _.debounce(func, wait);
}

export function hasMatch(body: string, search: string) {
  const cleaned = search.trim().replace(/ /gi, '*');
  return isMatch(body, `*${cleaned}*`, { nocase: true });
}

export function takeRandomConsecFromArray<T>(arr: T[], take: number): T[] {
  if (arr.length <= 0) {
    return [];
  }

  const result: T[] = [];
  const rand = Math.floor(Math.random() * arr.length);
  for (let i = 0; i < take; i += 1) {
    const index = (rand + i) % (arr.length - 1);
    result.push(arr[index]);
  }
  return result;
}

export function getCurrentDayNumber(): number {
  return moment().day();
}

export function getCurrentTimeNumber(): number {
  return moment().hour();
}

export function getDay(daysFromNow: number = 0) {
  return moment().add(daysFromNow, 'day').format('dddd');
}

export function getPredictionTimeList(distribution: number[][]) {
  const currDay = getCurrentDayNumber() - 1;
  const currTime = getCurrentTimeNumber();

  let startHour: number = 8;
  let list: number[] = [];
  if (currTime < 22) {
    // get today's timing
    const curr = distribution[currDay];
    startHour = Math.max(currTime, 9); // data starts from 8 am
    list = curr.slice(startHour - 9, curr.length + 1);
  } else {
    // get tomorrow's timing
    list = [...distribution[currDay + (1 % 7)]];
  }

  return {
    isTomorrow: currTime > 14,
    startHour,
    list,
  };
}

export function normalizedTrim(string: string): string {
  return string.trim().toLocaleLowerCase();
}

export function generateGoogleMapsLink(
  latitude: number,
  longitude: number,
): string {
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}

export function removeOneFromArray<T extends Primitive>(
  arr: T[],
  item: T,
): T[] {
  const copy = [...arr];
  return _.pull(copy, item);
}

export function isCacheExpired(lastFetched: number, cacheLife: number) {
  const now = moment().valueOf();
  return now - lastFetched > cacheLife;
}

export function getTimeFromNow(
  date: string,
  dateFormat: string = 'DD MMMM YYYY, HH:mm a',
) {
  return moment(date, dateFormat).fromNow();
}

export function formatTime(
  timeOrDate: string,
  currFormat: string = '',
  resultFormat: string = 'DD MMMM YYYY',
) {
  return moment(timeOrDate, currFormat).format(resultFormat);
}

export function getCurrentTimeInMillis() {
  return moment().valueOf();
}
