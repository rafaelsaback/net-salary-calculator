import { BaseViewModel } from './base-view-model';
import { action, computed } from 'mobx';
import {
  B2bParameters,
  B2bSerializedModel,
  PeriodBreakdown,
  ValueObject,
} from '../types';
import { B2bModel } from './b2b-model';
import { parseToNumber } from '@nsc/shared/src/helpers';
import { ContractType } from '@nsc/shared/src/types';

export class B2bViewModel extends BaseViewModel {
  protected model: B2bModel;

  constructor(b2BParameters: B2bParameters) {
    super();

    this.model = new B2bModel(b2BParameters);
  }

  @action
  public setB2bParameters = (b2bParameters: B2bParameters) => {
    this.model.setB2bParameters(b2bParameters);
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
  public get b2bParameters(): B2bParameters {
    return this.model.b2bParameters;
  }

  @computed
  public get serialized(): B2bSerializedModel {
    return {
      salary: this.salary,
      monthlySalary: this.monthlySalary,
      annualSalary: this.annualSalary,
      period: this.period,
      contract: ContractType.B2B,
      costs: this.costs,
      b2bParameters: this.b2bParameters,
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
    };
  }
}
