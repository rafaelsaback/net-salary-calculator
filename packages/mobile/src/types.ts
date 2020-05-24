export enum ScreenName {
  Home = 'Home',
  Results = 'Results',
  MonthlyBreakdown = 'Monthly Breakdown',
}

export type RootStackParamList = {
  [ScreenName.Home]: undefined;
  [ScreenName.Results]: undefined;
  [ScreenName.MonthlyBreakdown]: undefined;
};
