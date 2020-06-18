import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { styles } from './button.style';
import isString from 'lodash-es/isString';

export enum ButtonSize {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}

interface ButtonProps {
  type?: 'primary' | 'secondary';
  size?: ButtonSize;
  style?: EStyleSheet.AnyStyle;
  textStyle?: EStyleSheet.AnyStyle;
  disabled?: boolean;
  onPress(): void;
}

export const Button: React.FC<ButtonProps> = ({
  type = 'primary',
  size,
  style = {},
  textStyle = {},
  disabled,
  onPress,
  children,
}) => {
  const flattenedStyle = EStyleSheet.flatten([
    styles.button,
    type === 'primary' && styles.primaryButton,
    size === ButtonSize.Small && styles.smallButton,
    size === ButtonSize.Medium && styles.mediumButton,
    size === ButtonSize.Large && styles.largeButton,
    style,
  ]);
  const flattenedTextStyle = EStyleSheet.flatten([
    styles.text,
    type === 'primary' && styles.primaryText,
    type === 'secondary' && styles.secondaryText,
    size === ButtonSize.Small && styles.smallText,
    size === ButtonSize.Medium && styles.mediumText,
    size === ButtonSize.Large && styles.largeText,
    textStyle,
  ]);
  return (
    <TouchableOpacity
      disabled={disabled}
      style={flattenedStyle}
      onPress={onPress}
    >
      {isString(children) ? (
        <Text style={flattenedTextStyle}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};
