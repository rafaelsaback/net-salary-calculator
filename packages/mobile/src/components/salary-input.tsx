import React, { useState } from 'react';
import { Modal, Text, TouchableWithoutFeedback, View } from 'react-native';
import { appTheme } from '../theme';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './salary-input.style';
import { InputModal } from './input-modal';

export const SalaryInput: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const [salary, setSalary] = useState('100 000');
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        presentationStyle="fullScreen"
        visible={showModal}
        transparent={false}
        onRequestClose={() => setShowModal(false)}
      >
        <InputModal
          defaultValue={salary}
          closeModal={closeModal}
          setValue={setSalary}
        />
      </Modal>
      <Text style={styles.currency}>PLN</Text>
      <TouchableWithoutFeedback onPress={() => setShowModal(true)}>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{salary}</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setShowModal(true)}>
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
