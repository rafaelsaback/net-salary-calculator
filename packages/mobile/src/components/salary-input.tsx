import React, { useState } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { appTheme } from '../theme';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './salary-input.style';
import { InputModal } from './input-modal';

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
      <InputModal
        defaultValue={clearSalary ? '' : salary}
        visible={isModalVisible}
        closeModal={closeModal}
        setValue={setSalary}
      />
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
