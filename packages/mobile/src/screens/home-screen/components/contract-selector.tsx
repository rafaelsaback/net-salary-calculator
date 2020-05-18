import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { appTheme } from '../../../theme';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginHorizontal: 30,
    height: 100,
    marginVertical: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeText: {
    color: appTheme.primaryBlackColor,
    fontSize: 16,
  },
  activeImageContainer: {
    flex: 1,
    backgroundColor: '#E5F3FF',
    borderRadius: appTheme.borderRadius,
    ...appTheme.btnBackgroundShadow,
  },
  inactiveText: {
    color: appTheme.secondaryBlackColor,
    fontSize: 16,
  },
  inactiveImageContainer: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    borderRadius: appTheme.borderRadius,
    ...appTheme.btnBackgroundShadow,
  },
});

interface ContractSelector {
  textFirstLine: string;
  textSecondLine?: string;
  active?: boolean;
}

export const ContractSelector: React.FC<ContractSelector> = ({
  textFirstLine,
  textSecondLine,
  active,
}) => (
  <TouchableOpacity>
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={active ? styles.activeText : styles.inactiveText}>
          {textFirstLine}
        </Text>
        {textSecondLine && (
          <Text style={active ? styles.activeText : styles.inactiveText}>
            {textSecondLine}
          </Text>
        )}
      </View>
      <View
        style={
          active ? styles.activeImageContainer : styles.inactiveImageContainer
        }
      >
        <Text>Icon</Text>
      </View>
    </View>
  </TouchableOpacity>
);
