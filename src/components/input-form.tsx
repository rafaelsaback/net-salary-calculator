import React, { FunctionComponent, useState } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import B2BForm from './b2b-form';
import TabBar from './tab-bar';
import TabPanel from './tab-panel';
import UOPForm from './uop-form';

const useStyles = makeStyles({
  root: {
    borderRadius: '0.5rem',
    padding: '1rem',
    margin: '20px auto 20px auto',
    boxShadow:
      '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
  },
});

const InputForm: FunctionComponent = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [salary, setSalary] = useState('');
  const [period, setPeriod] = useState('monthly');
  const classes = useStyles({});

  return (
    <Container className={classes.root} maxWidth="xs">
      <TabBar value={currentTab} setCurrentTab={setCurrentTab} />
      <TabPanel value={currentTab} index={0}>
        <UOPForm
          salary={salary}
          setSalary={setSalary}
          period={period}
          setPeriod={setPeriod}
        />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <B2BForm
          salary={salary}
          setSalary={setSalary}
          period={period}
          setPeriod={setPeriod}
        />
      </TabPanel>
    </Container>
  );
};

export default InputForm;
