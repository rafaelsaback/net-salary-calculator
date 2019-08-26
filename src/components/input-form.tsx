import React, { FunctionComponent, useState } from 'react';
import { Container, makeStyles, Button } from '@material-ui/core';
import B2BForm from './input/b2b-form';
import TabBar from './navigation/tab-bar';
import TabPanel from './navigation/tab-panel';
import UOPForm from './input/uop-form';
import { BORDER_RADIUS, BOX_SHADOW } from '../consts';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',
    margin: '20px auto 20px auto',
    ...BORDER_RADIUS,
    ...BOX_SHADOW,
  },
  button: {
    minWidth: 150,
    margin: '20px 0 10px',
    backgroundColor: '#1976d2',
    '&:hover': {
      backgroundColor: 'rgb(17, 82, 147)',
    },
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
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        disableRipple
      >
        Calculate
      </Button>
    </Container>
  );
};

export default InputForm;
