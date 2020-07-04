import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../../../../theme';

export const styles = EStyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: '50rem',
    borderBottomWidth: 1,
    borderColor: appTheme.secondaryBlackColor,
  },
  currency: {
    color: appTheme.secondaryBlackColor,
    fontSize: '18rem',
  },
  value: {
    color: appTheme.primaryBlackColor,
    fontSize: '36rem',
  },
  errorContainer: {
    marginTop: '5rem',
    height: '10rem',
  },
  errorText: {
    color: appTheme.primaryRedColor,
    fontSize: '12rem',
  },
});
