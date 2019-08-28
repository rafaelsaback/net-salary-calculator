import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BOLD_BLACK, BORDER_RADIUS, BOX_SHADOW } from '../../helpers/consts';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

interface SummaryTableProps {
  label: string;
  salaryLabel: string;
  endSalaryLabel: string;
}

const useStyles = makeStyles({
  table: {
    overflowX: 'auto',
    minWidth: 280,
    maxWidth: 370,
    margin: 20,
    ...BORDER_RADIUS,
    ...BOX_SHADOW,
  },
  head: { '& *': { ...BOLD_BLACK, fontSize: '0.825rem' } },
  salaryRow: { '& *': { backgroundColor: '#f0f0f0' } },
});

const SummaryTable: FunctionComponent<SummaryTableProps> = ({
  label,
  salaryLabel,
  endSalaryLabel,
}) => {
  const classes = useStyles({});

  return (
    <Table className={classes.table}>
      <TableHead className={classes.head}>
        <TableRow>
          <TableCell align="center" colSpan={2}>
            {label}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow className={classes.salaryRow}>
          <TableCell align="left">{salaryLabel}</TableCell>
          <TableCell align="right">1000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Social security</TableCell>
          <TableCell align="right">1000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Health</TableCell>
          <TableCell align="right">1000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Tax</TableCell>
          <TableCell align="right">1000</TableCell>
        </TableRow>
        <TableRow className={classes.salaryRow}>
          <TableCell align="left">{endSalaryLabel}</TableCell>
          <TableCell align="right">1000</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default SummaryTable;
