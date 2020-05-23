import {
  ContractSelector,
  ContractType,
} from './components/contract-selector/contract-selector';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, ButtonSize } from '../../components/button/button';
import { SalaryInput } from './components/salary-input/salary-input';
import { PeriodSelector } from '../../components/period-selector/period-selector';
import { Period } from '../../interfaces';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from './home-screen.style';
import { RootStackParamList, ScreenName } from '../../types';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ScreenName.Home
>;

interface HomeScreenProps {
  navigation: ProfileScreenNavigationProp;
}

export const HomeScreen: React.FC<HomeScreenProps> = (props) => {
  const [period, setPeriod] = useState(Period.Monthly);
  const [contract, setContract] = useState(ContractType.Employment);
  return (
    <View style={styles.container}>
      <View style={styles.salaryContainer}>
        <Text style={styles.grossSalary}>Gross Salary</Text>
        <SalaryInput />
        <PeriodSelector value={period} onChange={setPeriod} />
        <Button
          text="Calculate"
          onPress={() => props.navigation.navigate(ScreenName.Results)}
          size={ButtonSize.Large}
        />
      </View>
      <View style={styles.contractContainer}>
        <ContractSelector
          contractType={ContractType.Employment}
          textFirstLine="Employment Contract"
          textSecondLine="(Umowa o Pracę)"
          active={contract === ContractType.Employment}
          setContract={setContract}
        />
        <ContractSelector
          contractType={ContractType.B2B}
          textFirstLine="B2B Contract"
          active={contract === ContractType.B2B}
          setContract={setContract}
        />
      </View>
    </View>
  );
};
