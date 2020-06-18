import React, { Dispatch, useState } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { appTheme } from '../../../../theme';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './salary-input.style';
import { InputModal } from '../../../../components/input-modal/input-modal';
import { MINIMUM_WAGE } from '@nsc/shared/src/consts';
import { useObserver } from 'mobx-react';
import { Period } from '@nsc/shared/src/types';

interface SalaryInputProps {
  salary: string;
  setSalary: Dispatch<string>;
  period: Period;
}

export const SalaryInput: React.FC<SalaryInputProps> = ({
  salary,
  setSalary,
  period,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
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
    setError('');
  };

  const isValid = (salary: number) => {
    const adjustedMinimumWage =
      period === Period.Annually ? 12 * MINIMUM_WAGE : MINIMUM_WAGE;
    if (salary >= adjustedMinimumWage) {
      setError('');
      return true;
    }
    const periodStr = period === Period.Annually ? 'year' : 'month';

    setError(
      `The salary should be at least PLN ${adjustedMinimumWage} per ${periodStr} (minimum wage).`,
    );
    return false;
  };

  return useObserver(() => (
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
  ));
};
