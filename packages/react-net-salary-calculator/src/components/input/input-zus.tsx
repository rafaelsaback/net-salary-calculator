import React, { FunctionComponent } from 'react';
import { FormControlLabel, Radio } from '@material-ui/core';
import InputRadio from './input-radio';

interface InputZUSProps {
  zus: string;
  setZUS(value: string): void;
}

const InputZUS: FunctionComponent<InputZUSProps> = ({ zus, setZUS }) => (
  <InputRadio required name="zus" label="ZUS" value={zus} setFunction={setZUS}>
    <FormControlLabel value="no-zus" control={<Radio />} label="No ZUS" />
    <FormControlLabel
      value="discounted-zus"
      control={<Radio />}
      label="Discounter ZUS"
    />
    <FormControlLabel
      value="normal-zus"
      control={<Radio />}
      label="Normal ZUS"
    />
  </InputRadio>
);

export default InputZUS;
