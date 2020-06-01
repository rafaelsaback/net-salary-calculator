import * as React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  RootStackParamList,
  ScreenName,
  UOPSerializedModel,
} from '../../types';
import { Container } from '../../components/containers/container';
import { Button, ButtonSize } from '../../components/button/button';
import { SalaryDisplay } from './components/salary-display/salary-display';
import { styles } from './results-screen.style';
import { SalaryPieChart } from './components/salary-pie-chart/salary-pie-chart';
import { BottomContainer } from '../../components/containers/bottom-container';
import { Selector } from '../../components/selector/selector';
import { createFontSizeStyle } from '../../helpers';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ScreenName.Results
>;

interface ResultsScreenProps {
  navigation: ProfileScreenNavigationProp;
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

export const ResultsScreen: React.FC<ResultsScreenProps> = (props) => {
  const [displayMode, setDisplayMode] = useState<string>(
    DisplayMode.FirstMonth,
  );
  return (
    <View style={styles.container}>
      <Container>
        <SalaryDisplay salary="7100" />
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
        <Selector
          value={displayMode}
          options={displayModeOptions}
          onChange={setDisplayMode}
          width="92%"
          fontSize={createFontSizeStyle([16, 14, 16])}
        />
      </BottomContainer>
    </View>
  );
};
