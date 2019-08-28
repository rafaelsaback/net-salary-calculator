import React, { FunctionComponent } from 'react';
import { Container } from '@material-ui/core';
import InputPeriod from './input-period';
import InputFinancial from './input-financial';
import { B2BMoreOptions } from './b2b-more-options';
import { LABELS } from '../../helpers/consts';

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
        label={LABELS.B2B.SALARY}
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
