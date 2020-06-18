import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../../theme';

export const styles = EStyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: appTheme.borderRadius,
  },
  primaryButton: {
    backgroundColor: appTheme.primaryRedColor,
  },
  text: {
    fontWeight: 'bold',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: appTheme.primaryRedColor,
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
