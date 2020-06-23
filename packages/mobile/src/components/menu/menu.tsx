import React from 'react';
import { Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import EStyleSheet from 'react-native-extended-stylesheet';
import { styles } from './menu.style';
import { PopupContainer } from '../popup-container/popup-container';

interface MenuProps {
  tintColor?: string;
}

export const Menu: React.FC<MenuProps> = ({ tintColor }) => {
  const sendEmail = () => Linking.openURL('mailto:rafaelsaback@gmail.com');
  return (
    <PopupContainer
      popupContent={
        <View style={styles.menu}>
          <TouchableOpacity onPress={sendEmail}>
            <Text style={styles.text}>Contact me</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.footText}>
              Made with love by a Brazilian in Poland.
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 5,
            }}
          >
            <Image
              style={{ width: 10, height: 7, margin: 2 }}
              source={require('@assets/brazil.png')}
            />
            <Image
              style={{ width: 10, height: 7, margin: 2 }}
              source={require('@assets/heart.png')}
            />
            <Image
              style={{ width: 10, height: 7, margin: 2 }}
              source={require('@assets/poland.png')}
            />
          </View>
        </View>
      }
    >
      <View style={styles.hamburgerIcon}>
        <Entypo
          name="dots-three-vertical"
          size={EStyleSheet.value('30rem')}
          color={tintColor}
        />
      </View>
    </PopupContainer>
  );
};
