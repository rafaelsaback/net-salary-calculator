import React, { FunctionComponent, ChangeEvent } from 'react';
import { FormControlLabel, Radio } from '@material-ui/core';
import InputRadio from './input-radio';
import { Period } from '../../interfaces';

interface InputPeriodProps {
  period: string;
  setPeriod(event: ChangeEvent<HTMLInputElement>): void;
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
    setValue={setPeriod}
  >
    <FormControlLabel
      value={Period.Monthly}
      control={<Radio />}
      label="Monthly"
    />
    <FormControlLabel
      value={Period.Annually}
      control={<Radio />}
      label="Annualy"
    />
  </InputRadio>
);

export default InputPeriod;
