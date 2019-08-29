import React, { FunctionComponent, ChangeEvent } from 'react';
import { FormControlLabel, Radio } from '@material-ui/core';
import InputRadio from './input-radio';
import { ZUS } from '../../interfaces';

interface InputZUSProps {
  zus: string;
  setZUS(event: ChangeEvent<HTMLInputElement>): void;
}

const InputZUS: FunctionComponent<InputZUSProps> = ({ zus, setZUS }) => (
  <InputRadio required name="zus" label="ZUS" value={zus} setValue={setZUS}>
    <FormControlLabel value={ZUS.No} control={<Radio />} label="No ZUS" />
    <FormControlLabel
      value={ZUS.Discounted}
      control={<Radio />}
      label="Discounted ZUS"
    />
    <FormControlLabel
      value={ZUS.Normal}
      control={<Radio />}
      label="Normal ZUS"
    />
  </InputRadio>
);

export default InputZUS;
