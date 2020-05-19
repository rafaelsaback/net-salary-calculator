import { appTheme } from '../theme';
import EStyleSheet from 'react-native-extended-stylesheet';

export const styles = EStyleSheet.create({
  selectorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: appTheme.secondaryBlackColor,
  },
  leftContainer: {
    borderRightWidth: 0,
    borderTopLeftRadius: appTheme.borderRadius,
    borderBottomLeftRadius: appTheme.borderRadius,
  },
  middleContainer: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  rightContainer: {
    borderLeftWidth: 0,
    borderTopRightRadius: appTheme.borderRadius,
    borderBottomRightRadius: appTheme.borderRadius,
  },
  activeContainer: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: appTheme.primaryRedColor,
    backgroundColor: 'rgba(220, 20, 60, 0.1)',
  },
  text: {
    fontSize: '16rem',
    color: appTheme.secondaryBlackColor,
  },
  activeText: {
    fontWeight: 'bold',
    color: appTheme.primaryRedColor,
  },
});
