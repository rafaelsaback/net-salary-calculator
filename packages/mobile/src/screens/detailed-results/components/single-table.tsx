import * as React from 'react';
import { SalaryElement, Table } from './table';
import { PeriodBreakdownKey } from '../detailed-results-screen';
import { BaseSerializedModel, ValueObject } from '../../../types';
import { View } from 'react-native';
import { styles } from './single-table.style';
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
  const { results, costs } = serializedModel;
  const salary =
    periodBreakdown === 'annually'
      ? serializedModel.annualSalary
      : serializedModel.monthlySalary;

  return visible ? (
    <View style={styles.container}>
      <Table
        salary={{
          label: 'Salary',
          value: salary.formatted,
        }}
        endSalary={{
          label: 'Take-home Pay',
          value: results.endSalary[periodBreakdown].formatted,
        }}
        salaryDiscounts={createSalaryDiscounts(results, costs, periodBreakdown)}
      />
    </View>
  ) : null;
};

const createSalaryDiscounts = (
  results: BaseSerializedModel['results'],
  costs: ValueObject,
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
          label: 'Labor Fund + Accident',
          value: results.others[periodBreakdown].formatted,
        },
      ]
    : []),
  {
    label: 'Tax',
    value: results.tax[periodBreakdown].formatted,
  },
];
