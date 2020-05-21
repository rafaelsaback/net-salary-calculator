import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme, appThemeReactNavigation } from '../theme';

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
    width: '80rem',
    height: '36rem',
  },
  smallText: {
    fontSize: '16rem',
  },
  largeButton: {
    width: '160rem',
    height: '44rem',
  },
  largeText: {
    fontSize: '24rem',
  },
});
