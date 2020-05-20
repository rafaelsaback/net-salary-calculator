import { DefaultTheme } from '@react-navigation/native';

const primaryRedColor = '#DC143C';
const primaryBlackColor = '#515151';

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
  primaryBlackColor,
  secondaryBlackColor: '#818181',
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
