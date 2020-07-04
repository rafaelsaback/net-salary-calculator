import React from 'react';
import { Share, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Entypo } from '@expo/vector-icons';
import { styles } from './salary-display.style';
import { appTheme } from '../../../../theme';
import { ContractType } from '@nsc/shared/src/types';
import { removeSpaceSeparator } from '@nsc/shared/src/helpers';
import { Container } from '../../../../components/containers/container';
import { ResultPeriod } from '../../../detailed-results/detailed-results-screen';

interface SalaryDisplayProps {
  salary: string;
  takeHome: string;
  title: string;
  contract: ContractType;
  period: ResultPeriod;
}

const ResultPeriodMap = {
  [ResultPeriod.Monthly]: ' (1st month)',
  [ResultPeriod.MonthlyAverage]: ' (12-month average)',
  [ResultPeriod.Annually]: '',
};

export const SalaryDisplay: React.FC<SalaryDisplayProps> = ({
  salary,
  takeHome,
  title,
  contract,
  period,
}) => {
  const shareSalary = async () => {
    const salaryPeriodStr =
      period === ResultPeriod.Annually ? 'an annual' : 'a monthly';
    const contractStr =
      contract === ContractType.Employment ? 'an Employment' : 'a B2B';
    const salaryWithoutSpace = removeSpaceSeparator(salary);
    const takeHomeWithoutSpace = removeSpaceSeparator(takeHome);
    await Share.share({
      message:
        `Hey! I've just checked that ${salaryPeriodStr} salary of PLN ` +
        `${salaryWithoutSpace} in ${contractStr} contract results in a take ` +
        `home pay of PLN ${takeHomeWithoutSpace}${ResultPeriodMap[period]}.\n\n` +
        `Calculated with the Salary Calculator for Poland app.`,
      // `If you want to check it yourself, you can download the app using one ` +
      // `of the following links: \n\n` +
      // `LINK TO ANDROID\n\n` +
      // `LINK TO IOS`,
    });
  };

  return (
    <Container style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={shareSalary}>
          <View style={styles.icon}>
            <Entypo
              size={EStyleSheet.value('20rem')}
              name="share"
              color={appTheme.primaryRedColor}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.salaryContainer}>
        <Text>
          <Text style={styles.value}>{takeHome} </Text>
          <Text style={styles.currency}>zł</Text>
        </Text>
      </View>
    </Container>
  );
};
