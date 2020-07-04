import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../../../theme';

export const styles = EStyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '10%',
    borderRadius: appTheme.borderRadius,
    overflow: 'hidden',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '10rem',
    alignItems: 'center',
  },
  text: {
    color: appTheme.primaryBlackColor,
    fontSize: '15rem',
  },
});
