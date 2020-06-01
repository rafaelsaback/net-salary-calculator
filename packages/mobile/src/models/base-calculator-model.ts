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

export abstract class BaseCalculatorModel {
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
  public setSalary = (newSalary: string | number): void => {
    this.salary =
      typeof newSalary === 'string' ? parseFloat(newSalary) : newSalary;
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

  public abstract get pension(): number[];
  public abstract get disability(): number[];
  public abstract get sickness(): number[];
  public abstract get socialSecurity(): number[];
  public abstract get healthContribution(): number[];
  public abstract get costs(): number;
  public abstract get tax(): number[];
  public abstract get endSalary(): number[];
}
