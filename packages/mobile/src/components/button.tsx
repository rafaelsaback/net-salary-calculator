import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { styles } from './button.style';

export enum ButtonSize {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}

interface ButtonProps {
  size: ButtonSize;
  onPress(): void;
}

export const Button: React.FC<ButtonProps> = ({ onPress, size }) => {
  const buttonStyle = EStyleSheet.flatten([
    styles.button,
    size === ButtonSize.Small && {},
    size === ButtonSize.Medium && {},
    size === ButtonSize.Large && styles.largeButton,
  ]);
  const textStyle = EStyleSheet.flatten([
    styles.text,
    size === ButtonSize.Small && {},
    size === ButtonSize.Medium && {},
    size === ButtonSize.Large && styles.largeText,
  ]);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={buttonStyle}>
        <Text style={textStyle}>Calculate</Text>
      </View>
    </TouchableOpacity>
  );
};
