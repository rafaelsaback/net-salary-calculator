import React from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Entypo } from '@expo/vector-icons';
import { styles } from './salary-display.style';
import { appTheme } from '../../../../theme';

interface SalaryDisplayProps {
  salary: string;
}
export const SalaryDisplay: React.FC<SalaryDisplayProps> = ({ salary }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.currency}>PLN</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{salary}</Text>
      </View>
      <View style={styles.icon}>
        <Entypo
          size={EStyleSheet.value('22rem')}
          name="share"
          color={appTheme.primaryRedColor}
        />
      </View>
    </View>
  );
};
