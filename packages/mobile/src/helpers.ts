import EStyleSheet from 'react-native-extended-stylesheet';
import { B2bSalaryResultsModel, BaseSalaryResultsModel } from './types';

export const createFontSizeStyle = (values: number[]) =>
  values.map((value) => EStyleSheet.value(`${value}rem`));

export const isB2bResultsModel = (
  resultsModel: BaseSalaryResultsModel,
): resultsModel is B2bSalaryResultsModel => 'laborFund' in resultsModel;
