import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../../../../theme';

export const styles = EStyleSheet.create({
  container: {
    marginHorizontal: '20rem',
  },
  textLabel: {
    fontWeight: 'bold',
    marginBottom: '10rem',
    color: appTheme.primaryBlackColor,
  },
  textLabelContainer: {
    flexDirection: 'row',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '40rem',
    borderBottomWidth: 1,
    borderColor: appTheme.secondaryBlackColor,
  },
  currency: {
    textAlign: 'center',
    marginLeft: '5rem',
    color: appTheme.secondaryBlackColor,
    fontSize: '16rem',
  },
  valueContainer: {
    alignItems: 'center',
  },
  value: {
    color: appTheme.primaryBlackColor,
    fontSize: '30rem',
  },
});
