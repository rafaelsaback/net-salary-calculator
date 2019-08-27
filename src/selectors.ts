import { createSelector } from 'reselect';
import { IStoreState } from './interfaces';

export const selectUOPParams = createSelector(
  (state: IStoreState) => state,
  (state: IStoreState) => state.get('uopParams'),
);

export const selectB2BParams = createSelector(
  (state: IStoreState) => state,
  (state: IStoreState) => state.get('b2bParams'),
);

export const selectUOPSalaryResults = createSelector(
  (state: IStoreState) => state,
  (state: IStoreState) => state.get('uopSalaryResults'),
);

export const selectB2BSalaryResults = createSelector(
  (state: IStoreState) => state,
  (state: IStoreState) => state.get('b2bSalaryResults'),
);
