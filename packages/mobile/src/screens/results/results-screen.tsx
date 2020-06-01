import * as React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  BaseSerializedModel,
  RootStackParamList,
  ScreenName,
  UOPSerializedModel,
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
import { ContractType } from '@nsc/shared/src/types';
import { PieChartData } from 'react-native-svg-charts';

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

export interface ResultsScreenOwnProps {
  uopSerializedModel: UOPSerializedModel;
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

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  navigation,
  route,
}) => {
  const { uopSerializedModel } = route.params;
  const { results } = uopSerializedModel;
  const [displayMode, setDisplayMode] = useState<string>(
    DisplayMode.FirstMonth,
  );
  return useObserver(() => (
    <View style={styles.container}>
      <Container>
        <SalaryDisplay salary={uopSerializedModel.salary.formatted} />
        <SalaryPieChart data={createPieChartData(results)} />
        <Button
          onPress={() => navigation.navigate(ScreenName.DetailedResults)}
          size={ButtonSize.Large}
        >
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

const createPieChartData = (
  results: BaseSerializedModel['results'],
): SalaryPieChartData[] => {
  return [
    { label: 'Pension', value: results.pension[0].value },
    { label: 'Disability', value: results.disability[0].value },
    { label: 'Sickness', value: results.sickness[0].value },
    { label: 'Health', value: results.healthContribution[0].value },
    { label: 'Tax', value: results.tax[0].value },
    { label: 'Net Salary', value: results.endSalary[0].value },
  ].sort(({ value: valueA }, { value: valueB }) => valueB - valueA);
};
