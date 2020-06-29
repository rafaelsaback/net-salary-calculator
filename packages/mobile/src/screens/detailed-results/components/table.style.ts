import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../../../theme';

export const styles = EStyleSheet.create({
  container: {
    marginHorizontal: '10%',
    borderRadius: appTheme.borderRadius,
    overflow: 'hidden',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowContainerSmall: {
    padding: '11rem',
  },
  rowContainerLarge: {
    padding: '15rem',
  },
  text: {
    color: appTheme.primaryBlackColor,
  },
  textSmall: {
    fontSize: '15rem',
  },
  textLarge: {
    fontSize: '15rem',
  },
});
