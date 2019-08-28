import React, { FunctionComponent, useState, Dispatch } from 'react';
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
import { setNumberValue } from '../../helpers/utils';
import { setB2BParams } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { selectB2BParam } from '../../helpers/selectors';

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
});

const setCosts = (dispatch: Dispatch<any>) =>
  setNumberValue(dispatch, [setB2BParams], 'costs');

export const B2BMoreOptions: FunctionComponent = () => {
  const [tax, setTax] = useState('linear');
  const [zus, setZUS] = useState('no-zus');
  const [sickness, setSickness] = useState('no');
  const classes = useStyles({});
  const costs = useSelector(selectB2BParam('costs')) || '';
  const dispatch = useDispatch();

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
          value={costs.toString()}
          setValue={setCosts(dispatch)}
          required={false}
        />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
