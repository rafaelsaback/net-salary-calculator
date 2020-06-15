export enum Period {
  Monthly = 'Monthly',
  Annually = 'Annually',
}

export enum B2bTax {
  Linear = '19%',
  Progressive = '17%/32%',
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
  B2b = 'B2b',
}

export interface UOPParams {
  salary: number;
  period: Period;
}

export interface B2BParams {
  salary: number;
  period: Period;
  taxType: B2bTax;
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
