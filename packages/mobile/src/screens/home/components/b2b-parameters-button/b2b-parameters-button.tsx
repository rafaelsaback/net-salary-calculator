import * as React from 'react';
import { Text } from 'react-native';
import { Button } from '../../../../components/button/button';
import { Octicons } from '@expo/vector-icons';
import { styles } from './b2b-parameters-button.style';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';
import { B2bParameters, ScreenName } from '../../../../types';
import { HomeScreenNavigationProp } from '../../home-screen';
import { useObserver } from 'mobx-react';

interface B2bParametersButtonProps {
  disabled: boolean;
  b2bParameters: B2bParameters;
  costs: string;
}

export const B2bParametersButton: React.FC<B2bParametersButtonProps> = ({
  disabled,
  b2bParameters,
  costs,
}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
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
  return useObserver(() => (
    <Button
      disabled={disabled}
      onPress={() =>
        navigation.navigate(ScreenName.B2bParameters, { b2bParameters, costs })
      }
      style={buttonStyle}
    >
      <Octicons name="settings" size={18} style={iconStyle} />
      <Text style={textStyle}>B2B Parameters</Text>
    </Button>
  ));
};
