import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { HashRouter, Switch, Route } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { lightTheme, darkTheme } from './config/theme';
import { loadTranslations } from './services/translation';
import { routes } from './config/routes';
import AppHeaderBar from './components/AppHeaderBar';
import AppContainer from './components/AppContainer';

loadTranslations();

const styles = makeStyles(() => ({
  app: {
    whiteSpace: 'pre-line',
  },
}));

function App() {
  const classes = styles();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <div className={classes.app}>
      <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
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
}

export default App;
