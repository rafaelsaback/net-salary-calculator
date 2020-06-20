import * as React from 'react';
import { Dispatch } from 'react';
import { Text, View } from 'react-native';
import { styles } from './income-tax-selector.style';
import { B2bTax } from '@nsc/shared/src/types';
import { Selector } from '../../../../components/selector/selector';
import { Popover } from '../../../../components/popover/popover';
import { Strong } from '../../../../components/strong/strong';

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
      <View style={styles.textLabelContainer}>
        <Text style={styles.textLabel}>Income Tax</Text>
        <Popover
          tooltipContent={
            <>
              <Text>
                <Strong>19%</Strong> - Linear tax rate
              </Text>
              <Text>
                <Strong>17%/32%</Strong> - Progressive tax rate
              </Text>
            </>
          }
        />
      </View>
      <Selector
        value={taxType}
        options={[B2bTax.Linear, B2bTax.Progressive]}
        onChange={setTax}
        width="66%"
      />
    </View>
  );
};
