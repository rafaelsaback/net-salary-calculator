import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { appTheme } from '../theme';

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 250,
    backgroundColor: appTheme.colors.primary,
    justifyContent: 'center',
    borderRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
  },
});

interface ButtonProps {
  onPress(): void;
}

export const Button: React.FC<ButtonProps> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.button}>
      <Text style={styles.buttonText}>Calculate</Text>
    </View>
  </TouchableOpacity>
);
