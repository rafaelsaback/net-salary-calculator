import React, { FunctionComponent } from 'react';
import { FormControlLabel, Radio } from '@material-ui/core';
import InputRadio from './input-radio';

interface InputIncomeTaxProps {
  tax: string;
  setTax(value: string): void;
}

const InputIncomeTax: FunctionComponent<InputIncomeTaxProps> = ({
  tax,
  setTax,
}) => (
  <InputRadio
    required
    row
    name="tax"
    label="Income tax"
    value={tax}
    setFunction={setTax}
  >
    <FormControlLabel value="linear" control={<Radio />} label="19%" />
    <FormControlLabel
      value="progressive"
      control={<Radio />}
      label="18% / 32%"
    />
  </InputRadio>
);

export default InputIncomeTax;
