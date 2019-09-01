import React, {
  FunctionComponent,
  useState,
  useEffect,
  FormEvent,
  Dispatch,
} from 'react';
import { Map } from 'immutable';
import { Container, makeStyles, Button } from '@material-ui/core';
import B2BForm from './input/b2b-form';
import TabBar from './navigation/tab-bar';
import TabPanel from './navigation/tab-panel';
import UOPForm from './input/uop-form';
import { BORDER_RADIUS, BOX_SHADOW } from '../helpers/consts';
import { setContractType, setSalaryResult } from '../redux/actions';
import { ContractType, IUOPParams } from '../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { calculateUOPSalary } from '../salary-calculations/uop-calculator';
import { selectUOPParams } from '../helpers/selectors';

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

const handleSubmit = (dispatch: Dispatch<any>, uopParams: IUOPParams) => (
  event: FormEvent<HTMLFormElement>,
) => {
  event.preventDefault();

  const uopSalaryResults = calculateUOPSalary(uopParams);
  dispatch(setSalaryResult(uopSalaryResults, Map()));
};

const InputForm: FunctionComponent = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles({});
  const uopParams = useSelector(selectUOPParams);

  useEffect(() => {
    const contractType = currentTab ? ContractType.B2B : ContractType.UOP;
    dispatch(setContractType(contractType));
  }, [currentTab, dispatch]);

  return (
    <Container maxWidth="xs">
      <form
        className={classes.root}
        onSubmit={handleSubmit(dispatch, uopParams)}
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
