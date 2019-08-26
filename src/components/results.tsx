import React, { FunctionComponent } from 'react';
import SummaryTable from './resuts/summary-table';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  SALARY_LABEL_UOP,
  SALARY_LABEL_B2B,
  END_SALARY_LABEL_UOP,
  END_SALARY_LABEL_B2B,
} from '../consts';

const useStyles = makeStyles({
  summary: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

const Results: FunctionComponent = () => {
  const classes = useStyles({});
  const isUOP = false;

  return (
    <>
      <Container className={classes.summary}>
        <SummaryTable
          label="Summary - 1st month"
          salaryLabel={isUOP ? SALARY_LABEL_UOP : SALARY_LABEL_B2B}
          endSalaryLabel={isUOP ? END_SALARY_LABEL_UOP : END_SALARY_LABEL_B2B}
        />
        <SummaryTable
          label="Summary - 12-month average"
          salaryLabel={isUOP ? SALARY_LABEL_UOP : SALARY_LABEL_B2B}
          endSalaryLabel={isUOP ? END_SALARY_LABEL_UOP : END_SALARY_LABEL_B2B}
        />
      </Container>
    </>
  );
};

export default Results;
