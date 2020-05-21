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
import { appTheme } from '../theme';
import { closeIconSize, styles } from './input-modal.style';
import { Button, ButtonSize } from './button';

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
  const [tempValue, setTempValue] = useState(defaultValue);
  const saveAndClose = useCallback(() => {
    setValue(tempValue);
    closeModal();
  }, [closeModal, setValue, tempValue]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: 'height' })}
      style={styles.container}
    >
      <View style={styles.topRowContainer}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.backIcon}>
            <Ionicons
              name="md-arrow-back"
              size={EStyleSheet.value('50rem')}
              color={appTheme.primaryRedColor}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.saveButton}>
          <Button
            text="Confirm"
            onPress={saveAndClose}
            size={ButtonSize.Small}
          />
        </View>
      </View>
      <View style={styles.flexContainer}>
        <View style={styles.inputContainer}>
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
  );
};
