import { ContractSelector } from '../../components/contract-selector';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginHorizontal: 30,
  },
});

export const HomeScreen: React.FC = () => (
  <>
    <View style={styles.container}>
      <Text>Gross Salary</Text>
      <Text>Salary Input</Text>
      <Text>Period Selector</Text>
      <ContractSelector />
      <Button
        onPress={() => {
          return;
        }}
      />
    </View>
  </>
);
