import {
  UOPParams,
  B2BParams,
  UOPSalaryResults,
  B2BSalaryResults,
} from '../interfaces';

export const SET_UOP_PARAMS = 'SET_UOP_PARAMS';
export const SET_B2B_PARAMS = 'SET_UOP_PARAMS';
export const SET_SALARY_RESULT = 'SET_SALARY_RESULT';

export const setUOPParams = (uopParams: UOPParams) => ({
  type: SET_UOP_PARAMS,
  uopParams,
});

export const setB2BParams = (b2bParams: B2BParams) => ({
  type: SET_B2B_PARAMS,
  b2bParams,
});

export const setSalaryResult = (
  uopSalaryResults: UOPSalaryResults,
  b2bSalaryResults: B2BSalaryResults,
) => ({
  type: SET_SALARY_RESULT,
  uopSalaryResults,
  b2bSalaryResults,
});
