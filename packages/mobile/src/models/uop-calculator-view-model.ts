import { UopCalculatorModel } from './uop-calculator-model';
import { computed } from 'mobx';
import { UOPSerializedModel } from '../types';
import { BaseCalculatorViewModel } from './base-calculator-view-model';

export class UopCalculatorViewModel extends BaseCalculatorViewModel {
  protected model = new UopCalculatorModel();

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
