import React, { FunctionComponent } from 'react';
import { Container } from '@material-ui/core';

import InputPeriod from './input-period';
import InputFinancial from './input-financial';
import { B2BMoreOptions } from './b2b-more-options';
import { LABELS } from '../../helpers/consts';
import { setSalary } from '../../helpers/utils';
import { useSelector, useDispatch } from 'react-redux';
import { selectB2BParam } from '../../helpers/selectors';

interface B2BFormProps {
  period: string;
  setPeriod(value: string): void;
}

const B2BForm: FunctionComponent<B2BFormProps> = ({ period, setPeriod }) => {
  const salary = useSelector(selectB2BParam('salary')) || '';
  const dispatch = useDispatch();

  return (
    <Container>
      <InputFinancial
        label={LABELS.B2B.SALARY}
        value={salary.toString()}
        setValue={setSalary(dispatch)}
        required={true}
      />
      <InputPeriod period={period} setPeriod={setPeriod} />
      <B2BMoreOptions />
    </Container>
  );
};

export default B2BForm;
