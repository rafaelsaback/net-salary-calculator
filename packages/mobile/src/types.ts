import { B2BTax, Period, Sickness, ZUS } from '@nsc/shared/src/types';

interface B2BParametersRouteProps {
  b2bParameters: B2BParameters;
}

export interface B2BParameters {
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

interface RouteParams {
  uopSerializedModel: UOPSerializedModel;
}

export type RootStackParamList = {
  [ScreenName.Home]: B2BParametersRouteProps;
  [ScreenName.Results]: RouteParams;
  [ScreenName.DetailedResults]: RouteParams;
  [ScreenName.B2BParameters]: B2BParametersRouteProps;
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

interface B2BSalaryResultsModel extends BaseSalaryResultsModel {
  laborFund: PeriodBreakdown<ValueObject>;
  accident: PeriodBreakdown<ValueObject>;
  others: PeriodBreakdown<ValueObject>;
}

interface B2BSerializedModel
  extends BaseSerializedModel<B2BSalaryResultsModel> {
  b2bParameters: B2BParameters;
}
