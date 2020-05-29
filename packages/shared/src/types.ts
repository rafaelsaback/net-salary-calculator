export enum Period {
  Monthly = 'Monthly',
  Annually = 'Annually',
}

export enum B2BTax {
  Linear = 'Linear',
  Progressive = 'Progressive',
}

export enum ZUS {
  No = 'No',
  Discounted = 'Discounted',
  Normal = 'Normal',
}

export enum Sickness {
  Yes = 'Yes',
  No = 'No',
}

export enum ContractType {
  Employment = 'Employment',
  B2B = 'B2B',
}

export interface UOPParams {
  salary: number;
  period: Period;
}

export interface B2BParams {
  salary: number;
  period: Period;
  taxType: B2BTax;
  zus: ZUS;
  sickness: Sickness;
  costs: number;
}

export interface BaseSalaryResults {
  salary: number;
  pension: number[];
  disability: number[];
  sickness: number[];
  socialSecurity: number[];
  healthContribution: number[];
  healthDeductible: number[];
  taxBase: number[];
  tax: number[];
  endSalary: number[];
}

export type UOPSalaryResults = BaseSalaryResults;

export interface B2BSalaryResults extends BaseSalaryResults {
  laborFund: number[];
  accident: number[];
  others: number[];
  costs: number;
}
