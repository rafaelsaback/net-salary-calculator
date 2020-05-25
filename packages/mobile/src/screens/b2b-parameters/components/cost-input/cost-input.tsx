import React, { Dispatch, useState } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { appTheme } from '../../../../theme';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AntDesign } from '@expo/vector-icons';
import { InputModal } from '../../../../components/input-modal/input-modal';
import { styles } from './cost-input.style';

interface CostInputProps {
  costs: string;
  setCosts: Dispatch<string>;
}

export const CostInput: React.FC<CostInputProps> = ({ costs, setCosts }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clearCost, setClearCost] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const clearSalaryAndShowModal = () => {
    setClearCost(true);
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setClearCost(false);
    setIsModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textLabel}>Cost</Text>
      <View style={styles.inputContainer}>
        <InputModal
          defaultValue={clearCost ? '' : costs}
          visible={isModalVisible}
          closeModal={closeModal}
          setValue={setCosts}
        />
        <Text style={styles.currency}>PLN</Text>
        <TouchableWithoutFeedback onPress={showModal}>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>{costs}</Text>
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
