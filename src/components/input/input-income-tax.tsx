import React, { FunctionComponent, ChangeEvent } from 'react';
import { FormControlLabel, Radio } from '@material-ui/core';
import InputRadio from './input-radio';
import { B2BTax } from '../../interfaces';

interface InputIncomeTaxProps {
  taxType: string;
  setTaxType(event: ChangeEvent<HTMLInputElement>): void;
}

const InputIncomeTax: FunctionComponent<InputIncomeTaxProps> = ({
  taxType,
  setTaxType,
}) => (
  <InputRadio
    required
    row
    name="tax"
    label="Income tax"
    value={taxType}
    setValue={setTaxType}
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
