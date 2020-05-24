export enum Period {
  Monthly = 'Monthly',
  Annually = 'Annually',
}

export enum B2BTax {
  Linear = 'LINEAR',
  Progressive = 'PROGRESSIVE',
}

export enum ZUS {
  No = 'No',
  Discounted = 'DISCOUNTED',
  Normal = 'NORMAL',
}

export enum Sickness {
  Yes = 'YES',
  No = 'NO',
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
