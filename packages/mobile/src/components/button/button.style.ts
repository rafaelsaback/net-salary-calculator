import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme, appThemeReactNavigation } from '../../theme';

export const styles = EStyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: appThemeReactNavigation.colors.primary,
    borderRadius: appTheme.borderRadius,
    ...appTheme.btnBackgroundShadow,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  smallButton: {
    width: '70rem',
    height: '30rem',
  },
  mediumButton: {
    width: '140rem',
    height: '40rem',
  },
  largeButton: {
    width: '210rem',
    height: '40rem',
  },
  smallText: {
    fontSize: '14rem',
  },
  mediumText: {
    fontSize: '18rem',
  },
  largeText: {
    fontSize: '18rem',
  },
});
