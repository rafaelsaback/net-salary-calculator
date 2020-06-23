import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../../../../theme';

export const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pieChart: {
    width: '160rem',
    height: '160rem',
  },
  legendContainer: {
    flex: 1,
  },
  legendRowContainer: {
    flexDirection: 'row',
    marginBottom: '5rem',
    alignItems: 'center',
  },
  legendSquare: {
    width: '14rem',
    height: '14rem',
    borderRadius: '4rem',
    marginRight: '5rem',
  },
  legendText: {
    color: appTheme.secondaryBlackColor,
    fontSize: '14rem',
  },
});
