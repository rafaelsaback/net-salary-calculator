import { B2BTax, Sickness, ZUS } from '@nsc/shared/src/types';

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
  MonthlyBreakdown = 'Monthly Breakdown',
  B2BParameters = 'B2B Parameters',
}

export type RootStackParamList = {
  [ScreenName.Home]: B2BParametersRouteProps;
  [ScreenName.Results]: undefined;
  [ScreenName.MonthlyBreakdown]: undefined;
  [ScreenName.B2BParameters]: B2BParametersRouteProps;
};
