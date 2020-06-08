import { action, computed, observable, reaction } from 'mobx';
import { Period } from '@nsc/shared/src/types';
import {
  ANNUAL_LIMIT,
  HEALTH_CONTRIBUTION_RATE,
  HEALTH_DEDUCTIBLE_RATE,
  MONTHLY_RELIEF,
  RATE_17,
  RATE_32,
  TAX_THRESHOLD,
} from '@nsc/shared/src/consts';
import { roundNumber } from '@nsc/shared/src/helpers';
import { Dispatch } from 'react';
import { PeriodBreakdown } from '../types';

export abstract class BaseModel {
  @observable
  public salary = 0;
  @observable
  public period = Period.Monthly;

  constructor() {
    reaction(
      () => this.period,
      (newPeriod) => {
        if (newPeriod === Period.Monthly) {
          this.setSalary(this.salary / 12);
        } else if (newPeriod === Period.Annually) {
          this.setSalary(this.salary * 12);
        }
      },
    );
  }

  @action
  public setSalary = (newSalary: number): void => {
    this.salary = newSalary;
  };

  @action
  public setPeriod: Dispatch<Period> = (newPeriod): void => {
    this.period = newPeriod;
  };

  @computed
  public get monthlySalary(): number {
    return this.period === Period.Monthly ? this.salary : this.salary / 12;
  }

  @computed
  public get healthDeductible(): number[] {
    return this.healthContribution.map(
      (value) => value * (HEALTH_DEDUCTIBLE_RATE / HEALTH_CONTRIBUTION_RATE),
    ) as number[];
  }

  @computed
  public get taxBase(): number[] {
    return this.generateArray12x((_, i) => {
      const taxBaseValue =
        this.monthlySalary - this.socialSecurity[i] - this.costs;
      return roundNumber(taxBaseValue, 0);
    });
  }

  @computed
  public get progressiveTax(): number[] {
    const accTaxBase = this.accumulateValue(this.taxBase);

    return this.generateArray12x((_, i) => {
      if (accTaxBase[i] < TAX_THRESHOLD) {
        const taxValue =
          this.taxBase[i] * RATE_17 - this.healthDeductible[i] - MONTHLY_RELIEF;
        return roundNumber(Math.max(0, taxValue), 2);
      }
      const taxValue = this.taxBase[i] * RATE_32 - this.healthDeductible[i];
      return roundNumber(Math.max(0, taxValue), 2);
    });
  }

  @computed
  public get endSalary(): number[] {
    return this.generateArray12x((_, i) => {
      const endSalaryValue =
        this.monthlySalary -
        this.socialSecurity[i] -
        this.healthContribution[i] -
        this.tax[i];
      return roundNumber(Math.max(0, endSalaryValue), 2);
    });
  }

  @computed
  public get pensionBreakdown(): PeriodBreakdown<number> {
    return this.createBreakdown(this.pension);
  }

  @computed
  public get disabilityBreakdown(): PeriodBreakdown<number> {
    return this.createBreakdown(this.disability);
  }

  @computed
  public get sicknessBreakdown(): PeriodBreakdown<number> {
    return this.createBreakdown(this.sickness);
  }

  @computed
  public get socialSecurityBreakdown(): PeriodBreakdown<number> {
    return this.createBreakdown(this.socialSecurity);
  }

  @computed
  public get healthContributionBreakdown(): PeriodBreakdown<number> {
    return this.createBreakdown(this.healthContribution);
  }

  @computed
  public get healthDeductibleBreakdown(): PeriodBreakdown<number> {
    return this.createBreakdown(this.healthDeductible);
  }

  @computed
  public get taxBaseBreakdown(): PeriodBreakdown<number> {
    return this.createBreakdown(this.taxBase);
  }

  @computed
  public get taxBreakdown(): PeriodBreakdown<number> {
    return this.createBreakdown(this.tax);
  }

  @computed
  public get endSalaryBreakdown(): PeriodBreakdown<number> {
    return this.createBreakdown(this.endSalary);
  }

  protected calcPensionDisability = (monthlySalary: number, rate: number) => (
    _: number,
    index: number,
  ) => {
    const accGrossSalary = monthlySalary * index;
    const nextAccGrossSalary = monthlySalary * (index + 1);

    if (nextAccGrossSalary < ANNUAL_LIMIT) {
      return this.monthlySalary * rate;
    } else if (accGrossSalary < ANNUAL_LIMIT) {
      const baseGrossSalary = ANNUAL_LIMIT - accGrossSalary;
      return baseGrossSalary * rate;
    }

    return 0;
  };

  protected accumulateValue = (list: number[]) => {
    const accumulatedValues = list.map(
      ((sum) => (_: number, i: number, iter: number[]) => (sum += iter[i]))(0),
    );

    return [0, ...accumulatedValues.slice(1, 10)];
  };

  protected generateArray12x = (
    generatorFnc: (_: number, index: number) => number,
  ): number[] => {
    const loopArray = Array<number>(12).fill(0);
    return loopArray.map(generatorFnc) as number[];
  };

  protected calcTotal = (arr: number[]) =>
    arr.reduce((res, value) => res + value);

  protected createBreakdown = (monthly: number[]): PeriodBreakdown<number> => {
    const annually = this.calcTotal(monthly);
    return { monthly, annually, monthlyAverage: annually / 12 };
  };

  protected sumElements = (...args: number[][]) =>
    Array(12)
      .fill(0)
      .map((_, i) => args.reduce((res, array) => res + array[i], 0));

  public abstract get costs(): number;
  public abstract get pension(): number[];
  public abstract get disability(): number[];
  public abstract get sickness(): number[];
  public abstract get socialSecurity(): number[];
  public abstract get healthContribution(): number[];
  public abstract get tax(): number[];
}
