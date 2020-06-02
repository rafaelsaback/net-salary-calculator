import { BaseCalculatorModel } from './base-calculator-model';
import { B2BParameters } from '../types';
import { computed, observable } from 'mobx';
import {
  HEALTH_INSURANCE,
  NORMAL_ZUS,
  RATE_19,
  SMALL_ZUS,
} from '@nsc/shared/src/consts';
import { B2BTax, Sickness, ZUS } from '@nsc/shared/src/types';

export class B2BCalculatorModel extends BaseCalculatorModel {
  @observable
  public b2bParameters!: B2BParameters;
  @observable
  public zusParam: ZUS;
  @observable
  public sicknessParam: Sickness;
  @observable
  public taxTypeParam: B2BTax;
  @observable
  public costs: number;

  constructor(b2BParameters: B2BParameters, costs: number) {
    super();

    this.zusParam = b2BParameters.zus;
    this.sicknessParam = b2BParameters.sickness;
    this.taxTypeParam = b2BParameters.taxType;
    this.costs = costs;
  }

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

  @computed
  public get laborFund(): number[] {
    return this.evalZUS(this.b2bParameters.zus, 0, 0, NORMAL_ZUS.LABOR_FUND);
  }

  @computed
  public get others(): number[] {
    return this.sumElements(this.accident, this.laborFund);
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
