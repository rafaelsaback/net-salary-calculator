import React from 'react';
import { StyleSheet, View } from 'react-native';
import { UOPSelector } from './uop-selector';
import { B2BSelector } from './b2b-selector';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
});

export const ContractSelector: React.FC = () => (
  <View style={styles.container}>
    <UOPSelector />
    <B2BSelector />
  </View>
);
