import React from 'react';
import { View, Text } from 'react-native';
import { StackHeaderProps } from '@react-navigation/stack';
import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../theme';

const styles = EStyleSheet.create({
  header: {
    backgroundColor: 'white',
    height: '60rem',
    justifyContent: 'center',
    alignItems: 'center',
    ...appTheme.btnBackgroundShadow,
  },
});

export const Header: React.FC = () => (
  <View style={styles.header}>
    <Text>Header</Text>
  </View>
);

export const ReactNavHeader: React.FC<StackHeaderProps> = () => <Header />;
