import * as React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { styles } from './selector-container.style';
import EStyleSheet from 'react-native-extended-stylesheet';

interface SelectorContainerProps {
  width?: string;
  height?: string;
  style?: StyleProp<ViewStyle>;
}

export const SelectorContainer: React.FC<SelectorContainerProps> = ({
  width = '60%',
  height = '40rem',
  style,
  children,
}) => {
  const flattenedStyle = [
    styles.container,
    {
      width: EStyleSheet.value(width),
      height: EStyleSheet.value(height),
    },
    style,
  ];
  return <View style={flattenedStyle}>{children}</View>;
};
