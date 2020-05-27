import * as React from 'react';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenName } from '../../types';
import { Container } from '../../components/containers/container';
import { Button, ButtonSize } from '../../components/button/button';
import { SalaryDisplay } from './components/salary-display/salary-display';
import { styles } from './results-screen.style';
import { SalaryPieChart } from './components/pie-chart/pie-chart';
import { PeriodSelector } from '../../components/period-selector/period-selector';
import { Period } from '@nsc/shared/src/types';
import { BottomContainer } from '../../components/containers/bottom-container';

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
    <>
      <Container>
        <View>
          <Text style={styles.title}>Net Salary</Text>
          <SalaryDisplay salary="7100" />
        </View>
        <SalaryPieChart
          data={[
            { label: 'Pension', value: 967 },
            { label: 'Disability', value: 150 },
            { label: 'Sickness', value: 245 },
            { label: 'Health', value: 777 },
            { label: 'Tax', value: 709 },
            { label: 'Net Salary', value: 7143 },
          ].sort(({ value: valueA }, { value: valueB }) => valueB - valueA)}
        />
        <Button
          onPress={() => props.navigation.navigate(ScreenName.DetailedResults)}
          size={ButtonSize.Large}
        >
          Detailed Results
        </Button>
      </Container>
      <BottomContainer>
        <PeriodSelector value={period} onChange={setPeriod} />
      </BottomContainer>
    </>
  );
};
