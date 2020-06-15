import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../../theme';

export const styles = EStyleSheet.create({
  viewContainer: {
    ...appTheme.bodyContainer,
  },
  title: {
    ...appTheme.title,
  },
});
