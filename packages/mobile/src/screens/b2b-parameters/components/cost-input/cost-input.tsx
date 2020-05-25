import React, { useState } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { appTheme } from '../../../../theme';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AntDesign } from '@expo/vector-icons';
import { InputModal } from '../../../../components/input-modal/input-modal';
import { styles } from './cost-input.style';

export const CostInput: React.FC = () => {
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
      <Text style={styles.textLabel}>Cost</Text>
      <View style={styles.inputContainer}>
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
    </View>
  );
};
