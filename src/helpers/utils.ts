import { ChangeEvent, Dispatch } from 'react';
import { compose } from 'redux';
import { setUOPParams, setB2BParams } from '../redux/actions';

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

export const setNumberValue = (
  dispatch: Dispatch<any>,
  actionCreators: any[],
  key: string,
) => (event: ChangeEvent<HTMLInputElement>) =>
  compose(
    multipleDispatch(dispatch, actionCreators),
    createPayload(key),
    stringToValue,
    eventToString,
  )(event);

export const setSalary = (dispatch: Dispatch<any>) =>
  setNumberValue(dispatch, [setUOPParams, setB2BParams], 'salary');
