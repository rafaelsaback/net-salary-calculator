import EStyleSheet from 'react-native-extended-stylesheet';
import { appThemeReactNavigation } from '../../theme';

export const styles = EStyleSheet.create({
  container: {
    flex: 1,
    marginBottom: '20rem',
  },
  grossSalary: {
    textAlign: 'center',
    color: appThemeReactNavigation.colors.text,
    fontSize: '20rem',
    fontWeight: 'bold',
  },
  contractContainer: {
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '30rem',
  },
});
