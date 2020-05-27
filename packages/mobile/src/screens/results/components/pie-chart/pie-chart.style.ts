import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../../../../theme';

export const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pieChart: {
    width: '175rem',
    height: '175rem',
  },
  legendContainer: {
    flex: 1,
  },
  legendRowContainer: {
    flexDirection: 'row',
    marginBottom: '5rem',
  },
  legendSquare: {
    width: '14rem',
    height: '14rem',
    borderRadius: '4rem',
    marginRight: '5rem',
  },
  legendText: {
    color: appTheme.primaryBlackColor,
    fontSize: '14rem',
  },
});
