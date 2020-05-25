import * as React from 'react';
import { useState } from 'react';
import { Container } from '../../components/container/container';
import { IncomeTaxSelector } from './components/income-tax-selector/income-tax-selector';
import { ZusSelector } from './components/zus-selector/zus-selector';
import { SicknessInsuranceSelector } from './components/sickness-insurance-selector/sickness-insurance-selector';
import { Button, ButtonSize } from '../../components/button/button';
import noop from 'lodash-es/noop';
import { styles } from './b2b-parameters-screen.style';
import { View } from 'react-native';
import { B2BTax, Sickness, ZUS } from '@nsc/shared/src/types';
import { CostInput } from './components/cost-input/cost-input';

export const B2BParametersScreen: React.FC = () => {
  const [tax, setTax] = useState(B2BTax.Linear);
  const [zus, setZus] = useState(ZUS.No);
  const [sickness, setSickness] = useState(Sickness.No);
  return (
    <Container>
      <IncomeTaxSelector tax={tax} setTax={setTax} />
      <ZusSelector zus={zus} setZus={setZus} />
      <SicknessInsuranceSelector
        sickness={sickness}
        setSickness={setSickness}
      />
      <CostInput />
      <View style={styles.buttonContainer}>
        <Button style={styles.button} size={ButtonSize.Medium} onPress={noop}>
          Ok
        </Button>
        <Button
          style={styles.button}
          type="secondary"
          size={ButtonSize.Medium}
          onPress={noop}
        >
          Cancel
        </Button>
      </View>
    </Container>
  );
};
