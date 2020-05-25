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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    height: '40rem',
    borderRadius: appTheme.borderRadius,
    borderWidth: 1,
    borderColor: appTheme.secondaryBlackColor,
  },
  currency: {
    flex: 1,
    textAlign: 'center',
    marginLeft: '5rem',
    color: appTheme.secondaryBlackColor,
    fontWeight: 'bold',
    fontSize: '16rem',
  },
  valueContainer: {
    flex: 4,
    alignItems: 'center',
  },
  value: {
    color: appTheme.primaryBlackColor,
    fontWeight: 'bold',
    fontSize: '26rem',
  },
  closeIcon: {
    padding: '5rem',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
