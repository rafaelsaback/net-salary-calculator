import {
  formatNumberWithSpaceSeparator,
  parseToNumber,
} from '@nsc/shared/src/helpers';
import { action, computed } from 'mobx';
import { BaseCalculatorModel } from './base-calculator-model';
import { Period } from '@nsc/shared/src/types';

export abstract class BaseCalculatorViewModel {
  protected abstract model: BaseCalculatorModel;

  protected parseToString = (value: number) =>
    formatNumberWithSpaceSeparator(value);

  @computed
  public get salary(): string {
    return formatNumberWithSpaceSeparator(this.model.salary);
  }

  @action
  public setSalary = (salary: string): void => {
    this.model.setSalary(parseToNumber(salary));
  };

  @computed
  public get monthlySalary(): string {
    return formatNumberWithSpaceSeparator(this.model.monthlySalary);
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
  public get pension(): string[] {
    return this.model.pension.map(this.parseToString);
  }

  @computed
  public get disability(): string[] {
    return this.model.disability.map(this.parseToString);
  }

  @computed
  public get sickness(): string[] {
    return this.model.sickness.map(this.parseToString);
  }

  @computed
  public get socialSecurity(): string[] {
    return this.model.socialSecurity.map(this.parseToString);
  }

  @computed
  public get healthContribution(): string[] {
    return this.model.healthContribution.map(this.parseToString);
  }

  @computed
  public get healthDeductible(): string[] {
    return this.model.healthDeductible.map(this.parseToString);
  }

  @computed
  public get costs(): string {
    return this.parseToString(this.model.costs);
  }

  @computed
  public get taxBase(): string[] {
    return this.model.taxBase.map(this.parseToString);
  }

  @computed
  public get tax(): string[] {
    return this.model.tax.map(this.parseToString);
  }

  @computed
  public get endSalary(): string[] {
    return this.model.endSalary.map(this.parseToString);
  }
}
