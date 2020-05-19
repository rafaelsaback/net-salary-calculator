import { View } from 'react-native';
import React, { Dispatch } from 'react';
import { styles } from './period-selector.style';
import { isAnnually, isMonthly, Period } from '../interfaces';
import { SelectorOption, SelectorPosition } from './selector-option';

interface PeriodSelectorProps {
  value: Period;
  onChange: Dispatch<Period>;
}

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  value,
  onChange,
}) => {
  const onMonthlyClick = () => onChange(Period.Monthly);
  const onAnnuallyClick = () => onChange(Period.Annually);

  return (
    <View style={styles.container}>
      <SelectorOption
        text="Monthly"
        active={isMonthly(value)}
        onPress={onMonthlyClick}
        position={SelectorPosition.Left}
      />
      <SelectorOption
        text="Annually"
        active={isAnnually(value)}
        onPress={onAnnuallyClick}
        position={SelectorPosition.Right}
      />
    </View>
  );
};
