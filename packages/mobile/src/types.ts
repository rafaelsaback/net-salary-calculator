export enum ScreenName {
  Home = 'Home',
  Results = 'Results',
}

export type RootStackParamList = {
  [ScreenName.Home]: undefined;
  [ScreenName.Results]: undefined;
};
