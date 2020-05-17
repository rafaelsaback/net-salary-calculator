import { ContractSelector } from './components/contract-selector';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/button';
import { appThemeReactNavigation } from '../../theme';
import { SalaryInput } from '../../components/salary-input';
import { PeriodSelector } from '../../components/period-selector';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginHorizontal: 30,
  },
  grossSalary: {
    color: appThemeReactNavigation.colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export const HomeScreen: React.FC = () => (
  <>
    <View style={styles.container}>
      <Text style={styles.grossSalary}>Gross Salary</Text>
      <SalaryInput />
      <PeriodSelector />
      <ContractSelector />
      <Button
        onPress={() => {
          return;
        }}
      />
    </View>
  </>
);
