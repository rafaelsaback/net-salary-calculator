import React from 'react';
import { PieChart, PieChartData } from 'react-native-svg-charts';
import { Text, View } from 'react-native';
import { styles } from './pie-chart.style';

const colors = [
  '#DC143C',
  '#574240',
  '#BFA5A4',
  '#0088D9',
  '#00BEFF',
  '#008B3F',
];

export type SalaryPieChartData = { value: number; label: string };

interface SalaryPieChartProps {
  data: SalaryPieChartData[];
}

export const SalaryPieChart: React.FC<SalaryPieChartProps> = ({ data }) => {
  const total = data.reduce((res, { value }) => res + value, 0);
  const normalizedData = data.map(({ value, ...rest }) => ({
    ...rest,
    value: Math.round((100 * value) / total),
  }));
  return (
    <View style={styles.container}>
      <PieChart
        style={styles.pieChart}
        outerRadius={'70%'}
        innerRadius={10}
        data={normalizedData.map(createData)}
      />
      <View style={styles.legendContainer}>
        {normalizedData.map(({ label, value }, index) => (
          <View style={styles.legendRowContainer} key={label}>
            <View
              style={[styles.legendSquare, { backgroundColor: colors[index] }]}
            />
            <Text style={styles.legendText}>{`${label} (${value}%)`}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const createData = (
  { value }: SalaryPieChartData,
  index: number,
): PieChartData => ({
  key: index,
  value,
  svg: { fill: colors[index] },
});
