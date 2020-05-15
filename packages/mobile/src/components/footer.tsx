import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'transparent',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
  },
});

export const Footer = () => (
  <View style={styles.footer}>
    <Text>ADS</Text>
  </View>
);
