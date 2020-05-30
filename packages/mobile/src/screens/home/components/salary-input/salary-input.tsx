import React, { useState } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { appTheme } from '../../../../theme';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './salary-input.style';
import { InputModal } from '../../../../components/input-modal/input-modal';
import { MINIMUM_WAGE } from '@nsc/shared/src/consts';

export const SalaryInput: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [salary, setSalary] = useState('100000');
  const [clearSalary, setClearSalary] = useState(false);
  const [error, setError] = useState('');

  const showModal = () => setIsModalVisible(true);
  const clearSalaryAndShowModal = () => {
    setClearSalary(true);
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setClearSalary(false);
    setIsModalVisible(false);
  };

  const isValid = (salary: number) => {
    if (salary >= MINIMUM_WAGE) {
      setError('');
      return true;
    }

    setError(
      `The salary should be at least PLN ${MINIMUM_WAGE} (minimum wage)`,
    );
    return false;
  };

  return (
    <View style={styles.container}>
      {isModalVisible && (
        <InputModal
          defaultValue={clearSalary ? '' : salary}
          closeModal={closeModal}
          error={error}
          isValid={isValid}
          setValue={setSalary}
        />
      )}
      <Text style={styles.currency}>PLN</Text>
      <TouchableWithoutFeedback onPress={showModal}>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{salary}</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={clearSalaryAndShowModal}>
        <View style={styles.icon}>
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
