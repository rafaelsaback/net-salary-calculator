import * as React from 'react';
import { Container } from './container';
import { styles } from './bottom-container.style';

export const BottomContainer: React.FC = ({ children }) => {
  return <Container style={styles.container}>{children}</Container>;
};
