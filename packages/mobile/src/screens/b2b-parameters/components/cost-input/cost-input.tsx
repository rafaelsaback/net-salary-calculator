import React, { Dispatch, useState } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { appTheme } from '../../../../theme';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AntDesign } from '@expo/vector-icons';
import { InputModal } from '../../../../components/input-modal/input-modal';
import { styles } from './cost-input.style';
import { Popover } from '../../../../components/popover/popover';

interface CostInputProps {
  costs: string;
  setCosts: Dispatch<string>;
}

export const CostInput: React.FC<CostInputProps> = ({ costs, setCosts }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clearCosts, setClearCosts] = useState(false);
  const [error, setError] = useState('');

  const showModal = () => setIsModalVisible(true);
  const clearCostAndShowModal = () => {
    setClearCosts(true);
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setClearCosts(false);
    setIsModalVisible(false);
  };
  const isValid = (costs: number) => {
    if (costs < 0) {
      setError('The cost should be greater than zero');
      return false;
    }
    setError('');
    return true;
  };

  return (
    <View style={styles.container}>
      <View style={styles.textLabelContainer}>
        <Text style={styles.textLabel}>Costs</Text>
        <Popover
          tooltipContent={
            <Text>Costs associated with running your business</Text>
          }
        />
      </View>
      <View style={styles.inputContainer}>
        {isModalVisible && (
          <InputModal
            defaultValue={clearCosts ? '' : costs}
            closeModal={closeModal}
            setValue={setCosts}
            error={error}
            isValid={isValid}
          />
        )}
        <Text style={styles.currency}>PLN</Text>
        <TouchableWithoutFeedback onPress={showModal}>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>{costs}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={clearCostAndShowModal}>
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
