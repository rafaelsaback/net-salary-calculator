import { BaseCalculatorModel } from './base-calculator-model';
import { B2BParameters, PeriodBreakdown } from '../types';
import { action, computed, observable } from 'mobx';
import {
  HEALTH_INSURANCE,
  NORMAL_ZUS,
  RATE_19,
  SMALL_ZUS,
} from '@nsc/shared/src/consts';
import { B2BTax, ZUS } from '@nsc/shared/src/types';

export class B2BCalculatorModel extends BaseCalculatorModel {
  @observable
  public b2bParameters!: B2BParameters;
  @observable
  public costs = 0;

  constructor(b2BParameters: B2BParameters) {
    super();
    this.b2bParameters = b2BParameters;
  }

  @action
  public setB2BParameters = (b2bParameters: B2BParameters) => {
    this.b2bParameters = b2bParameters;
  };

  @action
  public setCosts = (costs: number) => {
    this.costs = costs;
  };

  @computed
  public get pension(): number[] {
    return this.evalZUS(
      this.b2bParameters.zus,
      0,
      SMALL_ZUS.PENSION,
      NORMAL_ZUS.PENSION,
    );
  }

  @computed
  public get disability(): number[] {
    return this.evalZUS(
      this.b2bParameters.zus,
      0,
      SMALL_ZUS.DISABILITY,
      NORMAL_ZUS.DISABILITY,
    );
  }

  @computed
  public get sickness(): number[] {
    return this.evalZUS(
      this.b2bParameters.zus,
      0,
      SMALL_ZUS.SICKNESS,
      NORMAL_ZUS.SICKNESS,
    );
  }

  @computed
  public get healthContribution(): number[] {
    return Array(12).fill(HEALTH_INSURANCE);
  }

  @computed
  public get accident(): number[] {
    return this.evalZUS(
      this.b2bParameters.zus,
      0,
      SMALL_ZUS.ACCIDENT,
      NORMAL_ZUS.ACCIDENT,
    );
  }

  public get accidentBreakdown(): PeriodBreakdown<number> {
    return this.createBreakdown(this.accident);
  }

  @computed
  public get laborFund(): number[] {
    return this.evalZUS(this.b2bParameters.zus, 0, 0, NORMAL_ZUS.LABOR_FUND);
  }

  public get laborFundBreakdown(): PeriodBreakdown<number> {
    return this.createBreakdown(this.laborFund);
  }

  @computed
  public get others(): number[] {
    return this.sumElements(this.accident, this.laborFund);
  }

  public get othersBreakdown(): PeriodBreakdown<number> {
    return this.createBreakdown(this.others);
  }

  @computed
  public get socialSecurity(): number[] {
    return this.sumElements(
      this.pension,
      this.disability,
      this.sickness,
      this.accident,
      this.laborFund,
    );
  }

  @computed
  public get tax(): number[] {
    if (this.b2bParameters.taxType === B2BTax.Progressive) {
      return this.progressiveTax;
    }

    return this.generateArray12x((_, i) => {
      const taxValue = this.taxBase[i] * RATE_19 - this.healthDeductible[i];
      return Math.max(0, taxValue);
    });
  }

  protected evalZUS = (
    zus: ZUS,
    noZUSValue: number,
    discountedZUSValue: number,
    normalZUSValue: number,
  ): number[] => {
    switch (zus) {
      case ZUS.No:
        return [
          ...Array(6).fill(noZUSValue),
          ...Array(6).fill(discountedZUSValue),
        ];
      case ZUS.Discounted:
        return Array(12).fill(discountedZUSValue);
      case ZUS.Normal:
        return Array(12).fill(normalZUSValue);
      default:
        return [];
    }
  };
}
