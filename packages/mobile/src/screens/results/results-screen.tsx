import * as React from 'react';
import { Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenName } from '../../types';
import { Container } from '../../components/container/container';
import { Button, ButtonSize } from '../../components/button/button';
import { PeriodSelector } from '../../components/period-selector/period-selector';
import { Period } from '@nsc/shared/src/types';
import { useState } from 'react';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ScreenName.Results
>;

interface ResultsScreenProps {
  navigation: ProfileScreenNavigationProp;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = (props) => {
  const [period, setPeriod] = useState(Period.Monthly);
  return (
    <Container>
      <Text>Net Salary</Text>
      <Text>7500</Text>
      <PeriodSelector value={period} onChange={setPeriod} />
      <Text>Pie Chart</Text>
      <Button
        onPress={() => props.navigation.navigate(ScreenName.MonthlyBreakdown)}
        size={ButtonSize.Large}
      >
        Monthly Breakdown
      </Button>
    </Container>
  );
};
