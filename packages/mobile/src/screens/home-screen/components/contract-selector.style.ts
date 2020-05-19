import { appTheme } from '../../../theme';
import EStyleSheet from 'react-native-extended-stylesheet';

export const contractSelectorStyles = EStyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginHorizontal: 30,
    height: '110rem',
  },
  textContainer: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: appTheme.borderRadius,
    ...appTheme.btnBackgroundShadow,
  },
  activeImageContainer: {
    backgroundColor: '#E5F3FF',
  },
  inactiveImageContainer: {
    backgroundColor: '#F1F1F1',
  },
  text: {
    fontSize: '14rem',
  },
  activeText: {
    fontWeight: 'bold',
    color: appTheme.primaryBlackColor,
  },
  inactiveText: {
    color: appTheme.secondaryBlackColor,
  },
  buildingImg: {
    height: '60rem',
    width: '50rem',
  },
  employeeImg: {
    height: '48rem',
    width: '41rem',
  },
  arrowImg: {
    height: '20rem',
    width: '21rem',
  },
});
