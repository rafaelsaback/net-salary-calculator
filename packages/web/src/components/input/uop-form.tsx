import React, { FunctionComponent } from 'react';
import Container from '@material-ui/core/Container';

import InputPeriod from './input-period';
import { LABELS } from '../../helpers/consts';
import { useSalary, usePeriod } from '../../helpers/hooks';
import { Period } from '../../interfaces';
import InputSalary from './input-salary';

const UOPForm: FunctionComponent = () => {
  const [salary, setSalary] = useSalary('');
  const [period, setPeriod] = usePeriod(Period.Monthly);

  return (
    <Container>
      <InputSalary
        label={LABELS.UOP.SALARY}
        salary={salary}
        setSalary={setSalary}
      />
      <InputPeriod period={period} setPeriod={setPeriod} />
    </Container>
  );
};

export default UOPForm;
