import { SET_UOP_PARAMS, SET_B2B_PARAMS, SET_SALARY_RESULT } from './actions';

const reducer = (state = {}, action: any) => {
  switch (action.type) {
    case SET_UOP_PARAMS:
      return { ...state, uopParams: action.uopParams };
    case SET_B2B_PARAMS:
      return { ...state, b2bParams: action.b2bParams };
    case SET_SALARY_RESULT:
      return {
        ...state,
        uopSalaryResults: action.uopSalaryResults,
        b2bSalaryResults: action.b2bSalaryResults,
      };
  }
};

export default reducer;