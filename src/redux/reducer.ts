import { Map, fromJS, get } from 'immutable';
import { SET_UOP_PARAMS, SET_B2B_PARAMS, SET_SALARY_RESULT } from './actions';
import { IStoreState, StoreState, CalculatorAction } from '../interfaces';
import {
  uopParamsKey,
  b2bParamsKey,
  uopSalaryResultsKey,
  b2bSalaryResultsKey,
} from '../helpers/consts';

const mergeUpdateState = (
  state: IStoreState,
  action: any,
  paramsKey: keyof StoreState,
): IStoreState => {
  const prevConfig = state.get(paramsKey, Map());
  return state.set(
    paramsKey,
    prevConfig.merge(fromJS(get(action, paramsKey, {}))),
  );
};

const reducer = (state: IStoreState, action: CalculatorAction) => {
  switch (action.type) {
    case SET_UOP_PARAMS:
      return mergeUpdateState(state, action, uopParamsKey);
    case SET_B2B_PARAMS:
      return mergeUpdateState(state, action, b2bParamsKey);
    case SET_SALARY_RESULT:
      return state
        .set(uopSalaryResultsKey, action.uopSalaryResults)
        .set(b2bSalaryResultsKey, action.b2bSalaryResults);
    default:
      return state;
  }
};

export default reducer;
