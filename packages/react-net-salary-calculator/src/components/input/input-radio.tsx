import React, { FunctionComponent } from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  makeStyles,
} from '@material-ui/core';
import { handleChange } from '../../helpers/utils';
import { BOLD_BLACK } from '../../helpers/consts';

interface InputRadioProps {
  name: string;
  label: string;
  value: string;
  setFunction(value: string): void;
  row?: boolean;
  required?: boolean;
}

const useStyles = makeStyles({
  root: {
    '&:not(:first-child)': {
      margin: '30px 0 0',
    },
    '& label': BOLD_BLACK,
  },
});

const InputRadio: FunctionComponent<InputRadioProps> = ({
  name,
  label,
  value,
  setFunction,
  row = false,
  required = false,
  children,
}) => {
  const classes = useStyles({});

  return (
    <FormControl
      className={classes.root}
      required={required}
      component="fieldset"
      fullWidth
    >
      <FormLabel component="label">{label}</FormLabel>
      <RadioGroup
        aria-label="period"
        name={name}
        value={value}
        onChange={handleChange(setFunction)}
        row={row}
      >
        {children}
      </RadioGroup>
    </FormControl>
  );
};

export default InputRadio;
