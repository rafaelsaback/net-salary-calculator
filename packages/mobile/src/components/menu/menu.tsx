import React from 'react';
import { Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import EStyleSheet from 'react-native-extended-stylesheet';
import { styles } from './menu.style';
import { PopupContainer } from '../popup-container/popup-container';
import { appTheme } from '../../theme';

interface MenuProps {
  tintColor?: string;
}

export const Menu: React.FC<MenuProps> = ({ tintColor }) => {
  const sendEmail = () => Linking.openURL('mailto:rafaelsaback@gmail.com');
  const rateApp = () =>
    Linking.openURL('market://details?id=com.rsdev.salarycalculatorforpoland');

  return (
    <PopupContainer
      popupContent={
        <View style={styles.menu}>
          <TouchableOpacity onPress={sendEmail}>
            <View style={styles.menuItem}>
              <Entypo
                name="mail"
                size={EStyleSheet.value('22rem')}
                color={appTheme.secondaryBlackColor}
              />
              <Text style={styles.text}>Contact us</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={rateApp}>
            <View style={styles.menuItem}>
              <MaterialIcons
                name="rate-review"
                size={EStyleSheet.value('22rem')}
                color={appTheme.secondaryBlackColor}
              />
              <Text style={styles.text}>Rate us</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Text style={styles.footText}>Made with</Text>
            <Image
              style={{ width: 10, height: 9, margin: 2 }}
              source={require('@assets/heart.png')}
            />
            <Text style={styles.footText}>by </Text>
            <Text style={styles.footText}>a </Text>
            <Text style={styles.footText}>Brazilian </Text>
            <Text style={styles.footText}>in </Text>
            <Text style={styles.footText}>Poland. </Text>
            <Image
              style={{ width: 10, height: 8, margin: 2 }}
              source={require('@assets/brazil.png')}
            />
            <Image
              style={{ width: 10, height: 8, margin: 2 }}
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
