import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme, appThemeReactNavigation } from '../../theme';

export const styles = EStyleSheet.create({
  container: {
    flex: 1,
    marginVertical: '15rem',
  },
  salaryContainer: {
    flex: 1,
    justifyContent: 'space-around',
    marginHorizontal: '30rem',
    paddingVertical: '5rem',
    backgroundColor: appTheme.containerBackgroundColor,
    borderRadius: appTheme.borderRadius,
    ...appTheme.containerBackgroundShadow,
  },
  grossSalary: {
    textAlign: 'center',
    color: appThemeReactNavigation.colors.text,
    fontSize: '20rem',
    fontWeight: 'bold',
  },
  contractContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
});
