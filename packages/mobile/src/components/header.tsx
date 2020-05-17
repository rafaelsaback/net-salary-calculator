import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackHeaderProps } from '@react-navigation/stack';

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
});

export const Header: React.FC = () => (
  <View style={styles.header}>
    <Text>Header</Text>
  </View>
);

export const ReactNavHeader: React.FC<StackHeaderProps> = () => <Header />;
