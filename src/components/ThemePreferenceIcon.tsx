import React, { FunctionComponent, useEffect } from 'react';
import DarkThemeIcon from '@material-ui/icons/Brightness4';
import LightThemeIcon from '@material-ui/icons/Brightness7';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {
  rehydrateThemePreference,
  changeThemePreference,
} from '../store/ui/actions';
import { setThemePreference } from '../services/ui';

const mapStateToProps = (state: RootState) => {
  const { theme } = state.ui;
  return { theme };
};

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;
type ThemePreferenceProps = ReduxProps & ThemePrefProps;

interface ThemePrefProps {
  htmlColor?: string;
}

const ThemePreferenceIcon: FunctionComponent<ThemePreferenceProps> = (
  props,
) => {
  const { theme, htmlColor = '#fff' } = props;
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const dispatch = useDispatch();

  const preferenceWithoutSaved = prefersDarkMode ? 'dark' : 'light';

  useEffect(() => {
    dispatch(rehydrateThemePreference(preferenceWithoutSaved));
  }, [dispatch, preferenceWithoutSaved]);

  useEffect(() => {
    if (theme) {
      setThemePreference(theme);
    }
  }, [theme]);

  function onChangeTheme() {
    dispatch(changeThemePreference(theme === 'light' ? 'dark' : 'light'));
  }

  const currentTheme = theme || preferenceWithoutSaved;

  return (
    <IconButton onClick={onChangeTheme}>
      {currentTheme === 'light' ? (
        <DarkThemeIcon htmlColor={htmlColor} />
      ) : (
        <LightThemeIcon htmlColor={htmlColor} />
      )}
    </IconButton>
  );
};

export default connector(ThemePreferenceIcon);
