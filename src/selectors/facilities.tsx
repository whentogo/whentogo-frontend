import { RootState } from '../store';
import { FacilitiesById } from '../services/facilities';
import { createSelector } from 'reselect';
import { calculateDistance } from '../utils/common';

const facilitiesAllIdSelector = (state: RootState): string[] => {
  return state.facilities.allId;
};

const facilitiesByIdSelector = (state: RootState): FacilitiesById => {
  return state.facilities.byId;
};

export const facilitiesLocationFilterSelector = (state: RootState) => {
  return state.facilities.filters.location;
};

export const getAllFacilities = createSelector(
  facilitiesAllIdSelector,
  facilitiesByIdSelector,
  facilitiesLocationFilterSelector,
  (allId, byId, location) => {
    if (!location) {
      return allId.map((id) => byId[id]);
    }

    return allId
      .filter((id) => {
        const facility = byId[id];
        if (!facility.coordinates) {
          return false;
        }

        return (
          calculateDistance(
            {
              latitude: location.latitude,
              longitude: location.longitude,
            },
            {
              latitude: facility.coordinates.latitude,
              longitude: facility.coordinates.longitude,
            },
          ) < 1500
        ); // 1500 km
      })
      .map((id) => byId[id]);
  },
);
