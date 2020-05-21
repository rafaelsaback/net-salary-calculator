import { ContractSelector, ContractType } from './components/contract-selector';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, ButtonSize } from '../../components/button';
import { appTheme, appThemeReactNavigation } from '../../theme';
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
    marginHorizontal: 30,
    paddingVertical: 5,
    ...appTheme.containerBackgroundShadow,
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
          text="Calculate"
          onPress={() => {
            return;
          }}
          size={ButtonSize.Large}
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
