import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useLanguage from '../utils/hooks/useLanguage';
import emptyImage from '../assets/images/empty.png';

const styles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
  image: {
    height: 120,
    width: 120,
  },
}));

const SearchEmpty: FunctionComponent<any> = () => {
  const classes = styles();
  const { t } = useLanguage();

  return (
    <div className={classes.root}>
      <img alt={t('common.empty')} src={emptyImage} className={classes.image} />
      <Typography variant="body2" align="center">
        {t('error_messages.no_search_result')}
      </Typography>
    </div>
  );
};

export default SearchEmpty;
