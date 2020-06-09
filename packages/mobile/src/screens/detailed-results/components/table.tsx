import * as React from 'react';
import { Text, View } from 'react-native';
import { styles } from './table.style';
import { appTheme } from '../../../theme';

export type SalaryElement = { label: string; value: string };

interface TableProps {
  salary: SalaryElement;
  endSalary: SalaryElement;
  salaryDiscounts: SalaryElement[];
}

export const Table: React.FC<TableProps> = ({
  salary,
  endSalary,
  salaryDiscounts,
}) => {
  const salaryElements = [salary, ...salaryDiscounts, endSalary];
  const lastIndex = salaryElements.length - 1;
  const hasManyRows = salaryDiscounts.length > 5;
  const rowContainerStyles = [
    styles.rowContainer,
    hasManyRows ? styles.rowContainerSmall : styles.rowContainerLarge,
  ];
  const textStyles = [
    styles.text,
    hasManyRows ? styles.textSmall : styles.textLarge,
  ];

  return (
    <View style={styles.container}>
      {salaryElements.map(({ label, value }, idx) => {
        const fontWeight = idx === 0 || idx === lastIndex ? 'bold' : 'normal';
        const backgroundColor =
          idx % 2 === 0 ? appTheme.secondaryRedColor : 'white';

        return (
          <View
            key={label}
            style={[...rowContainerStyles, { backgroundColor }]}
          >
            <View>
              <Text style={[...textStyles, { fontWeight }]}>{label}</Text>
            </View>
            <View>
              <Text style={[...textStyles, { fontWeight }]}>{value}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};
