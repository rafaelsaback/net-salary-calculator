import { UopModel } from './uop-model';
import { computed } from 'mobx';
import { UOPSerializedModel } from '../types';
import { BaseViewModel } from './base-view-model';

export class UopViewModel extends BaseViewModel {
  protected model = new UopModel();

  @computed
  public get serialized(): UOPSerializedModel {
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
        taxBase: this.taxBase,
        tax: this.tax,
        endSalary: this.endSalary,
      },
    };
  }
}
