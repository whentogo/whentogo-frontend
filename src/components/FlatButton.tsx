import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';

const styles = makeStyles(() => ({
  button: {
    textTransform: 'none',
  },
}));

interface FlatButtonProps {
  variant?: 'contained' | 'text' | 'outlined';
  label?: string;
  color?: 'primary' | 'secondary' | 'default' | 'inherit';
  className?: any;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const FlatButton: FunctionComponent<FlatButtonProps> = (props) => {
  const {
    variant = 'contained',
    label = 'Button',
    color = 'primary',
    fullWidth = false,
    onClick = () => {},
    disabled = false,
    className,
  } = props;

  const classes = styles();

  return (
    <Button
      disabled={disabled}
      variant={variant}
      color={color}
      fullWidth={fullWidth}
      onClick={onClick}
      disableElevation
      className={clsx(classes.button, className)}
    >
      {label}
    </Button>
  );
};

export default FlatButton;
