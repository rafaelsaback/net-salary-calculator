import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme, appThemeReactNavigation } from '../../theme';

export const styles = EStyleSheet.create({
  container: {
    flex: 1,
    marginVertical: '20rem',
  },
  salaryContainer: {
    flex: 1,
    justifyContent: 'space-around',
    marginHorizontal: '30rem',
    paddingVertical: '5rem',
    backgroundColor: appTheme.containerBackgroundColor,
    borderRadius: appTheme.borderRadius,
    ...appTheme.btnBackgroundShadow,
  },
  grossSalary: {
    textAlign: 'center',
    color: appThemeReactNavigation.colors.text,
    fontSize: '20rem',
    fontWeight: 'bold',
  },
  contractContainer: {
    flex: 0.7,
    marginTop: '20rem',
    justifyContent: 'space-between',
  },
});
