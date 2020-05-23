import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../../theme';

export const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    marginHorizontal: '30rem',
    marginVertical: '20rem',
    backgroundColor: appTheme.containerBackgroundColor,
    borderRadius: appTheme.borderRadius,
    ...appTheme.btnBackgroundShadow,
  },
});
