export const formatNumberWithSpaceSeparator = (
  value: number | string,
  precision = 0,
): string => {
  if (value === '' || value === undefined) {
    return '0';
  }
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  return numericValue
    .toFixed(precision)
    .replace(/-/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const removeSpaceSeparator = (text: string): string =>
  text.replace(/ /g, '');

export const roundNumber = (number: number, decimals: number): number => {
  return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
};
