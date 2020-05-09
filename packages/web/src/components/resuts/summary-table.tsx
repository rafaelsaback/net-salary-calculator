import React, { FunctionComponent } from 'react';
import {
  BORDER_RADIUS,
  BOX_SHADOW,
  darkGray,
  mobileMediaValue,
} from '../../helpers/consts';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { formatNumber } from '../../helpers/utils';
import classNames from 'classnames';
import makeStyles from '@material-ui/styles/makeStyles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

interface SummaryTableProps {
  label: string;
  salaryLabel: string;
  endSalaryLabel: string;
  salary: number;
  socialSecurity: number;
  health: number;
  tax: number;
  endSalary: number;
  costs?: number;
}

const useStyles = makeStyles({
  table: {
    minWidth: 280,
    maxWidth: 370,
    margin: 20,
    ...BORDER_RADIUS,
    ...BOX_SHADOW,
    '& td, & th': { color: darkGray },
    '& th': { fontWeight: 'bold', fontSize: '0.825rem' },
    '& *': { borderTop: 'none', borderLeft: 'none', borderRight: 'none' },
  },
  valueColumn: { minWidth: '80px' },
  salaryRow: { '& *': { backgroundColor: '#f0f0f0' } },
  mobileTable: {
    width: '100%',
    margin: '0 auto 60px auto',
    '&:first-child': { marginTop: '60px' },
  },
});

const SummaryTable: FunctionComponent<SummaryTableProps> = ({
  label,
  salaryLabel,
  endSalaryLabel,
  salary,
  socialSecurity,
  health,
  tax,
  endSalary,
  costs,
}) => {
  const classes = useStyles({});
  const matchesMobile = useMediaQuery(mobileMediaValue);
  const tableClasses = classNames({
    [classes.table]: true,
    [classes.mobileTable]: matchesMobile,
  });

  return (
    <Table className={tableClasses}>
      <TableHead>
        <TableRow>
          <TableCell align="center" colSpan={2}>
            {label}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow className={classes.salaryRow}>
          <TableCell align="left">{salaryLabel}</TableCell>
          <TableCell className={classes.valueColumn} align="right">
            {formatNumber(salary)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Social security</TableCell>
          <TableCell className={classes.valueColumn} align="right">
            {formatNumber(socialSecurity)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Health</TableCell>
          <TableCell className={classes.valueColumn} align="right">
            {formatNumber(health)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Tax</TableCell>
          <TableCell className={classes.valueColumn} align="right">
            {formatNumber(tax)}
          </TableCell>
        </TableRow>
        {costs !== undefined && (
          <TableRow>
            <TableCell align="left">Costs</TableCell>
            <TableCell className={classes.valueColumn} align="right">
              {formatNumber(costs)}
            </TableCell>
          </TableRow>
        )}
        <TableRow className={classes.salaryRow}>
          <TableCell align="left">{endSalaryLabel}</TableCell>
          <TableCell className={classes.valueColumn} align="right">
            {formatNumber(endSalary)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default SummaryTable;
