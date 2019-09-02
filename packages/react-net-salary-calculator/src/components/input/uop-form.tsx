import React, { FunctionComponent } from 'react';
import Container from '@material-ui/core/Container';

import InputPeriod from './input-period';
import InputFinancial from './input-financial';
import { LABELS } from '../../helpers/consts';
import { useSalary, usePeriod } from '../../helpers/hooks';
import { Period } from '../../interfaces';

const UOPForm: FunctionComponent = () => {
  const [salary, setSalary] = useSalary('');
  const [period, setPeriod] = usePeriod(Period.Monthly);

  return (
    <Container>
      <InputFinancial
        label={LABELS.UOP.SALARY}
        value={salary}
        setValue={setSalary}
      />
      <InputPeriod period={period} setPeriod={setPeriod} />
    </Container>
  );
};

export default UOPForm;
