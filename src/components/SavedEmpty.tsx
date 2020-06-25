import React, { FunctionComponent } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useLanguage from '../utils/hooks/useLanguage';
import { ReactComponent as IntroductionIcon } from '../assets/icons/introduction.svg';

const styles = makeStyles((theme) => ({
  root: {
    height: 240,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
  image: {
    height: 140,
    width: 120,
  },
}));

const SavedEmpty: FunctionComponent<any> = () => {
  const classes = styles();
  const { t } = useLanguage();
  const theme = useTheme();
  const isMatched = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div className={classes.root}>
      <IntroductionIcon width={100} height={100} />
      <Box marginTop={1}>
        <Typography variant="body2" align="center">
          {isMatched
            ? t('home.introduction_right')
            : t('home.introduction_below')}
        </Typography>
      </Box>
    </div>
  );
};

export default SavedEmpty;
