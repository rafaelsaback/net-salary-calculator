import { DefaultTheme } from '@react-navigation/native';

const primaryRedColor = '#DC143C';
const secondaryRedColor = '#FFE9ED';
const backgroundColor = '#ffffff';
const primaryBlackColor = '#515151';
const secondaryBlackColor = '#818181';
const lightGray = '#F4F4F4';
const containerBackgroundColor = 'white';

export const appThemeReactNavigation = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: primaryRedColor,
    text: primaryBlackColor,
    background: backgroundColor,
  },
};

export const appTheme = {
  primaryRedColor,
  secondaryRedColor,
  primaryBlackColor,
  secondaryBlackColor,
  containerBackgroundColor,
  lightGray,
  bodyContainer: {
    flex: 1,
    marginHorizontal: '15rem',
  },
  title: {
    textAlign: 'center',
    color: primaryBlackColor,
    fontSize: '20rem',
    fontWeight: 'bold',
    marginBottom: '15rem',
  },
  borderRadius: 5,
  btnBackgroundShadow: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
};
