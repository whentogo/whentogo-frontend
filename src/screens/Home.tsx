import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useLanguage from '../utils/hooks/useLanguage';

const styles = makeStyles(() => ({
  pageContainer: {
    flex: 1,
    height: '100vh',
    width: '100vw',
    backgroundColor: 'yellow',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}))

function Home() {
  const classes = styles();
  const { t } = useLanguage();

  return (
    <div className={classes.pageContainer}>
      <Typography>
        {t('common.hello')}
      </Typography>
    </div>
  )
}

export default Home;
