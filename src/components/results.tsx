import React, { FunctionComponent } from 'react';
import SummaryTable from './resuts/summary-table';
import { LABELS, mobileMediaValue, desktopMediaValue } from '../helpers/consts';
import DetailedTable from './resuts/detailed-table';
import { useSelector } from 'react-redux';
import { selectContractType, selectSalaryResults } from '../helpers/selectors';
import { calcAverage, isUOP, isB2BSalaryResults } from '../helpers/utils';
import classNames from 'classnames';
import makeStyles from '@material-ui/styles/makeStyles';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles({
  results: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    cursor: 'default',
  },
  summaryContainerDesktop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  summaryContainerTablet: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mobileContainer: {
    paddingLeft: 0,
    paddingRight: 0,
  },
});

const Results: FunctionComponent = () => {
  const classes = useStyles({});
  const matchesDesktop = useMediaQuery(desktopMediaValue);
  const matchesMobile = useMediaQuery(mobileMediaValue);
  const resultsContainerClasses = classNames({
    [classes.results]: true,
    [classes.mobileContainer]: matchesMobile,
  });
  const summaryContainerClasses = classNames({
    [classes.summaryContainerDesktop]: matchesDesktop,
    [classes.summaryContainerTablet]: !matchesDesktop,
    [classes.mobileContainer]: matchesMobile,
  });

  const contractType = useSelector(selectContractType);
  const salaryResults = useSelector(selectSalaryResults(contractType));
  const {
    SALARY,
    END_SALARY,
    SALARY_DTABLE,
    END_SALARY_DTABLE,
    OTHERS,
  } = isUOP(contractType) ? LABELS.UOP : LABELS.B2B;

  const socialSecurityAvg = calcAverage(salaryResults.get('socialSecurity'));
  const healthAvg = calcAverage(salaryResults.get('healthContribution'));
  const taxAvg = calcAverage(salaryResults.get('tax'));
  const endSalaryAvg = calcAverage(salaryResults.get('endSalary'));
  const costs = isB2BSalaryResults(salaryResults)
    ? salaryResults.get('costs')
    : undefined;

  return (
    <Container className={resultsContainerClasses}>
      <Container className={summaryContainerClasses}>
        <SummaryTable
          label="Summary - 1st month"
          salaryLabel={SALARY}
          endSalaryLabel={END_SALARY}
          salary={salaryResults.get('salary')}
          socialSecurity={salaryResults.get('socialSecurity').first()}
          health={salaryResults.get('healthContribution').first()}
          tax={salaryResults.get('tax').first()}
          endSalary={salaryResults.get('endSalary').first()}
          costs={costs}
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
          costs={costs}
        />
      </Container>
      <DetailedTable
        salaryLabel={SALARY_DTABLE}
        endSalaryLabel={END_SALARY_DTABLE}
        othersLabel={OTHERS}
        contractType={contractType}
        salaryResults={salaryResults}
      />
    </Container>
  );
};

export default Results;
