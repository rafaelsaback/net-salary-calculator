import EStyleSheet from 'react-native-extended-stylesheet';
import { appTheme } from '../../theme';

export const styles = EStyleSheet.create({
  hamburgerIcon: {
    paddingVertical: '10rem',
    paddingHorizontal: '10rem',
  },
  menu: {
    maxWidth: '200rem',
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    paddingHorizontal: '20rem',
    paddingTop: '20rem',
    paddingBottom: '10rem',
    borderRadius: appTheme.borderRadius,
    shadowOffset: { width: -4, height: 4 },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  text: {
    fontSize: '20rem',
    marginBottom: '20rem',
  },
  footText: {
    fontSize: '12rem',
    textAlign: 'center',
    color: appTheme.secondaryBlackColor,
  },
});
