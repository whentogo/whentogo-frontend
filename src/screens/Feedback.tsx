import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import FlatButton from '../components/FlatButton';
import LoadingIndicator from '../components/LoadingIndicator';
import { postFeedback } from '../services/feedback';
import useLanguage from '../utils/hooks/useLanguage';

const styles = makeStyles((theme) => ({
  pageContainer: {
    flex: 1,
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  titleBanner: {
    width: '100%',
    height: theme.spacing(8),
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.primary.main
        : theme.palette.grey['700'],
    padding: theme.spacing(2),
    alignItems: 'center',
  },
  titleText: {
    color: theme.palette.common.white,
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    justifyContent: 'flex-end',
  },
}));

function Feedback() {
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const classes = styles();
  const history = useHistory();
  const { t } = useLanguage();

  async function onSendPress() {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await postFeedback(title, description);
      setLoading(false);
      setSuccess(true);
    } catch (e) {
      setError(t('error_messages.generic'));
      setLoading(false);
    }
  }

  function onChangeTitle(event: any) {
    const { value } = event.target;
    setTitle(value);
  }

  function onChangeDescription(event: any) {
    const { value } = event.target;
    setDescription(value);
  }

  function navigateToHome() {
    history.push('/');
  }

  return (
    <div className={classes.pageContainer}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Card variant="outlined">
          <div className={classes.titleBanner}>
            <Typography variant="h5" className={classes.titleText}>
              {t('feedback.title')}
            </Typography>
          </div>
          <CardContent>
            <Box marginBottom={isAlertOpen ? 2 : 0}>
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
                  {t('helper_text.feedback_privacy')}
                </Alert>
              </Collapse>
            </Box>
            {!success ? (
              <>
                <Box marginBottom={2}>
                  <TextField
                    fullWidth
                    onChange={onChangeTitle}
                    value={title}
                    label={t('common.title')}
                    placeholder={t('feedback.title_example')}
                    size="small"
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    value={description}
                    onChange={onChangeDescription}
                    rowsMax={6}
                    size="small"
                    label={t('common.description')}
                    placeholder={t('feedback.description_example')}
                    helperText={error}
                    variant="outlined"
                  />
                </Box>
              </>
            ) : (
              <Typography variant="body1">
                {t('feedback.success_message')}
              </Typography>
            )}

            <div className={classes.buttonContainer}>
              {loading && (
                <Box marginRight={1}>
                  <LoadingIndicator />
                </Box>
              )}
              <FlatButton
                disabled={!success ? loading || !title || !description : false}
                label={
                  !success ? t('common.send') : t('not_found.back_to_home')
                }
                onClick={!success ? onSendPress : navigateToHome}
              />
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default Feedback;
