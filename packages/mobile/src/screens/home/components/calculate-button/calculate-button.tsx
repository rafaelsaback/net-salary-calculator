import * as React from 'react';
import { Button, ButtonSize } from '../../../../components/button/button';
import { styles } from './calculate-button.style';

interface CalculateButtonProps {
  disabled: boolean;
  onPress(): void;
}

export const CalculateButton: React.FC<CalculateButtonProps> = ({
  disabled,
  onPress,
}) => {
  return (
    <Button
      style={disabled ? styles.disabledButton : {}}
      disabled={disabled}
      onPress={onPress}
      size={ButtonSize.Medium}
    >
      Calculate
    </Button>
  );
};
