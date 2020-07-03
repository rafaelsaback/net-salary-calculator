import React from 'react';
import { Share, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Entypo } from '@expo/vector-icons';
import { styles } from './salary-display.style';
import { appTheme } from '../../../../theme';
import { ContractType, Period } from '@nsc/shared/src/types';
import { removeSpaceSeparator } from '@nsc/shared/src/helpers';

interface SalaryDisplayProps {
  salary: string;
  takeHome: string;
  contract: ContractType;
  period: Period;
}
export const SalaryDisplay: React.FC<SalaryDisplayProps> = ({
  salary,
  takeHome,
  contract,
  period,
}) => {
  const shareSalary = async () => {
    const salaryPeriodStr =
      period === Period.Annually ? 'an annual' : 'a monthly';
    const contractStr =
      contract === ContractType.Employment ? 'an Employment' : 'a B2B';
    const salaryWithoutSpace = removeSpaceSeparator(salary);
    const takeHomeWithoutSpace = removeSpaceSeparator(takeHome);
    await Share.share({
      message:
        `Hey! I've just checked in the Salary Calculator for Poland app that ` +
        `${salaryPeriodStr} salary of PLN ${salaryWithoutSpace} in ${contractStr} ` +
        `contract results in a take home pay of PLN ${takeHomeWithoutSpace}. \n\n`,
      // `If you want to check it yourself, you can download the app using one ` +
      // `of the following links: \n\n` +
      // `LINK TO ANDROID\n\n` +
      // `LINK TO IOS`,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.salaryContainer}>
        <Text>
          <Text style={styles.value}>{takeHome} </Text>
          <Text style={styles.currency}>zł</Text>
        </Text>
      </View>
      <TouchableOpacity onPress={shareSalary}>
        <View style={styles.icon}>
          <Entypo
            size={EStyleSheet.value('30rem')}
            name="share"
            color={appTheme.primaryRedColor}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
