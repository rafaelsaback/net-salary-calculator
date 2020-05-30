import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../../theme';

export const closeIconSize = '40rem';
export const styles = EStyleSheet.create({
  $closeIconPadding: '15rem',
  $closeIconSize: closeIconSize,
  $marginHorizontal: '10rem',
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  topRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: appTheme.borderRadius,
    marginHorizontal: '$marginHorizontal',
    borderWidth: 1,
  },
  redBorderColor: {
    borderColor: appTheme.primaryRedColor,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: '60rem',
    color: appTheme.primaryBlackColor,
  },
  errorContainer: {
    marginHorizontal: '$marginHorizontal',
    marginTop: '5rem',
  },
  errorText: {
    color: appTheme.primaryRedColor,
    fontSize: '14rem',
  },
  closeIcon: {
    paddingRight: '$closeIconPadding',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: { paddingVertical: '9rem', paddingHorizontal: '15rem' },
  saveButton: { marginTop: '10rem', marginRight: '15rem' },
});
