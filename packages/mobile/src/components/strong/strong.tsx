import * as React from 'react';
import { Text } from 'react-native';
import { styles } from './strong.style';

export const Strong: React.FC = ({ children }) => {
  return <Text style={styles.textBold}>{children}</Text>;
};
