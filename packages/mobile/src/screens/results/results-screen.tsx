import * as React from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenName } from '../../types';
import { Button, ButtonSize } from '../../components/button/button';
import { SalaryDisplay } from './components/salary-display/salary-display';
import { styles } from './results-screen.style';
import { RouteProp } from '@react-navigation/native';
import { useObserver } from 'mobx-react';
import { ResultPeriod } from '../detailed-results/detailed-results-screen';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ScreenName.Results
>;

export type ResultsScreenRouteProp = RouteProp<
  RootStackParamList,
  ScreenName.Results
>;

interface ResultsScreenProps {
  navigation: ProfileScreenNavigationProp;
  route: ResultsScreenRouteProp;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  navigation,
  route,
}) => {
  const { serializedModel } = route.params;
  const { results, monthlySalary, annualSalary, contract } = serializedModel;

  const goToDetailedResultsScreen = () =>
    navigation.navigate(ScreenName.DetailedResults, {
      serializedModel,
    });

  return useObserver(() => (
    <View style={styles.container}>
      <SalaryDisplay
        salary={monthlySalary.formatted}
        takeHome={results.endSalary.monthly[0].formatted}
        title="1st Month"
        contract={contract}
        period={ResultPeriod.Monthly}
      />
      <SalaryDisplay
        salary={monthlySalary.formatted}
        takeHome={results.endSalary.monthlyAverage.formatted}
        title="12-Month Average"
        contract={contract}
        period={ResultPeriod.MonthlyAverage}
      />
      <SalaryDisplay
        salary={annualSalary.formatted}
        takeHome={results.endSalary.annually.formatted}
        title="Annually"
        contract={contract}
        period={ResultPeriod.Annually}
      />
      <Button
        onPress={goToDetailedResultsScreen}
        size={ButtonSize.Large}
        style={styles.button}
      >
        Salary Breakdown
      </Button>
    </View>
  ));
};
