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
  },
  salaryContainer: {
    flex: 1,
    justifyContent: 'space-around',
    borderRadius: 10,
    backgroundColor: 'white',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginHorizontal: 30,
    maxHeight: 300,
  },
  grossSalary: {
    textAlign: 'center',
    color: appThemeReactNavigation.colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  contractContainer: {
    flex: 1,
  },
});

export const HomeScreen: React.FC = () => (
  <View style={styles.container}>
    <View style={styles.salaryContainer}>
      <Text style={styles.grossSalary}>Gross Salary</Text>
      <SalaryInput />
      <PeriodSelector />
      <Button
        onPress={() => {
          return;
        }}
      />
    </View>
    <View>
      <ContractSelector
        textFirstLine="Employment Contract"
        textSecondLine="(Umowa o Pracę)"
        active
      />
      <ContractSelector textFirstLine="B2B Contract" active={false} />
    </View>
  </View>
);
