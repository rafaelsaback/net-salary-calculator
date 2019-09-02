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
import makeStyles from '@material-ui/styles/makeStyles';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import classNames from 'classnames';

interface MobileDetailedTableProps {
  month: string;
  salaryLabel: string;
  endSalaryLabel: string;
  salary: number;
  pension: number;
  disability: number;
  sickness: number;
  health: number;
  others: number;
  tax: number;
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
  },
  salaryRow: { '& *': { backgroundColor: '#f0f0f0' } },
  mobileTable: {
    width: '100%',
    margin: '0 auto 60px auto',
  },
});

const MobileDetailedTable: FunctionComponent<MobileDetailedTableProps> = ({
  month,
  salaryLabel,
  endSalaryLabel,
  salary,
  pension,
  disability,
  sickness,
  health,
  others,
  tax,
  endSalary,
}) => {
  const classes = useStyles({});
  const matchesMobile = useMediaQuery(mobileMediaValue);
  const tableClasses = classNames({
    [classes.table]: true,
    [classes.mobileTable]: matchesMobile,
  });

  return (
    <Container>
      <Table className={tableClasses}>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={2}>
              {month}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={classes.salaryRow}>
            <TableCell align="left">{salaryLabel}</TableCell>
            <TableCell align="right">{formatNumber(salary)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Pension</TableCell>
            <TableCell align="right">{formatNumber(pension)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Disability</TableCell>
            <TableCell align="right">{formatNumber(disability)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Sickness</TableCell>
            <TableCell align="right">{formatNumber(sickness)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Health</TableCell>
            <TableCell align="right">{formatNumber(health)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Tax base</TableCell>
            <TableCell align="right">{formatNumber(others)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Tax</TableCell>
            <TableCell align="right">{formatNumber(tax)}</TableCell>
          </TableRow>
          <TableRow className={classes.salaryRow}>
            <TableCell align="left">{endSalaryLabel}</TableCell>
            <TableCell align="right">{formatNumber(endSalary)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
};

export default MobileDetailedTable;
