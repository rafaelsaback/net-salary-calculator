import * as React from 'react';
import { Dispatch } from 'react';
import { SelectorContainer } from './selector-container';
import { SelectorOption } from './selector-option';

interface SelectorProps {
  value: string;
  options: string[];
  onChange: Dispatch<any>;
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
  onChange: onChange,
}) => {
  return (
    <SelectorContainer width={width} height={height}>
      {options.map((option, index) => (
        <SelectorOption
          key={option}
          text={option}
          active={value === option}
          onPress={() => onChange(option)}
          atLeftHandSide={index === 0}
          atRightHandSide={index === options.length - 1}
          fontSize={Array.isArray(fontSize) ? fontSize[index] : fontSize}
        />
      ))}
    </SelectorContainer>
  );
};
