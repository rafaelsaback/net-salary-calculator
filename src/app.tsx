import React, { FunctionComponent } from 'react';
import InputForm from './components/input-form';
import Results from './components/results';
import { useSelector } from 'react-redux';
import { selectShowResults } from './helpers/selectors';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles({
  root: {
    padding: '16px 0',
  },
});

const App: FunctionComponent = () => {
  const showResults = useSelector(selectShowResults);
  const classes = useStyles({});

  return (
    <Container className={classes.root}>
      <InputForm />
      {showResults && <Results />}
    </Container>
  );
};

export default App;
