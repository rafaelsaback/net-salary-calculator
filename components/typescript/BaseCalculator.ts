class BaseCalculator {
  constructor() {
    this.monthly = {};
    this.monthly.grossSalary = new Array(12).fill(0);
    this.monthly.accGrossSalary = new Array(12).fill(0);
    this.monthly.pension = new Array(12).fill(0);
    this.monthly.disability = new Array(12).fill(0);
    this.monthly.sickness = new Array(12).fill(0);
    this.monthly.socialSecurity = new Array(12).fill(0);
    this.monthly.healthContribution = new Array(12).fill(0);
    this.monthly.healthDeductible = new Array(12).fill(0);
    this.monthly.taxBase = new Array(12).fill(0);
    this.monthly.tax = new Array(12).fill(0);
    this.monthly.netSalary = new Array(12).fill(0);

    this.annual = {};
    this.annual.grossSalary = 0;
    this.annual.pension = 0;
    this.annual.disability = 0;
    this.annual.sickness = 0;
    this.annual.socialSecurity = 0;
    this.annual.healthContribution = 0;
    this.annual.taxBase = 0;
    this.annual.tax = 0;
    this.annual.netSalary = 0;

    this.contract;
  }

  calcHealthDeductible(healthContribution, rateDeductible, rateContribution) {
    let healthDeductible = [];
    healthDeductible = healthContribution.map((value, i) => {
      return healthContribution[i] * (rateDeductible / rateContribution);
    });
    return healthDeductible;
  }

  roundNumber(number, decimals){
    return (Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals));
  }

  calcContribution(baseValue, rate){
    let contribution = baseValue * rate;
    contribution = this.roundNumber(contribution, 2);
    return contribution;
  }

  calcTotals(annual, monthly) {
    let totals = {};
    for(let value in annual){
      totals[value] = monthly[value].reduce((a, b) => a + b, 0);
    }
    return totals;
  }

  calcAccTaxBase(taxBase) {
    return this.accumulateValue(taxBase);
  }

  calcTaxBase(grossSalary, socialSecurity, earningCost){
    let taxBase = new Array(12);
    for(let i = 0; i < taxBase.length; i++) {
      let tempTaxBase =  grossSalary[i] - socialSecurity[i] - earningCost;
      taxBase[i] = this.roundNumber(tempTaxBase, 0);
    };
    return taxBase;
  }

  calcProgressiveTax(taxBase, accTaxBase, healthDeductible, monthlyRelief) {
    let tax = new Array(12);

    for(let i = 0; i < tax.length; i++) {
      let tempTax = 0;
      // The montly relief is only applied in case the tax taxLimit has not been exceeded
      if(accTaxBase[i] < TAX.taxLimit){
        tempTax = (taxBase[i] * TAX.rate18) - healthDeductible[i] - monthlyRelief;
      } else {
        tempTax = (taxBase[i] * TAX.rate32) - healthDeductible[i];
      }
      tax[i] = Math.round(100*tempTax)/100;
    };

    return tax;
  }

  calcFinalSalary(grossSalary, ...costs) {
    let finalSalary = new Array(12);
    for(let i = 0; i < finalSalary.length; i++){
      let tempFinalSalary = grossSalary[i];
      for(let j = 0; j < costs.length; j++){
        if(costs[j] instanceof Array) {
          tempFinalSalary -= costs[j][i];
        } else {
          tempFinalSalary -= costs[j];
        }
      }
      finalSalary[i] = this.roundNumber(tempFinalSalary,2);
    }
    return finalSalary;
  }

  accumulateValue(array) {
    let accArray = [];
    array.reduce((a, b, i) => { return accArray[i] = a + b;}, 0);
    // Shift array by 1 element so it suits the tax logic (starting with 0)
    accArray.unshift(0);
    accArray.pop();
    return accArray;
  }

  isUOP() {
    return (this.contract === CONTRACT.UOP);
  }

  isB2B() {
    return (this.contract === CONTRACT.B2B);
  }
}
