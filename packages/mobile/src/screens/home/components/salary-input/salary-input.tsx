import React, { Dispatch, useState } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { styles } from './salary-input.style';
import { InputModal } from '../../../../components/input-modal/input-modal';
import { useObserver } from 'mobx-react';
import { Period } from '@nsc/shared/src/types';
import { validateSalary } from '../../../../helpers';

interface SalaryInputProps {
  salary: string;
  setSalary: Dispatch<string>;
  salaryError: string;
  period: Period;
}

export const SalaryInput: React.FC<SalaryInputProps> = ({
  salary,
  setSalary,
  salaryError,
  period,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clearSalary, setClearSalary] = useState(false);
  const [error, setError] = useState('');

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => {
    setClearSalary(false);
    setIsModalVisible(false);
    setError('');
  };

  return useObserver(() => (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={showModal}>
        <View style={styles.inputContainer}>
          {isModalVisible && (
            <InputModal
              defaultValue={clearSalary ? '' : salary}
              closeModal={closeModal}
              error={error}
              isValid={validateSalary(period, setError)}
              setValue={setSalary}
            />
          )}
          <Text>
            <Text style={styles.value}>{salary} </Text>
            <Text style={styles.currency}>zł</Text>
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{salaryError}</Text>
      </View>
    </View>
  ));
};
