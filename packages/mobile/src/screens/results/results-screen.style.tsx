import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../../theme';

export const styles = EStyleSheet.create({
  container: {
    ...appTheme.bodyContainer,
  },
  title: {
    ...appTheme.title,
  },
  bottomContainer: {
    flex: 'none',
    height: '70rem',
    padding: 0,
    justifyContent: 'center',
    marginTop: 0,
  },
});
