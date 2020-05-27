import * as React from 'react';
import { Text } from 'react-native';
import { Container } from '../../components/containers/container';
import { BottomContainer } from '../../components/containers/bottom-container';
import { PeriodSelector } from '../../components/period-selector/period-selector';
import { useState } from 'react';
import { Period } from '@nsc/shared/src/types';

interface MonthlyBreakdownScreenProps {}

export const MonthlyBreakdownScreen: React.FC<MonthlyBreakdownScreenProps> = (
  props,
) => {
  const [period, setPeriod] = useState(Period.Monthly);
  return (
    <>
      <Container>
        <Text>January</Text>
      </Container>
      <BottomContainer>
        <PeriodSelector value={period} onChange={setPeriod} />
      </BottomContainer>
    </>
  );
};
