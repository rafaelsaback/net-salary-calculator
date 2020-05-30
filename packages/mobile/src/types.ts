import { B2BTax, Period, Sickness, ZUS } from '@nsc/shared/src/types';

interface B2BParametersRouteProps {
  b2bParameters: B2BParameters;
}

interface B2BParameters {
  taxType: B2BTax;
  zus: ZUS;
  sickness: Sickness;
  costs: string;
}

export enum ScreenName {
  Home = 'Home',
  Results = 'Results',
  DetailedResults = 'Detailed Results',
  B2BParameters = 'B2B Parameters',
}

export type RootStackParamList = {
  [ScreenName.Home]: B2BParametersRouteProps;
  [ScreenName.Results]: undefined;
  [ScreenName.DetailedResults]: undefined;
  [ScreenName.B2BParameters]: B2BParametersRouteProps;
};

interface BaseSalaryModel {
  value: number;
  period: Period;
}

interface B2BSalaryModel extends BaseSalaryModel {
  b2bParameters: B2BParameters;
}

interface BaseSalaryResultsModel {
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

interface B2BSalaryResultsModel extends BaseSalaryResultsModel {
  laborFund: number[];
  accident: number[];
  others: number[];
}

interface BaseCalculatorModel<
  SalaryModel = BaseSalaryModel,
  SalaryResultsModel = BaseSalaryResultsModel
> {
  salary: SalaryModel;
  results: SalaryResultsModel;
}
export type SerializedUOPModel = BaseCalculatorModel;
type B2BCalculatorModel = BaseCalculatorModel<
  B2BSalaryModel,
  B2BSalaryResultsModel
>;
