import React from 'react';
import { Text, View } from 'react-native';
import { appTheme } from '../theme';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    height: '55rem',
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
    fontSize: '20rem',
  },
  value: {
    flex: 4,
    textAlign: 'center',
    color: appTheme.primaryBlackColor,
    fontWeight: 'bold',
    fontSize: '30rem',
  },
});

export const SalaryInput: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.currency}>PLN</Text>
    <Text style={styles.value}>120 000</Text>
  </View>
);
