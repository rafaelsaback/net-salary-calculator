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
import makeStyles from '@material-ui/styles/makeStyles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import classNames from 'classnames';
import { formatNumberWithSpaceSeparator } from '@nsc/shared/src/helpers';

interface MobileDetailedTableProps {
  header: string;
  salaryLabel: string;
  endSalaryLabel: string;
  salary: number;
  pension: number;
  disability: number;
  sickness: number;
  health: number;
  others: number;
  taxBase: number;
  tax: number;
  costs: number;
  endSalary: number;
}

const useStyles = makeStyles({
  table: {
    minWidth: 280,
    maxWidth: 370,
    marginBottom: '60px',
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
  },
});

const MobileDetailedTable: FunctionComponent<MobileDetailedTableProps> = ({
  header,
  salaryLabel,
  endSalaryLabel,
  salary,
  pension,
  disability,
  sickness,
  health,
  others,
  taxBase,
  tax,
  costs,
  endSalary,
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
            {header}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow className={classes.salaryRow}>
          <TableCell align="left">{salaryLabel}</TableCell>
          <TableCell className={classes.valueColumn} align="right">
            {formatNumberWithSpaceSeparator(salary)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Pension</TableCell>
          <TableCell className={classes.valueColumn} align="right">
            {formatNumberWithSpaceSeparator(pension)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Disability</TableCell>
          <TableCell className={classes.valueColumn} align="right">
            {formatNumberWithSpaceSeparator(disability)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Sickness</TableCell>
          <TableCell className={classes.valueColumn} align="right">
            {formatNumberWithSpaceSeparator(sickness)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Health</TableCell>
          <TableCell className={classes.valueColumn} align="right">
            {formatNumberWithSpaceSeparator(health)}
          </TableCell>
        </TableRow>
        {taxBase !== undefined && (
          <TableRow>
            <TableCell align="left">Tax base</TableCell>
            <TableCell className={classes.valueColumn} align="right">
              {formatNumberWithSpaceSeparator(taxBase)}
            </TableCell>
          </TableRow>
        )}
        {others !== undefined && (
          <TableRow>
            <TableCell align="left">Others</TableCell>
            <TableCell className={classes.valueColumn} align="right">
              {formatNumberWithSpaceSeparator(others)}
            </TableCell>
          </TableRow>
        )}
        <TableRow>
          <TableCell align="left">Tax</TableCell>
          <TableCell className={classes.valueColumn} align="right">
            {formatNumberWithSpaceSeparator(tax)}
          </TableCell>
        </TableRow>
        {costs !== undefined && (
          <TableRow>
            <TableCell align="left">Costs</TableCell>
            <TableCell className={classes.valueColumn} align="right">
              {formatNumberWithSpaceSeparator(costs)}
            </TableCell>
          </TableRow>
        )}
        <TableRow className={classes.salaryRow}>
          <TableCell align="left">{endSalaryLabel}</TableCell>
          <TableCell className={classes.valueColumn} align="right">
            {formatNumberWithSpaceSeparator(endSalary)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default MobileDetailedTable;
