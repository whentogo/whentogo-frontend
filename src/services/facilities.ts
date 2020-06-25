import { get } from './http';
import { setItemInStorage, getItemFromStorage } from './storage';
import { FacilityTypes } from '../types';

const SAVED_KEY = 'saved';
const ORDER_KEY = 'order';

export type FacilityCoordinates = {
  latitude: number;
  longitude: number;
};

export type Facility = {
  id: string;
  name?: string;
  postal_code?: string;
  coordinates?: FacilityCoordinates;
  cb_closed?: boolean;
  address?: string;
  type?: FacilityTypes;
  lastUpdated?: string;
  status: number;
  trend?: boolean;
  distribution?: number[][];
};

// TODO: clean this shit up please
export type FacilitiesById = {
  [id: string]: Partial<Facility>;
};

export async function fetchAllFacilities(): Promise<FacilitiesById> {
  return (await get<FacilitiesById>('facilities')).data;
}

export async function fetchFacilityById(id: string) {
  return (await get<Partial<Facility>>(`facilities/${id}`)).data;
}

export function saveFacilityDetails(map: any) {
  return setItemInStorage(SAVED_KEY, JSON.stringify(map));
}

export function saveFacilityOrder(list: Array<string>) {
  return setItemInStorage(ORDER_KEY, JSON.stringify(list));
}

export async function getSavedFacilityDetails() {
  const data = getItemFromStorage(SAVED_KEY);
  if (data) {
    return JSON.parse(data);
  }

  return null;
}

export function getSavedFacilityOrder(): string[] {
  const data = getItemFromStorage(ORDER_KEY);
  if (data) {
    return JSON.parse(data) as string[];
  }

  return [];
}
