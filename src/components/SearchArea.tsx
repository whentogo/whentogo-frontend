import React, { useEffect, useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, connect, ConnectedProps } from 'react-redux';
import SearchInput from './SearchInput';
import SearchCard from './SearchCard';
import SearchEmpty from './SearchEmpty';
import { RootState } from '../store';
import {
  fetchFacilitiesAction,
  changeFacilitiesFilterText,
} from '../store/facilities/actions';
import { debounce, normalizedTrim, hasMatch } from '../utils/common';
import { Facility } from '../services/facilities';

// TODO: move this somewhere else
function filterFacilitiesByText(
  facilities: Partial<Facility>[],
  text: string,
  take: number = 8,
): Partial<Facility>[] {
  return facilities
    .filter((facility) => {
      const cleanedName = facility.name ? normalizedTrim(facility.name) : '';
      const cleanedAddress = facility.address
        ? normalizedTrim(facility.address)
        : '';
      return hasMatch(`${cleanedName} ${cleanedAddress}`, text);
    })
    .slice(0, take);
}

const mapStateToProps = (state: RootState) => {
  const { allId, byId, isFetching, filters } = state.facilities;
  const { text } = filters;

  const list = allId.map((id) => byId[id]);
  const facilities = text
    ? filterFacilitiesByText(list, text)
    : list.slice(0, 8);
  return {
    facilities,
    isFetching,
  };
};

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;
type SearchAreaProps = ReduxProps;

const styles = makeStyles((theme) => ({
  surface: {
    backgroundColor: theme.droppable.default,
    minHeight: theme.spacing(40),
    display: 'flex',
    flexDirection: 'column',
  },
  searchInputContainer: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.primary.main
        : theme.palette.grey.A700,
    padding: theme.spacing(1.5),
    borderTopLeftRadius: 4,
    flex: 0,
    borderTopRightRadius: 4,
  },
  listContainer: {
    padding: theme.spacing(1.5),
  },
}));

const SearchArea = (props: SearchAreaProps) => {
  const { facilities, isFetching } = props;
  const classes = styles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFacilitiesAction());
  }, [dispatch]);

  const onChangeDebounced = useCallback(
    debounce(
      (value: string) => dispatch(changeFacilitiesFilterText(value)),
      500,
    ),
    [dispatch],
  );

  function onChangeSearchText(text: string) {
    onChangeDebounced(text);
  }

  return (
    <Paper classes={{ root: classes.surface }} elevation={0}>
      <div className={classes.searchInputContainer}>
        <SearchInput onChangeText={onChangeSearchText} />
      </div>
      {facilities.length > 0 ? (
        <Grid
          className={classes.listContainer}
          alignItems="stretch"
          alignContent="stretch"
          container
          spacing={1}
        >
          {facilities.map(
            (data) =>
              data.id && (
                <Grid key={data.id} item xs={12} md={6} lg={4}>
                  <SearchCard
                    id={data.id}
                    status={data.status}
                    type={data.type}
                    name={data.name}
                    postalCode={data.postal_code}
                    location={data.coordinates}
                    address={data.address}
                  />
                </Grid>
              ),
          )}
        </Grid>
      ) : (
        !isFetching && <SearchEmpty />
      )}
    </Paper>
  );
};

export default connector(SearchArea);
