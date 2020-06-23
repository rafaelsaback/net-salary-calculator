import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../../../../theme';

export const styles = EStyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '45rem',
    width: '80%',
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
});
