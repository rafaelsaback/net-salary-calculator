import * as React from 'react';
import { Dispatch, useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
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
              name="md-arrow-round-back"
              size={EStyleSheet.value('50rem')}
              color={appTheme.primaryRedColor}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.saveButton}>
          <AntDesign.Button
            name="save"
            size={EStyleSheet.value('25rem')}
            color="white"
            style={{ backgroundColor: appTheme.primaryRedColor }}
            onPress={saveAndClose}
          >
            Save
          </AntDesign.Button>
        </View>
      </View>
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
