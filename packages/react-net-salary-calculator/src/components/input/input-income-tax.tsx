import React, { FunctionComponent, ChangeEvent } from 'react';
import { FormControlLabel, Radio } from '@material-ui/core';
import InputRadio from './input-radio';
import { B2BTax } from '../../interfaces';

interface InputIncomeTaxProps {
  taxType: string;
  setTaxType(event: ChangeEvent<HTMLInputElement>): void;
}

const TaxHelptip = (
  <div>
    <p>
      <strong> 19% </strong> - Linear tax rate{' '}
    </p>
    <p>
      <strong> 18% / 32 % </strong> - Progressive tax rate
    </p>
  </div>
);

const InputIncomeTax: FunctionComponent<InputIncomeTaxProps> = ({
  taxType,
  setTaxType,
}) => (
  <InputRadio
    row
    name="tax"
    label="Income tax"
    value={taxType}
    setValue={setTaxType}
    helptipMsg={TaxHelptip}
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
