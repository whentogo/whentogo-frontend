import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Chip from '@material-ui/core/Chip';
import useLanguage from '../utils/hooks/useLanguage';

const styles = makeStyles((theme) => {
  const { type, common } = theme.palette;
  let fontColor = common.white;
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
    no_type: {},
    mall: {
      backgroundColor: theme.facilities.mall,
    },
    supermarket: {
      backgroundColor: theme.facilities.supermarket,
    },
    wetmarket: {
      backgroundColor: theme.facilities.wetmarket,
    },
    singpost: {
      backgroundColor: theme.facilities.singpost,
    },
  };
});

// TODO: change to enum
interface StatusBadgeProps {
  type?: 'supermarket' | 'mall' | 'wetmarket' | 'singpost' | 'no_type';
}

const FacilityTypeBadge: FunctionComponent<StatusBadgeProps> = (props) => {
  const classes = styles();
  const { t } = useLanguage();
  const { type = 'no_type' } = props;

  function getStyles() {
    switch (type) {
      case 'mall': {
        return classes.mall;
      }
      case 'singpost': {
        return classes.singpost;
      }
      case 'supermarket': {
        return classes.supermarket;
      }
      case 'wetmarket': {
        return classes.wetmarket;
      }
      case 'no_type':
      default: {
        return classes.no_type;
      }
    }
  }

  return (
    <Chip
      className={clsx(classes.base, getStyles())}
      size="small"
      label={t(`facility_types.${type}`)}
    />
  );
};

export default FacilityTypeBadge;
