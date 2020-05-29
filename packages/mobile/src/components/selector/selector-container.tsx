import * as React from 'react';
import { View } from 'react-native';
import { styles } from './selector-container.style';
import EStyleSheet from 'react-native-extended-stylesheet';

interface SelectorContainerProps {
  width?: string;
  height?: string;
}

export const SelectorContainer: React.FC<SelectorContainerProps> = ({
  width = '60%',
  height = '40rem',
  children,
}) => {
  const flattenedStyle = EStyleSheet.flatten([
    styles.container,
    {
      width: EStyleSheet.value(width),
      height: EStyleSheet.value(height),
    },
  ]);
  return <View style={flattenedStyle}>{children}</View>;
};
