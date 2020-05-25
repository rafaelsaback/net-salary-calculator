import * as React from 'react';
import { Dispatch } from 'react';
import { Text, View } from 'react-native';
import { SelectorOption } from '../../../../components/selector-option/selector-option';
import { styles } from './zus-selector.style';
import { SelectorContainer } from '../../../../components/selector-container/selector-container';
import { ZUS } from '@nsc/shared/src/types';
import {
  isDiscountedZus,
  isNormalZus,
  isNoZus,
} from '@nsc/shared/src/type-helpers';

interface ZusSelectorProps {
  zus: ZUS;
  setZus: Dispatch<ZUS>;
}

export const ZusSelector: React.FC<ZusSelectorProps> = ({ zus, setZus }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textLabel}>ZUS</Text>
      <SelectorContainer width="100%">
        <SelectorOption
          active={isNoZus(zus)}
          text="No"
          onPress={() => setZus(ZUS.No)}
          atLeftHandSide
        />
        <SelectorOption
          active={isDiscountedZus(zus)}
          text="Discount."
          onPress={() => setZus(ZUS.Discounted)}
        />
        <SelectorOption
          active={isNormalZus(zus)}
          text="Normal"
          onPress={() => setZus(ZUS.Normal)}
          atRightHandSide
        />
      </SelectorContainer>
    </View>
  );
};
