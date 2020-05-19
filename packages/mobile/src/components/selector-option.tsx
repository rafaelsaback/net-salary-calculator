import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { styles } from './selector-option.style';

export enum SelectorPosition {
  Left = 'Left',
  Middle = 'Middle',
  Right = 'Right',
}

interface SelectorOptionProps {
  text: string;
  active: boolean;
  onPress(): void;
  position: SelectorPosition;
}

export const SelectorOption: React.FC<SelectorOptionProps> = ({
  text,
  active,
  onPress,
  position,
}) => {
  const containerStyle = StyleSheet.flatten([
    styles.selectorContainer,
    position === SelectorPosition.Left ? styles.leftContainer : {},
    position === SelectorPosition.Middle ? styles.middleContainer : {},
    position === SelectorPosition.Right ? styles.rightContainer : {},
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
