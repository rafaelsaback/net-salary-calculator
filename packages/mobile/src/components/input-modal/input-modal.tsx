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
import {
  formatNumberWithSpaceSeparator,
  removeSpaceSeparator,
} from '@nsc/shared/src/helpers';

interface InputModalProps {
  defaultValue: string;
  setValue: Dispatch<string>;
  closeModal(): void;
}

export const InputModal: React.FC<InputModalProps> = ({
  defaultValue,
  setValue,
  closeModal,
}) => {
  const [tempValue, setTempValue] = useState(
    removeSpaceSeparator(defaultValue),
  );
  const saveAndClose = useCallback(() => {
    setValue(formatNumberWithSpaceSeparator(tempValue));
    closeModal();
  }, [closeModal, setValue, tempValue]);
  return (
    <Modal
      animationType="fade"
      presentationStyle="fullScreen"
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
                selectTextOnFocus
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
