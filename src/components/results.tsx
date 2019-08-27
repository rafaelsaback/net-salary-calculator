import React, { FunctionComponent } from 'react';
import SummaryTable from './resuts/summary-table';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { LABELS } from '../consts';
import DetailedTable from './resuts/detailed-table';

const useStyles = makeStyles({
  results: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  summary: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

const Results: FunctionComponent = () => {
  const classes = useStyles({});
  const isUOP = false;
  const { SALARY, END_SALARY, SALARY_DTABLE, END_SALARY_DTABLE, OTHERS } = isUOP
    ? LABELS.UOP
    : LABELS.B2B;

  return (
    <Container className={classes.results}>
      <Container className={classes.summary}>
        <SummaryTable
          label="Summary - 1st month"
          salaryLabel={SALARY}
          endSalaryLabel={END_SALARY}
        />
        <SummaryTable
          label="Summary - 12-month average"
          salaryLabel={SALARY}
          endSalaryLabel={END_SALARY}
        />
      </Container>
      <DetailedTable
        salaryLabel={SALARY_DTABLE}
        endSalaryLabel={END_SALARY_DTABLE}
        othersLabel={OTHERS}
      />
    </Container>
  );
};

export default Results;
