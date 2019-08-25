import React, { PureComponent } from 'react';
import './index.scss';
import { Container } from '@material-ui/core';
import InputForm from './components/input-form';
import Results from './components/results';

class App extends PureComponent {
  render() {
    return (
      <Container>
        <InputForm />
        <Results />
      </Container>
    );
  }
}

export default App;
