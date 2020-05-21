import React, { useState } from 'react';
import { Platform, Text, TouchableWithoutFeedback, View } from 'react-native';
import { appTheme } from '../theme';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './salary-input.style';
import { InputModal } from './input-modal';

const Modal = Platform.select({
  ios: () => require('react-native').Modal,
  android: () => require('react-native').Modal,
  web: () => require('modal-react-native-web'),
})?.();

if (Platform.OS === 'web') {
  Modal.setAppElement('body'); // Avoids Portal's warning message
}

export const SalaryInput: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [salary, setSalary] = useState('100 000');
  const [clearSalary, setClearSalary] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const clearSalaryAndShowModal = () => {
    setClearSalary(true);
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setClearSalary(false);
    setIsModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        presentationStyle="fullScreen"
        visible={isModalVisible}
        transparent={false}
        onRequestClose={closeModal}
      >
        <InputModal
          defaultValue={clearSalary ? '' : salary}
          closeModal={closeModal}
          setValue={setSalary}
        />
      </Modal>
      <Text style={styles.currency}>PLN</Text>
      <TouchableWithoutFeedback onPress={showModal}>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{salary}</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={clearSalaryAndShowModal}>
        <View style={styles.closeIcon}>
          <AntDesign
            size={EStyleSheet.value('22rem')}
            name="close"
            color={appTheme.secondaryBlackColor}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
