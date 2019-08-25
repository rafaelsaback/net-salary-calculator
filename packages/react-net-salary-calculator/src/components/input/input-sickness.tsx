import React, { FunctionComponent } from 'react';
import { FormControlLabel, Radio } from '@material-ui/core';
import InputRadio from './input-radio';

interface InputSicknessProps {
  sickness: string;
  setSickness(value: string): void;
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
    setFunction={setSickness}
  >
    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
    <FormControlLabel value="no" control={<Radio />} label="No" />
  </InputRadio>
);

export default InputSickness;
