import * as React from 'react';
import { Dispatch, useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Ionicons } from '@expo/vector-icons';
import { appTheme } from '../../theme';
import { styles } from './input-modal.style';
import { Button, ButtonSize } from '../button/button';
import { Modal } from './modal';
import {
  formatNumberWithSpaceSeparator,
  removeSpaceSeparator,
} from '@nsc/shared/src/helpers';
import { useObserver } from 'mobx-react';

interface InputModalProps {
  defaultValue: string;
  setValue: Dispatch<string>;
  error?: string;
  isValid?(value: number): boolean;
  closeModal(): void;
}

export const InputModal: React.FC<InputModalProps> = ({
  defaultValue,
  setValue,
  error = '',
  isValid = () => true,
  closeModal,
}) => {
  const [tempValue, setTempValue] = useState(
    removeSpaceSeparator(defaultValue),
  );
  const saveAndClose = useCallback(() => {
    if (isValid(parseFloat(tempValue))) {
      setValue(formatNumberWithSpaceSeparator(tempValue));
      closeModal();
    }
  }, [closeModal, isValid, setValue, tempValue]);

  return useObserver(() => (
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
          <View
            style={[styles.inputContainer, error ? styles.redBorderColor : {}]}
          >
            {/* Text input */}
            <View style={styles.textContainer}>
              <TextInput
                value={tempValue}
                onChangeText={setTempValue}
                keyboardType="numeric"
                style={styles.text}
                onSubmitEditing={saveAndClose}
                maxLength={9}
                selectTextOnFocus
                autoFocus
              />
            </View>
          </View>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  ));
};
