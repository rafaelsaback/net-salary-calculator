import * as React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
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
import { createFontSizeStyle } from '../../helpers';
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
  MonthlyAverage = 'Monthly\nAverage',
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
  const { uopSerializedModel } = route.params;
  const { results } = uopSerializedModel;
  const [displayMode, setDisplayMode] = useState(DisplayMode.FirstMonth);
  const periodBreakdown = periodBreakdownMap.get(displayMode)!;
  const salary = selectFormatted(results.endSalary, periodBreakdown);

  const goToDetailedResultsScreen = () =>
    navigation.navigate(ScreenName.DetailedResults, {
      uopSerializedModel,
    });

  return useObserver(() => (
    <View style={styles.container}>
      <Container>
        <SalaryDisplay salary={salary} />
        <SalaryPieChart data={createPieChartData(results, periodBreakdown)} />
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
          fontSize={createFontSizeStyle([16, 14, 16])}
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
): SalaryPieChartData[] => {
  return [
    { label: 'Pension', value: selectValue(results.pension, periodBreakdown) },
    {
      label: 'Disability',
      value: selectValue(results.disability, periodBreakdown),
    },
    {
      label: 'Sickness',
      value: selectValue(results.sickness, periodBreakdown),
    },
    {
      label: 'Health',
      value: selectValue(results.healthContribution, periodBreakdown),
    },
    { label: 'Tax', value: selectValue(results.tax, periodBreakdown) },
    {
      label: 'Net Salary',
      value: selectValue(results.endSalary, periodBreakdown),
    },
  ].sort(({ value: valueA }, { value: valueB }) => valueB - valueA);
};
