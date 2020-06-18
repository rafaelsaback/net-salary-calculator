import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from './selector-option.style';

interface SelectorOptionProps {
  text: string;
  active: boolean;
  onPress(): void;
  containerWidth?: number;
  fontSize?: number;
}

export const SelectorOption: React.FC<SelectorOptionProps> = ({
  text,
  active,
  onPress,
  fontSize,
}) => {
  const containerStyle = [
    styles.selectorContainer,
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
