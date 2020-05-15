import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'transparent',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
  },
});

export const Footer: React.FC = () => (
  <View style={styles.footer}>
    <Text>ADS</Text>
  </View>
);
