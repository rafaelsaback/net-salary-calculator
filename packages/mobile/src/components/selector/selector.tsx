import * as React from 'react';
import { Dispatch } from 'react';
import { SelectorContainer } from './selector-container';
import { SelectorOption } from './selector-option';
import { StyleProp, ViewStyle } from 'react-native';

interface SelectorProps {
  value: string;
  options: string[];
  onChange: Dispatch<any>;
  containerStyle?: StyleProp<ViewStyle>;
  width?: string;
  height?: string;
  fontSize?: number | number[];
}

export const Selector: React.FC<SelectorProps> = ({
  value,
  options,
  width,
  height,
  fontSize,
  containerStyle,
  onChange: onChange,
}) => {
  return (
    <SelectorContainer width={width} height={height} style={containerStyle}>
      {options.map((option, index) => (
        <SelectorOption
          key={option}
          text={option}
          active={value === option}
          onPress={() => onChange(option)}
          fontSize={Array.isArray(fontSize) ? fontSize[index] : fontSize}
        />
      ))}
    </SelectorContainer>
  );
};
