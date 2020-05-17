import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { appTheme } from '../theme';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    height: 60,
    width: '80%',
    maxWidth: 250,
    borderRadius: appTheme.borderRadius,
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  currency: {
    flex: 1,
    marginLeft: 5,
    color: appTheme.primaryTextColor,
    fontWeight: 'bold',
    fontSize: 18,
  },
  value: {
    flex: 4,
    color: appTheme.primaryTextColor,
    fontWeight: 'bold',
    fontSize: 34,
  },
});

export const SalaryInput: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.currency}>PLN</Text>
    <Text style={styles.value}>120 000</Text>
  </View>
);
