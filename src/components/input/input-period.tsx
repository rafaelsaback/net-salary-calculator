import React, { FunctionComponent } from 'react';
import { FormControlLabel, Radio } from '@material-ui/core';
import InputRadio from './input-radio';

interface InputPeriodProps {
  period: string;
  setPeriod(value: string): void;
}

const InputPeriod: FunctionComponent<InputPeriodProps> = ({
  period,
  setPeriod,
}) => (
  <InputRadio
    required
    row
    name="period"
    label="Period"
    value={period}
    setFunction={setPeriod}
  >
    <FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
    <FormControlLabel value="yearly" control={<Radio />} label="Yearly" />
  </InputRadio>
);

export default InputPeriod;
