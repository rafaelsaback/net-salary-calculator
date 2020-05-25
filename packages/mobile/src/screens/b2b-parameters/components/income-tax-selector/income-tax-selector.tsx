import * as React from 'react';
import { Dispatch } from 'react';
import { Text, View } from 'react-native';
import { SelectorOption } from '../../../../components/selector-option/selector-option';
import { styles } from './income-tax-selector.style';
import { SelectorContainer } from '../../../../components/selector-container/selector-container';
import { B2BTax } from '@nsc/shared/src/types';
import { isLinearTax, isProgressiveTax } from '@nsc/shared/src/type-helpers';

interface IncomeTaxSelectorProps {
  tax: B2BTax;
  setTax: Dispatch<B2BTax>;
}

export const IncomeTaxSelector: React.FC<IncomeTaxSelectorProps> = ({
  tax,
  setTax,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textLabel}>Income Tax</Text>
      <SelectorContainer width="100%">
        <SelectorOption
          active={isLinearTax(tax)}
          text="19%"
          onPress={() => setTax(B2BTax.Linear)}
          atLeftHandSide
        />
        <SelectorOption
          active={isProgressiveTax(tax)}
          text="17% / 32%"
          onPress={() => setTax(B2BTax.Progressive)}
          atRightHandSide
        />
      </SelectorContainer>
    </View>
  );
};
