import { Map, List } from 'immutable';
import {
  IB2BSalaryResults,
  ZUS,
  IB2BParams,
  Sickness,
  B2BTax,
  Period,
} from '../interfaces';
import {
  calcHealthDeductibleList,
  calcTaxBaseList,
  calcProgressiveTaxList,
  roundNumber,
} from './base-calculator';
import { compose } from 'redux';
import { RATE_19 } from '../helpers/consts';

const HEALTH_INSURANCE = 342.32;

const SMALL_ZUS = {
  PENSION: 131.76,
  DISABILITY: 54,
  SICKNESS: 16.54,
  ACCIDENT: 11.27,
};

const NORMAL_ZUS = {
  PENSION: 558.08,
  DISABILITY: 228.72,
  SICKNESS: 70.05,
  ACCIDENT: 47.75,
  LABOR_FUND: 70.05,
};

const evalZUS = (
  zus: ZUS,
  noZUSValue: number,
  discountedZUSValue: number,
  normalZUSValue: number,
): List<number> => {
  switch (zus) {
    case ZUS.No:
      return List([
        ...Array(6).fill(noZUSValue),
        ...Array(6).fill(discountedZUSValue),
      ]);
    case ZUS.Discounted:
      return List(Array(12).fill(discountedZUSValue));
    case ZUS.Normal:
      return List(Array(12).fill(normalZUSValue));
  }
};

const calcEndSalary = (salaryResults: IB2BSalaryResults): IB2BSalaryResults => {
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
    return roundNumber(endSalaryValue, 2);
  });

  return salaryResults.set('endSalary', endSalary);
};

const calcTax = (b2bParams: IB2BParams) => (
  salaryResults: IB2BSalaryResults,
): IB2BSalaryResults => {
  const taxType = b2bParams.get('taxType');
  const taxBase = salaryResults.get('taxBase');
  const healthDeductible = salaryResults.get('healthDeductible');

  if (taxType === B2BTax.Progressive) {
    const tax = calcProgressiveTaxList(taxBase, healthDeductible);
    return salaryResults.set('tax', tax);
  } else {
    const tax = taxBase.map((taxBaseValue, i) => {
      const taxBeforeDeductible = taxBaseValue * RATE_19;
      return taxBeforeDeductible >= healthDeductible.get(i)
        ? taxBeforeDeductible - healthDeductible.get(i)
        : 0;
    });

    return salaryResults.set('tax', tax);
  }
};

const calcTaxBase = (b2bParams: IB2BParams) => (
  salaryResults: IB2BSalaryResults,
): IB2BSalaryResults => {
  const netSalary = salaryResults.get('salary');
  const socialSecurity = salaryResults.get('socialSecurity');
  const costs = b2bParams.get('costs');

  const taxBase = calcTaxBaseList(netSalary, socialSecurity, costs);

  return salaryResults.set('taxBase', taxBase);
};

const calcSocialSecurity = (
  salaryResults: IB2BSalaryResults,
): IB2BSalaryResults => {
  const pension = salaryResults.get('pension');
  const disability = salaryResults.get('disability');
  const sickness = salaryResults.get('sickness');
  const accident = salaryResults.get('accident');
  const laborFund = salaryResults.get('laborFund');

  const socialSecurity = List(Array(12)).map(
    (_, i) =>
      pension.get(i) +
      disability.get(i) +
      sickness.get(i) +
      accident.get(i) +
      laborFund.get(i),
  );

  return salaryResults.set('socialSecurity', socialSecurity);
};

const calcOthers = (salaryResults: IB2BSalaryResults): IB2BSalaryResults => {
  const accident = salaryResults.get('accident');
  const laborFund = salaryResults.get('laborFund');
  const others = accident.map((acc, i) => acc + laborFund.get(i));

  return salaryResults.set('others', others);
};

const calcLaborFund = (b2bParams: IB2BParams) => (
  salaryResults: IB2BSalaryResults,
): IB2BSalaryResults => {
  const laborFund = evalZUS(b2bParams.get('zus'), 0, 0, NORMAL_ZUS.LABOR_FUND);

  return salaryResults.set('laborFund', laborFund);
};

const calcAccident = (b2bParams: IB2BParams) => (
  salaryResults: IB2BSalaryResults,
): IB2BSalaryResults => {
  const accident = evalZUS(
    b2bParams.get('zus'),
    0,
    SMALL_ZUS.ACCIDENT,
    NORMAL_ZUS.ACCIDENT,
  );

  return salaryResults.set('accident', accident);
};

const calcHealthDeductible = (
  salaryResults: IB2BSalaryResults,
): IB2BSalaryResults => {
  const healthContribution = salaryResults.get('healthContribution');
  const healthDeductible = calcHealthDeductibleList(healthContribution);

  return salaryResults.set('healthDeductible', healthDeductible);
};

const calcHealthContribution = (
  salaryResults: IB2BSalaryResults,
): IB2BSalaryResults => {
  const healthContribution = List(Array(12).fill(HEALTH_INSURANCE));
  return salaryResults.set('healthContribution', healthContribution);
};

const calcSickness = (b2bParams: IB2BParams) => (
  salaryResults: IB2BSalaryResults,
): IB2BSalaryResults => {
  const paySickness = b2bParams.get('sickness');

  if (paySickness === Sickness.No) {
    return salaryResults;
  }

  const sickness = evalZUS(
    b2bParams.get('zus'),
    0,
    SMALL_ZUS.SICKNESS,
    NORMAL_ZUS.SICKNESS,
  );
  return salaryResults.set('sickness', sickness);
};

const calcDisability = (b2bParams: IB2BParams) => (
  salaryResults: IB2BSalaryResults,
): IB2BSalaryResults => {
  const disability = evalZUS(
    b2bParams.get('zus'),
    0,
    SMALL_ZUS.DISABILITY,
    NORMAL_ZUS.DISABILITY,
  );

  return salaryResults.set('disability', disability);
};

const calcPension = (b2bParams: IB2BParams) => (
  salaryResults: IB2BSalaryResults,
): IB2BSalaryResults => {
  const pension = evalZUS(
    b2bParams.get('zus'),
    0,
    SMALL_ZUS.PENSION,
    NORMAL_ZUS.PENSION,
  );

  return salaryResults.set('pension', pension);
};

const initializeFields = (
  salaryResults: IB2BSalaryResults,
): IB2BSalaryResults => {
  return salaryResults
    .set('pension', List(Array(12).fill(0)))
    .set('disability', List(Array(12).fill(0)))
    .set('sickness', List(Array(12).fill(0)))
    .set('socialSecurity', List(Array(12).fill(0)))
    .set('healthContribution', List(Array(12).fill(0)))
    .set('healthDeductible', List(Array(12).fill(0)))
    .set('taxBase', List(Array(12).fill(0)))
    .set('tax', List(Array(12).fill(0)))
    .set('endSalary', List(Array(12).fill(0)));
};

const calcMonthlyGrossSalary = (
  grossSalary: number,
  period: Period,
): IB2BSalaryResults => {
  const salaryResults: IB2BSalaryResults = Map();
  const monthlyGrossSalary =
    period === Period.Monthly ? grossSalary : grossSalary / 12;

  return salaryResults.set('salary', monthlyGrossSalary);
};

export const calculateB2BSalary = (b2bParams: IB2BParams): IB2BSalaryResults =>
  compose(
    calcEndSalary,
    calcTax(b2bParams),
    calcTaxBase(b2bParams),
    calcSocialSecurity,
    calcOthers,
    calcLaborFund(b2bParams),
    calcAccident(b2bParams),
    calcHealthDeductible,
    calcHealthContribution,
    calcSickness(b2bParams),
    calcDisability(b2bParams),
    calcPension(b2bParams),
    initializeFields,
    calcMonthlyGrossSalary,
  )(b2bParams.get('salary'), b2bParams.get('period'));