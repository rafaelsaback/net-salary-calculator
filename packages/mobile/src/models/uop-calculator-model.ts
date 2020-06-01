import { BaseCalculatorModel } from './base-calculator-model';
import { computed } from 'mobx';
import {
  DISABILITY_RATE,
  EARNING_COST,
  HEALTH_CONTRIBUTION_RATE,
  PENSION_RATE,
  SICKNESS_RATE,
} from '@nsc/shared/src/consts';
import { roundNumber } from '@nsc/shared/src/helpers';

export class UopCalculatorModel extends BaseCalculatorModel {
  @computed
  public get pension(): number[] {
    return this.generateArray12x(
      this.calcPensionDisability(this.monthlySalary, PENSION_RATE),
    );
  }

  @computed
  public get disability(): number[] {
    return this.generateArray12x(
      this.calcPensionDisability(this.monthlySalary, DISABILITY_RATE),
    );
  }

  @computed
  public get sickness(): number[] {
    return this.generateArray12x(() => this.monthlySalary * SICKNESS_RATE);
  }

  @computed
  public get socialSecurity(): number[] {
    return this.generateArray12x(
      (_, i) => this.pension[i] + this.disability[i] + this.sickness[i],
    );
  }

  @computed
  public get healthContribution(): number[] {
    return this.generateArray12x((_, i) => {
      const healthBase = this.monthlySalary - this.socialSecurity[i];

      return healthBase * HEALTH_CONTRIBUTION_RATE;
    });
  }

  @computed
  public get tax(): number[] {
    return this.progressiveTax;
  }

  public get costs(): number {
    return EARNING_COST;
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
}
