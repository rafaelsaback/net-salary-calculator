import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../../theme';

export const styles = EStyleSheet.create({
  container: {
    ...appTheme.bodyContainer,
    marginBottom: '20rem',
  },
  title: {
    ...appTheme.title,
    alignSelf: 'flex-start',
    marginLeft: '10%',
    fontWeight: 'normal',
  },
  contractContainer: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
