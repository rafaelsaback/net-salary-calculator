import { DefaultTheme } from '@react-navigation/native';

const primaryRedColor = '#DC143C';
const secondaryRedColor = '#FFE9ED';
const primaryBlackColor = '#515151';
const secondaryBlackColor = '#818181';
const containerBackgroundColor = 'white';

export const appThemeReactNavigation = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: primaryRedColor,
    text: primaryBlackColor,
    background: secondaryRedColor,
  },
};

export const appTheme = {
  primaryRedColor,
  secondaryRedColor,
  primaryBlackColor,
  secondaryBlackColor,
  containerBackgroundColor,
  borderRadius: 5,
  btnBackgroundShadow: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
};
