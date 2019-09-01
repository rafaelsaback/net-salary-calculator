import React, { FunctionComponent } from 'react';
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
import { useTaxType, useZUS, useSickness, useCosts } from '../../helpers/hooks';
import { B2BTax, ZUS, Sickness } from '../../interfaces';
import { darkGray } from '../../helpers/consts';

const useStyles = makeStyles({
  root: {
    marginTop: 10,
    color: darkGray,
  },
});

export const B2BMoreOptions: FunctionComponent = () => {
  const [taxType, setTaxType] = useTaxType(B2BTax.Linear);
  const [zus, setZUS] = useZUS(ZUS.No);
  const [sickness, setSickness] = useSickness(Sickness.No);
  const [costs, setCosts] = useCosts('');

  const classes = useStyles({});

  return (
    <ExpansionPanel className={classes.root}>
      <ExpansionPanelSummary expandIcon={<ExpandMore />} id="panel1a-header">
        <Typography>More options</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
        <InputIncomeTax taxType={taxType} setTaxType={setTaxType} />
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
