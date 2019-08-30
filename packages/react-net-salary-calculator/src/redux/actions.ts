import {
  UOPParams,
  B2BParams,
  UOPSalaryResults,
  B2BSalaryResults,
  ContractType,
} from '../interfaces';

export const SET_UOP_PARAMS = 'SET_UOP_PARAMS';
export const SET_B2B_PARAMS = 'SET_B2B_PARAMS';
export const SET_SALARY_RESULT = 'SET_SALARY_RESULT';
export const SET_CONTRACT_TYPE = 'SET_CONTRACT_TYPE';

export const setUOPParams = (uopParams: Partial<UOPParams>) => ({
  type: SET_UOP_PARAMS,
  uopParams,
});

export const setB2BParams = (b2bParams: Partial<B2BParams>) => ({
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

export const setContractType = (contractType: ContractType) => ({
  type: SET_CONTRACT_TYPE,
  contractType,
});
