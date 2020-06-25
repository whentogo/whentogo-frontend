import { Facility } from '../../services/facilities';

export const FETCH_FACILITIES_REQUEST = 'FETCH_FACILITIES_REQUEST';
export const FETCH_FACILITIES_SUCCESS = 'FETCH_FACILITIES_SUCCESS';
export const FETCH_FACILITIES_ERROR = 'FETCH_FACILITIES_ERROR';
export const FETCH_FACILITIES_CACHE_SUCCESS = 'FETCH_FACILITIES_CACHE_SUCCESS';

export const FETCH_FACILITY_BY_ID_REQUEST = 'FETCH_FACILITY_BY_ID_REQUEST';
export const FETCH_FACILITY_BY_ID_SUCCESS = 'FETCH_FACILITY_BY_ID_SUCCESS';
export const FETCH_FACILITY_BY_ID_ERROR = 'FETCH_FACILITY_BY_ID_ERROR';
export const FETCH_FACILITY_BY_ID_CACHE_SUCCESS =
  'FETCH_FACILITY_BY_ID_CACHE_SUCCESS';

export const SAVE_FACILITY = 'SAVE_FACILITY';
export const UNSAVE_FACILITY = 'UNSAVE_FACILITY';
export const MOVE_SAVED_FACILITY = 'MOVE_SAVED_FACILITY';
export const REHYDRATE_SAVED_FACILITIES = 'REHYRDRATE_SAVED_FACILITIES';
export const CHANGE_FACILITIES_FILTER_TEXT = 'CHANGE_FACILITIES_FILTER_TEXT';

interface FetchFacilitiesAction {
  type: typeof FETCH_FACILITIES_REQUEST;
}

interface FetchFacilitiesSuccessAction {
  type: typeof FETCH_FACILITIES_SUCCESS;
  data: FacilitiesById;
}

interface FetchFacilitiesErrorAction {
  type: typeof FETCH_FACILITIES_ERROR;
  error: string;
}

interface FetchFacilitiesCacheSuccessAction {
  type: typeof FETCH_FACILITIES_CACHE_SUCCESS;
}

interface FetchFacilityByIdAction {
  type: typeof FETCH_FACILITY_BY_ID_REQUEST;
  id: string;
}

interface FetchFacilityByIdSuccessAction {
  type: typeof FETCH_FACILITY_BY_ID_SUCCESS;
  id: string;
  data: Partial<Facility>;
}

interface FetchFacilityByIdErrorAction {
  type: typeof FETCH_FACILITY_BY_ID_ERROR;
  id: string;
  error: string;
}

interface FetchFacilityByIdCacheSuccessAction {
  type: typeof FETCH_FACILITY_BY_ID_CACHE_SUCCESS;
  id: string;
}

interface SaveFacilityAction {
  type: typeof SAVE_FACILITY;
  id: string;
}

interface UnsaveFacilityAction {
  type: typeof UNSAVE_FACILITY;
  id: string;
}

interface MoveSavedFacility {
  type: typeof MOVE_SAVED_FACILITY;
  fromIndex: number;
  toIndex: number;
}

interface RehydrateSavedFacilitiesAction {
  type: typeof REHYDRATE_SAVED_FACILITIES;
  saved: string[];
}

interface ChangeFacilitiesFilterTextAction {
  type: typeof CHANGE_FACILITIES_FILTER_TEXT;
  text: string;
}

export type FacilitiesActionTypes =
  | FetchFacilitiesAction
  | FetchFacilitiesErrorAction
  | FetchFacilitiesSuccessAction
  | FetchFacilitiesCacheSuccessAction
  | FetchFacilityByIdAction
  | FetchFacilityByIdSuccessAction
  | FetchFacilityByIdErrorAction
  | FetchFacilityByIdCacheSuccessAction
  | SaveFacilityAction
  | UnsaveFacilityAction
  | RehydrateSavedFacilitiesAction
  | MoveSavedFacility
  | ChangeFacilitiesFilterTextAction;

interface FacilitiesByType {
  [type: string]: string[];
}

interface FacilityByIdMeta {
  isFetching: boolean;
  lastFetched: number;
  cacheLife: number;
}

export interface FacilitiesById {
  [id: string]: Partial<Facility & FacilityByIdMeta>;
}

interface FacilitiesFilters {
  text: string;
}

interface FacilitiesSavedById {
  [id: string]: boolean;
}

export interface FacilitiesState {
  isFetching: boolean;
  lastFetched: number;
  cacheLife: number;
  byId: FacilitiesById;
  byType: FacilitiesByType;
  allId: string[];
  saved: string[];
  savedById: FacilitiesSavedById;
  filters: FacilitiesFilters;
}
