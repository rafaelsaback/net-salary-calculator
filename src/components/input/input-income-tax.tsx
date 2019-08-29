import React, { FunctionComponent, ChangeEvent } from 'react';
import { FormControlLabel, Radio } from '@material-ui/core';
import InputRadio from './input-radio';
import { B2BTax } from '../../interfaces';

interface InputIncomeTaxProps {
  tax: string;
  setTax(event: ChangeEvent<HTMLInputElement>): void;
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
    setValue={setTax}
  >
    <FormControlLabel value={B2BTax.Linear} control={<Radio />} label="19%" />
    <FormControlLabel
      value={B2BTax.Progressive}
      control={<Radio />}
      label="18% / 32%"
    />
  </InputRadio>
);

export default InputIncomeTax;
