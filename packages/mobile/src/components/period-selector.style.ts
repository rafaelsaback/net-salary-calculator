import { appTheme } from '../theme';
import EStyleSheet from 'react-native-extended-stylesheet';

export const styles = EStyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '40rem',
    width: '60%',
    maxWidth: 250,
    borderRadius: appTheme.borderRadius,
  },
});
