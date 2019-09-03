import React, {
  FunctionComponent,
  useState,
  useEffect,
  FormEvent,
  Dispatch,
} from 'react';
import B2BForm from './input/b2b-form';
import TabBar from './navigation/tab-bar';
import TabPanel from './navigation/tab-panel';
import UOPForm from './input/uop-form';
import { BORDER_RADIUS, BOX_SHADOW } from '../helpers/consts';
import {
  setContractType,
  setSalaryResult,
  showResults,
} from '../redux/actions';
import { ContractType, IUOPParams, IB2BParams } from '../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { calculateUOPSalary } from '../salary-calculations/uop-calculator';
import { selectUOPParams, selectB2BParams } from '../helpers/selectors';
import { calculateB2BSalary } from '../salary-calculations/b2b-calculator';
import makeStyles from '@material-ui/styles/makeStyles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

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

const handleSubmit = (
  dispatch: Dispatch<any>,
  uopParams: IUOPParams,
  b2bParams: IB2BParams,
) => (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  /* Lastpass was throwing an exception when the user used enter to submit the form.
     stopPropagation() avoids that the event reaches Lastpass */
  event.stopPropagation();

  const salary = uopParams.get('salary');

  if (salary > 0) {
    const uopSalaryResults = calculateUOPSalary(uopParams);
    const b2bSalaryResults = calculateB2BSalary(b2bParams);
    dispatch(setSalaryResult(uopSalaryResults, b2bSalaryResults));
    dispatch(showResults());
  }
};

const InputForm: FunctionComponent = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles({});
  const uopParams = useSelector(selectUOPParams);
  const b2bParams = useSelector(selectB2BParams);

  useEffect(() => {
    const contractType = currentTab ? ContractType.B2B : ContractType.UOP;
    dispatch(setContractType(contractType));
  }, [currentTab, dispatch]);

  return (
    <Container maxWidth="xs">
      <form
        className={classes.root}
        /* Lastpass was throwing an exception when the user used enter to submit the form.
           Using onSubmitCapure instead of onSubmit makes sure the code catches the event
           before Lastpasss */
        onSubmitCapture={handleSubmit(dispatch, uopParams, b2bParams)}
      >
        <TabBar value={currentTab} setCurrentTab={setCurrentTab} />
        <TabPanel value={currentTab} index={0}>
          <UOPForm />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <B2BForm />
        </TabPanel>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disableRipple
          type="submit"
        >
          Calculate
        </Button>
      </form>
    </Container>
  );
};

export default InputForm;
