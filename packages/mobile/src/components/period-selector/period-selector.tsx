import React, { Dispatch } from 'react';
import { SelectorOption } from '../selector-option/selector-option';
import { Period } from '@nsc/shared/src/types';
import { isAnnually, isMonthly } from '@nsc/shared/src/type-helpers';
import { SelectorContainer } from '../selector-container/selector-container';

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
    <SelectorContainer>
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
    </SelectorContainer>
  );
};
