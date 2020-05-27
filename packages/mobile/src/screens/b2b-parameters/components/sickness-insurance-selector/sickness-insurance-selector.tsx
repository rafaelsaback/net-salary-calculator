import * as React from 'react';
import { Dispatch } from 'react';
import { Text, View } from 'react-native';
import { SelectorOption } from '../../../../components/selector/selector-option';
import { SelectorContainer } from '../../../../components/selector/selector-container';
import { styles } from './sickness-insurance-selector.style';
import { Sickness } from '@nsc/shared/src/types';
import { isNoSickness, isYesSickness } from '@nsc/shared/src/type-helpers';

interface SicknessInsuranceSelectorProps {
  sickness: Sickness;
  setSickness: Dispatch<Sickness>;
}

export const SicknessInsuranceSelector: React.FC<SicknessInsuranceSelectorProps> = ({
  sickness,
  setSickness,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textLabel}>Sickness Insurance</Text>
      <SelectorContainer width="100%">
        <SelectorOption
          active={isNoSickness(sickness)}
          text="No"
          onPress={() => setSickness(Sickness.No)}
          atLeftHandSide
        />
        <SelectorOption
          active={isYesSickness(sickness)}
          text="Yes"
          onPress={() => setSickness(Sickness.Yes)}
          atRightHandSide
        />
      </SelectorContainer>
    </View>
  );
};
