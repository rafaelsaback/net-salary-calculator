import { StyleSheet } from 'react-native';
import { appTheme } from '../../../theme';

export const contractSelectorStyles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginHorizontal: 30,
    height: 100,
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
    tintColor: 'gray',
    ...appTheme.btnBackgroundShadow,
  },
  activeImageContainer: {
    backgroundColor: '#E5F3FF',
  },
  inactiveImageContainer: {
    backgroundColor: '#F1F1F1',
  },
  text: {
    fontSize: 16,
  },
  activeText: {
    fontWeight: 'bold',
    color: appTheme.primaryBlackColor,
  },
  inactiveText: {
    color: appTheme.secondaryBlackColor,
  },
  buildingImg: {
    height: 55,
    width: 45,
  },
  arrowImg: {
    height: 25,
    width: 27,
  },
});
