import * as React from 'react';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { useObserver } from 'mobx-react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { B2bTax, Sickness, ZUS } from '@nsc/shared/src/types';

import { Container } from '../../components/containers/container';
import { IncomeTaxSelector } from './components/income-tax-selector/income-tax-selector';
import { ZusSelector } from './components/zus-selector/zus-selector';
import { SicknessInsuranceSelector } from './components/sickness-insurance-selector/sickness-insurance-selector';
import { Button, ButtonSize } from '../../components/button/button';
import { styles } from './b2b-parameters-screen.style';
import { CostInput } from './components/cost-input/cost-input';
import { RootStackParamList, ScreenName } from '../../types';

type B2bParametersScreenNavProp = StackNavigationProp<
  RootStackParamList,
  ScreenName.B2bParameters
>;

type B2bParametersScreenRouteProp = RouteProp<
  RootStackParamList,
  ScreenName.B2bParameters
>;

interface B2bParametersScreenProps {
  navigation: B2bParametersScreenNavProp;
  route: B2bParametersScreenRouteProp;
}

export const B2bParametersScreen: React.FC<B2bParametersScreenProps> = ({
  navigation,
  route,
}) => {
  const { b2bParameters, costs: _costs } = route.params;
  const [taxType, setTax] = useState(b2bParameters.taxType || B2bTax.Linear);
  const [zus, setZus] = useState(b2bParameters.zus || ZUS.No);
  const [sickness, setSickness] = useState(
    b2bParameters.sickness || Sickness.No,
  );
  const [costs, setCosts] = useState(_costs);

  const goBackWithParameters = () => {
    navigation.navigate(ScreenName.Home, {
      b2bParameters: {
        taxType,
        zus,
        sickness,
      },
      costs,
    });
  };

  return useObserver(() => (
    <View style={styles.container}>
      <Container>
        <Text style={styles.title}>B2B Parameters</Text>
        <IncomeTaxSelector taxType={taxType} setTax={setTax} />
        <ZusSelector zus={zus} setZus={setZus} />
        <SicknessInsuranceSelector
          sickness={sickness}
          setSickness={setSickness}
        />
        <CostInput costs={costs} setCosts={setCosts} />
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            size={ButtonSize.Medium}
            onPress={goBackWithParameters}
          >
            Ok
          </Button>
          <Button
            style={styles.button}
            type="secondary"
            size={ButtonSize.Medium}
            onPress={() => navigation.goBack()}
          >
            Cancel
          </Button>
        </View>
      </Container>
    </View>
  ));
};
