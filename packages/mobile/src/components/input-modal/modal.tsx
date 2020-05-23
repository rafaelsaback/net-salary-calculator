import { Platform } from 'react-native';

const Modal = Platform.select({
  ios: () => require('react-native').Modal,
  android: () => require('react-native').Modal,
  web: () => require('modal-react-native-web'),
})?.();

if (Platform.OS === 'web') {
  Modal.setAppElement('body'); // Avoids Portal's warning message
}

export { Modal };
