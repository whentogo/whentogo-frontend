import React, { FunctionComponent } from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import { useTheme } from '@material-ui/core/styles';

interface LoadingIndicatorProps {
  color?: string;
  size?: number;
}

const LoadingIndicator: FunctionComponent<LoadingIndicatorProps> = (props) => {
  const theme = useTheme();
  const { size = 24, color = theme.palette.primary.main } = props;

  return <BounceLoader size={size} color={color} />;
};

export default LoadingIndicator;
