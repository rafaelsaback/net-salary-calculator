import * as React from 'react';
import { SalaryElement, Table } from './table';
import { PeriodBreakdownKey } from '../detailed-results-screen';
import { BaseSerializedModel, ValueObject } from '../../../types';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { isB2bResultsModel } from '../../../helpers';
import { formatNumberWithSpaceSeparator } from '@nsc/shared/src/helpers';

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
        {
          label: 'Costs',
          value:
            periodBreakdown === 'annually'
              ? formatNumberWithSpaceSeparator(12 * costs.value)
              : costs.formatted,
        },
      ]
    : []),
  {
    label: 'Tax',
    value: results.tax[periodBreakdown].formatted,
  },
];
