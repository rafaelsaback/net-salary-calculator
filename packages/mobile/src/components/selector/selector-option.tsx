import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from './selector-option.style';

interface SelectorOptionProps {
  text: string;
  active: boolean;
  onPress(): void;
  atLeftHandSide?: boolean;
  atRightHandSide?: boolean;
  containerWidth?: number;
  fontSize?: number;
}

export const SelectorOption: React.FC<SelectorOptionProps> = ({
  text,
  active,
  onPress,
  atLeftHandSide = false,
  atRightHandSide = false,
  fontSize,
}) => {
  const containerStyle = [
    styles.selectorContainer,
    atLeftHandSide ? styles.leftBorderRadius : {},
    atRightHandSide ? styles.rightBorderRadius : {},
    active ? styles.activeContainer : {},
  ];

  const textStyle = [
    styles.text,
    active ? styles.activeText : {},
    fontSize ? { fontSize } : {},
  ];
  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};
