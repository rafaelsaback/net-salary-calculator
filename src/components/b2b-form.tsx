import React, { FunctionComponent } from 'react';
import { Container } from '@material-ui/core';
import InputPeriod from './input/input-period';
import InputFinancial from './input/input-financial';
import { B2BMoreOptions } from './b2b-more-options';

interface B2BFormProps {
  salary: string;
  period: string;
  setSalary(value: string): void;
  setPeriod(value: string): void;
}

const B2BForm: FunctionComponent<B2BFormProps> = ({
  salary,
  period,
  setSalary,
  setPeriod,
}) => {
  return (
    <Container>
      <InputFinancial
        label="Net salary (from the invoice):"
        value={salary}
        setValue={setSalary}
        required={true}
      />
      <InputPeriod period={period} setPeriod={setPeriod} />
      <B2BMoreOptions />
    </Container>
  );
};

export default B2BForm;
