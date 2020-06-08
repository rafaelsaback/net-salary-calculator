import { fromJS } from 'immutable';
import { IStoreState } from '../interfaces';
import {
  B2bTax,
  ContractType,
  Period,
  Sickness,
  ZUS,
} from '@nsc/shared/src/types';

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
  contractType: ContractType.Employment,
  showResults: false,
  submitted: false,
  uopParams: {
    salary: 0,
    period: Period.Monthly,
  },
  b2bParams: {
    salary: 0,
    period: Period.Monthly,
    tax: B2bTax.Linear,
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

// =====================================================
//                        UOP
// =====================================================

// Annual limit for pension and disability calculations

// Koszt uzyskania przychodu

// =====================================================
//                        B2B
// =====================================================

// Source: https://www.zus.pl/baza-wiedzy/skladki-wskazniki-odsetki/skladki/wysokosc-skladek-na-ubezpieczenia-spoleczne
