import { B2bTax, Period, Sickness, ZUS } from '@nsc/shared/src/types';

interface B2bParametersRouteProps {
  b2bParameters: B2bParameters;
  costs: string;
}

export interface B2bParameters {
  taxType: B2bTax;
  zus: ZUS;
  sickness: Sickness;
}

export enum ScreenName {
  Home = 'Home',
  Results = 'Results',
  DetailedResults = 'Detailed Results',
  B2bParameters = 'B2B Parameters',
}

interface RouteParams {
  serializedModel: BaseSerializedModel;
}

export type RootStackParamList = {
  [ScreenName.Home]: B2bParametersRouteProps;
  [ScreenName.Results]: RouteParams;
  [ScreenName.DetailedResults]: RouteParams;
  [ScreenName.B2bParameters]: B2bParametersRouteProps;
};

export interface ValueObject {
  value: number;
  formatted: string;
}

export interface PeriodBreakdown<T = ValueObject> {
  monthly: T[];
  monthlyAverage: T;
  annually: T;
}

interface BaseSalaryResultsModel {
  pension: PeriodBreakdown<ValueObject>;
  disability: PeriodBreakdown<ValueObject>;
  sickness: PeriodBreakdown<ValueObject>;
  socialSecurity: PeriodBreakdown<ValueObject>;
  healthContribution: PeriodBreakdown<ValueObject>;
  healthDeductible: PeriodBreakdown<ValueObject>;
  taxBase: PeriodBreakdown<ValueObject>;
  tax: PeriodBreakdown<ValueObject>;
  endSalary: PeriodBreakdown<ValueObject>;
}

export interface BaseSerializedModel<
  SalaryResultsModel = BaseSalaryResultsModel
> {
  salary: ValueObject;
  period: Period;
  costs: ValueObject;
  results: SalaryResultsModel;
}

export type UOPSerializedModel = BaseSerializedModel;

interface B2bSalaryResultsModel extends BaseSalaryResultsModel {
  laborFund: PeriodBreakdown<ValueObject>;
  accident: PeriodBreakdown<ValueObject>;
  others: PeriodBreakdown<ValueObject>;
}

export interface B2bSerializedModel
  extends BaseSerializedModel<B2bSalaryResultsModel> {
  b2bParameters: B2bParameters;
}
