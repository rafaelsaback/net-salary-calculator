import React, { FunctionComponent } from 'react';
import Container from '@material-ui/core/Container';

import InputPeriod from './input-period';
import { B2BMoreOptions } from './b2b-more-options';
import { LABELS } from '../../helpers/consts';
import { useSalary, usePeriod } from '../../helpers/hooks';
import { Period } from '../../interfaces';
import InputSalary from './input-salary';

const B2BForm: FunctionComponent = () => {
  const [salary, setSalary] = useSalary('');
  const [period, setPeriod] = usePeriod(Period.Monthly);

  return (
    <Container>
      <InputSalary
        label={LABELS.B2B.SALARY}
        salary={salary}
        setSalary={setSalary}
      />
      <InputPeriod period={period} setPeriod={setPeriod} />
      <B2BMoreOptions />
    </Container>
  );
};

export default B2BForm;
