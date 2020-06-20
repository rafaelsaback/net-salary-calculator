import * as React from 'react';
import { Dispatch } from 'react';
import { Text, View } from 'react-native';
import { styles } from './zus-selector.style';
import { ZUS } from '@nsc/shared/src/types';
import { Selector } from '../../../../components/selector/selector';

interface ZusSelectorProps {
  zus: ZUS;
  setZus: Dispatch<any>;
}

export const ZusSelector: React.FC<ZusSelectorProps> = ({ zus, setZus }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textLabel}>ZUS</Text>
      <Selector
        value={zus}
        options={[ZUS.No, ZUS.Discounted, ZUS.Normal]}
        onChange={setZus}
        width="100%"
      />
    </View>
  );
};
