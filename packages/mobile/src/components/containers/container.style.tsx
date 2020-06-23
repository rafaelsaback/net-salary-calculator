import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../../theme';

export const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: '20rem',
    paddingVertical: '25rem',
    backgroundColor: appTheme.containerBackgroundColor,
    borderRadius: appTheme.borderRadius,
    ...appTheme.boxShadow,
  },
});
