import {
  UOPParams,
  B2BParams,
  IUOPSalaryResults,
  IB2BSalaryResults,
  ContractType,
} from '../interfaces';

export const SET_UOP_PARAMS = 'SET_UOP_PARAMS';
export const SET_B2B_PARAMS = 'SET_B2B_PARAMS';
export const SET_SALARY_RESULT = 'SET_SALARY_RESULT';
export const SET_CONTRACT_TYPE = 'SET_CONTRACT_TYPE';
export const SHOW_RESULTS = 'SHOW_RESULTS';
export const SET_SUBMITTED = 'SET_SUBMITTED';

export const setUOPParams = (uopParams: Partial<UOPParams>) => ({
  type: SET_UOP_PARAMS,
  uopParams,
});

export const setB2BParams = (b2bParams: Partial<B2BParams>) => ({
  type: SET_B2B_PARAMS,
  b2bParams,
});

export const setSalaryResult = (
  uopSalaryResults: IUOPSalaryResults,
  b2bSalaryResults: IB2BSalaryResults,
) => ({
  type: SET_SALARY_RESULT,
  uopSalaryResults,
  b2bSalaryResults,
});

export const setContractType = (contractType: ContractType) => ({
  type: SET_CONTRACT_TYPE,
  contractType,
});

export const showResults = () => ({
  type: SHOW_RESULTS,
  showResults: true,
});

export const setSubmitted = () => ({
  type: SET_SUBMITTED,
  submitted: true,
});
