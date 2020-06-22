import * as React from 'react';
import { Dispatch } from 'react';
import { Text, View } from 'react-native';
import { styles } from './sickness-insurance-selector.style';
import { Sickness } from '@nsc/shared/src/types';
import { Selector } from '../../../../components/selector/selector';
import { HelpPopover } from '../help-popover/help-popover';

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
      <View style={styles.textLabelContainer}>
        <Text style={styles.textLabel}>Sickness Insurance</Text>
        <HelpPopover
          tooltipContent={<Text>The sickness insurance is optional</Text>}
        />
      </View>
      <Selector
        value={sickness}
        options={[Sickness.No, Sickness.Yes]}
        onChange={setSickness}
        width="66%"
      />
    </View>
  );
};
