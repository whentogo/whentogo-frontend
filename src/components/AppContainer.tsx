import React, { FunctionComponent } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

const styles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
  },
}));

const AppContainer: FunctionComponent<any> = (props) => {
  const { children } = props;
  const classes = styles();

  return <div className={classes.container}>{children}</div>;
};

export default AppContainer;
