import { StyleSheet } from 'react-native';
import { appTheme } from '../../../theme';
import { scale } from '../../../utils';

export const contractSelectorStyles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginHorizontal: 30,
    height: scale(100),
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
    fontSize: scale(13),
  },
  activeText: {
    fontWeight: 'bold',
    color: appTheme.primaryBlackColor,
  },
  inactiveText: {
    color: appTheme.secondaryBlackColor,
  },
  buildingImg: {
    height: scale(45),
    width: scale(38),
  },
  arrowImg: {
    height: scale(20),
    width: scale(21),
  },
});
