import { DefaultTheme } from '@react-navigation/native';

const primaryRedColor = '#DC143C';
const secondaryRedColor = 'rgba(220, 20, 60, 0.1)';
const primaryBlackColor = '#515151';
const secondaryBlackColor = '#818181';

export const appThemeReactNavigation = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: primaryRedColor,
    text: primaryBlackColor,
    background: 'transparent',
  },
};

export const appTheme = {
  primaryRedColor,
  secondaryRedColor,
  primaryBlackColor,
  secondaryBlackColor,
  borderRadius: 5,
  btnBackgroundShadow: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containerBackgroundShadow: {
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
};
