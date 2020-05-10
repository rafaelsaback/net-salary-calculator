import { Map, List } from 'immutable';
import {
  IUOPSalaryResults,
  IUOPParams,
  Period,
} from '../../../web/src/interfaces';
import flowRight from 'lodash-es/flowRight';
import {
  ANNUAL_LIMIT,
  PENSION_RATE,
  DISABILITY_RATE,
  SICKNESS_RATE,
  HEALTH_CONTRIBUTION_RATE,
  EARNING_COST,
} from '../../../web/src/helpers/consts';
import {
  roundNumber,
  calcProgressiveTaxList,
  calcHealthDeductibleList,
  calcTaxBaseList,
} from './base-calculator-model';

const calcEndSalary = (salaryResults: IUOPSalaryResults): IUOPSalaryResults => {
  const grossSalary = salaryResults.get('salary');
  const socialSecurity = salaryResults.get('socialSecurity');
  const healthContribution = salaryResults.get('healthContribution');
  const tax = salaryResults.get('tax');

  const endSalary = List(Array(12)).map((_, i) => {
    const endSalaryValue =
      grossSalary -
      socialSecurity.get(i) -
      healthContribution.get(i) -
      tax.get(i);
    return roundNumber(Math.max(0, endSalaryValue), 2);
  });

  return salaryResults.set('endSalary', endSalary);
};

export const calcProgressiveTax = (
  salaryResults: IUOPSalaryResults,
): IUOPSalaryResults => {
  const taxBase = salaryResults.get('taxBase');
  const healthDeductible = salaryResults.get('healthDeductible');

  const tax = calcProgressiveTaxList(taxBase, healthDeductible);

  return salaryResults.set('tax', tax);
};

const calcTaxBase = (salaryResults: IUOPSalaryResults): IUOPSalaryResults => {
  const grossSalary = salaryResults.get('salary');
  const socialSecurity = salaryResults.get('socialSecurity');

  const taxBase = calcTaxBaseList(grossSalary, socialSecurity, EARNING_COST);

  return salaryResults.set('taxBase', taxBase);
};

const calcHealthDeductible = (
  salaryResults: IUOPSalaryResults,
): IUOPSalaryResults => {
  const healthContribution = salaryResults.get('healthContribution');
  const healthDeductible = calcHealthDeductibleList(healthContribution);

  return salaryResults.set('healthDeductible', healthDeductible);
};

const calcHealthContribution = (
  salaryResults: IUOPSalaryResults,
): IUOPSalaryResults => {
  const grossSalary = salaryResults.get('salary');
  const socialSecurity = salaryResults.get('socialSecurity');

  const healthContribution = List(Array(12)).map((_, i) => {
    const healthBase = grossSalary - socialSecurity.get(i);

    return healthBase * HEALTH_CONTRIBUTION_RATE;
  });

  return salaryResults.set('healthContribution', healthContribution);
};

const calcSocialSecurity = (
  salaryResults: IUOPSalaryResults,
): IUOPSalaryResults => {
  const pension = salaryResults.get('pension');
  const disability = salaryResults.get('disability');
  const sickness = salaryResults.get('sickness');

  const socialSecurity = List(Array(12)).map(
    (_, i) => pension.get(i) + disability.get(i) + sickness.get(i),
  );

  return salaryResults.set('socialSecurity', socialSecurity);
};

const calcSickness = (salaryResults: IUOPSalaryResults): IUOPSalaryResults => {
  const grossSalary = salaryResults.get('salary');
  const sickness = List(Array(12)).map(() => grossSalary * SICKNESS_RATE);

  return salaryResults.set('sickness', sickness);
};

const calcPensionDisability = (grossSalary: number, rate: number) => (
  _: number,
  index: number,
) => {
  const accGrossSalary = grossSalary * index;
  const nextAccGrossSalary = grossSalary * (index + 1);

  if (nextAccGrossSalary < ANNUAL_LIMIT) {
    return grossSalary * rate;
  } else if (accGrossSalary < ANNUAL_LIMIT) {
    const baseGrossSalary = ANNUAL_LIMIT - accGrossSalary;
    return baseGrossSalary * rate;
  }

  return 0;
};

const calcDisability = (
  salaryResults: IUOPSalaryResults,
): IUOPSalaryResults => {
  const grossSalary = salaryResults.get('salary');

  const disability = List(Array(12)).map(
    calcPensionDisability(grossSalary, DISABILITY_RATE),
  );

  return salaryResults.set('disability', disability);
};

const calcPension = (salaryResults: IUOPSalaryResults): IUOPSalaryResults => {
  const grossSalary = salaryResults.get('salary');

  const pension = List(Array(12)).map(
    calcPensionDisability(grossSalary, PENSION_RATE),
  );

  return salaryResults.set('pension', pension);
};

const calcMonthlyGrossSalary = (
  grossSalary: number,
  period: Period,
): IUOPSalaryResults => {
  const salaryResults: IUOPSalaryResults = Map();
  const monthlyGrossSalary =
    period === Period.Monthly ? grossSalary : grossSalary / 12;

  return salaryResults.set('salary', monthlyGrossSalary || 0);
};

export const calculateUOPSalary = (uopParams: IUOPParams): IUOPSalaryResults =>
  flowRight(
    calcEndSalary,
    calcProgressiveTax,
    calcTaxBase,
    calcHealthDeductible,
    calcHealthContribution,
    calcSocialSecurity,
    calcSickness,
    calcDisability,
    calcPension,
    calcMonthlyGrossSalary,
  )(uopParams.get('salary'), uopParams.get('period'));
