import * as React from 'react';
import { SalaryElement, Table } from './table';
import { PeriodBreakdownKey } from '../detailed-results-screen';
import { BaseSerializedModel } from '../../../types';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { isB2bResultsModel } from '../../../helpers';

interface SingleTableProps {
  serializedModel: BaseSerializedModel;
  visible: boolean;
  periodBreakdown: PeriodBreakdownKey;
}

type MonthlyAverageOrAnnually =
  | PeriodBreakdownKey.MonthlyAverage
  | PeriodBreakdownKey.Annually;

export const SingleTable: React.FC<SingleTableProps> = (props) => {
  const { visible, serializedModel } = props;
  const periodBreakdown = props.periodBreakdown as MonthlyAverageOrAnnually;
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
  ...(isB2bResultsModel(results)
    ? [
        {
          label: 'Labor Fund',
          value: results.laborFund[periodBreakdown].formatted,
        },
        {
          label: 'Accident Insurance',
          value: results.accident[periodBreakdown].formatted,
        },
      ]
    : []),
  {
    label: 'Tax',
    value: results.tax[periodBreakdown].formatted,
  },
];
