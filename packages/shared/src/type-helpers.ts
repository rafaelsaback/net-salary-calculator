import { ContractType, Period } from './types';

export const isMonthly = (period: Period) => period === Period.Monthly;
export const isAnnually = (period: Period) => period === Period.Annually;
export const isB2B = (contract: ContractType) => contract === ContractType.B2B;
export const isEmployment = (contract: ContractType) =>
  contract === ContractType.Employment;
