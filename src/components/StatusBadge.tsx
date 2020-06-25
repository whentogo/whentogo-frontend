import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Chip from '@material-ui/core/Chip';
import useLanguage from '../utils/hooks/useLanguage';

const styles = makeStyles((theme) => {
  const { type, common } = theme.palette;
  let fontColor = common.white;
  const flippedType = type === 'dark' ? 'light' : 'dark';
  if (type === 'dark') {
    fontColor = common.black;
  }

  return {
    base: {
      borderRadius: theme.shape.borderRadius,
      // fontWeight: 600,
      fontSize: theme.typography.caption.fontSize,
      color: fontColor,
    },
    closed: {
      backgroundColor: theme.palette.error[flippedType],
    },
    no_data: {
      backgroundColor:
        type === 'dark' ? theme.palette.grey['400'] : theme.palette.grey['600'],
    },
    not_crowded: {
      backgroundColor: theme.palette.success[flippedType],
    },
    some_crowded: {
      backgroundColor: theme.palette.warning[flippedType],
    },
    crowded: {
      backgroundColor: theme.palette.error[flippedType],
    },
    maximum: {
      backgroundColor: theme.palette.error[flippedType],
    },
  };
});

interface StatusBadgeProps {
  statusNumber?: number;
}

const StatusBadge: FunctionComponent<StatusBadgeProps> = (props) => {
  const classes = styles();
  const { t } = useLanguage();
  const { statusNumber = -1 } = props;

  function getStyles() {
    switch (statusNumber) {
      case -2: {
        return classes.closed;
      }
      case 0: {
        return classes.not_crowded;
      }
      case 1: {
        return classes.some_crowded;
      }
      case 2: {
        return classes.crowded;
      }
      case 3: {
        return classes.maximum;
      }
      case -1:
      default: {
        return classes.no_data;
      }
    }
  }

  return (
    <Chip
      className={clsx(classes.base, getStyles())}
      size="small"
      label={t(`status_numbers.status_${statusNumber}`)}
    />
  );
};

export default StatusBadge;
