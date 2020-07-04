import EStyleSheet from 'react-native-extended-stylesheet';
import { B2bSalaryResultsModel, BaseSalaryResultsModel } from './types';
import { Period } from '@nsc/shared/src/types';
import { MINIMUM_WAGE } from '@nsc/shared/src/consts';
import { Dispatch } from 'react';

export const createFontSizeStyle = (values: number[]) =>
  values.map((value) => EStyleSheet.value(`${value}rem`));

export const isB2bResultsModel = (
  resultsModel: BaseSalaryResultsModel,
): resultsModel is B2bSalaryResultsModel => 'laborFund' in resultsModel;

export const validateSalary = (period: Period, setError: Dispatch<string>) => (
  salary: number,
): boolean => {
  const adjustedMinimumWage =
    period === Period.Annually ? 12 * MINIMUM_WAGE : MINIMUM_WAGE;
  if (salary >= adjustedMinimumWage) {
    setError('');
    return true;
  }
  const periodStr = period === Period.Annually ? 'year' : 'month';
  setError(
    `The salary should be at least PLN ${adjustedMinimumWage} per ${periodStr} (minimum wage).`,
  );

  return false;
};
