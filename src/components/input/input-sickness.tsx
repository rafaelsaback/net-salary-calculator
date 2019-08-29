import React, { FunctionComponent, ChangeEvent } from 'react';
import { FormControlLabel, Radio } from '@material-ui/core';
import InputRadio from './input-radio';
import { Sickness } from '../../interfaces';

interface InputSicknessProps {
  sickness: string;
  setSickness(event: ChangeEvent<HTMLInputElement>): void;
}

const InputSickness: FunctionComponent<InputSicknessProps> = ({
  sickness,
  setSickness,
}) => (
  <InputRadio
    required
    row
    name="sickness"
    label="Sickness insurance"
    value={sickness}
    setValue={setSickness}
  >
    <FormControlLabel value={Sickness.No} control={<Radio />} label="No" />
    <FormControlLabel value={Sickness.Yes} control={<Radio />} label="Yes" />
  </InputRadio>
);

export default InputSickness;
