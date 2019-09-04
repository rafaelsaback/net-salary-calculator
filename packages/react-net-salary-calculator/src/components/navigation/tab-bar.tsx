import React, { FunctionComponent, ChangeEvent } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  selectUOPSalaryResult,
  selectB2BSalaryResult,
} from '../../helpers/selectors';
import { useSelector } from 'react-redux';
import { List } from 'immutable';
import { formatNumber } from '../../helpers/utils';
import makeStyles from '@material-ui/styles/makeStyles';

interface AppTabsProps {
  value: any;
  setCurrentTab(value: any): void;
}
const useStyles = makeStyles({
  tabLabel: { fontSize: '12px' },
  tabSalary: { fontSize: '10px' },
});

const createLabel = (label: string, salary: number, classes: any) =>
  salary ? (
    <div>
      <div className={classes.tabLabel}>{label}</div>
      <div className={classes.tabSalary}>{formatNumber(salary)} PLN</div>
    </div>
  ) : (
    <div className={classes.tabLabel}>{label}</div>
  );

const uopLabel = 'Umowa o pracę';
const b2bLabel = 'B2B contract';

const TabBar: FunctionComponent<AppTabsProps> = ({ value, setCurrentTab }) => {
  const classes = useStyles({});
  const handleTabChange = (event: ChangeEvent, value: any) =>
    setCurrentTab(value);

  const uopEndSalary = (useSelector(selectUOPSalaryResult('endSalary')) as List<
    number
  >).get(0);
  const b2bEndSalary = (useSelector(selectB2BSalaryResult('endSalary')) as List<
    number
  >).get(0);

  return (
    <Tabs
      value={value}
      onChange={handleTabChange}
      indicatorColor="primary"
      textColor="primary"
      variant="standard"
    >
      <Tab disableRipple label={createLabel(uopLabel, uopEndSalary, classes)} />
      <Tab disableRipple label={createLabel(b2bLabel, b2bEndSalary, classes)} />
    </Tabs>
  );
};

export default TabBar;
