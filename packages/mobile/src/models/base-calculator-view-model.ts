import {
  formatNumberWithSpaceSeparator,
  parseToNumber,
} from '@nsc/shared/src/helpers';
import { action, computed } from 'mobx';
import { BaseCalculatorModel } from './base-calculator-model';
import { Period } from '@nsc/shared/src/types';
import { ValueObject } from '../types';

export abstract class BaseCalculatorViewModel {
  protected abstract model: BaseCalculatorModel;

  protected createValueObject = (value: number): ValueObject => ({
    value,
    formatted: formatNumberWithSpaceSeparator(value),
  });

  @computed
  public get salary(): ValueObject {
    return this.createValueObject(this.model.salary);
  }

  @action
  public setSalary = (salary: string): void => {
    this.model.setSalary(parseToNumber(salary));
  };

  @computed
  public get monthlySalary(): ValueObject {
    return this.createValueObject(this.model.monthlySalary);
  }

  @computed
  public get period(): Period {
    return this.model.period;
  }

  @action
  public setPeriod = (period: Period): void => {
    this.model.setPeriod(period);
  };

  @computed
  public get pension(): ValueObject[] {
    return this.model.pension.map(this.createValueObject);
  }

  @computed
  public get disability(): ValueObject[] {
    return this.model.disability.map(this.createValueObject);
  }

  @computed
  public get sickness(): ValueObject[] {
    return this.model.sickness.map(this.createValueObject);
  }

  @computed
  public get socialSecurity(): ValueObject[] {
    return this.model.socialSecurity.map(this.createValueObject);
  }

  @computed
  public get healthContribution(): ValueObject[] {
    return this.model.healthContribution.map(this.createValueObject);
  }

  @computed
  public get healthDeductible(): ValueObject[] {
    return this.model.healthDeductible.map(this.createValueObject);
  }

  @computed
  public get costs(): ValueObject {
    return this.createValueObject(this.model.costs);
  }

  @computed
  public get taxBase(): ValueObject[] {
    return this.model.taxBase.map(this.createValueObject);
  }

  @computed
  public get tax(): ValueObject[] {
    return this.model.tax.map(this.createValueObject);
  }

  @computed
  public get endSalary(): ValueObject[] {
    return this.model.endSalary.map(this.createValueObject);
  }
}
