import { ChangeEvent, Dispatch } from 'react';
import { compose } from 'redux';
import { setB2BParams, setUOPParams } from '../redux/actions';
import { List } from 'immutable';
import {
  B2BSalaryResults,
  ContractType,
  IB2BSalaryResults,
  IUOPSalaryResults,
  UOPSalaryResults,
} from '../interfaces';

export const handleChange = (setFunction: (value: string) => void) => (
  event: ChangeEvent<HTMLInputElement>,
) => setFunction(event.target.value);

export const eventToString = (event: ChangeEvent<HTMLInputElement>) =>
  event.target.value;

export const stringToValue = (str: string) => parseFloat(str);

export const createPayload = (key: string) => (value: any) => ({
  [key]: value,
});

const multipleDispatch = (dispatch: Dispatch<any>, actionCreators: any[]) => (
  payload: any,
) =>
  actionCreators.forEach((actionCreator) => dispatch(actionCreator(payload)));

const dispatchValue = (
  dispatch: Dispatch<any>,
  actionCreators: any[],
  key: string,
) => (value: any) =>
  compose(
    multipleDispatch(dispatch, actionCreators),
    createPayload(key),
  )(value || 0);

export const dispatchNumberValue = (
  dispatch: Dispatch<any>,
  actionCreators: any[],
  key: string,
) => (event: ChangeEvent<HTMLInputElement>) =>
  compose(
    dispatchValue(dispatch, actionCreators, key),
    stringToValue,
    eventToString,
  )(event);

export const dispatchStringValue = (
  dispatch: Dispatch<any>,
  actionCreators: any[],
  key: string,
) => (event: ChangeEvent<HTMLInputElement>) =>
  compose(dispatchValue(dispatch, actionCreators, key), eventToString)(event);

export const dispatchSalary = (dispatch: Dispatch<any>) =>
  dispatchNumberValue(dispatch, [setUOPParams, setB2BParams], 'salary');

export const dispatchPeriod = (dispatch: Dispatch<any>) =>
  dispatchStringValue(dispatch, [setUOPParams, setB2BParams], 'period');

export const dispatchTaxType = (dispatch: Dispatch<any>) =>
  dispatchStringValue(dispatch, [setB2BParams], 'taxType');

export const dispatchZUS = (dispatch: Dispatch<any>) =>
  dispatchStringValue(dispatch, [setB2BParams], 'zus');

export const dispatchSickness = (dispatch: Dispatch<any>) =>
  dispatchStringValue(dispatch, [setB2BParams], 'sickness');

export const dispatchCosts = (dispatch: Dispatch<any>) =>
  dispatchNumberValue(dispatch, [setB2BParams], 'costs');

export const calcTotal = (list: List<number>): number =>
  list.reduce((a, b) => a + b, 0);

export const calcAverage = (list: List<number>): number => calcTotal(list) / 12;

export const isUOP = (contractType: ContractType): boolean =>
  contractType === ContractType.UOP;

export const isB2B = (contractType: ContractType): boolean =>
  contractType === ContractType.B2B;

export const isB2BSalaryResults = (
  salaryResults: IUOPSalaryResults | IB2BSalaryResults,
): salaryResults is IB2BSalaryResults => {
  return (salaryResults as IB2BSalaryResults).get('others') !== undefined;
};

export const isB2BxSalaryResults = (
  salaryResults: UOPSalaryResults | B2BSalaryResults,
): salaryResults is B2BSalaryResults => 'others' in salaryResults;

export const isUOPxSalaryResults = (
  salaryResults: UOPSalaryResults | B2BSalaryResults,
): salaryResults is UOPSalaryResults => !isB2BxSalaryResults(salaryResults);
