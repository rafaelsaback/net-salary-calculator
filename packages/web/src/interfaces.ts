import { List, Map } from 'immutable';
import { B2BParams, ContractType, UOPParams } from '@nsc/shared/src/types';

/* ENUMS */

/* TYPES & INTERFACES */

export interface SalaryLabels {
  SALARY: string;
  END_SALARY: string;
  SALARY_DTABLE: string[];
  END_SALARY_DTABLE: string[];
  OTHERS: string;
}

export interface ContractLabels {
  UOP: SalaryLabels;
  B2B: SalaryLabels;
}

export interface BaseSalaryResults {
  salary: number;
  pension: List<number>;
  disability: List<number>;
  sickness: List<number>;
  socialSecurity: List<number>;
  healthContribution: List<number>;
  healthDeductible: List<number>;
  taxBase: List<number>;
  tax: List<number>;
  endSalary: List<number>;
}

export type UOPSalaryResults = BaseSalaryResults;

export interface B2BSalaryResults extends BaseSalaryResults {
  laborFund: List<number>;
  accident: List<number>;
  others: List<number>;
  costs: number;
}

export interface ImmutableMap<T> extends Omit<Map<string, any>, 'get' | 'set'> {
  get<K extends keyof T>(name: K, notSetValue?: T[K]): T[K];
  set<K extends keyof T>(key: K, value: T[K]): ImmutableMap<T>;
}

export type IUOPParams = ImmutableMap<UOPParams>;
export type IB2BParams = ImmutableMap<B2BParams>;
export type IUOPSalaryResults = ImmutableMap<BaseSalaryResults>;
export type IB2BSalaryResults = ImmutableMap<B2BSalaryResults>;
export type SalaryResults = IUOPSalaryResults | IB2BSalaryResults;

export interface StoreState {
  contractType: ContractType;
  showResults: boolean;
  submitted: boolean;
  uopParams: IUOPParams;
  b2bParams: IB2BParams;
  uopSalaryResults: IUOPSalaryResults;
  b2bSalaryResults: IB2BSalaryResults;
}

export type IStoreState = ImmutableMap<StoreState>;

export interface CalculatorAction extends StoreState {
  type: string;
}
