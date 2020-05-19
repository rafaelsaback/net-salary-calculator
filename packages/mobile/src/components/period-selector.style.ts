import { StyleSheet } from 'react-native';
import { scale } from '../utils';
import { appTheme } from '../theme';

export const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    height: scale(40),
    width: '60%',
    maxWidth: 250,
    borderRadius: appTheme.borderRadius,
  },
});
