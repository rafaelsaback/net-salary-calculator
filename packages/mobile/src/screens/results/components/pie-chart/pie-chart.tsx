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

type SalaryPieChartData = { value: number; label: string };

interface SalaryPieChartProps {
  data: SalaryPieChartData[];
}

export const SalaryPieChart: React.FC<SalaryPieChartProps> = ({ data }) => {
  const total = data.reduce((res, { value }) => res + value, 0);
  return (
    <View style={styles.container}>
      <PieChart
        style={styles.pieChart}
        outerRadius={'70%'}
        innerRadius={10}
        data={data.map(createData)}
      />
      <View style={styles.legendContainer}>
        {data.map(({ label, value }, index) => (
          <View style={styles.legendRowContainer} key={label}>
            <View
              style={[styles.legendSquare, { backgroundColor: colors[index] }]}
            />
            <Text style={styles.legendText}>{`${label} (${calcPercentage(
              value,
              total,
            )})`}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const calcPercentage = (a: number, b: number): string =>
  `${Math.round((100 * a) / b)}%`;

const createData = (
  { value }: SalaryPieChartData,
  index: number,
): PieChartData => ({
  key: index,
  value,
  svg: { fill: colors[index] },
});
