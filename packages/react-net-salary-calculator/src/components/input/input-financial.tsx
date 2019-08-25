import React, { FunctionComponent } from 'react';
import {
  TextField,
  makeStyles,
  FormControl,
  FormLabel,
} from '@material-ui/core';
import { handleChange } from '../../utils';
import { LABEL_STYLE } from '../../consts';

interface InputSalaryProps {
  label: string;
  value: string;
  setValue(value: string): void;
  required: boolean;
}

const useStyles = makeStyles({
  root: {
    margin: '30px 0 0',
    '&  label': LABEL_STYLE,
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
        // label={label}
        value={value}
        placeholder={'0.00 PLN'}
        onChange={handleChange(setValue)}
        margin="normal"
        fullWidth
        // variant="outlined"
      />
    </FormControl>
  );
};

export default InputFinancial;
