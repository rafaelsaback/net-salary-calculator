import React, { FunctionComponent, ChangeEvent } from 'react';
import InputRadio from './input-radio';
import { Sickness } from '../../interfaces';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

interface InputSicknessProps {
  sickness: string;
  setSickness(event: ChangeEvent<HTMLInputElement>): void;
}

const sicknessHelptip = <p> The sickness insurance is optional </p>;

const InputSickness: FunctionComponent<InputSicknessProps> = ({
  sickness,
  setSickness,
}) => (
  <InputRadio
    row
    name="sickness"
    label="Sickness insurance"
    value={sickness}
    setValue={setSickness}
    helptipMsg={sicknessHelptip}
  >
    <FormControlLabel value={Sickness.No} control={<Radio />} label="No" />
    <FormControlLabel value={Sickness.Yes} control={<Radio />} label="Yes" />
  </InputRadio>
);

export default InputSickness;
