import * as React from 'react';
import { useState } from 'react';
import { Container } from '../../components/containers/container';
import { IncomeTaxSelector } from './components/income-tax-selector/income-tax-selector';
import { ZusSelector } from './components/zus-selector/zus-selector';
import { SicknessInsuranceSelector } from './components/sickness-insurance-selector/sickness-insurance-selector';
import { Button, ButtonSize } from '../../components/button/button';
import { styles } from './b2b-parameters-screen.style';
import { View } from 'react-native';
import { B2BTax, Sickness, ZUS } from '@nsc/shared/src/types';
import { CostInput } from './components/cost-input/cost-input';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenName } from '../../types';
import { RouteProp } from '@react-navigation/native';
import { useObserver } from 'mobx-react';

type B2BParametersScreenNavProp = StackNavigationProp<
  RootStackParamList,
  ScreenName.B2BParameters
>;

type B2BParametersScreenRouteProp = RouteProp<
  RootStackParamList,
  ScreenName.B2BParameters
>;

interface B2BParametersScreenProps {
  navigation: B2BParametersScreenNavProp;
  route: B2BParametersScreenRouteProp;
}

export const B2BParametersScreen: React.FC<B2BParametersScreenProps> = ({
  navigation,
  route,
}) => {
  const { b2bParameters, costs: _costs } = route.params;
  const [taxType, setTax] = useState(b2bParameters.taxType || B2BTax.Linear);
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
        costs,
      },
      costs,
    });
  };

  return useObserver(() => (
    <View style={styles.container}>
      <Container>
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
