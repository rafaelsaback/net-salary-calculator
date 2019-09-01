import React, { FunctionComponent } from 'react';
import { Container } from '@material-ui/core';
import InputForm from './components/input-form';
import Results from './components/results';
import { useSelector } from 'react-redux';
import { selectShowResults } from './helpers/selectors';

const App: FunctionComponent = () => {
  const showResults = useSelector(selectShowResults);

  return (
    <Container>
      <InputForm />
      {showResults && <Results />}
    </Container>
  );
};

export default App;
