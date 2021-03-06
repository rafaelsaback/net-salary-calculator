import { List } from 'immutable';
import {
  HEALTH_CONTRIBUTION_RATE,
  HEALTH_DEDUCTIBLE_RATE,
  MONTHLY_RELIEF,
  RATE_17,
  RATE_32,
  TAX_THRESHOLD,
} from '../consts';
import { roundNumber } from '../helpers';

export const accumulateValue = (list: List<number>) => {
  return list
    .map(
      ((sum) => (_: number, i: number, iter: List<number>) =>
        (sum += iter.get(i)))(0),
    )
    .unshift(0)
    .pop();
};

export const calcProgressiveTaxList = (
  taxBase: List<number>,
  healthDeductible: List<number>,
): List<number> => {
  const accTaxBase = accumulateValue(taxBase);

  const tax = List(Array(12)).map((_, i) => {
    if (accTaxBase.get(i) < TAX_THRESHOLD) {
      const taxValue =
        taxBase.get(i) * RATE_17 - healthDeductible.get(i) - MONTHLY_RELIEF;
      return roundNumber(Math.max(0, taxValue), 2);
    }
    const taxValue = taxBase.get(i) * RATE_32 - healthDeductible.get(i);
    return roundNumber(Math.max(0, taxValue), 2);
  });

  return tax;
};

export const calcHealthDeductibleList = (
  healthContribution: List<number>,
): List<number> =>
  healthContribution.map(
    (value) => value * (HEALTH_DEDUCTIBLE_RATE / HEALTH_CONTRIBUTION_RATE),
  );

export const calcTaxBaseList = (
  inputSalary: number,
  socialSecurity: List<number>,
  costs: number,
) =>
  List(Array(12)).map((_, i) => {
    const taxBaseValue = inputSalary - socialSecurity.get(i) - costs;
    return roundNumber(taxBaseValue, 0);
  });
