import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  BORDER_RADIUS,
  BOX_SHADOW,
  darkGray,
  MONTHS,
} from '../../helpers/consts';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TableFooter } from '@material-ui/core';
import { ContractType, SalaryResults } from '../../interfaces';
import {
  isUOP,
  isB2BSalaryResults,
  calcTotal,
  formatNumber,
} from '../../helpers/utils';

interface DetailedTableProps {
  salaryLabel: string;
  othersLabel: string;
  endSalaryLabel: string;
  salaryResults: SalaryResults;
  contractType: ContractType;
}

const useStyles = makeStyles({
  table: {
    overflowX: 'auto',
    margin: 20,
    maxWidth: 884,
    ...BORDER_RADIUS,
    ...BOX_SHADOW,
    '& th, & td': {
      width: '94px',
      padding: '8px 2px',
      wordWrap: 'break-word',
      color: darkGray,
    },
    '& th, & tfoot td': { fontWeight: 'bold', fontSize: '0.825rem' },
  },
});

const getTableHead = (
  salaryLabel: string,
  othersLabel: string,
  endSalaryLabel: string,
) => (
  <TableHead>
    <TableRow>
      <TableCell align="center" rowSpan={2}>
        Month
      </TableCell>
      <TableCell align="center" rowSpan={2}>
        {salaryLabel}
      </TableCell>
      <TableCell align="center" colSpan={4}>
        Insurance
      </TableCell>
      <TableCell align="center" rowSpan={2}>
        {othersLabel}
      </TableCell>
      <TableCell align="center" rowSpan={2}>
        Tax
      </TableCell>
      <TableCell align="center" rowSpan={2}>
        {endSalaryLabel}
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell align="center">Pension</TableCell>
      <TableCell align="center">Disability</TableCell>
      <TableCell align="center">Sickness</TableCell>
      <TableCell align="center">Health</TableCell>
    </TableRow>
  </TableHead>
);

const getTableBody = (
  contractType: ContractType,
  salaryResults: SalaryResults,
) => {
  const salary = salaryResults.get('salary');
  const pension = salaryResults.get('pension');
  const disability = salaryResults.get('disability');
  const sickness = salaryResults.get('sickness');
  const health = salaryResults.get('healthContribution');
  const taxBase = salaryResults.get('taxBase');
  const others = isB2BSalaryResults(salaryResults)
    ? salaryResults.get('others')
    : undefined;
  const tax = salaryResults.get('tax');
  const endSalary = salaryResults.get('endSalary');

  return (
    <TableBody>
      {MONTHS.map((month, i) => (
        <TableRow key={month}>
          <TableCell align="center">{month}</TableCell>
          <TableCell align="center">{formatNumber(salary)}</TableCell>
          <TableCell align="center">{formatNumber(pension.get(i))}</TableCell>
          <TableCell align="center">
            {formatNumber(disability.get(i))}
          </TableCell>
          <TableCell align="center">{formatNumber(sickness.get(i))}</TableCell>
          <TableCell align="center">{formatNumber(health.get(i))}</TableCell>
          <TableCell align="center">
            {formatNumber(isUOP(contractType) ? taxBase.get(i) : others.get(i))}
          </TableCell>
          <TableCell align="center">{formatNumber(tax.get(i))}</TableCell>
          <TableCell align="center">{formatNumber(endSalary.get(i))}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

const getTableFooter = (
  contractType: ContractType,
  salaryResults: SalaryResults,
) => {
  const salary = salaryResults.get('salary');
  const pension = salaryResults.get('pension');
  const disability = salaryResults.get('disability');
  const sickness = salaryResults.get('sickness');
  const health = salaryResults.get('healthContribution');
  const taxBase = salaryResults.get('taxBase');
  const others = isB2BSalaryResults(salaryResults)
    ? salaryResults.get('others')
    : undefined;
  const tax = salaryResults.get('tax');
  const endSalary = salaryResults.get('endSalary');

  return (
    <TableFooter>
      <TableRow>
        <TableCell align="center">Total</TableCell>
        <TableCell align="center">{formatNumber(salary * 12)}</TableCell>
        <TableCell align="center">{formatNumber(calcTotal(pension))}</TableCell>
        <TableCell align="center">
          {formatNumber(calcTotal(disability))}
        </TableCell>
        <TableCell align="center">
          {formatNumber(calcTotal(sickness))}
        </TableCell>
        <TableCell align="center">{formatNumber(calcTotal(health))}</TableCell>
        <TableCell align="center">
          {formatNumber(calcTotal(isUOP(contractType) ? taxBase : others))}
        </TableCell>
        <TableCell align="center">{formatNumber(calcTotal(tax))}</TableCell>
        <TableCell align="center">
          {formatNumber(calcTotal(endSalary))}
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};

const DetailedTable: FunctionComponent<DetailedTableProps> = ({
  salaryLabel,
  othersLabel,
  endSalaryLabel,
  contractType,
  salaryResults,
}) => {
  const classes = useStyles({});

  return (
    <Table className={classes.table}>
      {getTableHead(salaryLabel, othersLabel, endSalaryLabel)}
      {getTableBody(contractType, salaryResults)}
      {getTableFooter(contractType, salaryResults)}
    </Table>
  );
};

export default DetailedTable;
