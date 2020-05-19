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
  selectorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: appTheme.secondaryBlackColor,
  },
  monthlyContainer: {
    borderRightWidth: 0,
    borderTopLeftRadius: appTheme.borderRadius,
    borderBottomLeftRadius: appTheme.borderRadius,
  },
  annuallyContainer: {
    borderLeftWidth: 0,
    borderTopRightRadius: appTheme.borderRadius,
    borderBottomRightRadius: appTheme.borderRadius,
  },
  activeContainer: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: appTheme.primaryRedColor,
    backgroundColor: 'rgba(220, 20, 60, 0.1)',
  },
  text: {
    fontSize: scale(16),
    color: appTheme.secondaryBlackColor,
  },
  activeText: {
    fontWeight: 'bold',
    color: appTheme.primaryRedColor,
  },
});
