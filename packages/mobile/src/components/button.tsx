import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { appTheme, appThemeReactNavigation } from '../theme';

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 50,
    width: 250,
    backgroundColor: appThemeReactNavigation.colors.primary,
    borderRadius: appTheme.borderRadius,
    ...appTheme.btnBackgroundShadow,
  },
  buttonText: {
    color: 'white',
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
