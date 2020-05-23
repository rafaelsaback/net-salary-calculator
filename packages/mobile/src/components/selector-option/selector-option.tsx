import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { styles } from './selector-option.style';

interface SelectorOptionProps {
  text: string;
  active: boolean;
  onPress(): void;
  atLeftHandSide?: boolean;
  atRightHandSide?: boolean;
}

export const SelectorOption: React.FC<SelectorOptionProps> = ({
  text,
  active,
  onPress,
  atLeftHandSide = false,
  atRightHandSide = false,
}) => {
  const containerStyle = StyleSheet.flatten([
    styles.selectorContainer,
    atLeftHandSide ? styles.leftBorderRadius : {},
    atRightHandSide ? styles.rightBorderRadius : {},
    active ? styles.activeContainer : {},
  ]);

  const textStyle = active
    ? StyleSheet.flatten([styles.text, styles.activeText])
    : styles.text;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={containerStyle}>
        <Text style={textStyle}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
