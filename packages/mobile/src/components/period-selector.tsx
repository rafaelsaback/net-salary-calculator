import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { styles } from './period-selector.style';
import { isAnnually, isMonthly, Period } from '../interfaces';

interface PeriodSelectorProps {
  period: Period;
}

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({ period }) => {
  const monthlyContainerStyle = getMonthlyContainerStyle(isMonthly(period));
  const monthlyTextStyle = getTextStyle(isMonthly(period));
  const annuallyContainerStyle = getAnnuallyContainerStyle(isAnnually(period));
  const annuallyTextStyle = getTextStyle(isAnnually(period));
  return (
    <View style={styles.container}>
      <View style={monthlyContainerStyle}>
        <Text style={monthlyTextStyle}>Monthly</Text>
      </View>
      <View style={annuallyContainerStyle}>
        <Text style={annuallyTextStyle}>Annually</Text>
      </View>
    </View>
  );
};

const getMonthlyContainerStyle = (active: boolean) =>
  StyleSheet.flatten([
    styles.selectorContainer,
    styles.monthlyContainer,
    active ? styles.activeContainer : {},
  ]);

const getAnnuallyContainerStyle = (active: boolean) =>
  StyleSheet.flatten([
    styles.selectorContainer,
    styles.annuallyContainer,
    active ? styles.activeContainer : {},
  ]);

const getTextStyle = (active: boolean) =>
  active ? StyleSheet.flatten([styles.text, styles.activeText]) : styles.text;
