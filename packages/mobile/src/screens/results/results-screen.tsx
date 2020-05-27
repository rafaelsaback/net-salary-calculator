import * as React from 'react';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenName } from '../../types';
import { Container } from '../../components/container/container';
import { Button, ButtonSize } from '../../components/button/button';
import { PeriodSelector } from '../../components/period-selector/period-selector';
import { Period } from '@nsc/shared/src/types';
import { SalaryDisplay } from './components/salary-display';
import { styles } from './results-screen.style';

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
      <View>
        <Text style={styles.title}>Net Salary</Text>
        <SalaryDisplay salary="7100" />
      </View>
      <PeriodSelector value={period} onChange={setPeriod} />
      <Text>Pie Chart</Text>
      <Button
        onPress={() => props.navigation.navigate(ScreenName.DetailedResults)}
        size={ButtonSize.Large}
      >
        Detailed Results
      </Button>
    </Container>
  );
};
