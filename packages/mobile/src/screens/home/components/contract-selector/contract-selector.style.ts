import { appTheme } from '../../../../theme';
import EStyleSheet from 'react-native-extended-stylesheet';

export const contractSelectorStyles = EStyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '165rem',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1.5,
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
    height: '48rem',
    width: '40rem',
  },
  employeeImg: {
    height: '45rem',
    width: '39rem',
  },
  arrowImg: {
    height: '15rem',
    width: '15rem',
  },
});
