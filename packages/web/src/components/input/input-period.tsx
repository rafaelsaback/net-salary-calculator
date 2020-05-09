import React, { FunctionComponent, ChangeEvent } from 'react';
import InputRadio from './input-radio';
import { Period } from '../../interfaces';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

interface InputPeriodProps {
  period: string;
  setPeriod(event: ChangeEvent<HTMLInputElement>): void;
}

const InputPeriod: FunctionComponent<InputPeriodProps> = ({
  period,
  setPeriod,
}) => (
  <InputRadio
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
