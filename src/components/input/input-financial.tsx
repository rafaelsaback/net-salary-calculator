import React, { FunctionComponent, ChangeEvent } from 'react';
import {
  TextField,
  makeStyles,
  FormControl,
  FormLabel,
} from '@material-ui/core';
import { BOLD_DARK_GRAY } from '../../helpers/consts';

interface InputSalaryProps {
  label: string;
  value: string;
  setValue(event: ChangeEvent<HTMLInputElement>): void;
  required: boolean;
}

const useStyles = makeStyles({
  root: {
    margin: '30px 0 0',
    '& label': { fontSize: '0.825rem', ...BOLD_DARK_GRAY },
    '&>div': { margin: '10px 0 0' },
    '& input': { textAlign: 'center' },
  },
});

const InputFinancial: FunctionComponent<InputSalaryProps> = ({
  label,
  value,
  setValue,
  required,
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
      <TextField
        value={value}
        placeholder={'0.00 PLN'}
        onChange={setValue}
        margin="normal"
        fullWidth
      />
    </FormControl>
  );
};

export default InputFinancial;
