import React, { FunctionComponent, useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Alert from '@material-ui/lab/Alert';
import { Button } from '@material-ui/core';
import useLanguage from '../utils/hooks/useLanguage';
import FacilityTypeBadge from './FacilityTypeBadge';
import StatusBadge from './StatusBadge';
import {
  getTimeFromNow,
  getPredictionTimeList,
  formatTime,
  getDay,
} from '../utils/common';
import {
  fetchFacilityByIdAction,
  unsaveFacility,
} from '../store/facilities/actions';
import { RootState } from '../store';

const mapStateToProps = (state: RootState) => {
  const { byId } = state.facilities;
  return { byId };
};

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;
type FacilityCardProps = ReduxProps & FacilityCardPartialProps;

interface FacilityCardPartialProps {
  id: string;
  isDragging?: boolean;
}

const styles = makeStyles((theme) => ({
  cardContainer: {
    backgroundColor: theme.draggable.default,
  },
  cardContainerActive: {
    backgroundColor: theme.draggable.active,
  },
  expand: {
    marginLeft: 'auto',
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  actionsContainer: {
    paddingLeft: theme.spacing(1.2),
    marginTop: 0,
  },
  rowActive: {
    backgroundColor: theme.palette.warning.light,
  },
  rowHighlight: {
    backgroundColor: theme.palette.action.focus,
  },
}));

const FacilityCard: FunctionComponent<FacilityCardProps> = (props) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { id, byId, isDragging } = props;
  const { t } = useLanguage();
  const classes = styles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFacilityByIdAction(id));
  }, [dispatch, id]);

  const facility = byId[id];

  const status = typeof facility.status === 'number' ? facility.status : -1;
  const predictionList = facility.distribution
    ? getPredictionTimeList(facility.distribution)
    : null;
  const postCode = facility.postal_code ? `, Singapore ${facility.postal_code}` : '';

  return (
    <Card
      className={
        isDragging ? classes.cardContainerActive : classes.cardContainer
      }
      elevation={0}
    >
      <Box marginX={2} marginTop={1.5}>
        <Typography variant="subtitle2">
          <b>{facility.name || t('error_messages.no_name')}</b>
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {(facility.address || t('error_messages.no_address')) + postCode}
        </Typography>
        <Box display="flex" flexDirection="row" marginTop={1}>
          <FacilityTypeBadge type={facility.type} />
          <Box marginLeft={0.5}>
            <StatusBadge statusNumber={status} />
          </Box>
        </Box>
      </Box>
      <CardActions disableSpacing className={classes.actionsContainer}>
        <Button
          onClick={() => dispatch(unsaveFacility(id))}
          size="small"
          color="secondary"
        >
          {t('common.remove')}
        </Button>
        {!facility.isFetching && (
          <IconButton
            className={clsx(classes.expand, isExpanded && classes.expandOpen)}
            disableFocusRipple
            disableRipple
            disableTouchRipple
            size="small"
            onClick={() => setIsExpanded((expanded) => !expanded)}
          >
            <ExpandMoreIcon />
          </IconButton>
        )}
      </CardActions>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Box marginX={2} marginBottom={1.5}>
          <Box marginBottom={1.2}>
            <Divider />
          </Box>
          {!facility.isFetching && !predictionList ? (
            <Box marginBottom={1}>
              <Typography variant="caption" color="textSecondary">
                {t('error_messages.no_predictions')}
              </Typography>
            </Box>
          ) : null}
          {predictionList && (
            <Box>
              {predictionList.isTomorrow && (
                <Box marginBottom={0.5}>
                  <Alert severity="warning">
                    {t('error_messages.no_predictions_today')}
                  </Alert>
                </Box>
              )}
              <Box marginBottom={1}>
                <Typography>
                  {`${getDay(predictionList.isTomorrow ? 1 : 0)} (${
                    predictionList.isTomorrow
                      ? t('common.tomorrow')
                      : t('common.today')
                  })`}
                </Typography>
              </Box>
              <Table size="small">
                <TableHead>
                  <TableRow classes={{ root: classes.rowHighlight }}>
                    <TableCell align="center">{t('common.time')}</TableCell>
                    <TableCell align="center">
                      {t('common.prediction')}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {predictionList.list.map((status, i) => (
                    <TableRow key={i.toString()}>
                      <TableCell align="center">
                        {formatTime(
                          `${predictionList.startHour + i}`,
                          'H',
                          'h a',
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <StatusBadge statusNumber={status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
          {!!facility.lastUpdated && (
            <Box display="flex" justifyContent="flex-end" marginTop={1}>
              <Typography variant="caption" color="textPrimary">
                <i>
                  {t('common.last_updated_on', {
                    time: getTimeFromNow(facility.lastUpdated),
                  })}
                </i>
              </Typography>
            </Box>
          )}
        </Box>
      </Collapse>
    </Card>
  );
};

export default connector(FacilityCard);
