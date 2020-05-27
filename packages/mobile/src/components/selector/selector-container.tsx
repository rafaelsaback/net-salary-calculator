import * as React from 'react';
import { View } from 'react-native';
import { styles } from './selector-container.style';
import EStyleSheet from 'react-native-extended-stylesheet';

interface SelectorContainerProps {
  width?: string;
}

export const SelectorContainer: React.FC<SelectorContainerProps> = ({
  width = '60%',
  children,
}) => {
  const flattenedStyle = EStyleSheet.flatten([styles.container, { width }]);
  return <View style={flattenedStyle}>{children}</View>;
};
