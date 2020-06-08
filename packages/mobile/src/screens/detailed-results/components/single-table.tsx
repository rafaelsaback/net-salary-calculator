import * as React from 'react';
import { SalaryElement, Table } from './table';
import {
  DetailedResultsScreenRouteProp,
  PeriodBreakdownKey,
} from '../detailed-results-screen';
import { useRoute } from '@react-navigation/native';
import { BaseSerializedModel } from '../../../types';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface SingleTableProps {
  visible: boolean;
  periodBreakdown: PeriodBreakdownKey;
}

type MonthlyAverageOrAnnually =
  | PeriodBreakdownKey.MonthlyAverage
  | PeriodBreakdownKey.Annually;

export const SingleTable: React.FC<SingleTableProps> = (props) => {
  const { visible } = props;
  const periodBreakdown = props.periodBreakdown as MonthlyAverageOrAnnually;
  const { params } = useRoute<DetailedResultsScreenRouteProp>();
  const { serializedModel } = params;
  const { results } = serializedModel;

  return visible ? (
    <View style={{ marginTop: EStyleSheet.value('42rem') }}>
      <Table
        salary={{
          label: 'Gross Salary',
          value: serializedModel.salary.formatted,
        }}
        endSalary={{
          label: 'Net Salary',
          value: results.endSalary[periodBreakdown].formatted,
        }}
        salaryDiscounts={createUopSalaryDiscounts(results, periodBreakdown)}
      />
    </View>
  ) : null;
};

const createUopSalaryDiscounts = (
  results: BaseSerializedModel['results'],
  periodBreakdown:
    | PeriodBreakdownKey.MonthlyAverage
    | PeriodBreakdownKey.Annually,
): SalaryElement[] => [
  {
    label: 'Pension',
    value: results.pension[periodBreakdown].formatted,
  },
  {
    label: 'Disability',
    value: results.disability[periodBreakdown].formatted,
  },
  {
    label: 'Sickness',
    value: results.sickness[periodBreakdown].formatted,
  },
  {
    label: 'Health',
    value: results.healthContribution[periodBreakdown].formatted,
  },
  {
    label: 'Tax',
    value: results.tax[periodBreakdown].formatted,
  },
];
