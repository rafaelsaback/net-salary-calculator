import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { appTheme } from '../theme';
import { scale } from '../utils';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    height: scale(50),
    width: '80%',
    maxWidth: 250,
    borderRadius: appTheme.borderRadius,
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  currency: {
    flex: 1,
    textAlign: 'center',
    marginLeft: 5,
    color: appTheme.primaryBlackColor,
    fontWeight: 'bold',
    fontSize: scale(18),
  },
  value: {
    flex: 4,
    textAlign: 'center',
    color: appTheme.primaryBlackColor,
    fontWeight: 'bold',
    fontSize: scale(28),
  },
});

export const SalaryInput: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.currency}>PLN</Text>
    <Text style={styles.value}>120 000</Text>
  </View>
);
