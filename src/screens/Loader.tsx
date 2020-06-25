import React, { FunctionComponent } from 'react';
import { LoadingComponentProps } from 'react-loadable';
import { makeStyles } from '@material-ui/core/styles';
import GridLoader from 'react-spinners/GridLoader';
import useTheming from '../utils/hooks/useTheming';

const styles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
  },
}));

interface LoaderProps extends LoadingComponentProps {}

const Loader: FunctionComponent<LoaderProps> = () => {
  const classes = styles();
  const { palette } = useTheming();

  return (
    <div className={classes.container}>
      <div>
        <GridLoader color={palette.primary.main} size={12} loading />
      </div>
    </div>
  );
};

export default Loader;
