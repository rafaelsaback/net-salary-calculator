import { DefaultTheme } from '@react-navigation/native';

const primaryColor = '#DC143C';
const primaryTextColor = '#515151';

export const appThemeReactNavigation = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: primaryColor,
    text: primaryTextColor,
    background: 'transparent',
  },
};

export const appTheme = {
  primaryColor,
  primaryTextColor,
  secondaryTextColor: '#818181',
  borderRadius: 10,
  btnBackgroundShadow: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  containerBackgroundShadow: {
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
};
