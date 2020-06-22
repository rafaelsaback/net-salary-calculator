import * as React from 'react';
import { Dispatch } from 'react';
import { Text, View } from 'react-native';
import { styles } from './zus-selector.style';
import { ZUS } from '@nsc/shared/src/types';
import { Selector } from '../../../../components/selector/selector';
import { Strong } from '../../../../components/strong/strong';
import { HelpPopover } from '../help-popover/help-popover';

interface ZusSelectorProps {
  zus: ZUS;
  setZus: Dispatch<any>;
}

export const ZusSelector: React.FC<ZusSelectorProps> = ({ zus, setZus }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textLabelContainer}>
        <Text style={styles.textLabel}>ZUS</Text>
        <HelpPopover
          tooltipContent={
            <View>
              <Text style={styles.textMarginBottom}>
                <Strong>No ZUS</Strong> - In the first 6 months of your company,
                you&apos;re free from paying ZUS contributions
              </Text>
              <Text style={styles.textMarginBottom}>
                <Strong>Discounted ZUS</Strong> - For the next 2 years,
                you&apos;ll pay discounted values
              </Text>
              <Text>
                <Strong>Normal ZUS</Strong> - After 2 years and a half, you pay
                the normal ZUS contributions
              </Text>
            </View>
          }
        />
      </View>
      <Selector
        value={zus}
        options={[ZUS.No, ZUS.Discounted, ZUS.Normal]}
        onChange={setZus}
        width="100%"
      />
    </View>
  );
};
