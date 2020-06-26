import React, { FunctionComponent, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import HomeIcon from '@material-ui/icons/Home';
import FeedbackIcon from '@material-ui/icons/Feedback';
import HelpIcon from '@material-ui/icons/HelpOutline';
import { useHistory } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { ReactComponent as WhentogoIcon } from '../assets/icons/whentogo.svg';
import useLanguage from '../utils/hooks/useLanguage';
import ThemePreferenceIcon from './ThemePreferenceIcon';
import { RootState } from '../store';

const routes = [
  {
    key: 'home',
    link: '/',
    IconComponent: HomeIcon,
  },
  {
    key: 'feedback',
    link: '/feedback',
    IconComponent: FeedbackIcon,
  },
  {
    key: 'faq',
    link: '/faq',
    IconComponent: HelpIcon,
  },
  {
    key: 'theme',
    link: 'theme',
    IconComponent: ThemePreferenceIcon,
  },
];

const styles = makeStyles((theme) => {
  const { type, primary, grey } = theme.palette;

  let fabChildColor = primary.main;
  if (type === 'dark') {
    fabChildColor = grey['800'];
  }

  return {
    root: {
      // flexGrow: 1,
    },
    speedDial: {
      position: 'absolute',
      right: 0,
      top: theme.spacing(1),
      [theme.breakpoints.down('md')]: {
        top: theme.spacing(0.7),
      },
      [theme.breakpoints.down('sm')]: {
        top: theme.spacing(0.5),
      },
      [theme.breakpoints.down('xs')]: {
        top: theme.spacing(0.2),
      },
      // [theme.breakpoints.up('md')]: {
      //   top: theme.spacing(1),
      // },
    },
    fabRoot: {
      boxShadow: 'none',
      backgroundColor: 'transparent',
      '&:hover': {
        boxShadow: 'none',
        backgroundColor: 'transparent',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: 'transparent',
      },
      '&:focus': {
        boxShadow: 'none',
        backgroundColor: 'transparent',
      },
    },
    fabChildRoot: {
      boxShadow: 'none',
      backgroundColor: fabChildColor,
      '&:hover': {
        boxShadow: 'none',
        backgroundColor: fabChildColor,
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: fabChildColor,
      },
      '&:focus': {
        boxShadow: 'none',
        backgroundColor: fabChildColor,
      },
    },
    clickable: {
      cursor: 'pointer',
    },
  };
});

const mapStateToProps = (state: RootState) => {
  const { theme } = state.ui;
  return { theme };
};

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;
type AppHeaderBarProps = ReduxProps;

const AppHeaderBar: FunctionComponent<AppHeaderBarProps> = (props) => {
  const [isDialOpen, setIsDialOpen] = useState<boolean>(false);
  const { t } = useLanguage();
  const theme = useTheme();
  const history = useHistory();
  const classes = styles();

  function backToHome() {
    history.push('/');
  }

  function onDialClicked(route: string) {
    if (route === 'theme') {
      // handled by icon component
      return;
    }
    history.push(route || '/');
  }

  return (
    <div className={classes.root}>
      <Box marginBottom={2}>
        <Container>
          <AppBar elevation={0} color="transparent" position="static">
            <Toolbar>
              <Box
                className={classes.clickable}
                onClick={backToHome}
                paddingRight={2}
                marginLeft={-2}
              >
                <WhentogoIcon
                  width={theme.spacing(5)}
                  height={theme.spacing(5)}
                />
              </Box>
              <Box onClick={backToHome} className={classes.clickable}>
                <Typography color="textPrimary" variant="h6">
                  whentogo
                </Typography>
              </Box>
              <div className={classes.speedDial}>
                <SpeedDial
                  ariaLabel="something"
                  open={isDialOpen}
                  FabProps={{
                    size: 'small',
                    classes: {
                      root: classes.fabRoot,
                    },
                  }}
                  openIcon={<CloseIcon />}
                  direction="left"
                  onClose={() => setIsDialOpen(false)}
                  onOpen={() => setIsDialOpen(true)}
                  icon={
                    <MenuIcon
                      htmlColor={
                        theme.palette.type === 'light'
                          ? theme.palette.primary.main
                          : theme.palette.common.white
                      }
                    />
                  }
                >
                  {routes.map((route) => (
                    <SpeedDialAction
                      key={route.key}
                      FabProps={{
                        size: 'small',
                        classes: {
                          root: classes.fabChildRoot,
                        },
                      }}
                      icon={
                        <route.IconComponent
                          htmlColor={theme.palette.common.white}
                        />
                      }
                      tooltipTitle={t(`nav.${route.key}`)}
                      onClick={() => onDialClicked(route.link)}
                    />
                  ))}
                </SpeedDial>
              </div>
            </Toolbar>
          </AppBar>
        </Container>
      </Box>
    </div>
  );
};

export default connector(AppHeaderBar);
