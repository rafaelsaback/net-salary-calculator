import { Map } from 'immutable';
import { SET_UOP_PARAMS, SET_B2B_PARAMS, SET_SALARY_RESULT } from './actions';
import { IStoreState, StoreState, CalculatorAction } from '../interfaces';
import {
  uopParams,
  b2bParams,
  uopSalaryResults,
  b2bSalaryResults,
} from '../consts';

const mergeUpdateState = (
  state: IStoreState,
  action: any,
  paramName: keyof StoreState,
): IStoreState => {
  const prevConfig = state.get(paramName, Map());
  return state.set(paramName, prevConfig.merge(action.uopParams));
};

const reducer = (state: IStoreState = Map(), action: CalculatorAction) => {
  switch (action.type) {
    case SET_UOP_PARAMS:
      return mergeUpdateState(state, action, uopParams);
    case SET_B2B_PARAMS:
      return mergeUpdateState(state, action, b2bParams);
    case SET_SALARY_RESULT:
      return state
        .set(uopSalaryResults, action.uopSalaryResults)
        .set(b2bSalaryResults, action.b2bSalaryResults);
  }
};

export default reducer;
