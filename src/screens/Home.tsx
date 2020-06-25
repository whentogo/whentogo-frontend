import React, { useState, FunctionComponent } from 'react';
import Container from '@material-ui/core/Container';

import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import { connect, ConnectedProps } from 'react-redux';
import SavedBanner from '../components/SavedBanner';
import SearchArea from '../components/SearchArea';
import useLanguage from '../utils/hooks/useLanguage';
import SavedArea from '../components/SavedArea';
import { RootState } from '../store';

const mapStateToProps = (state: RootState) => {
  const { saved } = state.facilities;
  return { savedLength: saved.length };
};

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;
type HomeProps = ReduxProps;

const Home: FunctionComponent<HomeProps> = (props) => {
  const { savedLength } = props;
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(true);
  const { t } = useLanguage();

  return (
    <Container>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box marginBottom={1.5}>
            <SavedBanner />
          </Box>
          <SavedArea />
          <Box marginTop={isAlertOpen ? 2 : 0}>
            <Collapse in={isAlertOpen}>
              <Alert
                action={
                  <Button
                    onClick={() => setIsAlertOpen(false)}
                    color="inherit"
                    size="small"
                  >
                    {t('common.got_it')}
                  </Button>
                }
                severity="info"
              >
                {savedLength > 0
                  ? t('helper_text.drag_drop')
                  : t('helper_text.add_to_favourites')}
              </Alert>
            </Collapse>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={8} lg={9}>
          <SearchArea />
        </Grid>
      </Grid>
    </Container>
  );
};

export default connector(Home);
