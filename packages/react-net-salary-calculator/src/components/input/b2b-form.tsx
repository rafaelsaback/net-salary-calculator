import React, { FunctionComponent } from 'react';
import { Container } from '@material-ui/core';

import InputPeriod from './input-period';
import InputFinancial from './input-financial';
import { B2BMoreOptions } from './b2b-more-options';
import { LABELS } from '../../helpers/consts';
import { useSalary, usePeriod } from '../../helpers/hooks';
import { Period } from '../../interfaces';

const B2BForm: FunctionComponent = () => {
  const [salary, setSalary] = useSalary('');
  const [period, setPeriod] = usePeriod(Period.Monthly);

  return (
    <Container>
      <InputFinancial
        label={LABELS.B2B.SALARY}
        value={salary}
        setValue={setSalary}
      />
      <InputPeriod period={period} setPeriod={setPeriod} />
      <B2BMoreOptions />
    </Container>
  );
};

export default B2BForm;
