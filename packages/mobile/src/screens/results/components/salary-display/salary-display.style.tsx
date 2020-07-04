import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../../../../theme';

export const styles = EStyleSheet.create({
  container: {
    paddingVertical: '10rem',
    justifyContent: 'space-around',
  },
  topContainer: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: '16rem',
    color: appTheme.primaryBlackColor,
    flex: 1,
    textAlign: 'center',
    paddingLeft: '20rem',
  },
  salaryContainer: {
    alignItems: 'center',
  },
  currency: {
    fontSize: '20rem',
    color: appTheme.secondaryBlackColor,
  },
  value: {
    color: appTheme.primaryBlackColor,
    fontSize: '50rem',
    lineHeight: '66rem',
  },
  icon: {
    padding: '10rem',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
