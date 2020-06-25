import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import useLanguage from '../utils/hooks/useLanguage';

const questions = [
  {
    key: '1',
  },
  {
    key: '2',
    link: 'https://www.spaceout.gov.sg/',
  },
  {
    key: '3',
  },
  {
    key: '4',
  },
  {
    key: '5',
    link: `${window.location.protocol}//${window.location.host}/#/feedback`,
  },
  {
    key: '6',
  },
  {
    key: '7',
    link: 'https://github.com/whentogo/whentogo-frontend',
  },
  {
    key: '8',
    link: 'https://api.whentogo.ml/docs',
  },
  {
    key: '9',
    link: 'mailto:whentogo.sg@gmail.com',
  },
];

const styles = makeStyles(() => ({
  pageContainer: {
    flex: 1,
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
}));

function Faq() {
  const classes = styles();
  const { t } = useLanguage();

  function openWindow(link: string) {
    window.open(link, '_blank');
  }

  return (
    <div className={classes.pageContainer}>
      <Container maxWidth="sm">
        {questions.map((question) => (
          <ExpansionPanel elevation={0} key={question.key}>
            <ExpansionPanelSummary
              IconButtonProps={{ disableRipple: true }}
              id={question.key}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>{t(`faq.question_${question.key}`)}</Typography>
            </ExpansionPanelSummary>
            <ExpandionPanelDetails>
              <Typography>{t(`faq.answer_${question.key}`)}</Typography>
            </ExpandionPanelDetails>
            {question.link && (
              <>
                <Divider />
                <ExpansionPanelActions>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => openWindow(question.link)}
                  >
                    {t('common.press_me')}
                  </Button>
                </ExpansionPanelActions>
              </>
            )}
          </ExpansionPanel>
        ))}
      </Container>
    </div>
  );
}

export default Faq;
