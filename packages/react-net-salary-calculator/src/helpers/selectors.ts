import { createSelector } from 'reselect';
import {
  IStoreState,
  IUOPParams,
  IB2BParams,
  UOPParams,
  B2BParams,
  UOPSalaryResults,
  IUOPSalaryResults,
  B2BSalaryResults,
  IB2BSalaryResults,
} from '../interfaces';

export const selectUOPParams = (state: IStoreState) => state.get('uopParams');

export const selectB2BParams = (state: IStoreState) => state.get('b2bParams');

export const selectUOPSalaryResults = (state: IStoreState) =>
  state.get('uopSalaryResults');

export const selectB2BSalaryResults = (state: IStoreState) =>
  state.get('b2bSalaryResults');

export const selectUOPParam = (param: keyof UOPParams) =>
  createSelector(
    selectUOPParams,
    (params: IUOPParams) => params.get(param),
  );

export const selectB2BParam = (param: keyof B2BParams) =>
  createSelector(
    selectB2BParams,
    (params: IB2BParams) => params.get(param),
  );

export const selectUOPSalaryResult = (param: keyof UOPSalaryResults) =>
  createSelector(
    selectUOPSalaryResults,
    (salaryResults: IUOPSalaryResults) => salaryResults.get(param),
  );

export const selectB2BSalaryResult = (param: keyof B2BSalaryResults) =>
  createSelector(
    selectB2BSalaryResults,
    (salaryResults: IB2BSalaryResults) => salaryResults.get(param),
  );
