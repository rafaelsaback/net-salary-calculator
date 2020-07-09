import { ContractSelector } from './components/contract-selector/contract-selector';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import isEmpty from 'lodash-es/isEmpty';
import { StackNavigationProp } from '@react-navigation/stack';
import { isB2b } from '@nsc/shared/src/type-helpers';
import { RouteProp } from '@react-navigation/native';
import {
  B2bTax,
  ContractType,
  Period,
  Sickness,
  ZUS,
} from '@nsc/shared/src/types';

import { SalaryInput } from './components/salary-input/salary-input';
import { styles } from './home-screen.style';
import { B2bParameters, RootStackParamList, ScreenName } from '../../types';
import { Container } from '../../components/containers/container';
import { B2bParametersButton } from './components/b2b-parameters-button/b2b-parameters-button';
import { Selector } from '../../components/selector/selector';
import { useLocalStore, useObserver } from 'mobx-react';
import { UopViewModel } from '../../models/uop-view-model';
import { B2bViewModel } from '../../models/b2b-view-model';
import { BaseViewModel } from '../../models/base-view-model';
import { CalculateButton } from './components/calculate-button/calculate-button';
import { PersistenceService } from '../../services/persistence-service';
import { usePersistedData } from '../../use-persisted-data';

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

const DEFAULT_B2B_PARAMETERS: B2bParameters = {
  taxType: B2bTax.Linear,
  zus: ZUS.No,
  sickness: Sickness.No,
};

const B2B_PARAMETERS_STORAGE_KEY = 'b2bParameters';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  const [contract, setContract] = useState(ContractType.Employment);
  const b2bParameters = route.params?.b2bParameters || {};
  const costs = route.params?.costs || '0';
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

  usePersistedData(
    B2B_PARAMETERS_STORAGE_KEY,
    DEFAULT_B2B_PARAMETERS,
    b2bViewModel.setB2bParameters,
  );

  useEffect(() => {
    b2bViewModel.setCosts(costs);
  }, [b2bViewModel, costs]);

  useEffect(() => {
    if (!isEmpty(b2bParameters)) {
      b2bViewModel.setB2bParameters(b2bParameters);
      PersistenceService.storeData('b2bParameters', b2bParameters);
    }
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
          <Text style={styles.title}>
            {contract === ContractType.Employment
              ? 'Gross Salary'
              : 'Gross Salary (without VAT)'}
          </Text>
          <SalaryInput
            salary={selectedViewModel.salary.formatted}
            setSalary={setSalary}
            salaryError={selectedViewModel.error}
            period={selectedViewModel.period}
          />
        </View>
        <Selector
          value={selectedViewModel.period}
          options={[Period.Monthly, Period.Annually]}
          containerStyle={{ alignSelf: 'center' }}
          onChange={setPeriod}
        />
        <CalculateButton
          disabled={
            !selectedViewModel.salary.value || !!selectedViewModel.error
          }
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
