import React, { FunctionComponent } from 'react';
import {
  BORDER_RADIUS,
  BOX_SHADOW,
  darkGray,
  mobileMediaValue,
  MONTHS,
  tabletMediaValue,
} from '../../helpers/consts';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { BaseSalaryResults, ContractType } from '../../interfaces';
import {
  calcTotal,
  formatNumber,
  isB2B,
  isB2BxSalaryResults,
  isUOP,
} from '../../helpers/utils';
import TableFooter from '@material-ui/core/TableFooter';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import makeStyles from '@material-ui/styles/makeStyles';
import classNames from 'classnames';
import MobileDetailedTable from './mobile-detailed-table';

interface DetailedTableProps {
  salaryLabel: string;
  othersLabel: string;
  endSalaryLabel: string;
  salaryResults: BaseSalaryResults;
  contractType: ContractType;
}

const useStyles = makeStyles({
  table: {
    overflowX: 'auto',
    margin: 20,
    maxWidth: 884,
    ...BORDER_RADIUS,
    ...BOX_SHADOW,
    '& *, & *:before, & *:after': { boxSizing: 'border-box' },
    '& th, & td': {
      width: '94px',
      padding: '8px 2px',
      wordWrap: 'break-word',
      color: darkGray,
    },
    '& th, & tfoot td': { fontWeight: 'bold', fontSize: '0.825rem' },
    '& *': { borderTop: 'none', borderLeft: 'none', borderRight: 'none' },
  },
  hideOnTablet: { display: 'none' },
});

const getTableHead = (
  salaryLabel: string,
  othersLabel: string,
  endSalaryLabel: string,
  classes: any,
  matchesTablet: boolean,
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
      <TableCell
        align="center"
        rowSpan={2}
        className={matchesTablet ? classes.hideOnTablet : ''}
      >
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
  salaryResults: BaseSalaryResults,
  classes: any,
  matchesTablet: boolean,
) => {
  const others = isB2BxSalaryResults(salaryResults)
    ? salaryResults.others
    : undefined;

  return (
    <TableBody>
      {MONTHS.map((month, i) => (
        <TableRow key={month}>
          <TableCell align="center">{month}</TableCell>
          <TableCell align="center">
            {formatNumber(salaryResults.salary)}
          </TableCell>
          <TableCell align="center">
            {formatNumber(salaryResults.pension[i])}
          </TableCell>
          <TableCell align="center">
            {formatNumber(salaryResults.disability[i])}
          </TableCell>
          <TableCell align="center">
            {formatNumber(salaryResults.sickness[i])}
          </TableCell>
          <TableCell align="center">
            {formatNumber(salaryResults.healthContribution[i])}
          </TableCell>
          <TableCell
            align="center"
            className={matchesTablet ? classes.hideOnTablet : ''}
          >
            {formatNumber(
              isUOP(contractType) ? salaryResults.taxBase[i] : others[i],
            )}
          </TableCell>
          <TableCell align="center">
            {formatNumber(salaryResults.tax[i])}
          </TableCell>
          <TableCell align="center">
            {formatNumber(salaryResults.endSalary[i])}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

const getTableFooter = (
  contractType: ContractType,
  salaryResults: BaseSalaryResults,
  classes: any,
  matchesTablet: boolean,
) => {
  const others = isB2BxSalaryResults(salaryResults)
    ? salaryResults.others
    : undefined;

  return (
    <TableFooter>
      <TableRow>
        <TableCell align="center">Total</TableCell>
        <TableCell align="center">
          {formatNumber(salaryResults.salary * 12)}
        </TableCell>
        <TableCell align="center">
          {formatNumber(calcTotal(salaryResults.pension))}
        </TableCell>
        <TableCell align="center">
          {formatNumber(calcTotal(salaryResults.disability))}
        </TableCell>
        <TableCell align="center">
          {formatNumber(calcTotal(salaryResults.sickness))}
        </TableCell>
        <TableCell align="center">
          {formatNumber(calcTotal(salaryResults.healthContribution))}
        </TableCell>
        <TableCell
          align="center"
          className={matchesTablet ? classes.hideOnTablet : ''}
        >
          {formatNumber(
            calcTotal(isUOP(contractType) ? salaryResults.taxBase : others),
          )}
        </TableCell>
        <TableCell align="center">
          {formatNumber(calcTotal(salaryResults.tax))}
        </TableCell>
        <TableCell align="center">
          {formatNumber(calcTotal(salaryResults.endSalary))}
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};

const getMobileTables = (
  contractType: ContractType,
  salaryResults: BaseSalaryResults,
  salaryLabel: string,
  endSalaryLabel: string,
) => {
  const others = isB2BxSalaryResults(salaryResults)
    ? salaryResults.others
    : undefined;

  return (
    <>
      {MONTHS.map((month, i) => (
        <MobileDetailedTable
          key={month}
          header={month}
          salaryLabel={salaryLabel}
          endSalaryLabel={endSalaryLabel}
          salary={salaryResults.salary}
          pension={salaryResults.pension[i]}
          disability={salaryResults.disability[i]}
          sickness={salaryResults.sickness[i]}
          health={salaryResults.healthContribution[i]}
          taxBase={isUOP(contractType) ? salaryResults.taxBase[i] : undefined}
          others={isB2B(contractType) ? others[i] : undefined}
          tax={salaryResults.tax[i]}
          costs={
            isB2BxSalaryResults(salaryResults) ? salaryResults.costs : undefined
          }
          endSalary={salaryResults.endSalary[i]}
        />
      ))}
      <MobileDetailedTable
        header="Total"
        salaryLabel={salaryLabel}
        endSalaryLabel={endSalaryLabel}
        salary={salaryResults.salary * 12}
        pension={calcTotal(salaryResults.pension)}
        disability={calcTotal(salaryResults.disability)}
        sickness={calcTotal(salaryResults.sickness)}
        health={calcTotal(salaryResults.healthContribution)}
        taxBase={
          isUOP(contractType) ? calcTotal(salaryResults.taxBase) : undefined
        }
        others={isB2B(contractType) ? calcTotal(others) : undefined}
        tax={calcTotal(salaryResults.tax)}
        costs={
          isB2BxSalaryResults(salaryResults)
            ? salaryResults.costs * 12
            : undefined
        }
        endSalary={calcTotal(salaryResults.endSalary)}
      />
    </>
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
  const matchesTablet = useMediaQuery(tabletMediaValue);
  const matchesMobile = useMediaQuery(mobileMediaValue);
  const tableClasses = classNames({
    [classes.table]: true,
  });

  return matchesMobile ? (
    getMobileTables(contractType, salaryResults, salaryLabel, endSalaryLabel)
  ) : (
    <Table className={tableClasses}>
      {getTableHead(
        salaryLabel,
        othersLabel,
        endSalaryLabel,
        classes,
        matchesTablet,
      )}
      {getTableBody(contractType, salaryResults, classes, matchesTablet)}
      {getTableFooter(contractType, salaryResults, classes, matchesTablet)}
    </Table>
  );
};

export default DetailedTable;
