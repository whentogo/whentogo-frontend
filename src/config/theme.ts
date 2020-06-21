import { createMuiTheme } from '@material-ui/core';

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#4527A0',
    },
    background: {
      default: '#F5F5F5',
    },
  },
  typography: {
    fontFamily: "'Open Sans', 'Helvetica', 'Arial', sans-serif",
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    fontFamily: "'Open Sans', 'Helvetica', 'Arial', sans-serif",
  },
});
