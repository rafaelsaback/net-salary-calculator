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
import { AntDesign } from '@expo/vector-icons';
import { appTheme } from '../theme';

const closeIconSize = '40rem';
const styles = EStyleSheet.create({
  $closeIconPadding: '15rem',
  $closeIconSize: closeIconSize,
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // Centralizes input number despite the close icon
    marginLeft: '$closeIconSize + $closeIconPadding',
  },
  text: {
    fontSize: '60rem',
  },
  closeIcon: {
    paddingRight: '$closeIconPadding',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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
  const onKeyPress = useCallback(
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
      <View style={styles.textContainer}>
        <TextInput
          defaultValue={defaultValue}
          keyboardType="numeric"
          style={styles.text}
          onSubmitEditing={onKeyPress}
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
    </KeyboardAvoidingView>
  );
};
