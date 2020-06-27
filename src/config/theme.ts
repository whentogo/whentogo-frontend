import { ThemeOptions, createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    draggable: {
      default: string;
      active: string;
    };
    facilities: {
      wetmarket: string;
      supermarket: string;
      mall: string;
      singpost: string;
      park: string;
    };
    droppable: {
      default: string;
      active: string;
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    draggable: {
      default: string;
      active: string;
    };
    facilities: {
      wetmarket: string;
      supermarket: string;
      mall: string;
      singpost: string;
      park: string;
    };
    droppable: {
      default: string;
      active: string;
    };
  }
}

function createAppTheme(options: ThemeOptions) {
  return createMuiTheme({
    ...options,
  });
}

export const lightTheme = () =>
  createAppTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#1565C0',
      },
      secondary: {
        main: '#D32F2F',
      },
      background: {
        default: '#eeeeee',
      },
    },
    draggable: {
      active: '#EEEEEE',
      default: '#fff',
    },
    facilities: {
      wetmarket: '#880E4F',
      supermarket: '#004D40',
      mall: '#4A148C',
      singpost: '#0D47A1',
      park: '#33691E'
    },
    droppable: {
      active: '#BDBDBD',
      default: '#E0E0E0',
    },
    typography: {
      fontFamily: "'Open Sans', 'Helvetica', 'Arial', sans-serif",
    },
  });

export const darkTheme = () =>
  createAppTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#90CAF9',
      },
      secondary: {
        main: '#EF9A9A',
      },
    },
    draggable: {
      active: '#323232',
      default: '#424242',
    },
    facilities: {
      wetmarket: '#F48FB1',
      supermarket: '#4DB6AC',
      mall: '#CE93D8',
      singpost: '#42A5F5',
      park: '#7CB342'
    },
    droppable: {
      active: '#E0E0E0',
      default: '#242424',
    },
    typography: {
      fontFamily: "'Open Sans', 'Helvetica', 'Arial', sans-serif",
    },
  });
