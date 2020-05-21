import EStyleSheet from 'react-native-extended-stylesheet';

export const closeIconSize = '40rem';
export const styles = EStyleSheet.create({
  $closeIconPadding: '15rem',
  $closeIconSize: closeIconSize,
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  topRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // Centralizes input number despite the close icon
    marginLeft: '$closeIconSize + $closeIconPadding',
  },
  text: {
    fontSize: '60rem',
  },
  closeIcon: {
    paddingRight: '$closeIconPadding',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: { paddingVertical: '10rem', paddingHorizontal: '15rem' },
  saveButton: { marginTop: '15rem', marginRight: '15rem' },
});
