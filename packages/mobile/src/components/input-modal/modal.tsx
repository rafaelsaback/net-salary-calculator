import { ModalProps, Platform } from 'react-native';
import React from 'react';

const Modal: React.FC<ModalProps> = Platform.select({
  ios: () => require('react-native').Modal,
  android: () => require('react-native').Modal,
  web: () => require('modal-react-native-web'),
})?.();

if (Platform.OS === 'web') {
  // @ts-ignore
  Modal.setAppElement('body'); // Avoids Portal's warning message
}

export { Modal };
