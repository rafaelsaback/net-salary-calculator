import React, { FunctionComponent } from 'react';
import { Container } from '@material-ui/core';
import InputPeriod from './input/input-period';
import InputFinancial from './input/input-financial';

interface UOPFormProps {
  salary: string;
  period: string;
  setSalary(value: string): void;
  setPeriod(value: string): void;
}

const UOPForm: FunctionComponent<UOPFormProps> = ({
  salary,
  period,
  setSalary,
  setPeriod,
}) => {
  return (
    <Container>
      <InputFinancial
        label="Gross salary:"
        value={salary}
        setValue={setSalary}
        required={true}
      />
      <InputPeriod period={period} setPeriod={setPeriod} />
    </Container>
  );
};

export default UOPForm;
