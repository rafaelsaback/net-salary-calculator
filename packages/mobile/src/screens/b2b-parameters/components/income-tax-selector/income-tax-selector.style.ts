import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../../../../theme';

export const styles = EStyleSheet.create({
  container: {
    marginHorizontal: '20rem',
    justifyContent: 'flex-start',
  },
  textLabel: {
    fontWeight: 'bold',
    marginBottom: '10rem',
    color: appTheme.primaryBlackColor,
  },
  textBold: {
    fontWeight: 'bold',
  },
  textLabelContainer: {
    flexDirection: 'row',
  },
});
