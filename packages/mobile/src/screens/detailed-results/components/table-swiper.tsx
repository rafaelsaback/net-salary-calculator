import * as React from 'react';
import { useMemo } from 'react';
import { Platform, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { appTheme } from '../../../theme';
import { styles } from '../detailed-results-screen.style';
import { SalaryElement, Table } from './table';
import { DetailedResultsScreenRouteProp } from '../detailed-results-screen';
import { BaseSerializedModel } from '../../../types';

const SwiperPolyfill: React.FC<any> = ({ children }) => children[0];

const Swiper = Platform.select({
  ios: () => require('react-native-swiper'),
  android: () => require('react-native-swiper'),
  web: () => SwiperPolyfill,
})?.();

interface TableSwiperProps {
  visible: boolean;
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const TableSwiper: React.FC<TableSwiperProps> = ({ visible }) => {
  const { params } = useRoute<DetailedResultsScreenRouteProp>();
  const { uopSerializedModel } = params;
  const { results } = uopSerializedModel;

  const panels = useMemo(
    () =>
      MONTHS.map((month, index) => (
        <View key={index}>
          <Text style={styles.title}>{month}</Text>
          <Table
            salary={{
              label: 'Gross Salary',
              value: uopSerializedModel.salary.formatted,
            }}
            endSalary={{
              label: 'Net Salary',
              value: results.endSalary.monthly[index].formatted,
            }}
            salaryDiscounts={createUopSalaryDiscounts(results, index)}
          />
        </View>
      )),
    [results, uopSerializedModel.salary.formatted],
  );

  return visible ? (
    <Swiper
      loop={false}
      activeDotColor={appTheme.primaryRedColor}
      paginationStyle={{ bottom: 0 }}
      loadMinimal
    >
      {panels}
    </Swiper>
  ) : null;
};

const createUopSalaryDiscounts = (
  results: BaseSerializedModel['results'],
  index: number,
): SalaryElement[] => [
  {
    label: 'Pension',
    value: results.pension.monthly[index].formatted,
  },
  {
    label: 'Disability',
    value: results.disability.monthly[index].formatted,
  },
  {
    label: 'Sickness',
    value: results.sickness.monthly[index].formatted,
  },
  {
    label: 'Health',
    value: results.healthContribution.monthly[index].formatted,
  },
  {
    label: 'Tax',
    value: results.tax.monthly[index].formatted,
  },
];

export default TableSwiper;
