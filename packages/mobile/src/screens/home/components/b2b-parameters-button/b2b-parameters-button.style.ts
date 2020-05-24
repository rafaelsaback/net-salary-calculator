import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../../../../theme';

export const styles = EStyleSheet.create({
  button: {
    backgroundColor: 'white',
    height: '35rem',
    width: '180rem',
    borderWidth: 2,
    flexDirection: 'row',
  },
  enabledButton: {
    borderColor: appTheme.primaryRedColor,
  },
  disabledButton: {
    borderColor: appTheme.secondaryBlackColor,
  },
  icon: {
    marginRight: 5,
  },
  enabledIcon: {
    color: appTheme.primaryRedColor,
  },
  disabledIcon: {
    color: appTheme.secondaryBlackColor,
  },
  text: {
    fontWeight: 'bold',
  },
  enabledText: {
    color: appTheme.primaryRedColor,
  },
  disabledText: {
    color: appTheme.secondaryBlackColor,
  },
});
