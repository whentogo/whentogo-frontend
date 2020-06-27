import React, { FunctionComponent } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MapIcon from '@material-ui/icons/Explore';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, connect, ConnectedProps } from 'react-redux';
import clsx from 'clsx';
import { saveFacility, unsaveFacility } from '../store/facilities/actions';
import { RootState } from '../store';
import { FacilityCoordinates } from '../services/facilities';
import useLanguage from '../utils/hooks/useLanguage';
import StatusBadge from './StatusBadge';
import FacilityTypeBadge from './FacilityTypeBadge';
import { FacilityTypes } from '../types';
import { generateGoogleMapsLink } from '../utils/common';

const styles = makeStyles((theme) => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  buttonAdded: {
    color: theme.palette.success.main,
  },
  mapIcon: {
    padding: 0,
  },
}));

const mapStateToProps = (state: RootState) => {
  const { savedById } = state.facilities;

  return {
    savedById,
  };
};

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;
type SearchCardProps = ReduxProps & SearchAreaProps;

interface SearchAreaProps {
  id: string;
  type?: FacilityTypes;
  name?: string;
  status?: number;
  address?: string;
  postalCode?: string;
  location?: FacilityCoordinates;
}

const SearchCard: FunctionComponent<SearchCardProps> = (props) => {
  const classes = styles();
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const {
    id,
    status = -1,
    type = 'supermarket',
    name = t('error_messages.no_name'),
    address = t('error_messages.no_address'),
    savedById,
    postalCode,
    location,
  } = props;

  const isSaved = !!savedById[id];

  function onButtonClick() {
    if (isSaved) {
      dispatch(unsaveFacility(id));
      return;
    }

    dispatch(saveFacility(id));
  }

  function onClickMap() {
    if (location) {
      window.open(
        generateGoogleMapsLink(location.latitude, location.longitude),
        '_blank',
      );
    }
  }

  const postCode = postalCode ? `, Singapore ${postalCode}` : '';

  return (
    <Card className={classes.container} elevation={0}>
      <Box paddingX={2} paddingTop={2} flex={1} paddingBottom={1}>
        <Typography variant="subtitle2">
          <b>{name}</b>
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {`${address}${postCode}`}
        </Typography>
        <Box display="flex" flexDirection="row" marginTop={0.8}>
          <Box marginRight={0.5}>
            <FacilityTypeBadge type={type} />
          </Box>
          {status !== -1 ? <StatusBadge statusNumber={status} /> : null}
        </Box>
      </Box>
      <Box
        justifyContent="space-between"
        display="flex"
        paddingRight={1}
        paddingLeft={1.7}
        paddingBottom={0.7}
      >
        {location ? (
          <IconButton
            onClick={onClickMap}
            disableRipple
            disableFocusRipple
            disableTouchRipple
            size="small"
            className={classes.mapIcon}
          >
            <MapIcon fontSize="small" />
          </IconButton>
        ) : (
          <div />
        )}
        <Button
          variant="text"
          size="small"
          color="primary"
          classes={{ root: clsx(isSaved && classes.buttonAdded) }}
          onClick={onButtonClick}
        >
          {!isSaved ? t('common.add_to_favourites') : t('common.added')}
        </Button>
      </Box>
    </Card>
  );
};

export default connector(SearchCard);
