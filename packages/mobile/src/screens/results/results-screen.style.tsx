import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../../theme';

export const styles = EStyleSheet.create({
  container: {
    ...appTheme.bodyContainer,
  },
  title: {
    ...appTheme.title,
    marginBottom: '5rem',
  },
  subTitle: {
    color: appTheme.secondaryBlackColor,
    textAlign: 'center',
    fontSize: '16rem',
  },
  button: {
    marginTop: '20rem',
  },
});
