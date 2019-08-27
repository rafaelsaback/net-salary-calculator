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
  grossSalary: number;
  period: Period;
}

export interface B2BParams {
  netSalary: number;
  period: Period;
  tax: B2BTax;
  zus: ZUS;
  sickness: Sickness;
  costs: number;
}

type Array12x = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

interface MonthlySalaryResults {
  salary: Array12x;
  pension: Array12x;
  disability: Array12x;
  sickness: Array12x;
  health: Array12x;
  tax: Array12x;
  endSalary: Array12x;
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
  taxBase: Array12x;
}

interface UOPAnnuallySalaryResults extends AnnuallySalaryResults {
  taxBase: number;
}

interface B2BMonthlySalaryResults extends MonthlySalaryResults {
  others: Array12x;
}

interface B2BAnnuallySalaryResults extends AnnuallySalaryResults {
  others: number;
}

export interface UOPSalaryResults {
  monthly: UOPMonthlySalaryResults;
  annually: UOPAnnuallySalaryResults;
}

export interface B2BSalaryResults {
  monthly: B2BMonthlySalaryResults;
  annually: B2BAnnuallySalaryResults;
}
