import * as React from 'react';
import { useState } from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { RouteProp } from '@react-navigation/native';

import { Container } from '../../components/containers/container';
import { BottomContainer } from '../../components/containers/bottom-container';
import { Selector } from '../../components/selector/selector';
import { styles } from './detailed-results-screen.style';
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

export enum ResultPeriod {
  Monthly = 'Monthly',
  MonthlyAverage = 'Monthly\nAverage',
  Annually = 'Annually',
}

const displayModeOptions = [
  ResultPeriod.Monthly,
  ResultPeriod.MonthlyAverage,
  ResultPeriod.Annually,
];

export enum PeriodBreakdownKey {
  Monthly = 'monthly',
  MonthlyAverage = 'monthlyAverage',
  Annually = 'annually',
}

const periodBreakdownMap: Map<ResultPeriod, PeriodBreakdownKey> = new Map([
  [ResultPeriod.Monthly, PeriodBreakdownKey.Monthly],
  [ResultPeriod.MonthlyAverage, PeriodBreakdownKey.MonthlyAverage],
  [ResultPeriod.Annually, PeriodBreakdownKey.Annually],
]);

export const DetailedResultsScreen: React.FC<DetailedResultsScreenProps> = ({
  route,
}) => {
  const { serializedModel } = route.params;
  const [displayMode, setDisplayMode] = useState(ResultPeriod.Monthly);
  const periodBreakdown = periodBreakdownMap.get(displayMode)!;

  return (
    <View style={styles.viewContainer}>
      <Container>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Take-home Breakdown</Text>
          <Text style={styles.subTitle}>{displayMode}</Text>
        </View>
        <TableSwiper
          serializedModel={serializedModel}
          visible={displayMode === ResultPeriod.Monthly}
        />
        <SingleTable
          serializedModel={serializedModel}
          visible={displayMode !== ResultPeriod.Monthly}
          periodBreakdown={periodBreakdown}
        />
      </Container>
      <BottomContainer>
        <Selector
          value={displayMode}
          options={displayModeOptions}
          onChange={setDisplayMode}
          containerStyle={{ alignSelf: 'center' }}
          fontSize={EStyleSheet.value('14rem')}
          width="92%"
        />
      </BottomContainer>
    </View>
  );
};
