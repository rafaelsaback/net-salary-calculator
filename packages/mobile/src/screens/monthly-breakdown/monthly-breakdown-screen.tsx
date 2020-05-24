import * as React from 'react';
import { Text } from 'react-native';
import { Container } from '../../components/container/container';

interface MonthlyBreakdownScreenProps {}

export const MonthlyBreakdownScreen: React.FC<MonthlyBreakdownScreenProps> = (
  props,
) => {
  return (
    <Container>
      <Text>January</Text>
    </Container>
  );
};
