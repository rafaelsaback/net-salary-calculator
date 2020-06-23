import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../../../../theme';

export const styles = EStyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  salaryContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    flex: 1,
  },
  currency: {
    fontSize: '32rem',
    color: appTheme.secondaryBlackColor,
  },
  value: {
    color: appTheme.primaryBlackColor,
    fontSize: '56rem',
    lineHeight: '66rem',
  },
  icon: {
    padding: '10rem',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
