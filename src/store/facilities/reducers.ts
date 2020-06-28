import produce from 'immer';
import {
  FacilitiesState,
  FacilitiesActionTypes,
  FETCH_FACILITIES_REQUEST,
  FETCH_FACILITIES_SUCCESS,
  FETCH_FACILITIES_ERROR,
  FETCH_FACILITIES_CACHE_SUCCESS,
  FETCH_FACILITY_BY_ID_REQUEST,
  FETCH_FACILITY_BY_ID_SUCCESS,
  FETCH_FACILITY_BY_ID_ERROR,
  FETCH_FACILITY_BY_ID_CACHE_SUCCESS,
  SAVE_FACILITY,
  UNSAVE_FACILITY,
  REHYDRATE_SAVED_FACILITIES,
  MOVE_SAVED_FACILITY,
  CHANGE_FACILITIES_FILTER_TEXT,
  CHANGE_FACILITIES_LOCATION_FILTER,
  REMOVE_FACILITIES_LOCATION_FILTER,
} from './types';
import { getCurrentTimeInMillis, removeOneFromArray } from '../../utils/common';

const initialState: FacilitiesState = {
  isFetching: false,
  lastFetched: 0,
  cacheLife: 300 * 1000, // 5 minutes

  byId: {},
  allId: [],
  byType: {},
  saved: [],
  savedById: {},
  filters: {
    text: '',
    location: null,
  },
};

function facilities(
  state = initialState,
  action: FacilitiesActionTypes,
): FacilitiesState {
  switch (action.type) {
    case FETCH_FACILITIES_REQUEST: {
      return produce(state, (draft) => {
        draft.isFetching = true;
      });
    }
    case FETCH_FACILITIES_SUCCESS: {
      return produce(state, (draft) => {
        draft.byId = action.data;
        draft.allId = Object.keys(action.data);
        draft.lastFetched = getCurrentTimeInMillis();
        draft.isFetching = false;
      });
    }
    case FETCH_FACILITIES_ERROR: {
      return produce(state, (draft) => {
        draft.isFetching = false;
      });
    }
    case FETCH_FACILITIES_CACHE_SUCCESS: {
      return produce(state, (draft) => {
        draft.isFetching = false;
      });
    }
    case FETCH_FACILITY_BY_ID_REQUEST: {
      return produce(state, (draft) => {
        draft.byId[action.id].isFetching = true;
      });
    }
    case FETCH_FACILITY_BY_ID_SUCCESS: {
      return produce(state, (draft) => {
        const initial = state.byId[action.id];
        const { data } = action;

        draft.byId[action.id] = {
          ...initial,
          ...data,
          lastFetched: getCurrentTimeInMillis(),
          isFetching: false,
        };
      });
    }
    case FETCH_FACILITY_BY_ID_ERROR: {
      return produce(state, (draft) => {
        draft.byId[action.id].isFetching = false;
      });
    }
    case FETCH_FACILITY_BY_ID_CACHE_SUCCESS: {
      return produce(state, (draft) => {
        draft.byId[action.id].isFetching = false;
      });
    }
    case SAVE_FACILITY: {
      return produce(state, (draft) => {
        draft.saved.push(action.id);
        draft.savedById[action.id] = true;
      });
    }
    case UNSAVE_FACILITY: {
      return produce(state, (draft) => {
        draft.saved = removeOneFromArray(draft.saved, action.id);
        delete draft.savedById[action.id];
      });
    }
    case REHYDRATE_SAVED_FACILITIES: {
      return produce(state, (draft) => {
        draft.saved = action.saved;
        const sById: { [id: string]: boolean } = {};
        action.saved.forEach((id) => (sById[id] = true));
        draft.savedById = sById;
      });
    }
    case MOVE_SAVED_FACILITY: {
      return produce(state, (draft) => {
        const copy = [...draft.saved];
        const [taken] = copy.splice(action.fromIndex, 1);
        copy.splice(action.toIndex, 0, taken);
        draft.saved = copy;
      });
    }
    case CHANGE_FACILITIES_FILTER_TEXT: {
      return produce(state, (draft) => {
        draft.filters.text = action.text;
      });
    }
    case CHANGE_FACILITIES_LOCATION_FILTER: {
      return produce(state, (draft) => {
        draft.filters.location = {
          latitude: action.latitude,
          longitude: action.longitude,
        };
      });
    }
    case REMOVE_FACILITIES_LOCATION_FILTER: {
      return produce(state, (draft) => {
        draft.filters.location = null;
      });
    }
    default: {
      return state;
    }
  }
}

export default facilities;
