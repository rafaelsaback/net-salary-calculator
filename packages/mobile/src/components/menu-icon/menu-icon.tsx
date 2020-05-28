import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import EStyleSheet from 'react-native-extended-stylesheet';
import { styles } from './menu-icon.style';

interface MenuIconProps {
  tintColor?: string;
}

export const MenuIcon: React.FC<MenuIconProps> = ({ tintColor }) => (
  <TouchableOpacity>
    <View style={styles.container}>
      <Entypo
        name="dots-three-vertical"
        size={EStyleSheet.value('30rem')}
        color={tintColor}
      />
    </View>
  </TouchableOpacity>
);
