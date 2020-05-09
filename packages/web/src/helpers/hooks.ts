import { useSelector, useDispatch } from 'react-redux';
import { selectUOPParam, selectB2BParam } from './selectors';
import {
  dispatchSalary,
  dispatchCosts,
  dispatchPeriod,
  dispatchTaxType,
  dispatchZUS,
  dispatchSickness,
} from './utils';
import { ChangeEvent } from 'react';
import {
  StoreState,
  ImmutableMap,
  B2BTax,
  Period,
  ZUS,
  Sickness,
} from '../interfaces';
import { OutputSelector } from 'reselect';

type UseFormReturn = [string, (event: ChangeEvent<HTMLInputElement>) => void];
type UseForm = (
  defaultValue: any,
  selector: OutputSelector<ImmutableMap<StoreState>, any, any>,
  setFunction: (
    dispatch: React.Dispatch<any>,
  ) => (event: ChangeEvent<HTMLInputElement>) => void,
) => UseFormReturn;

const useForm: UseForm = (defaultValue, selector, setFunction) => {
  const fieldValue = useSelector(selector) || defaultValue;
  const dispatch = useDispatch();

  return [fieldValue.toString(), setFunction(dispatch)];
};

export const useSalary = (defaultValue: string | number): UseFormReturn =>
  useForm(defaultValue, selectUOPParam('salary'), dispatchSalary);

export const usePeriod = (defaultValue: Period): UseFormReturn =>
  useForm(defaultValue, selectUOPParam('period'), dispatchPeriod);

export const useTaxType = (defaultValue: B2BTax): UseFormReturn =>
  useForm(defaultValue, selectB2BParam('taxType'), dispatchTaxType);

export const useZUS = (defaultValue: ZUS): UseFormReturn =>
  useForm(defaultValue, selectB2BParam('zus'), dispatchZUS);

export const useSickness = (defaultValue: Sickness): UseFormReturn =>
  useForm(defaultValue, selectB2BParam('sickness'), dispatchSickness);

export const useCosts = (defaultValue: string | number): UseFormReturn =>
  useForm(defaultValue, selectB2BParam('costs'), dispatchCosts);
