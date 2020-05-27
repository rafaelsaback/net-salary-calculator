import * as React from 'react';
import { Dispatch } from 'react';
import { SelectorContainer } from './selector-container';
import { SelectorOption } from './selector-option';

interface SelectorProps {
  value: string;
  options: string[];
  onChange: Dispatch<string>;
  width?: string;
  fontSize?: number | number[];
}

export const Selector: React.FC<SelectorProps> = ({
  value,
  options,
  width,
  fontSize,
  onChange: onChange,
}) => {
  return (
    <SelectorContainer width={width}>
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
