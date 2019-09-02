import React, { FunctionComponent, ChangeEvent } from 'react';
import { BOLD_DARK_GRAY } from '../../helpers/consts';
import Helptip from '../help-tip';
import makeStyles from '@material-ui/styles/makeStyles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

interface InputSalaryProps {
  label: string;
  value: string;
  setValue(event: ChangeEvent<HTMLInputElement>): void;
  helptipMsg?: React.ReactNode;
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
  helptipMsg,
}) => {
  const classes = useStyles({});

  return (
    <FormControl className={classes.root} component="fieldset" fullWidth>
      <FormLabel component="label">
        {label}
        {helptipMsg && <Helptip title={helptipMsg} />}
      </FormLabel>
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
