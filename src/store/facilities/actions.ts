import {
  FacilitiesActionTypes,
  SAVE_FACILITY,
  FETCH_FACILITIES_REQUEST,
  FETCH_FACILITIES_SUCCESS,
  FETCH_FACILITIES_ERROR,
  FETCH_FACILITIES_CACHE_SUCCESS,
  FacilitiesById,
  FETCH_FACILITY_BY_ID_REQUEST,
  FETCH_FACILITY_BY_ID_SUCCESS,
  FETCH_FACILITY_BY_ID_ERROR,
  FETCH_FACILITY_BY_ID_CACHE_SUCCESS,
  UNSAVE_FACILITY,
  REHYDRATE_SAVED_FACILITIES,
  MOVE_SAVED_FACILITY,
  CHANGE_FACILITIES_FILTER_TEXT,
  CHANGE_FACILITIES_LOCATION_FILTER,
  REMOVE_FACILITIES_LOCATION_FILTER,
} from './types';
import { AppThunk } from '..';
import {
  Facility,
  fetchAllFacilities,
  fetchFacilityById,
  getSavedFacilityOrder,
} from '../../services/facilities';
import { isCacheExpired } from '../../utils/common';

function fetchFacilitiesRequest() {
  return {
    type: FETCH_FACILITIES_REQUEST,
  };
}

function fetchFacilitiesSuccess(data: FacilitiesById) {
  return {
    type: FETCH_FACILITIES_SUCCESS,
    data,
  };
}

function fetchFacilitiesError(error: string) {
  return {
    type: FETCH_FACILITIES_ERROR,
    error,
  };
}

function fetchFacilitiesCacheSuccess() {
  return {
    type: FETCH_FACILITIES_CACHE_SUCCESS,
  };
}

function fetchFacilityByIdRequest(id: string) {
  return {
    type: FETCH_FACILITY_BY_ID_REQUEST,
    id,
  };
}

function fetchFacilityByIdSuccess(id: string, data: Partial<Facility>) {
  return {
    type: FETCH_FACILITY_BY_ID_SUCCESS,
    id,
    data,
  };
}

function fetchFacilityByIdError(id: string, error: string) {
  return {
    type: FETCH_FACILITY_BY_ID_ERROR,
    id,
    error,
  };
}

function fetchFacilityByIdCacheSuccess(id: string) {
  return {
    type: FETCH_FACILITY_BY_ID_CACHE_SUCCESS,
    id,
  };
}

export function fetchFacilitiesAction(): AppThunk {
  return async (dispatch, getState) => {
    dispatch(fetchFacilitiesRequest());

    const { lastFetched, cacheLife } = getState().facilities;
    if (!isCacheExpired(lastFetched, cacheLife)) {
      dispatch(fetchFacilitiesCacheSuccess());
      return;
    }

    try {
      const facilities = await fetchAllFacilities();
      dispatch(fetchFacilitiesSuccess(facilities));
    } catch (e) {
      dispatch(fetchFacilitiesError(e.toString()));
    }
  };
}

export function fetchFacilityByIdAction(id: string): AppThunk {
  return async (dispatch, getState) => {
    dispatch(fetchFacilityByIdRequest(id));

    const facility = getState().facilities.byId[id] || {};
    const { lastFetched, cacheLife = 5 * 60 * 1000 } = facility;
    if (lastFetched && !isCacheExpired(lastFetched, cacheLife)) {
      dispatch(fetchFacilityByIdCacheSuccess(id));
      return;
    }

    try {
      const facil = await fetchFacilityById(id);
      dispatch(fetchFacilityByIdSuccess(id, facil));
    } catch (e) {
      dispatch(fetchFacilityByIdError(id, e.toString()));
    }
  };
}

export function saveFacility(id: string): FacilitiesActionTypes {
  return {
    type: SAVE_FACILITY,
    id,
  };
}

export function unsaveFacility(id: string): FacilitiesActionTypes {
  return {
    type: UNSAVE_FACILITY,
    id,
  };
}

export function moveSavedFacility(fromIndex: number, toIndex: number) {
  return {
    type: MOVE_SAVED_FACILITY,
    fromIndex,
    toIndex,
  };
}

export function rehydrateSavedFacilities(): FacilitiesActionTypes {
  return {
    type: REHYDRATE_SAVED_FACILITIES,
    saved: getSavedFacilityOrder() as string[],
  };
}

export function changeFacilitiesFilterText(
  text: string,
): FacilitiesActionTypes {
  return {
    type: CHANGE_FACILITIES_FILTER_TEXT,
    text,
  };
}

export function changeFacilitiesLocationFilter(
  latitude: number,
  longitude: number,
): FacilitiesActionTypes {
  return {
    type: CHANGE_FACILITIES_LOCATION_FILTER,
    latitude,
    longitude,
  };
}

export function removeFacilitiesLocationFilter(): FacilitiesActionTypes {
  return {
    type: REMOVE_FACILITIES_LOCATION_FILTER,
  };
}
