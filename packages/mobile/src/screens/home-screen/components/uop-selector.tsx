import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export const UOPSelector: React.FC = () => (
  <View style={styles.container}>
    <Text>UOP</Text>
  </View>
);
