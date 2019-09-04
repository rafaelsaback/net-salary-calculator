import React, {
  FunctionComponent,
  ChangeEvent,
  useState,
  useCallback,
  useEffect,
} from 'react';
import InputFinancial from './input-financial';
import { MINIMUM_WAGE } from '../../helpers/consts';
import { compose } from 'redux';
import { stringToValue, eventToString } from '../../helpers/utils';
import {
  selectShowResults,
  selectSubmitted,
  selectUOPParam,
} from '../../helpers/selectors';
import { useSelector } from 'react-redux';

interface InputSalaryProps {
  label: string;
  salary: string;
  setSalary(event: ChangeEvent<HTMLInputElement>): void;
}

const validateSalary = (salary: number, submitted: boolean, setError: any) => {
  if (submitted && (salary < MINIMUM_WAGE || !salary)) {
    setError(true);
  } else {
    setError(false);
  }
};

const onSalaryChange = (
  submitted: boolean,
  setSalary: (event: ChangeEvent<HTMLInputElement>) => void,
  setError: (value: boolean) => void,
) => (event: ChangeEvent<HTMLInputElement>) => {
  const salary = compose(
    stringToValue,
    eventToString,
  )(event);

  validateSalary(salary, submitted, setError);
  setSalary(event);
};

const InputSalary: FunctionComponent<InputSalaryProps> = ({
  label,
  salary,
  setSalary,
}) => {
  const [error, setError] = useState(false);
  const submitted = useSelector(selectSubmitted);
  const onChange = useCallback(onSalaryChange(submitted, setSalary, setError), [
    submitted,
    setSalary,
    setError,
  ]);

  useEffect(() => validateSalary(parseFloat(salary), submitted, setError), [
    salary,
    submitted,
    setError,
  ]);

  return (
    <InputFinancial
      label={label}
      value={salary}
      setValue={onChange}
      error={error}
      errorMsg={
        error &&
        `The salary should be greater than ${MINIMUM_WAGE} (minimum wage)`
      }
    />
  );
};

export default InputSalary;
