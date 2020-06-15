import * as React from 'react';
import { useMemo } from 'react';
import { Platform, Text, View } from 'react-native';
import { appTheme } from '../../../theme';
import { styles } from '../detailed-results-screen.style';
import { SalaryElement, Table } from './table';
import { BaseSerializedModel } from '../../../types';
import { isB2bResultsModel } from '../../../helpers';

const SwiperPolyfill: React.FC<any> = ({ children }) => children[0];

const Swiper = Platform.select({
  ios: () => require('react-native-swiper'),
  android: () => require('react-native-swiper'),
  web: () => SwiperPolyfill,
})?.();

interface TableSwiperProps {
  serializedModel: BaseSerializedModel;
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

const TableSwiper: React.FC<TableSwiperProps> = ({
  serializedModel,
  visible,
}) => {
  const { results, costs } = serializedModel;
  const isB2b = isB2bResultsModel(results);

  const panels = useMemo(
    () =>
      MONTHS.map((month, index) => (
        <View key={index}>
          <Text style={styles.title}>{month}</Text>
          <Table
            salary={{
              label: isB2b ? 'Salary (without VAT)' : 'Salary',
              value: serializedModel.salary.formatted,
            }}
            endSalary={{
              label: 'Take Home',
              value: results.endSalary.monthly[index].formatted,
            }}
            salaryDiscounts={createSalaryDiscounts(
              results,
              costs.formatted,
              index,
            )}
          />
        </View>
      )),
    [costs.formatted, isB2b, results, serializedModel.salary.formatted],
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

const createSalaryDiscounts = (
  results: BaseSerializedModel['results'],
  costs: string,
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
  ...(isB2bResultsModel(results)
    ? [
        {
          label: 'Labor Fund + Accident',
          value: results.others.monthly[index].formatted,
        },
        {
          label: 'Costs',
          value: costs,
        },
      ]
    : []),
  {
    label: 'Tax',
    value: results.tax.monthly[index].formatted,
  },
];

export default TableSwiper;
