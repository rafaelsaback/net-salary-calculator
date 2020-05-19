import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { appTheme, appThemeReactNavigation } from '../theme';
import { scale } from '../utils';

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: scale(40),
    width: '50%',
    maxWidth: 250,
    backgroundColor: appThemeReactNavigation.colors.primary,
    borderRadius: appTheme.borderRadius,
    ...appTheme.btnBackgroundShadow,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: scale(22),
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
