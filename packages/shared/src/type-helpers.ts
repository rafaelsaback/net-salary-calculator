import { Period } from './types';

export const isMonthly = (period: Period) => period === Period.Monthly;
export const isAnnually = (period: Period) => period === Period.Annually;
