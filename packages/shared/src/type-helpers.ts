import { B2BTax, ContractType, Period, Sickness, ZUS } from './types';

export const isMonthly = (period: Period) => period === Period.Monthly;
export const isAnnually = (period: Period) => period === Period.Annually;
export const isB2B = (contract: ContractType) => contract === ContractType.B2B;
export const isEmployment = (contract: ContractType) =>
  contract === ContractType.Employment;
export const isLinearTax = (tax: B2BTax) => tax === B2BTax.Linear;
export const isProgressiveTax = (tax: B2BTax) => tax === B2BTax.Progressive;

export const isNoZus = (zus: ZUS) => zus === ZUS.No;
export const isDiscountedZus = (zus: ZUS) => zus === ZUS.Discounted;
export const isNormalZus = (zus: ZUS) => zus === ZUS.Normal;

export const isNoSickness = (sickness: Sickness) => sickness === Sickness.No;
export const isYesSickness = (sickness: Sickness) => sickness === Sickness.Yes;
