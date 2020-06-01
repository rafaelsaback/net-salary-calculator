import { ContractSelector } from './components/contract-selector/contract-selector';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, ButtonSize } from '../../components/button/button';
import { SalaryInput } from './components/salary-input/salary-input';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from './home-screen.style';
import { RootStackParamList, ScreenName } from '../../types';
import { ContractType, Period } from '@nsc/shared/src/types';
import { Container } from '../../components/containers/container';
import { B2BParametersButton } from './components/b2b-parameters-button/b2b-parameters-button';
import { isB2B } from '@nsc/shared/src/type-helpers';
import { RouteProp } from '@react-navigation/native';
import { Selector } from '../../components/selector/selector';
import { useLocalStore, useObserver } from 'mobx-react';
import { UopCalculatorViewModel } from '../../models/uop-calculator-view-model';

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ScreenName.Home
>;

export type HomeScreenRouteProp = RouteProp<
  RootStackParamList,
  ScreenName.Home
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [contract, setContract] = useState(ContractType.Employment);
  const uopViewModel = useLocalStore(() => new UopCalculatorViewModel());

  const goToResultsScreen = () =>
    navigation.navigate(ScreenName.Results, {
      uopSerializedModel: uopViewModel.serialized,
    });

  return useObserver(() => (
    <View style={styles.container}>
      <Container>
        <SalaryInput
          salary={uopViewModel.salary}
          setSalary={uopViewModel.setSalary}
        />
        <Selector
          value={uopViewModel.period}
          options={[Period.Monthly, Period.Annually]}
          onChange={uopViewModel.setPeriod}
        />
        <Button onPress={goToResultsScreen} size={ButtonSize.Medium}>
          Calculate
        </Button>
      </Container>
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
      <B2BParametersButton disabled={!isB2B(contract)} />
    </View>
  ));
};

export default HomeScreen;
