import {
  formatNumberWithSpaceSeparator,
  parseToNumber,
} from '@nsc/shared/src/helpers';
import { action, computed } from 'mobx';
import { BaseCalculatorModel } from './base-calculator-model';
import { Period } from '@nsc/shared/src/types';
import { PeriodBreakdown, ValueObject } from '../types';

export abstract class BaseCalculatorViewModel {
  protected abstract model: BaseCalculatorModel;

  protected createValueObject = (value: number): ValueObject => ({
    value,
    formatted: formatNumberWithSpaceSeparator(value),
  });

  protected mapToResultBreakdownValueObject = (
    result: PeriodBreakdown<number>,
  ): PeriodBreakdown<ValueObject> => {
    const { monthly, monthlyAverage, annually } = result;

    return {
      monthly: monthly.map(this.createValueObject),
      monthlyAverage: this.createValueObject(monthlyAverage),
      annually: this.createValueObject(annually),
    };
  };

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
  public get pension(): PeriodBreakdown<ValueObject> {
    return this.mapToResultBreakdownValueObject(this.model.pensionBreakdown);
  }

  @computed
  public get disability(): PeriodBreakdown<ValueObject> {
    return this.mapToResultBreakdownValueObject(this.model.disabilityBreakdown);
  }

  @computed
  public get sickness(): PeriodBreakdown<ValueObject> {
    return this.mapToResultBreakdownValueObject(this.model.sicknessBreakdown);
  }

  @computed
  public get socialSecurity(): PeriodBreakdown<ValueObject> {
    return this.mapToResultBreakdownValueObject(
      this.model.socialSecurityBreakdown,
    );
  }

  @computed
  public get healthContribution(): PeriodBreakdown<ValueObject> {
    return this.mapToResultBreakdownValueObject(
      this.model.healthContributionBreakdown,
    );
  }

  @computed
  public get healthDeductible(): PeriodBreakdown<ValueObject> {
    return this.mapToResultBreakdownValueObject(
      this.model.healthDeductibleBreakdown,
    );
  }

  @computed
  public get costs(): ValueObject {
    return this.createValueObject(this.model.costs);
  }

  @computed
  public get taxBase(): PeriodBreakdown<ValueObject> {
    return this.mapToResultBreakdownValueObject(this.model.taxBaseBreakdown);
  }

  @computed
  public get tax(): PeriodBreakdown<ValueObject> {
    return this.mapToResultBreakdownValueObject(this.model.taxBreakdown);
  }

  @computed
  public get endSalary(): PeriodBreakdown<ValueObject> {
    return this.mapToResultBreakdownValueObject(this.model.endSalaryBreakdown);
  }
}
