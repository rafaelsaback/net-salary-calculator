import { appTheme } from '../../theme';
import EStyleSheet from 'react-native-extended-stylesheet';

export const styles = EStyleSheet.create({
  selectorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: appTheme.secondaryBlackColor,
  },
  leftBorderRadius: {
    borderTopLeftRadius: appTheme.borderRadius,
    borderBottomLeftRadius: appTheme.borderRadius,
  },
  rightBorderRadius: {
    borderTopRightRadius: appTheme.borderRadius,
    borderBottomRightRadius: appTheme.borderRadius,
  },
  activeContainer: {
    borderColor: appTheme.primaryRedColor,
    backgroundColor: appTheme.secondaryRedColor,
  },
  text: {
    fontSize: '16rem',
    color: appTheme.secondaryBlackColor,
    textAlign: 'center',
  },
  activeText: {
    fontWeight: 'bold',
    color: appTheme.primaryRedColor,
  },
});
