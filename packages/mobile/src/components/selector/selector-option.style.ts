import { appTheme } from '../../theme';
import EStyleSheet from 'react-native-extended-stylesheet';

export const styles = EStyleSheet.create({
  selectorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: appTheme.borderRadius,
  },
  activeContainer: {
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
