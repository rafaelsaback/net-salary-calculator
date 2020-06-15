import * as React from 'react';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  BaseSerializedModel,
  PeriodBreakdown,
  RootStackParamList,
  ScreenName,
} from '../../types';
import { Container } from '../../components/containers/container';
import { Button, ButtonSize } from '../../components/button/button';
import { SalaryDisplay } from './components/salary-display/salary-display';
import { styles } from './results-screen.style';
import {
  SalaryPieChart,
  SalaryPieChartData,
} from './components/salary-pie-chart/salary-pie-chart';
import { BottomContainer } from '../../components/containers/bottom-container';
import { Selector } from '../../components/selector/selector';
import { isB2bResultsModel } from '../../helpers';
import { RouteProp } from '@react-navigation/native';
import { useObserver } from 'mobx-react';

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

enum DisplayMode {
  FirstMonth = '1st Month',
  MonthlyAverage = 'Monthly Average',
  Annually = 'Annually',
}

const displayModeOptions = [
  DisplayMode.FirstMonth,
  DisplayMode.MonthlyAverage,
  DisplayMode.Annually,
];

const periodBreakdownMap: Map<DisplayMode, keyof PeriodBreakdown> = new Map([
  [DisplayMode.FirstMonth, 'monthly'],
  [DisplayMode.MonthlyAverage, 'monthlyAverage'],
  [DisplayMode.Annually, 'annually'],
]);

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  navigation,
  route,
}) => {
  const { serializedModel } = route.params;
  const { results, costs } = serializedModel;
  const [displayMode, setDisplayMode] = useState(DisplayMode.FirstMonth);
  const periodBreakdown = periodBreakdownMap.get(displayMode)!;
  const salary = selectFormatted(results.endSalary, periodBreakdown);

  const goToDetailedResultsScreen = () =>
    navigation.navigate(ScreenName.DetailedResults, {
      serializedModel,
    });

  return useObserver(() => (
    <View style={styles.container}>
      <Container>
        <View>
          <Text style={styles.title}>Take Home - {displayMode}</Text>
          <SalaryDisplay salary={salary} />
        </View>
        <SalaryPieChart
          data={createPieChartData(results, periodBreakdown, costs.value)}
        />
        <Button onPress={goToDetailedResultsScreen} size={ButtonSize.Large}>
          Detailed Results
        </Button>
      </Container>
      <BottomContainer>
        <Selector
          value={displayMode}
          options={displayModeOptions}
          onChange={setDisplayMode}
          width="92%"
        />
      </BottomContainer>
    </View>
  ));
};

const selectFormatted = (
  resultSummary: PeriodBreakdown,
  periodBreakdown: keyof PeriodBreakdown,
): string => {
  const result = resultSummary[periodBreakdown];
  return Array.isArray(result) ? result[0].formatted : result.formatted;
};

const selectValue = (
  resultSummary: PeriodBreakdown,
  periodBreakdown: keyof PeriodBreakdown,
): number => {
  const result = resultSummary[periodBreakdown];
  return Array.isArray(result) ? result[0].value : result.value;
};

const createPieChartData = (
  results: BaseSerializedModel['results'],
  periodBreakdown: keyof PeriodBreakdown,
  costs: number,
): SalaryPieChartData[] => {
  const isB2b = isB2bResultsModel(results);
  return [
    {
      label: 'Social Security',
      value: selectValue(results.socialSecurity, periodBreakdown),
    },
    {
      label: 'Health',
      value: selectValue(results.healthContribution, periodBreakdown),
    },
    {
      label: 'Tax',
      value: selectValue(results.tax, periodBreakdown),
    },
    ...(isB2b
      ? [
          {
            label: 'Costs',
            value: periodBreakdown === 'annually' ? 12 * costs : costs,
          },
        ]
      : []),
    {
      label: 'Take Home',
      value: selectValue(results.endSalary, periodBreakdown),
    },
  ].sort(({ value: valueA }, { value: valueB }) => valueB - valueA);
};
