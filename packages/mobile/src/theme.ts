import { DefaultTheme } from '@react-navigation/native';

const primaryRedColor = '#DC143C';
const secondaryRedColor = '#FFE9ED';
const backgroundColor = '#ffffff';
const primaryBlackColor = '#515151';
const secondaryBlackColor = '#818181';
const tertiaryBlackColor = '#d1d1d1';
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
  tertiaryBlackColor,
  containerBackgroundColor,
  lightGray,
  bodyContainer: {
    flex: 1,
    marginHorizontal: '15rem',
  },
  title: {
    color: primaryBlackColor,
    fontSize: '20rem',
    fontWeight: 'bold',
    marginBottom: '10rem',
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  borderRadius: 5,
  boxShadow: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
};
