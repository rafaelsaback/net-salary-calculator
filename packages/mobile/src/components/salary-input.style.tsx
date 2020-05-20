import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../theme';

export const styles = EStyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    height: '55rem',
    width: '80%',
    borderRadius: appTheme.borderRadius,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  currency: {
    flex: 1,
    textAlign: 'center',
    marginLeft: '5rem',
    color: appTheme.secondaryBlackColor,
    fontWeight: 'bold',
    fontSize: '18rem',
  },
  valueContainer: {
    flex: 4,
    alignItems: 'center',
  },
  value: {
    color: appTheme.primaryBlackColor,
    fontWeight: 'bold',
    fontSize: '30rem',
  },
  closeIcon: {
    padding: '5rem',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
