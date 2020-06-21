import React, { useEffect } from "react";
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { lightTheme } from './config/theme';
import { loadTranslations } from "./services/translation";
import { routes } from "./config/routes";

const styles = makeStyles(() => ({
  app: {
    whiteSpace: 'pre-line',
  },
  pageContainer: {
    display: 'flex',
  },
}))

function App() {
  const classes = styles();

  useEffect(() => {
    loadTranslations();
  }, []);

  return (
    <div className={classes.app}>
      <ThemeProvider theme={lightTheme}>
        <div className={classes.pageContainer}>
          <HashRouter>
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
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
