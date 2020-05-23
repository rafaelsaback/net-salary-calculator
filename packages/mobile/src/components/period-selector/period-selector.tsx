import { View } from 'react-native';
import React, { Dispatch } from 'react';
import { styles } from './period-selector.style';
import { SelectorOption } from '../selector-option/selector-option';
import { Period } from '@nsc/shared/src/types';
import { isAnnually, isMonthly } from '@nsc/shared/src/type-helpers';

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
        atLeftHandSide
      />
      <SelectorOption
        text="Annually"
        active={isAnnually(value)}
        onPress={onAnnuallyClick}
        atRightHandSide
      />
    </View>
  );
};
