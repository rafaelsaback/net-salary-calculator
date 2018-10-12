/// <reference path="references.ts" />

class UOPCalculator extends BaseCalculator{
  constructor(){
    super();
    this.monthly.accTaxBase = new Array(12).fill(0);
    this.contract = CONTRACT.UOP;
  }

  calcSalary(grossSalary, rates, taxRate, auxValues) {
    this.monthly.grossSalary.fill(grossSalary);
    this.rates = rates;
    this.taxRate = taxRate;
    this.auxValues = auxValues;

    // Accumulated gross salary
    this.monthly.accGrossSalary = this.calcAccGrossSalary(this.monthly.grossSalary);

    // Pension
    this.monthly.pension = this.calcPension(
      this.monthly.grossSalary, this.monthly.accGrossSalary,
      this.auxValues.annualLimit, this.rates.pension
    );

    // Disability insurance
    this.monthly.disability = this.calcDisability(
      this.monthly.grossSalary, this.monthly.accGrossSalary,
      this.auxValues.annualLimit, this.rates.disability
    );

    // Sickness insurance
    this.monthly.sickness = this.calcSickness(
      this.monthly.grossSalary, this.rates.sickness
    );

    // Social security
    this.monthly.socialSecurity = this.calcSocialSecurity(
      this.monthly.pension, this.monthly.disability, this.monthly.sickness
    );

    // Health contribution
    this.monthly.healthContribution = this.calcHealthContribution(
      this.monthly.grossSalary, this.monthly.socialSecurity, this.rates.healthContribution
    );

    // Health deductible
    this.monthly.healthDeductible = super.calcHealthDeductible(
      this.monthly.healthContribution, this.rates.healthDeductible,
      this.rates.healthContribution
    );

    // Tax base
    this.monthly.taxBase = super.calcTaxBase(
      this.monthly.grossSalary, this.monthly.socialSecurity, this.auxValues.earningCost
    );

    // Accumulated tax base
    this.monthly.accTaxBase = super.calcAccTaxBase(this.monthly.taxBase);

    // Tax
    this.monthly.tax = super.calcProgressiveTax(
      this.monthly.taxBase, this.monthly.accTaxBase,
      this.monthly.healthDeductible, this.auxValues.monthlyRelief
    );

    // Net salary
    this.monthly.netSalary = super.calcFinalSalary(this.monthly.grossSalary,
      this.monthly.socialSecurity, this.monthly.healthContribution, this.monthly.tax
    );

    // Annual values
    this.annual = super.calcTotals(this.annual, this.monthly);
  }

  calcAccGrossSalary(grossSalary){
    return this.accumulateValue(grossSalary);
  }

  calcPension(grossSalary, accGrossSalary, annualLimit, pensionRate) {
    return this.calcPensionDisability(grossSalary, accGrossSalary, annualLimit, pensionRate);
  }

  calcDisability(grossSalary, accGrossSalary, annualLimit, disabilityRate) {
    return this.calcPensionDisability(grossSalary, accGrossSalary, annualLimit, disabilityRate);
  }

  calcPensionDisability(grossSalary, accGrossSalary, annualLimit, rate) {
    let value = new Array(12);

    for(let i = 0; i < value.length; i++) {
      if((accGrossSalary[i] + grossSalary[i]) < annualLimit){
        value[i] = this.calcContribution(grossSalary[i], rate);
      } else if (accGrossSalary[i] < annualLimit){
        let baseGrossSalary = annualLimit - accGrossSalary[i];
        value[i] = this.calcContribution(baseGrossSalary, rate);
      } else {
        value[i] = 0;
      }
    }
    return value;
  }

  calcSickness(grossSalary, sicknessRate) {
    let sickness = new Array(12);
    for(let i = 0; i < sickness.length; i++){
      sickness[i] = this.calcContribution(grossSalary[i], sicknessRate);
    }
    return sickness;
  }

  calcSocialSecurity(pension, disability, sickness) {
    return pension.map((pen, i) => pen + disability[i] + sickness[i]);
  }

  calcHealthContribution(grossSalary, socialSecurity, rateHealthContribution) {
    let healthContribution = new Array(12);
    for(let i = 0; i < healthContribution.length; i++){
      let healthBase = grossSalary[i] - socialSecurity[i];
      healthContribution[i] = this.calcContribution(healthBase, rateHealthContribution);
    };
    return healthContribution;
  }
} // End of class UOPCalculator
