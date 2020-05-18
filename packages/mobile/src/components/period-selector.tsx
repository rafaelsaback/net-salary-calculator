import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { appTheme } from '../theme';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    maxWidth: 250,
    borderRadius: appTheme.borderRadius,
  },
  monthlyContainer: {
    flex: 1,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: appTheme.secondaryBlackColor,
    borderTopLeftRadius: appTheme.borderRadius,
    borderBottomLeftRadius: appTheme.borderRadius,
  },
  monthlyText: {
    fontSize: 18,
    color: appTheme.secondaryBlackColor,
  },
  annuallyContainer: {
    flex: 1,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: appTheme.primaryRedColor,
    borderTopRightRadius: appTheme.borderRadius,
    borderBottomRightRadius: appTheme.borderRadius,
    backgroundColor: 'rgba(220, 20, 60, 0.1)',
  },
  annuallyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: appTheme.primaryRedColor,
  },
});

export const PeriodSelector: React.FC = () => (
  <View style={styles.container}>
    <View style={styles.monthlyContainer}>
      <Text style={styles.monthlyText}>Monthly</Text>
    </View>
    <View style={styles.annuallyContainer}>
      <Text style={styles.annuallyText}>Annually</Text>
    </View>
  </View>
);