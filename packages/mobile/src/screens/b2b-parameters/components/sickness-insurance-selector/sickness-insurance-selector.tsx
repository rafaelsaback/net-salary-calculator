import * as React from 'react';
import { Dispatch } from 'react';
import { Text, View } from 'react-native';
import { styles } from './sickness-insurance-selector.style';
import { Sickness } from '@nsc/shared/src/types';
import { Selector } from '../../../../components/selector/selector';

interface SicknessInsuranceSelectorProps {
  sickness: Sickness;
  setSickness: Dispatch<any>;
}

export const SicknessInsuranceSelector: React.FC<SicknessInsuranceSelectorProps> = ({
  sickness,
  setSickness,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textLabel}>Sickness Insurance</Text>
      <Selector
        value={sickness}
        options={[Sickness.No, Sickness.Yes]}
        onChange={setSickness}
        width="100%"
        height="45rem"
      />
    </View>
  );
};
