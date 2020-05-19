export enum Period {
  Monthly = 'MONTHLY',
  Annually = 'ANNUALLY',
}
export const isMonthly = (period: Period) => period === Period.Monthly;
export const isAnnually = (period: Period) => period === Period.Annually;

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
  UOP = 'UOP',
  B2B = 'B2B',
}
