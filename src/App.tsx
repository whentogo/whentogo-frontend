import React, { FunctionComponent } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { lightTheme, darkTheme } from './config/theme';
import { loadTranslations } from './services/translation';
import { routes } from './config/routes';
import AppHeaderBar from './components/AppHeaderBar';
import AppContainer from './components/AppContainer';
import { RootState } from './store';

loadTranslations();

const mapStateToProps = (state: RootState) => {
  const { theme } = state.ui;
  return { theme };
};

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;
type AppProps = ReduxProps;

const styles = makeStyles(() => ({
  app: {
    whiteSpace: 'pre-line',
  },
}));

const App: FunctionComponent<AppProps> = (props) => {
  const { theme } = props;
  const classes = styles();

  return (
    <div className={classes.app}>
      <ThemeProvider theme={theme === 'dark' ? darkTheme() : lightTheme()}>
        <AppContainer>
          <HashRouter>
            <AppHeaderBar />
            <Switch>
              {routes.map((options) => (
                <Route
                  key={options.key}
                  exact={!!options.exact}
                  path={options.path || options.link}
                  component={options.component}
                />
              ))}
            </Switch>
          </HashRouter>
        </AppContainer>
      </ThemeProvider>
    </div>
  );
};

export default connector(App);
