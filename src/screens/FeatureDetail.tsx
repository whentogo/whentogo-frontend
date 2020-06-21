import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(() => ({
  pageContainer: {
    flex: 1,
    height: '100vh',
    width: '100vw',
    backgroundColor: 'yellow',
  }
}))

function FeatureDetail() {
  const classes = styles();

  return (
    <div className={classes.pageContainer} />
  )
}

export default FeatureDetail;
