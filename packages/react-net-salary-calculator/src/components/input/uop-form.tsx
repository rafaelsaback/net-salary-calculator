import React, { FunctionComponent } from 'react';
import { Container } from '@material-ui/core';
import InputPeriod from './input-period';
import InputFinancial from './input-financial';
import { SALARY_LABEL_UOP } from '../../consts';

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
        label={SALARY_LABEL_UOP}
        value={salary}
        setValue={setSalary}
        required={true}
      />
      <InputPeriod period={period} setPeriod={setPeriod} />
    </Container>
  );
};

export default UOPForm;
