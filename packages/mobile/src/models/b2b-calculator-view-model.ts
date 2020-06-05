import { BaseCalculatorViewModel } from './base-calculator-view-model';
import { action, computed } from 'mobx';
import {
  B2BParameters,
  B2BSerializedModel,
  PeriodBreakdown,
  ValueObject,
} from '../types';
import { B2BCalculatorModel } from './b2b-calculator-model';
import { parseToNumber } from '@nsc/shared/src/helpers';

export class B2BCalculatorViewModel extends BaseCalculatorViewModel {
  protected model: B2BCalculatorModel;

  constructor(b2BParameters: B2BParameters) {
    super();

    this.model = new B2BCalculatorModel(b2BParameters);
  }

  @action
  public setB2BParameters = (b2bParameters: B2BParameters) => {
    this.model.setB2BParameters(b2bParameters);
  };

  @action
  public setCosts = (costs: string) => {
    this.model.setCosts(parseToNumber(costs));
  };

  @computed
  public get laborFund(): PeriodBreakdown<ValueObject> {
    return this.mapToResultBreakdownValueObject(this.model.laborFundBreakdown);
  }

  @computed
  public get accident(): PeriodBreakdown<ValueObject> {
    return this.mapToResultBreakdownValueObject(this.model.accidentBreakdown);
  }

  @computed
  public get others(): PeriodBreakdown<ValueObject> {
    return this.mapToResultBreakdownValueObject(this.model.othersBreakdown);
  }

  @computed
  public get b2bParameters(): B2BParameters {
    return this.model.b2bParameters;
  }

  @computed
  public get serialized(): B2BSerializedModel {
    return {
      salary: this.salary,
      period: this.period,
      costs: this.costs,
      results: {
        pension: this.pension,
        disability: this.disability,
        sickness: this.sickness,
        socialSecurity: this.socialSecurity,
        healthContribution: this.healthContribution,
        healthDeductible: this.healthDeductible,
        laborFund: this.laborFund,
        accident: this.accident,
        others: this.others,
        taxBase: this.taxBase,
        tax: this.tax,
        endSalary: this.endSalary,
      },
      b2bParameters: this.b2bParameters,
    };
  }
}
