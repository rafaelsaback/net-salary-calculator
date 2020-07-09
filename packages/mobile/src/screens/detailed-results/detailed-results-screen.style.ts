import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../../theme';

export const styles = EStyleSheet.create({
  viewContainer: {
    ...appTheme.bodyContainer,
  },
  titleContainer: {
    marginBottom: '10rem',
  },
  title: {
    ...appTheme.title,
    marginBottom: 0,
  },
});
