import React, { ChangeEvent, FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import SearchIcon from '@material-ui/icons/Search';
import useLanguage from '../utils/hooks/useLanguage';
import { useDispatch, connect, ConnectedProps } from 'react-redux';
import {
  changeFacilitiesLocationFilter,
  removeFacilitiesLocationFilter,
} from '../store/facilities/actions';
import { RootState } from '../store';

const styles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const mapStateToProps = (state: RootState) => {
  const { location } = state.facilities.filters;

  return {
    isLocationFilterOn: !!location,
  };
};

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;
type SearchInputPropsWithRedux = ReduxProps & SearchInputProps;

interface SearchInputProps {
  onChangeText?: (text: string) => void;
}

const SearchInput: FunctionComponent<SearchInputPropsWithRedux> = (props) => {
  const { onChangeText = () => {}, isLocationFilterOn } = props;
  const classes = styles();
  const { t } = useLanguage();
  const dispatch = useDispatch();

  function onChange(
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) {
    const { value } = event.target;
    onChangeText(value);
  }

  async function onLocationClick() {
    if (!isLocationFilterOn) {
      navigator.geolocation.getCurrentPosition((location) => {
        const { latitude, longitude } = location.coords;
        dispatch(changeFacilitiesLocationFilter(latitude, longitude));
      });
      return;
    }
    dispatch(removeFacilitiesLocationFilter());
  }

  return (
    <Paper elevation={0} className={classes.root}>
      <InputBase
        onChange={onChange}
        className={classes.input}
        placeholder={t('common.search')}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <SearchIcon color="disabled" />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        onClick={onLocationClick}
        color="default"
        className={classes.iconButton}
        aria-label="directions"
      >
        <MyLocationIcon
          fontSize="small"
          color={isLocationFilterOn ? 'primary' : 'disabled'}
        />
      </IconButton>
    </Paper>
  );
};

export default connector(SearchInput);
