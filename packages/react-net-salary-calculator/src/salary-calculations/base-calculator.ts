import { List } from 'immutable';
import { IUOPSalaryResults } from '../interfaces';
import {
  TAX_THRESHOLD,
  RATE_18,
  MONTHLY_RELIEF,
  RATE_32,
} from '../helpers/consts';

export const roundNumber = (number: number, decimals: number): number => {
  return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

export const accumulateValue = (list: List<number>) => {
  return list
    .map(
      ((sum) => (_: number, i: number, iter: List<number>) =>
        (sum += iter.get(i)))(0),
    )
    .unshift(0)
    .pop();
};

export const calcProgressiveTax = (
  salaryResults: IUOPSalaryResults,
): IUOPSalaryResults => {
  const taxBase = salaryResults.get('taxBase');
  const accTaxBase = accumulateValue(taxBase);
  const healthDeductible = salaryResults.get('healthDeductible');

  const tax = List(Array(12)).map((_, i) => {
    if (accTaxBase.get(i) < TAX_THRESHOLD) {
      const taxValue =
        taxBase.get(i) * RATE_18 - healthDeductible.get(i) - MONTHLY_RELIEF;
      return roundNumber(taxValue, 2);
    }
    const taxValue = taxBase.get(i) * RATE_32 - healthDeductible.get(i);
    return roundNumber(taxValue, 2);
  });

  return salaryResults.set('tax', tax);
};
