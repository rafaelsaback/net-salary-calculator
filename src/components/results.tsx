import React, { FunctionComponent } from 'react';
import SummaryTable from './resuts/summary-table';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { LABELS } from '../helpers/consts';
import DetailedTable from './resuts/detailed-table';
import { useSelector } from 'react-redux';
import { selectContractType, selectSalaryResults } from '../helpers/selectors';
import { calcAverage } from '../helpers/utils';

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
  const contractType = useSelector(selectContractType);
  const salaryResults = useSelector(selectSalaryResults(contractType));
  const isUOP = false;
  const { SALARY, END_SALARY, SALARY_DTABLE, END_SALARY_DTABLE, OTHERS } = isUOP
    ? LABELS.UOP
    : LABELS.B2B;

  const socialSecurityAvg = calcAverage(salaryResults.get('socialSecurity'));
  const healthAvg = calcAverage(salaryResults.get('healthContribution'));
  const taxAvg = calcAverage(salaryResults.get('tax'));
  const endSalaryAvg = calcAverage(salaryResults.get('endSalary'));

  return (
    <Container className={classes.results}>
      <Container className={classes.summary}>
        <SummaryTable
          label="Summary - 1st month"
          salaryLabel={SALARY}
          endSalaryLabel={END_SALARY}
          salary={salaryResults.get('salary')}
          socialSecurity={salaryResults.get('socialSecurity').first()}
          health={salaryResults.get('healthContribution').first()}
          tax={salaryResults.get('tax').first()}
          endSalary={salaryResults.get('endSalary').first()}
        />
        <SummaryTable
          label="Summary - 12-month average"
          salaryLabel={SALARY}
          endSalaryLabel={END_SALARY}
          salary={salaryResults.get('salary')}
          socialSecurity={socialSecurityAvg}
          health={healthAvg}
          tax={taxAvg}
          endSalary={endSalaryAvg}
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
