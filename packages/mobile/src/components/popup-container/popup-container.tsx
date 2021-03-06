import React, { useEffect, useState } from 'react';
import {
  Animated,
  Easing,
  GestureResponderEvent,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Modal } from '../input-modal/modal';
import { styles } from './popup-container.style';

export interface PopupContainerProps {
  popupContent: React.ReactNode;
}

export const PopupContainer: React.FC<PopupContainerProps> = ({
  popupContent,
  children,
}) => {
  const [isVisible, setVisible] = useState(false);
  const [layoutAnimation] = useState(
    () => new Animated.Value(EStyleSheet.value(0)),
  );
  const [opacityAnimation] = useState(
    () => new Animated.Value(EStyleSheet.value(1)),
  );

  const openPopup = () => setVisible(true);
  const closePopup = () => {
    layoutAnimation.setValue(0);
    setVisible(false);
  };
  const stopPropagation = (e: GestureResponderEvent) => e.stopPropagation();

  useEffect(() => {
    if (isVisible) {
      opacityAnimation.setValue(1);
      Animated.timing(layoutAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start();
    }
  }, [isVisible, layoutAnimation, opacityAnimation]);

  return (
    <>
      <Modal transparent={true} visible={isVisible} onRequestClose={closePopup}>
        <TouchableWithoutFeedback onPress={closePopup}>
          <View style={styles.dismissContainer}>
            <TouchableWithoutFeedback onPress={stopPropagation}>
              <Animated.View
                style={[
                  styles.animatedContainer,
                  {
                    maxWidth: layoutAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                    maxHeight: layoutAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '30%'],
                    }),
                    opacity: opacityAnimation,
                  },
                ]}
              >
                {popupContent}
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <TouchableOpacity onPress={openPopup}>{children}</TouchableOpacity>
    </>
  );
};
