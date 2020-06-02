import { BaseCalculatorModel } from './base-calculator-model';
import { computed } from 'mobx';
import {
  DISABILITY_RATE,
  EARNING_COST,
  HEALTH_CONTRIBUTION_RATE,
  PENSION_RATE,
  SICKNESS_RATE,
} from '@nsc/shared/src/consts';

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
    return this.sumElements(this.pension, this.disability, this.sickness);
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
}
