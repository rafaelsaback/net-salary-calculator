import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BORDER_RADIUS, BOX_SHADOW, darkGray } from '../../helpers/consts';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TableFooter } from '@material-ui/core';

interface DetailedTableProps {
  salaryLabel: string;
  othersLabel: string;
  endSalaryLabel: string;
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

const getTableBody = () => (
  <TableBody>
    <TableRow>
      <TableCell align="center">January</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
    </TableRow>
    <TableRow>
      <TableCell align="center">January</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
    </TableRow>
    <TableRow>
      <TableCell align="center">January</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
    </TableRow>
    <TableRow>
      <TableCell align="center">January</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
    </TableRow>
    <TableRow>
      <TableCell align="center">January</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
    </TableRow>
    <TableRow>
      <TableCell align="center">January</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
    </TableRow>
    <TableRow>
      <TableCell align="center">January</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
    </TableRow>
    <TableRow>
      <TableCell align="center">January</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
    </TableRow>
    <TableRow>
      <TableCell align="center">January</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
    </TableRow>
    <TableRow>
      <TableCell align="center">January</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
    </TableRow>
    <TableRow>
      <TableCell align="center">January</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
    </TableRow>
    <TableRow>
      <TableCell align="center">January</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
    </TableRow>
  </TableBody>
);

const getTableFooter = () => (
  <TableFooter>
    <TableRow>
      <TableCell align="center">Total</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
      <TableCell align="center">1000</TableCell>
    </TableRow>
  </TableFooter>
);

const DetailedTable: FunctionComponent<DetailedTableProps> = ({
  salaryLabel,
  othersLabel,
  endSalaryLabel,
}) => {
  const classes = useStyles({});

  return (
    <Table className={classes.table}>
      {getTableHead(salaryLabel, othersLabel, endSalaryLabel)}
      {getTableBody()}
      {getTableFooter()}
    </Table>
  );
};

export default DetailedTable;
