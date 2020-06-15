import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../../../theme';

export const styles = EStyleSheet.create({
  title: {
    color: appTheme.primaryBlackColor,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: '16rem',
    marginBottom: '10rem',
  },
  paginationStyle: {
    bottom: '-5rem',
  },
});
