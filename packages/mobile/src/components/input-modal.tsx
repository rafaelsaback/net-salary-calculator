import * as React from 'react';
import { Dispatch, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { appTheme } from '../theme';
import { closeIconSize, styles } from './input-modal.style';

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
  const saveAndClose = useCallback(
    (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      setValue(event.nativeEvent.text);
      closeModal();
    },
    [closeModal, setValue],
  );
  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: 'height' })}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={() => closeModal()}>
        <View style={styles.backIcon}>
          <Ionicons
            name="md-arrow-round-back"
            size={EStyleSheet.value('50rem')}
            color={appTheme.primaryRedColor}
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
          <TextInput
            defaultValue={defaultValue}
            keyboardType="numeric"
            style={styles.text}
            onSubmitEditing={saveAndClose}
            autoFocus
          />
        </View>
        <TouchableWithoutFeedback>
          <View style={styles.closeIcon}>
            <AntDesign
              size={EStyleSheet.value(closeIconSize)}
              name="close"
              color={appTheme.secondaryBlackColor}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
};
