import * as React from 'react';
import { Dispatch } from 'react';
import { Text, View } from 'react-native';
import { styles } from './income-tax-selector.style';
import { B2bTax } from '@nsc/shared/src/types';
import { Selector } from '../../../../components/selector/selector';

interface IncomeTaxSelectorProps {
  taxType: B2bTax;
  setTax: Dispatch<any>;
}

export const IncomeTaxSelector: React.FC<IncomeTaxSelectorProps> = ({
  taxType,
  setTax,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textLabel}>Income Tax</Text>
      <Selector
        value={taxType}
        options={[B2bTax.Linear, B2bTax.Progressive]}
        onChange={setTax}
        width="100%"
        height="45rem"
      />
    </View>
  );
};
