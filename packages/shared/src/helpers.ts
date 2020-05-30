export const formatNumberWithSpaceSeparator = (
  value: number | string,
  precision = 0,
): string => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  return numericValue.toFixed(precision).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const removeSpaceSeparator = (text: string): string =>
  text.replace(/ /g, '');
