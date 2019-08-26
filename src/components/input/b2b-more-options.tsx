import React, { FunctionComponent, useState } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  makeStyles,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import InputIncomeTax from './input-income-tax';
import InputZUS from './input-zus';
import InputSickness from './input-sickness';
import InputFinancial from './input-financial';

interface B2BMoreOptionsProps {}

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
});

export const B2BMoreOptions: FunctionComponent<B2BMoreOptionsProps> = () => {
  const [tax, setTax] = useState('linear');
  const [zus, setZUS] = useState('no-zus');
  const [sickness, setSickness] = useState('no');
  const [costs, setCosts] = useState('');
  const classes = useStyles({});

  return (
    <ExpansionPanel className={classes.root}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>More options</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
        <InputIncomeTax tax={tax} setTax={setTax} />
        <InputZUS zus={zus} setZUS={setZUS} />
        <InputSickness sickness={sickness} setSickness={setSickness} />
        <InputFinancial
          label="Deductible costs"
          value={costs}
          setValue={setCosts}
          required={false}
        />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
