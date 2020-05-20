import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { appTheme, appThemeReactNavigation } from '../theme';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: '44rem',
    width: '50%',
    backgroundColor: appThemeReactNavigation.colors.primary,
    borderRadius: appTheme.borderRadius,
    ...appTheme.btnBackgroundShadow,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '24rem',
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
