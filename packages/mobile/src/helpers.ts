import EStyleSheet from 'react-native-extended-stylesheet';

export const createFontSizeStyle = (values: number[]) =>
  values.map((value) => EStyleSheet.value(`${value}rem`));
