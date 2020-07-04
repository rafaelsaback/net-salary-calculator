import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../../../theme';

export const styles = EStyleSheet.create({
  title: {
    color: appTheme.primaryBlackColor,
    alignSelf: 'center',
    fontSize: '16rem',
    marginBottom: '8rem',
  },
  tableContainer: {
    flex: 1,
    paddingBottom: 25,
  },
  paginationStyle: {
    bottom: 0,
  },
});
