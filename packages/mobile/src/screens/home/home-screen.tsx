import { ContractSelector } from './components/contract-selector/contract-selector';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { SalaryInput } from './components/salary-input/salary-input';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from './home-screen.style';
import { RootStackParamList, ScreenName } from '../../types';
import { ContractType, Period } from '@nsc/shared/src/types';
import { Container } from '../../components/containers/container';
import { B2bParametersButton } from './components/b2b-parameters-button/b2b-parameters-button';
import { isB2b } from '@nsc/shared/src/type-helpers';
import { RouteProp } from '@react-navigation/native';
import { Selector } from '../../components/selector/selector';
import { useLocalStore, useObserver } from 'mobx-react';
import { UopViewModel } from '../../models/uop-view-model';
import { B2bViewModel } from '../../models/b2b-view-model';
import { BaseViewModel } from '../../models/base-view-model';
import { CalculateButton } from './components/calculate-button/calculate-button';

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

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  const [contract, setContract] = useState(ContractType.Employment);
  const { b2bParameters, costs = '0' } = route.params;
  const { uopViewModel, b2bViewModel } = useLocalStore(() => ({
    uopViewModel: new UopViewModel(),
    b2bViewModel: new B2bViewModel(b2bParameters),
  }));

  const setSalary = (salary: string) => {
    uopViewModel.setSalary(salary);
    b2bViewModel.setSalary(salary);
  };
  const setPeriod = (period: Period) => {
    uopViewModel.setPeriod(period);
    b2bViewModel.setPeriod(period);
  };

  const selectedViewModel: BaseViewModel = isB2b(contract)
    ? b2bViewModel
    : uopViewModel;

  useEffect(() => {
    b2bViewModel.setCosts(costs);
  }, [b2bViewModel, costs]);

  useEffect(() => {
    b2bViewModel.setB2bParameters(b2bParameters);
  }, [
    b2bViewModel,
    b2bParameters.taxType,
    b2bParameters.sickness,
    b2bParameters.zus,
    b2bParameters,
  ]);

  const goToResultsScreen = () =>
    navigation.navigate(ScreenName.Results, {
      serializedModel: selectedViewModel.serialized,
    });

  return useObserver(() => (
    <View style={styles.container}>
      <Container>
        <View>
          <Text style={styles.title}>Salary</Text>
          <SalaryInput
            salary={selectedViewModel.salary.formatted}
            setSalary={setSalary}
          />
        </View>
        <Selector
          value={selectedViewModel.period}
          options={[Period.Monthly, Period.Annually]}
          onChange={setPeriod}
        />
        <CalculateButton
          disabled={!selectedViewModel.salary.value}
          onPress={goToResultsScreen}
        />
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
          contractType={ContractType.B2b}
          textFirstLine="B2B Contract"
          active={contract === ContractType.B2b}
          setContract={setContract}
        />
      </View>
      <B2bParametersButton
        disabled={!isB2b(contract)}
        b2bParameters={b2bViewModel.b2bParameters}
        costs={b2bViewModel.costs.formatted}
      />
    </View>
  ));
};

export default HomeScreen;
