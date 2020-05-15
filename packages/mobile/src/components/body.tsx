import { StyleSheet, View } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  body: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export const Body: React.FC = ({ children }) => (
  <View style={styles.body}>{children}</View>
);
