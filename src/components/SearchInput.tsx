import React, { ChangeEvent, FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import SearchIcon from '@material-ui/icons/Search';
import useLanguage from '../utils/hooks/useLanguage';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

interface SearchInputProps {
  onChangeText?: (text: string) => void;
}

const SearchInput: FunctionComponent<SearchInputProps> = (props) => {
  const { onChangeText = () => {} } = props;
  const classes = useStyles();
  const { t } = useLanguage();

  function onChange(
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) {
    const { value } = event.target;
    onChangeText(value);
  }

  return (
    <Paper elevation={0} className={classes.root}>
      <InputBase
        onChange={onChange}
        className={classes.input}
        placeholder={t('common.search')}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <SearchIcon color="disabled" />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="default"
        className={classes.iconButton}
        aria-label="directions"
      >
        <MyLocationIcon fontSize="small" />
      </IconButton>
    </Paper>
  );
};

export default SearchInput;
