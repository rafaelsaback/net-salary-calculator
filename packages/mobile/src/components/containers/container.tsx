import * as React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { styles } from './container.style';

interface ContainerProps {
  style?: StyleProp<ViewStyle>;
}

export const Container: React.FC<ContainerProps> = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};
