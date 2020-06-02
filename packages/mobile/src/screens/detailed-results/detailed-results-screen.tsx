import * as React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { Container } from '../../components/containers/container';
import { BottomContainer } from '../../components/containers/bottom-container';
import { Selector } from '../../components/selector/selector';
import { createFontSizeStyle } from '../../helpers';
import { styles } from './detailed-results-screen.style';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, ScreenName } from '../../types';
import TableSwiper from './components/table-swiper';
import { SingleTable } from './components/single-table';

export type DetailedResultsScreenRouteProp = RouteProp<
  RootStackParamList,
  ScreenName.DetailedResults
>;

interface DetailedResultsScreenProps {
  route: DetailedResultsScreenRouteProp;
}

enum DisplayMode {
  Monthly = 'Monthly',
  MonthlyAverage = 'Monthly\nAverage',
  Annually = 'Annually',
}

const displayModeOptions = [
  DisplayMode.Monthly,
  DisplayMode.MonthlyAverage,
  DisplayMode.Annually,
];

export enum PeriodBreakdownKey {
  Monthly = 'monthly',
  MonthlyAverage = 'monthlyAverage',
  Annually = 'annually',
}

const periodBreakdownMap: Map<DisplayMode, PeriodBreakdownKey> = new Map([
  [DisplayMode.Monthly, PeriodBreakdownKey.Monthly],
  [DisplayMode.MonthlyAverage, PeriodBreakdownKey.MonthlyAverage],
  [DisplayMode.Annually, PeriodBreakdownKey.Annually],
]);

export const DetailedResultsScreen: React.FC<DetailedResultsScreenProps> = () => {
  const [displayMode, setDisplayMode] = useState(DisplayMode.Monthly);
  const periodBreakdown = periodBreakdownMap.get(displayMode)!;

  return (
    <View style={styles.container}>
      <Container>
        <TableSwiper visible={displayMode === DisplayMode.Monthly} />
        <SingleTable
          visible={displayMode !== DisplayMode.Monthly}
          periodBreakdown={periodBreakdown}
        />
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
