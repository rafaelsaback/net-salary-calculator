import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginHorizontal: 30,
  },
});

export const SalaryInputContainer: React.FC = () => (
  <View style={styles.container}>
    <Text>Gross Salary</Text>
  </View>
);
