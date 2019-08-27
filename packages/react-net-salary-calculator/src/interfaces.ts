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

export type UOPParams = ImmutableMap<{
  grossSalary: number;
  period: Period;
}>;

export type B2BParams = ImmutableMap<{
  netSalary: number;
  period: Period;
  tax: B2BTax;
  zus: ZUS;
  sickness: Sickness;
  costs: number;
}>;

interface MonthlySalaryResults {
  salary: List<number>;
  pension: List<number>;
  disability: List<number>;
  sickness: List<number>;
  health: List<number>;
  tax: List<number>;
  endSalary: List<number>;
}

interface AnnuallySalaryResults {
  salary: number;
  pension: number;
  disability: number;
  sickness: number;
  health: number;
  tax: number;
  endSalary: number;
}

interface UOPMonthlySalaryResults extends MonthlySalaryResults {
  taxBase: List<number>;
}

interface UOPAnnuallySalaryResults extends AnnuallySalaryResults {
  taxBase: number;
}

interface B2BMonthlySalaryResults extends MonthlySalaryResults {
  others: List<number>;
}

interface B2BAnnuallySalaryResults extends AnnuallySalaryResults {
  others: number;
}

export type UOPSalaryResults = ImmutableMap<{
  monthly: ImmutableMap<UOPMonthlySalaryResults>;
  annually: ImmutableMap<UOPAnnuallySalaryResults>;
}>;

export type B2BSalaryResults = ImmutableMap<{
  monthly: ImmutableMap<B2BMonthlySalaryResults>;
  annually: ImmutableMap<B2BAnnuallySalaryResults>;
}>;

export interface StoreState {
  uopParams: UOPParams;
  b2bParams: B2BParams;
  uopSalaryResults: UOPSalaryResults;
  b2bSalaryResults: B2BSalaryResults;
}

export type IStoreState = ImmutableMap<StoreState>;

export interface ImmutableMap<T> extends Omit<Map<string, any>, 'get' | 'set'> {
  get<K extends keyof T>(name: K, notSetValue?: T[K]): T[K];
  set<K extends keyof T>(key: K, value: T[K]): ImmutableMap<T>;
}

export interface CalculatorAction extends StoreState {
  type: string;
}
