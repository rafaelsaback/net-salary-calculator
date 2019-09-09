import React, { FunctionComponent } from 'react';
import ExpandMore from '@material-ui/icons/ExpandMore';
import InputIncomeTax from './input-income-tax';
import InputZUS from './input-zus';
import InputSickness from './input-sickness';
import InputFinancial from './input-financial';
import { useTaxType, useZUS, useSickness, useCosts } from '../../helpers/hooks';
import { B2BTax, ZUS, Sickness } from '../../interfaces';
import { darkGray } from '../../helpers/consts';
import makeStyles from '@material-ui/styles/makeStyles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

const useStyles = makeStyles({
  root: {
    margin: 10,
    color: darkGray,
  },
  panelSummary: {
    marginBottom: 10,
  },
});

const costHelptip = (
  <p>Costs for running the business that can be used to deduct from the tax </p>
);

export const B2BMoreOptions: FunctionComponent = () => {
  const [taxType, setTaxType] = useTaxType(B2BTax.Linear);
  const [zus, setZUS] = useZUS(ZUS.No);
  const [sickness, setSickness] = useSickness(Sickness.No);
  const [costs, setCosts] = useCosts('');

  const classes = useStyles({});

  return (
    <ExpansionPanel className={classes.root}>
      <ExpansionPanelSummary
        className={classes.panelSummary}
        expandIcon={<ExpandMore />}
        id="panel1a-header"
      >
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
          helptipMsg={costHelptip}
        />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
