import React, { FunctionComponent } from 'react';
import { Container } from '@material-ui/core';

import InputPeriod from './input-period';
import InputFinancial from './input-financial';
import { LABELS } from '../../helpers/consts';
import { useSelector, useDispatch } from 'react-redux';
import { selectUOPParam } from '../../helpers/selectors';
import { setSalary } from '../../helpers/utils';

interface UOPFormProps {
  period: string;
  setPeriod(value: string): void;
}

const UOPForm: FunctionComponent<UOPFormProps> = ({ period, setPeriod }) => {
  const salary = useSelector(selectUOPParam('salary')) || '';
  const dispatch = useDispatch();

  return (
    <Container>
      <InputFinancial
        label={LABELS.UOP.SALARY}
        value={salary.toString()}
        setValue={setSalary(dispatch)}
        required={true}
      />
      <InputPeriod period={period} setPeriod={setPeriod} />
    </Container>
  );
};

export default UOPForm;
