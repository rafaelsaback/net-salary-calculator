import { fromJS } from 'immutable';
import {
  IStoreState,
  Period,
  B2BTax,
  ZUS,
  Sickness,
  ContractType,
} from '../interfaces';

export const darkGray = '#444444';
export const BOLD_DARK_GRAY = { color: darkGray, fontWeight: 'bold' };
export const BOX_SHADOW = {
  boxShadow:
    '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
};

export const BORDER_RADIUS = { borderRadius: '0.5rem', overflow: 'hidden' };

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

export const desktopMediaValue = '(min-width:1150px)';
export const tabletMediaValue = '(max-width:900px)';
export const mobileMediaValue = '(max-width:550px)';

export const MONTHS = [
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
export const initialState: IStoreState = fromJS({
  contractType: ContractType.UOP,
  showResults: false,
  submitted: false,
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
    healthContribution: Array(12).fill(0),
    healthDeductible: Array(12).fill(0),
    taxBase: Array(12).fill(0),
    tax: Array(12).fill(0),
    endSalary: Array(12).fill(0),
  },
  b2bSalaryResults: {
    salary: 0,
    pension: Array(12).fill(0),
    disability: Array(12).fill(0),
    sickness: Array(12).fill(0),
    healthContribution: Array(12).fill(0),
    healthDeductible: Array(12).fill(0),
    laborFund: Array(12).fill(0),
    accident: Array(12).fill(0),
    others: Array(12).fill(0),
    taxBase: Array(12).fill(0),
    tax: Array(12).fill(0),
    endSalary: Array(12).fill(0),
  },
});

export const TAX_THRESHOLD = 85528;
export const HEALTH_CONTRIBUTION_RATE = 9 / 100;
export const HEALTH_DEDUCTIBLE_RATE = 7.75 / 100;
export const MONTHLY_RELIEF = 46.33;

// =====================================================
//                        UOP
// =====================================================

// Annual limit for pension and disability calculations
// Source: https://www.pit.pl/ograniczenia-skladek-zus/
export const ANNUAL_LIMIT = 156810;

// Koszt uzyskania przychodu
// Source: https://www.pit.pl/koszty-uzyskania-przychodu-pit/
export const EARNING_COST = 250;

export const DISABILITY_RATE = 1.5 / 100; // rentowe
export const PENSION_RATE = 9.76 / 100; // emerytalne
export const SICKNESS_RATE = 2.45 / 100; // chorobowe

export const RATE_17 = 0.17;
export const RATE_19 = 0.19;
export const RATE_32 = 0.32;

// Source: https://en.wikipedia.org/wiki/Minimum_wage_in_Poland
export const MINIMUM_WAGE = 2600;

// =====================================================
//                        B2B
// =====================================================

// Source: https://www.zus.pl/baza-wiedzy/skladki-wskazniki-odsetki/skladki/wysokosc-skladek-na-ubezpieczenia-spoleczne

export const HEALTH_INSURANCE = 362.34;

export const SMALL_ZUS = {
  PENSION: 152.26, // emerytalne
  DISABILITY: 62.4, // rentowe
  SICKNESS: 19.11, //chorobowe
  ACCIDENT: 13.02, // wypadkowe
};

export const NORMAL_ZUS = {
  PENSION: 612.19, // emerytalne
  DISABILITY: 250.9, // rentowe
  SICKNESS: 76.84, // chorobowe
  ACCIDENT: 52.37, // wypadkowe
  LABOR_FUND: 76.84, // fundusz pracy
};
