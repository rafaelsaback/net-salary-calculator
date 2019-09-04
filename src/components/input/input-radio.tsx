import React, { FunctionComponent, ChangeEvent } from 'react';
import { BOLD_DARK_GRAY, darkGray } from '../../helpers/consts';
import Helptip from './help-tip';
import makeStyles from '@material-ui/styles/makeStyles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';

interface InputRadioProps {
  name: string;
  label: string;
  value: string;
  setValue(event: ChangeEvent<HTMLInputElement>): void;
  helptipMsg?: React.ReactNode;
  row?: boolean;
  required?: boolean;
}

const useStyles = makeStyles({
  root: {
    '&:not(:first-child)': {
      margin: '30px 0 0',
    },
    '& label': { fontSize: '0.825rem', ...BOLD_DARK_GRAY },
    '& .MuiFormControlLabel-label': { color: darkGray },
  },
});

const InputRadio: FunctionComponent<InputRadioProps> = ({
  name,
  label,
  value,
  setValue,
  helptipMsg,
  row = false,
  children,
}) => {
  const classes = useStyles({});

  return (
    <FormControl className={classes.root} component="fieldset" fullWidth>
      <FormLabel component="label">
        {label}
        {helptipMsg && <Helptip title={helptipMsg} />}
      </FormLabel>
      <RadioGroup
        aria-label="period"
        name={name}
        value={value}
        onChange={setValue}
        row={row}
      >
        {children}
      </RadioGroup>
    </FormControl>
  );
};

export default InputRadio;
