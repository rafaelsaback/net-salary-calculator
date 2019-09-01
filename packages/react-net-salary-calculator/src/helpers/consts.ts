import { fromJS } from 'immutable';
import { IStoreState, Period, B2BTax, ZUS, Sickness } from '../interfaces';

export const darkGray = '#444444';
export const BOLD_DARK_GRAY = { color: darkGray, fontWeight: 'bold' };
export const BOX_SHADOW = {
  boxShadow:
    '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
};

export const BORDER_RADIUS = { borderRadius: '0.5rem' };

export const LABELS = {
  UOP: {
    SALARY: 'Gross salary',
    END_SALARY: 'Net salary',
    SALARY_DTABLE: 'Gross salary',
    END_SALARY_DTABLE: 'Net salary',
    OTHERS: 'Tax base',
  },
  B2B: {
    SALARY: 'Net salary (from the invoice)',
    END_SALARY: 'Salary in hand',
    SALARY_DTABLE: 'Net salary from the invoice',
    END_SALARY_DTABLE: 'Salary in hand',
    OTHERS: 'Others',
  },
};

export const Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const uopParamsKey = 'uopParams';
export const b2bParamsKey = 'b2bParams';
export const uopSalaryResultsKey = 'uopSalaryResults';
export const b2bSalaryResultsKey = 'b2bSalaryResults';
export const contractTypeKey = 'contractType';

export const initialState: IStoreState = fromJS({
  uopParams: {
    salary: 0,
    period: Period.Monthly,
  },
  b2bParams: {
    salary: 0,
    period: Period.Monthly,
    tax: B2BTax.Linear,
    zus: ZUS.No,
    sickness: Sickness.No,
    costs: 0,
  },
  uopSalaryResults: {
    salary: 0,
    pension: Array(12).fill(0),
    disability: Array(12).fill(0),
    sickness: Array(12).fill(0),
    health: Array(12).fill(0),
    tax: Array(12).fill(0),
    taxBase: Array(12).fill(0),
    endSalary: Array(12).fill(0),
  },
  b2bSalaryResults: {
    salary: Array(12).fill(0),
    pension: Array(12).fill(0),
    disability: Array(12).fill(0),
    sickness: Array(12).fill(0),
    health: Array(12).fill(0),
    tax: Array(12).fill(0),
    taxBase: Array(12).fill(0),
    endSalary: Array(12).fill(0),
  },
});

export const TAX_THRESHOLD = 85528;
export const HEALTH_CONTRIBUTION_RATE = 9 / 100;
export const HEALTH_DEDUCTIBLE_RATE = 7.75 / 100;
export const MONTHLY_RELIEF = 46.33;

// UOP
export const ANNUAL_LIMIT = 133290; // Annual limit for pension and disability calculations
export const EARNING_COST = 111.25; // Koszt uzyskania przychodu
export const DISABILITY_RATE = 1.5 / 100; // rentowe
export const PENSION_RATE = 9.76 / 100; // emerytalne
export const SICKNESS_RATE = 2.45 / 100; // chorobowe

export const RATE_18 = 0.18;
export const RATE_32 = 0.32;
