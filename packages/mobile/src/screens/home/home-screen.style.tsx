import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../../theme';

export const styles = EStyleSheet.create({
  container: {
    flex: 1,
    marginBottom: '20rem',
  },
  title: {
    ...appTheme.title,
  },
  contractContainer: {
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '30rem',
  },
});
