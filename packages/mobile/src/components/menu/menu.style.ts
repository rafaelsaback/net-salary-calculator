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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '20rem',
  },
  text: {
    fontSize: '14rem',
    marginLeft: '10rem',
    color: appTheme.primaryBlackColor,
  },
  footText: {
    fontSize: '10rem',
    textAlign: 'center',
    color: appTheme.secondaryBlackColor,
  },
});
