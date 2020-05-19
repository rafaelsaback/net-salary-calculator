import { ContractSelector, ContractType } from './components/contract-selector';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from '../../components/button';
import { appThemeReactNavigation } from '../../theme';
import { SalaryInput } from '../../components/salary-input';
import { PeriodSelector } from '../../components/period-selector';
import { Period } from '../../interfaces';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  salaryContainer: {
    flex: 1,
    justifyContent: 'space-around',
    borderRadius: 10,
    backgroundColor: 'white',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginHorizontal: 30,
    paddingVertical: 5,
  },
  grossSalary: {
    textAlign: 'center',
    color: appThemeReactNavigation.colors.text,
    fontSize: '26rem',
    fontWeight: 'bold',
  },
  contractContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

export const HomeScreen: React.FC = () => {
  const [period, setPeriod] = useState<Period>(Period.Monthly);
  return (
    <View style={styles.container}>
      <View style={styles.salaryContainer}>
        <Text style={styles.grossSalary}>Gross Salary</Text>
        <SalaryInput />
        <PeriodSelector value={period} onChange={setPeriod} />
        <Button
          onPress={() => {
            return;
          }}
        />
      </View>
      <View style={styles.contractContainer}>
        <ContractSelector
          contractType={ContractType.Employment}
          textFirstLine="Employment Contract"
          textSecondLine="(Umowa o Pracę)"
          active
        />
        <ContractSelector
          contractType={ContractType.B2B}
          textFirstLine="B2B Contract"
        />
      </View>
    </View>
  );
};
