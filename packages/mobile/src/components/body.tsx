import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingVertical: 10,
  },
});

export const Body: React.FC = ({ children }) => (
  <View style={styles.body}>{children}</View>
);
