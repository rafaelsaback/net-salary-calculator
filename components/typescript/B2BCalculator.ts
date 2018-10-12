/// <reference path="references.ts" />

class B2BCalculator extends BaseCalculator {
  constructor() {
    super();
    this.monthly.acccident = new Array(12).fill(0);
    this.monthly.laborFund = new Array(12).fill(0);
    this.monthly.others = new Array(12).fill(0);
    this.monthly.salaryInHand = new Array(12).fill(0);
    this.annual.accident = 0;
    this.annual.laborFund = 0;
    this.annual.others = 0;
    this.annual.salaryInHand = 0;
    this.contract = CONTRACT.B2B;
  }

  calcSalary(netSalary, b2bOptions) {
    this.monthly.netSalary.fill(netSalary);
    this.vat = b2bOptions.vat;
    this.taxType = b2bOptions.taxType;
    this.zus = b2bOptions.zus;
    this.paySickness = b2bOptions.paySickness;
    this.costs = b2bOptions.costs;

    this.monthly.pension = this.calcPension(this.zus);
    this.monthly.disability = this.calcDisability(this.zus);
    this.monthly.sickness = this.calcSickness(this.paySickness, this.zus);
    this.monthly.healthContribution = this.calcHealthContribution();
    this.monthly.healthDeductible = super.calcHealthDeductible(
      this.monthly.healthContribution, RATES.healthDeductible, RATES.healthContribution
    );
    this.monthly.accident = this.calcAccident(this.zus);
    this.monthly.laborFund = this.calcLaborFund(this.zus);
    this.monthly.others = this.calcOthers(this.monthly.accident, this.monthly.laborFund);
    this.monthly.socialSecurity = this.calcSocialSecurity(
      this.monthly.pension, this.monthly.disability, this.monthly.sickness,
      this.monthly.accident, this.monthly.laborFund
    );
    this.monthly.taxBase = super.calcTaxBase(this.monthly.netSalary,
      this.monthly.socialSecurity, this.costs
    );
    this.monthly.accTaxBase = super.calcAccTaxBase(this.monthly.taxBase);
    this.monthly.tax = this.calcTax(this.taxType, this.monthly.taxBase,
      this.monthly.healthDeductible
    );
    this.monthly.salaryInHand = super.calcFinalSalary(this.monthly.netSalary,
      this.monthly.socialSecurity, this.monthly.healthContribution,
      this.costs, this.monthly.tax
    );
    this.annual = super.calcTotals(this.annual, this.monthly);
  }

  evalZUS(zusType, noZUSValue, discountedZUSValue, normalZUSValue) {
    let array = new Array(12);
    switch(zusType) {
      case ZUS.noZUS:
      array.fill(noZUSValue, 0, 6);
      array.fill(discountedZUSValue, 6, 12);
      break;
      case ZUS.discountedZUS:
      array.fill(discountedZUSValue);
      break;
      case ZUS.normalZUS:
      array.fill(normalZUSValue);
      break;
    }
    return array;
  }

  calcPension(zus) {
    return this.evalZUS(zus, 0, 122.98, 520.36);
  }

  calcDisability(zus) {
    return this.evalZUS(zus, 0, 50.40, 213.26);
  }

  calcSickness(paySickness, zus) {
    if(paySickness) return this.evalZUS(zus, 0, 15.44, 65.31);
    else return new Array(12).fill(0);
  }

  calcHealthContribution() {
    let healthArray = new Array(12).fill(319.94);
    return healthArray;
  }

  calcAccident(zus) {
    return this.evalZUS(zus, 0, 11.34, 47.98);
  }

  calcLaborFund(zus) {
    return this.evalZUS(zus, 0, 0, 65.31);
  }

  calcOthers(accident, laborFund) {
    return accident.map((acc, i) => acc + laborFund[i]);
  }

  calcSocialSecurity(pension, disability, sickness, accident, laborFund) {
    return pension.map((pen, i) => pen + disability[i] + sickness[i] + accident[i] + laborFund[i]);
  }

  calcTax(taxType, taxBase, healthDeductible) {
    if(taxType == TAXTYPE.progressive) {
      return super.calcProgressiveTax(taxBase, taxBase, healthDeductible, 0);
    } else {
      return this.calcLinearTax(taxBase, healthDeductible);
    }
  }

  calcLinearTax(taxBase, healthDeductible) {
    let tax = new Array(12);
    for(let i = 0; i < tax.length; i++){
      let taxBeforeDeductible = taxBase[i] * TAX.rate19;
      if(taxBeforeDeductible >= healthDeductible[i]){
        tax[i] = taxBeforeDeductible - healthDeductible[i];
      } else {
        tax[i] = 0;
      }
    }
    return tax;
  }
} // End of class B2BCalculator
