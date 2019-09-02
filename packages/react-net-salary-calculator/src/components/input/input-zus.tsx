import React, { FunctionComponent, ChangeEvent } from 'react';
import { FormControlLabel, Radio } from '@material-ui/core';
import InputRadio from './input-radio';
import { ZUS } from '../../interfaces';

interface InputZUSProps {
  zus: string;
  setZUS(event: ChangeEvent<HTMLInputElement>): void;
}

const zusHelptip = (
  <div>
    <p>
      <strong> No ZUS </strong> - In the first 6 months of your company,
      you&apos;re free from paying ZUS contributions
    </p>
    <p>
      <strong> Discounted ZUS </strong> - After the first 6 months and until
      your company completes 2 years, you&apos;ll pay discounted values
    </p>
    <p>
      <strong> Normal ZUS </strong> - After 2 years you pay the normal ZUS
      contributions
    </p>
  </div>
);

const InputZUS: FunctionComponent<InputZUSProps> = ({ zus, setZUS }) => (
  <InputRadio
    name="zus"
    label="ZUS"
    value={zus}
    setValue={setZUS}
    helptipMsg={zusHelptip}
  >
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
