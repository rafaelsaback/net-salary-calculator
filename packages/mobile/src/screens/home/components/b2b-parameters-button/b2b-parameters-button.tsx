import * as React from 'react';
import { Text } from 'react-native';
import { Button } from '../../../../components/button/button';
import { Octicons } from '@expo/vector-icons';
import { styles } from './b2b-parameters-button.style';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScreenName } from '../../../../types';
import {
  HomeScreenNavigationProp,
  HomeScreenRouteProp,
} from '../../home-screen';

interface B2BParametersButtonProps {
  disabled: boolean;
}

export const B2BParametersButton: React.FC<B2BParametersButtonProps> = ({
  disabled,
}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<HomeScreenRouteProp>();
  const { b2bParameters } = route.params;
  const buttonStyle = EStyleSheet.flatten([
    styles.button,
    disabled ? styles.disabledButton : styles.enabledButton,
  ]);
  const iconStyle = EStyleSheet.flatten([
    styles.icon,
    disabled ? styles.disabledIcon : styles.enabledIcon,
  ]);
  const textStyle = EStyleSheet.flatten([
    styles.text,
    disabled ? styles.disabledText : styles.enabledText,
  ]);
  return (
    <Button
      disabled={disabled}
      onPress={() =>
        navigation.navigate(ScreenName.B2BParameters, { b2bParameters })
      }
      style={buttonStyle}
    >
      <Octicons name="settings" size={18} style={iconStyle} />
      <Text style={textStyle}>B2B Parameters</Text>
    </Button>
  );
};
