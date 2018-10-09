const buttonUOP = document.querySelector('#tab-btn-uop');
const buttonB2B = document.querySelector('#tab-btn-b2b');
const formInputSalary = document.querySelector('#form-input-salary');
const tabB2B = document.getElementById('tab-b2b');
const headerGross = document.getElementById('header-gross');
const headerTaxBase = document.getElementById('header-tax-base');
const headerNet = document.getElementById('header-net');
const grossElements = document.getElementsByClassName('summary-header-gross');
const netElements = document.getElementsByClassName('summary-header-net');
const btnB2BOptions = document.querySelector('#btn-b2b-options');
const containerB2BOptions = document.querySelector('#b2b-options');
const inputCosts = document.querySelector('#costs');
const salaryInput = document.querySelector('#input-gross-salary');
const radioAnnually = document.querySelector('#annually');
const vat0 = document.querySelector('#vat-0');
const vat5 = document.querySelector('#vat-5');
const vat8 = document.querySelector('#vat-8');
const taxProgressive = document.querySelector('#tax-progressive');
const noZUS = document.querySelector('#no-zus');
const discountedZUS = document.querySelector('#discounted-zus');
const sicknessYes = document.querySelector('#sickness-yes');
const costs = document.querySelector('#costs');
const calculateButton = document.querySelector('#btn-calculate');
const tableContainer = document.querySelector('#container-results');
const summaryTable = document.querySelector('#table-summary-1st-month');
const summaryTable12Month = document.querySelector('#table-summary-12-month');
const mainTable = document.querySelector('#table-main');

const ratesSocial = {
  'pension': (9.76/100),
  'disability': (1.5/100),
  'sickness': (2.45/100)
};

const ratesHealth = {
  'contribution': (9/100),
  'deductible': (7.75/100)
};

const ratesTax = {
  'rate18': (18/100),
  'rate19': (19/100),
  'rate32': (32/100)
};

const auxValuesUOP = {
  'earningCost': 111.25,
  'monthlyRelief': 46.33,
  'annualLimit': 133290, /* Annual limit for pension and disability calculations */
  'taxLimit': 85528
};

const taxRate = {
  'progressive': Symbol('18%/32%'),
  'linear': Symbol('19%')
};

const ZUS = {
  'noZUS': Symbol('No contributions in the first 6 months'),
  'discountedZUS': Symbol('Lower contributions in the first 2 years'),
  'normalZUS': Symbol('Normal contribution')
};

const contract = {
  'B2B': Symbol('B2B'),
  'UOP': Symbol('Umowa o prace')
};

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

  accumulateValue(array) {
    let accArray = [];
    array.reduce((a, b, i) => { return accArray[i] = a + b;}, 0);
    // Shift array by 1 element so it suits the tax logic (starting with 0)
    accArray.unshift(0);
    accArray.pop();
    return accArray;
  }

  isUOP() {
    return (this.contract === contract.UOP);
  }

  isB2B() {
    return (this.contract === contract.B2B);
  }
}

class UOPCalculator extends BaseCalculator{
  constructor(){
    super();
    this.monthly.accTaxBase = new Array(12).fill(0);
    this.contract = contract.UOP;
  }

  calcSalary(grossSalary, ratesSocial, ratesHealth, ratesTax, auxValues) {
    this.monthly.grossSalary.fill(grossSalary);
    this.ratesSocial = ratesSocial;
    this.ratesHealth = ratesHealth;
    this.ratesTax = ratesTax;
    this.auxValues = auxValues;

    // Accumulated gross salary
    this.monthly.accGrossSalary = this.calcAccGrossSalary(this.monthly.grossSalary);

    // Pension
    this.monthly.pension = this.calcPension(
      this.monthly.grossSalary, this.monthly.accGrossSalary,
      this.auxValues.annualLimit, this.ratesSocial.pension
    );

    // Disability insurance
    this.monthly.disability = this.calcDisability(
      this.monthly.grossSalary, this.monthly.accGrossSalary,
      this.auxValues.annualLimit, this.ratesSocial.disability
    );

    // Sickness insurance
    this.monthly.sickness = this.calcSickness(
      this.monthly.grossSalary, this.ratesSocial.sickness
    );

    // Social security
    this.monthly.socialSecurity = this.calcSocialSecurity(
      this.monthly.pension, this.monthly.disability, this.monthly.sickness
    );

    // Health contribution
    this.monthly.healthContribution = this.calcHealthContribution(
      this.monthly.grossSalary, this.monthly.socialSecurity, this.ratesHealth.contribution
    );

    // Health deductible
    this.monthly.healthDeductible = super.calcHealthDeductible(
      this.monthly.healthContribution, this.ratesHealth.deductible,
      this.ratesHealth.contribution
    );

    // Tax base
    this.monthly.taxBase = this.calcTaxBase(
      this.monthly.grossSalary, this.monthly.socialSecurity, this.auxValues.earningCost
    );

    // Accumulated tax base
    this.monthly.accTaxBase = this.calcAccTaxBase(this.monthly.taxBase);

    // Tax
    this.monthly.tax = this.calcTax(
      this.monthly.taxBase, this.monthly.accTaxBase,
      this.monthly.healthDeductible, this.ratesTax.rate18,
      this.ratesTax.rate32, this.auxValues.taxLimit, this.auxValues.monthlyRelief
    );

    // Net salary
    this.monthly.netSalary = this.calcNetSalary(this.monthly.grossSalary,
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
    let socialSecurity = new Array(12);
    for(let i = 0; i < socialSecurity.length; i++){
      socialSecurity[i] = pension[i] + disability[i] + sickness[i];
    }
    return socialSecurity;
  }

  calcHealthContribution(grossSalary, socialSecurity, rateHealthContribution) {
    let healthContribution = new Array(12);
    for(let i = 0; i < healthContribution.length; i++){
      let healthBase = grossSalary[i] - socialSecurity[i];
      healthContribution[i] = this.calcContribution(healthBase, rateHealthContribution);
    };
    return healthContribution;
  }

  calcTaxBase(grossSalary, socialSecurity, earningCost){
    let taxBase = new Array(12);
    for(let i = 0; i < taxBase.length; i++) {
      let tempTaxBase =  grossSalary[i] - socialSecurity[i] - earningCost;
      taxBase[i] = this.roundNumber(tempTaxBase, 0);
    };
    return taxBase;
  }

  calcAccTaxBase(taxBase) {
    return this.accumulateValue(taxBase);
  }

  calcTax(taxBase, accTaxBase, healthDeductible, rate18, rate32, taxLimit, monthlyRelief) {
    let tax = new Array(12);

    for(let i = 0; i < tax.length; i++) {
      let tempTax = 0;
      // The montly relief is only applied in case the tax taxLimit has not been exceeded
      if(accTaxBase[i] < taxLimit){
        tempTax = (taxBase[i] * rate18) - healthDeductible[i] - monthlyRelief;
      } else {
        tempTax = (taxBase[i] * rate32) - healthDeductible[i];
      }
      tax[i] = Math.round(tempTax, 0);
    };

    return tax;
  }

  calcNetSalary(grossSalary, socialSecurity, healthContribution, tax) {
    let netSalary = new Array(12);
    for(let i = 0; i < netSalary.length; i++){
      let tempNetSalary = grossSalary[i] - socialSecurity[i] - healthContribution[i] - tax[i];
      netSalary[i] = this.roundNumber(tempNetSalary,2);
    }
    return netSalary;
  }
} // End of class UOPCalculator

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
    this.contract = contract.B2B;
  }

  calcSalary(netSalary, b2bOptions) {
    this.monthly.netSalary.fill(netSalary);
    this.vat = b2bOptions.vat;
    this.taxRate = b2bOptions.taxRate;
    this.zus = b2bOptions.zus;
    this.paySickness = b2bOptions.paySickness;
    this.costs = b2bOptions.costs;

    this.monthly.pension = this.calcPension(this.zus);
    this.monthly.disability = this.calcDisability(this.zus);
    this.monthly.sickness = this.calcSickness(this.paySickness, this.zus);
    this.monthly.healthContribution = this.calcHealthContribution();
    this.monthly.healthDeductible = super.calcHealthDeductible(
      this.monthly.healthContribution, ratesHealth.deductible, ratesHealth.contribution
    );
    this.monthly.accident = this.calcAccident(this.zus);
    this.monthly.laborFund = this.calcLaborFund(this.zus);
    this.monthly.others = this.calcOthers(this.monthly.accident, this.monthly.laborFund);
    this.monthly.socialSecurity = this.calcSocialSecurity(
      this.monthly.pension, this.monthly.disability, this.monthly.sickness,
      this.monthly.accident, this.monthly.laborFund
    );
    this.monthly.zusContribution = this.calcZUSContribution(
      this.monthly.socialSecurity, this.monthly.healthContribution
    );
    this.monthly.baseTax = this.calcBaseTax(this.monthly.netSalary,
      this.monthly.socialSecurity, this.costs
    );
    this.monthly.tax = this.calcTax(this.taxRate, this.monthly.baseTax,
      this.monthly.healthDeductible
    );
    this.monthly.salaryInHand = this.calcSalaryInHand(this.monthly.netSalary,
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
    let others = new Array(12);
    for(let i = 0; i < others.lenth; i++) {
      others[i] = accident[i] + laborFund[i];
    }
    return others;
  }

  calcSocialSecurity(pension, disability, sickness, accident, laborFund) {
    let socialSecurity = new Array(12);

    for(let i = 0; i < socialSecurity.length; i++){
      socialSecurity[i] = pension[i] + disability[i] + sickness[i]+ accident[i] + laborFund[i];
    }
    return socialSecurity;
  }

  calcZUSContribution(socialSecurity, healthContribution) {
    return (new Array(12).fill(socialSecurity + healthContribution));
  }

  calcBaseTax(netSalary, socialSecurity, costs) {
    let baseTax = new Array(12);
    for(let i = 0; i < baseTax.length; i++) {
      baseTax[i] = netSalary[i] - socialSecurity[i] - costs;
    }
    return baseTax;
  }

  calcTax(taxRate, baseTax, healthDeductible) {
    if(taxRate == ratesTax.progressive) {
      return this.calcLinearTax(baseTax, healthDeductible);
    } else {
      return this.calcLinearTax(baseTax, healthDeductible);
    }
  }

  calcLinearTax(baseTax, healthDeductible) {
    let tax = new Array(12);
    for(let i = 0; i < tax.length; i++){
      let taxBeforeDeductible = baseTax[i] * ratesTax.rate19;
      if(taxBeforeDeductible >= healthDeductible[i]){
        tax[i] = taxBeforeDeductible - healthDeductible[i];
      } else {
        tax[i] = 0;
      }
    }
    return tax;
  }

  calcSalaryInHand(netSalary, socialSecurity, healthContribution, costs, tax) {
    let salaryInHand = new Array(12);
    for(let i = 0; i < netSalary.length; i++){
      let tempSalary = netSalary[i] - socialSecurity[i] -
      healthContribution[i] - costs - tax[i];
      salaryInHand[i] = this.roundNumber(tempSalary,2);
    }
    return salaryInHand;
  }
}

function selectContract(calculator) {
  // Update global variable selectedContract
  selectedContract = calculator.contract;

  // Update table titles based on contract
  updateHeaderNames(calculator.contract);

  if(calculator.isUOP()) {
    // Highlight UOP button
    buttonUOP.classList.add('active');
    // Remove highlight from B2B button
    buttonB2B.classList.remove('active');
    // Hide B2B elements
    tabB2B.classList.add('is-hidden');
    containerB2BOptions.classList.add('is-hidden');
  } else if (calculator.isB2B()) {
    // Highlight B2B button
    buttonB2B.classList.add('active');
    // Remove highlight from UOP button
    buttonUOP.classList.remove('active');
    // Show B2B options button
    tabB2B.classList.remove('is-hidden');
  };

  // Update the table data in case it has been calculated
  if(isCalculated) {
    populateSummaryTable(calculator);
    populateMainTable(calculator);
  }
}

function updateHeaderNames(type) {
  if(type === CONTRACT.UOP) {
    formInputSalary.innerHTML = 'Gross salary:';
    headerGross.innerHTML = 'Gross <br> salary';
    headerTaxBase.innerHTML = 'Tax base';
    headerNet.innerHTML = 'Net <br> salary';
    for(let i = 0; i < grossElements.length; i++) {
      grossElements[i].innerHTML = 'Gross salary';
      netElements[i].innerHTML = 'Net salary';
    }
  } else if(type === CONTRACT.B2B) {
    formInputSalary.innerHTML = 'Net salary (from invoice):';
    headerGross.innerHTML = 'Net salary <br> (from invoice)';
    headerTaxBase.innerHTML = 'Others';
    headerNet.innerHTML = 'Salary <br> in hand';
    for(let i = 0; i < grossElements.length; i++) {
      grossElements[i].innerHTML = 'Net (from invoice)';
      netElements[i].innerHTML = 'Salary in hand';
    }
  };
}

function formatNumber(number, precision){
  return number.toFixed(precision).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function populateSummaryTable(calculator){
  let body = summaryTable.tBodies[0];
  let body12 = summaryTable12Month.tBodies[0];
  if(calculator.contract === contract.UOP) {
    body.rows[0].cells[1].innerHTML = formatNumber(calculator.monthly.grossSalary[0], 2);
    body.rows[4].cells[1].innerHTML = formatNumber(calculator.monthly.netSalary[0], 2);
    body12.rows[0].cells[1].innerHTML = formatNumber(calculator.annual.grossSalary/12, 2);
    body12.rows[4].cells[1].innerHTML = formatNumber(calculator.annual.netSalary/12, 2);
  } else if(calculator.contract === contract.B2B) {
    body.rows[0].cells[1].innerHTML = formatNumber(calculator.monthly.netSalary[0], 2);
    body.rows[4].cells[1].innerHTML = formatNumber(calculator.monthly.salaryInHand[0], 2);
    body12.rows[0].cells[1].innerHTML = formatNumber(calculator.annual.netSalary/12, 2);
    body12.rows[4].cells[1].innerHTML = formatNumber(calculator.annual.salaryInHand/12, 2);
  };
  body.rows[1].cells[1].innerHTML = formatNumber(calculator.monthly.socialSecurity[0], 2);
  body.rows[2].cells[1].innerHTML = formatNumber(calculator.monthly.healthContribution[0], 2);
  body.rows[3].cells[1].innerHTML = formatNumber(calculator.monthly.tax[0], 2);
  body12.rows[1].cells[1].innerHTML = formatNumber(calculator.annual.socialSecurity/12, 2);
  body12.rows[2].cells[1].innerHTML = formatNumber(calculator.annual.healthContribution/12, 2);
  body12.rows[3].cells[1].innerHTML = formatNumber(calculator.annual.tax/12, 2);
}

function populateMainTable(calculator) {
  let body = mainTable.tBodies[0];

  /* Format monthly values */
  for(let i = 0; i < body.rows.length; i++)
  {
    if(calculator.contract === contract.UOP) {
      body.rows[i].cells[1].innerHTML = formatNumber(calculator.monthly.grossSalary[i], 2);
      body.rows[i].cells[6].innerHTML = formatNumber(calculator.monthly.taxBase[i], 2);
      body.rows[i].cells[8].innerHTML = formatNumber(calculator.monthly.netSalary[i], 2);
    } else if(calculator.contract === contract.B2B) {
      let others = calculator.monthly.accident[i] + calculator.monthly.laborFund[i];
      body.rows[i].cells[1].innerHTML = formatNumber(calculator.monthly.netSalary[i], 2);
      body.rows[i].cells[6].innerHTML = formatNumber(others, 2);
      body.rows[i].cells[8].innerHTML = formatNumber(calculator.monthly.salaryInHand[i], 2);
    };
    body.rows[i].cells[2].innerHTML = formatNumber(calculator.monthly.pension[i], 2);
    body.rows[i].cells[3].innerHTML = formatNumber(calculator.monthly.disability[i], 2);
    body.rows[i].cells[4].innerHTML = formatNumber(calculator.monthly.sickness[i], 2);
    body.rows[i].cells[5].innerHTML = formatNumber(calculator.monthly.healthContribution[i], 2);
    body.rows[i].cells[7].innerHTML = formatNumber(calculator.monthly.tax[i], 2);
  }

  /* Format total values */
  let foot = mainTable.tFoot;
  if(calculator.contract === contract.UOP) {
    foot.rows[0].cells[1].innerHTML = formatNumber(calculator.annual.grossSalary,2);
    foot.rows[0].cells[6].innerHTML = formatNumber(calculator.annual.taxBase,2);
    foot.rows[0].cells[8].innerHTML = formatNumber(calculator.annual.netSalary,2);
  } else if(calculator.contract === contract.B2B) {
    let others = calculator.monthly.accident[i] + calculator.monthly.laborFund[i];
    foot.rows[0].cells[1].innerHTML = formatNumber(calculator.annual.netSalary,2);
    foot.rows[0].cells[6].innerHTML = formatNumber(others, 2);
    foot.rows[0].cells[8].innerHTML = formatNumber(calculator.annual.salaryInHand,2);
  };
  foot.rows[0].cells[2].innerHTML = formatNumber(calculator.annual.pension,2);
  foot.rows[0].cells[3].innerHTML = formatNumber(calculator.annual.disability,2);
  foot.rows[0].cells[4].innerHTML = formatNumber(calculator.annual.sickness,2);
  foot.rows[0].cells[5].innerHTML = formatNumber(calculator.annual.healthContribution,2);
  foot.rows[0].cells[7].innerHTML = formatNumber(calculator.annual.tax, 2);
}

function checkValue(grossSalary){
  if(grossSalary === '') return false;
  grossSalary = parseFloat(grossSalary);

  if(grossSalary <= 0){
    alert('Please enter a positive value.');
    salaryInput.focus();
    return false;
  } else if(isNaN(grossSalary)) {
    alert('Please enter a numeric value.');
    salaryInput.focus();
    return false;
  }
  return grossSalary;
}

function getB2BOptions(b2bOptions) {
  // VAT
  b2bOptions.vat = (() => {
    if(vat0.checked) return 0;
    else if(vat5.checked) return (5/100);
    else if(vat8.checked) return (8/100);
    else return (23/100);
  })();

  // Tax rate modality (19% or 18%/32%)
  b2bOptions.taxRate = (() => {
    if(taxProgressive.checked) return taxRate.progressive;
    else return taxRate.linear;
  })();

  // ZUS modality (no ZUS, discounted or normal)
  b2bOptions.zus = (() => {
    if(noZUS.checked) return ZUS.noZUS;
    else if(discountedZUS.checked) return ZUS.discountedZUS;
    else return ZUS.normalZUS;
  })();

  // Pay sickness (yes or no)
  b2bOptions.paySickness = (() => {
    if(sicknessYes.checked) return true;
    else return false;
  })();

  // Costs for running the business
  b2bOptions.costs = (() => {
    if(costs.value.trim() != '') return costs.value;
    else return 0;
  })();

  return b2bOptions;
}

function displayValueOnTab(uopCalculator, b2bCalculator) {
  // Display net salary on Umowa o pracę's tab
  let netSalary = formatNumber(uopCalculator.annual.netSalary/12, 0);
  buttonUOP.innerHTML = `
  Umowa o pracę
  <div class="big-font"> ${netSalary} zł</div>
  net (in hand)
  `;

  // Display salary in hand on B2B's tab
  let salaryInHand = formatNumber(b2bCalculator.annual.salaryInHand/12, 0);
  buttonB2B.innerHTML = `
  B2B contract
  <div class="big-font"> ${salaryInHand}  zł</div>
  in hand
  `;
}

var calculate = function(contract) {
  document.activeElement.blur();
  let salary = salaryInput.value;
  // If the result is false, interrupt the code
  salary = checkValue(salary);
  if(!salary) return false;

  if(radioAnnually.checked) salary /= 12;

  // Calculate net salary
  uopCalculator.calcSalary(salary, ratesSocial, ratesHealth, ratesTax, auxValuesUOP);
  let b2bOptions =  {};
  b2bOptions = getB2BOptions(b2bOptions);
  b2bCalculator.calcSalary(salary, b2bOptions);

  //  Populate tables with the results
  if(contract === contract.UOP) {
    populateSummaryTable(uopCalculator);
    populateMainTable(uopCalculator);
  } else if(contract === contract.B2B) {
    populateSummaryTable(b2bCalculator);
    populateMainTable(b2bCalculator);
  };
  displayValueOnTab(uopCalculator, b2bCalculator);

  /* Display the table */
  if(tableContainer.classList.contains('is-hidden')) {
    tableContainer.classList.remove('is-hidden');
  }
  isCalculated = true;
};

/* Check if enter key was pressed */
var pressedKey = function(e){
  if(e.key === 'Enter'){
    calculate(selectedContract);
  }
};

var toggleB2BOptions = function() {
  containerB2BOptions.classList.toggle('is-hidden');
  if(containerB2BOptions.classList.contains('is-hidden')) {
    btnB2BOptions.innerHTML = "Show B2B options";
  } else {
    btnB2BOptions.innerHTML = "Hide B2B options";
  }
}

var uopCalculator = new UOPCalculator;
var b2bCalculator = new B2BCalculator;
var selectedContract;
var isCalculated = false;
salaryInput.focus();
buttonUOP.addEventListener('click', function() {selectContract(uopCalculator);});
buttonB2B.addEventListener('click', function() {selectContract(b2bCalculator);});
buttonUOP.click();
netSalaryButton.addEventListener('click', function() {calculate(selectedContract);});
salaryInput.addEventListener('keydown', function() {pressedKey(event, selectedContract);});
btnB2BOptions.addEventListener('click', function() {toggleB2BOptions();});
