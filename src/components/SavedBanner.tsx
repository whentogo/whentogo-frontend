import React, { FunctionComponent } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import useLanguage from '../utils/hooks/useLanguage';
import saved from '../assets/images/savedbanner.png';

const styles = makeStyles((theme: Theme) => ({
  paper: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.primary.main
        : theme.palette.background.paper,
  },
  content: {},
  bannerImage: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    position: 'absolute',
    opacity: 0.5,
    top: theme.spacing(-5),
    [theme.breakpoints.between('xs', 'md')]: {
      top: theme.spacing(-6),
    },
    right: theme.spacing(-5),
    zIndex: 0,
  },
  cardContent: {
    display: 'flex',
    position: 'relative',
  },
  textContainer: {
    zIndex: 1,
  },
  text: {
    color: theme.palette.common.white,
  },
}));

const SavedBanner: FunctionComponent<any> = () => {
  const classes = styles();
  const { t } = useLanguage();

  return (
    <Card className={classes.paper} elevation={0}>
      <CardContent>
        <div className={classes.cardContent}>
          <div className={classes.textContainer}>
            <Typography classes={{ root: classes.text }} variant="h6">
              {t('saved_banner.title')}
            </Typography>
            <Typography classes={{ root: classes.text }} variant="caption">
              {t('saved_banner.subtitle')}
            </Typography>
          </div>
          <img alt="Hint" src={saved} className={classes.bannerImage} />
        </div>
      </CardContent>
    </Card>
  );
};

export default SavedBanner;
