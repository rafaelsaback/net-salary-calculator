import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../../../../theme';

export const styles = EStyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '55rem',
    width: '80%',
    borderBottomWidth: 1,
    borderColor: appTheme.secondaryBlackColor,
  },
  currency: {
    textAlign: 'center',
    marginLeft: '5rem',
    color: appTheme.secondaryBlackColor,
    fontSize: '18rem',
  },
  valueContainer: {
    alignItems: 'center',
  },
  value: {
    color: appTheme.primaryBlackColor,
    fontSize: '36rem',
  },
});
