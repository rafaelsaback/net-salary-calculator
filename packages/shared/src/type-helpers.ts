import { B2bTax, ContractType, Period } from './types';

export const isMonthly = (period: Period) => period === Period.Monthly;
export const isAnnually = (period: Period) => period === Period.Annually;
export const isB2b = (contract: ContractType) => contract === ContractType.B2b;
export const isEmployment = (contract: ContractType) =>
  contract === ContractType.Employment;
export const isLinearTax = (tax: B2bTax) => tax === B2bTax.Linear;
export const isProgressiveTax = (tax: B2bTax) => tax === B2bTax.Progressive;
