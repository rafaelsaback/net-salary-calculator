import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../../../../theme';

export const styles = EStyleSheet.create({
  container: {
    marginHorizontal: '20rem',
  },
  textLabel: {
    fontWeight: 'bold',
    marginBottom: '10rem',
    color: appTheme.primaryBlackColor,
  },
  textLabelContainer: {
    flexDirection: 'row',
  },
});
