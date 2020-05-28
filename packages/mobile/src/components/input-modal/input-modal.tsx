import * as React from 'react';
import { Dispatch, useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { appTheme } from '../../theme';
import { closeIconSize, styles } from './input-modal.style';
import { Button, ButtonSize } from '../button/button';
import { Modal } from './modal';

interface InputModalProps {
  defaultValue: string;
  visible: boolean;
  setValue: Dispatch<string>;
  closeModal(): void;
}

export const InputModal: React.FC<InputModalProps> = ({
  defaultValue,
  visible,
  setValue,
  closeModal,
}) => {
  const [tempValue, setTempValue] = useState(defaultValue);
  const saveAndClose = useCallback(() => {
    setValue(tempValue);
    closeModal();
  }, [closeModal, setValue, tempValue]);
  return (
    <Modal
      animationType="fade"
      presentationStyle="fullScreen"
      visible={visible}
      transparent={false}
      onRequestClose={closeModal}
    >
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: 'height' })}
        style={styles.container}
      >
        <View style={styles.topRowContainer}>
          {/* Go back button */}
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.backIcon}>
              <Ionicons
                name={Platform.select({
                  ios: 'ios-arrow-back',
                  default: 'md-arrow-back',
                })}
                size={EStyleSheet.value('30rem')}
                color={appTheme.primaryRedColor}
              />
            </View>
          </TouchableWithoutFeedback>

          {/* Confirm button */}
          <View style={styles.saveButton}>
            <Button onPress={saveAndClose} size={ButtonSize.Small}>
              Confirm
            </Button>
          </View>
        </View>

        {/* Text input + clear button */}
        <View style={styles.flexContainer}>
          <View style={styles.inputContainer}>
            {/* Text input */}
            <View style={styles.textContainer}>
              <TextInput
                value={tempValue}
                onChangeText={setTempValue}
                keyboardType="numeric"
                style={styles.text}
                onSubmitEditing={saveAndClose}
                autoFocus
              />
            </View>

            {/* Clear button */}
            <TouchableWithoutFeedback onPress={() => setTempValue('')}>
              <View style={styles.closeIcon}>
                <AntDesign
                  size={EStyleSheet.value(closeIconSize)}
                  name="close"
                  color={appTheme.secondaryBlackColor}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
