export enum ScreenName {
  Home = 'Home',
  Results = 'Results',
  MonthlyBreakdown = 'Monthly Breakdown',
  B2BParameters = 'B2B Parameters',
}

export type RootStackParamList = {
  [ScreenName.Home]: undefined;
  [ScreenName.Results]: undefined;
  [ScreenName.MonthlyBreakdown]: undefined;
  [ScreenName.B2BParameters]: undefined;
};
