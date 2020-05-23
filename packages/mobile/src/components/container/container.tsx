import * as React from 'react';
import { View } from 'react-native';
import { styles } from './container.style';

export const Container: React.FC = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};
