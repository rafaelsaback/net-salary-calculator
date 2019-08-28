import { List, Map } from 'immutable';

/* ENUMS */

export enum Period {
  Monthly,
  Annually,
}

export enum B2BTax {
  Linear,
  Progressive,
}

export enum ZUS {
  No,
  Discounted,
  Normal,
}

export enum Sickness {
  Yes,
  No,
}

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

export interface UOPParams {
  salary: number;
  period: Period;
}

export interface B2BParams {
  salary: number;
  period: Period;
  tax: B2BTax;
  zus: ZUS;
  sickness: Sickness;
  costs: number;
}

interface SalaryResults {
  salary: List<number>;
  pension: List<number>;
  disability: List<number>;
  sickness: List<number>;
  health: List<number>;
  tax: List<number>;
  endSalary: List<number>;
}

export interface UOPSalaryResults extends SalaryResults {
  taxBase: List<number>;
}

export interface B2BSalaryResults extends SalaryResults {
  others: List<number>;
}

export interface ImmutableMap<T> extends Omit<Map<string, any>, 'get' | 'set'> {
  get<K extends keyof T>(name: K, notSetValue?: T[K]): T[K];
  set<K extends keyof T>(key: K, value: T[K]): ImmutableMap<T>;
}

export type IUOPParams = ImmutableMap<UOPParams>;
export type IB2BParams = ImmutableMap<B2BParams>;
export type IUOPSalaryResults = ImmutableMap<UOPSalaryResults>;
export type IB2BSalaryResults = ImmutableMap<B2BSalaryResults>;

export interface StoreState {
  uopParams: IUOPParams;
  b2bParams: IB2BParams;
  uopSalaryResults: IUOPSalaryResults;
  b2bSalaryResults: IB2BSalaryResults;
}

export type IStoreState = ImmutableMap<StoreState>;

export interface CalculatorAction extends StoreState {
  type: string;
}
