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

const RATES = {
  'pension': (9.76/100),
  'disability': (1.5/100),
  'sickness': (2.45/100),
  'healthContribution': (9/100),
  'healthDeductible': (7.75/100)
};

const TAXRATE = {
  'rate18': (18/100),
  'rate19': (19/100),
  'rate32': (32/100)
};

const AUXVALUESUOP = {
  'earningCost': 111.25,
  'monthlyRelief': 46.33,
  'annualLimit': 133290, /* Annual limit for pension and disability calculations */
  'taxLimit': 85528
};

const TAXTYPE = {
  'progressive': Symbol('18%/32%'),
  'linear': Symbol('19%')
};

const ZUS = {
  'noZUS': Symbol('No contributions in the first 6 months'),
  'discountedZUS': Symbol('Lower contributions in the first 2 years'),
  'normalZUS': Symbol('Normal contribution')
};

const CONTRACT = {
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

  calcProgressiveTax(taxBase, accTaxBase, healthDeductible, rate18, rate32, taxLimit, monthlyRelief) {
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
      this.monthly.healthDeductible, this.taxRate.rate18,
      this.taxRate.rate32, this.auxValues.taxLimit, this.auxValues.monthlyRelief
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
      return super.calcProgressiveTax(taxBase, healthDeductible, 0);
    } else {
      return this.calcLinearTax(taxBase, healthDeductible);
    }
  }

  calcLinearTax(taxBase, healthDeductible) {
    let tax = new Array(12);
    for(let i = 0; i < tax.length; i++){
      let taxBeforeDeductible = taxBase[i] * TAXRATE.rate19;
      if(taxBeforeDeductible >= healthDeductible[i]){
        tax[i] = taxBeforeDeductible - healthDeductible[i];
      } else {
        tax[i] = 0;
      }
    }
    return tax;
  }
} // End of class UOPCalculator

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
  let tableFields = ['input-salary', 'social-security', 'health-contribution',
  'tax', 'final-salary'];
  let values = [];
  let values12 = [];
  let valueNames = [];

  if(calculator.isUOP()) {
    valueNames = ['grossSalary', 'socialSecurity', 'healthContribution', 'tax', 'netSalary'];
  } else if(calculator.isB2B()) {
    valueNames = ['netSalary', 'socialSecurity', 'healthContribution', 'tax', 'salaryInHand'];
  };
  valueNames.forEach((name) => {
    values.push(calculator.monthly[name][0]);
    values12.push(calculator.annual[name]/12);
  });
  writeToTable(summaryTable, tableFields, values);
  writeToTable(summaryTable12Month, tableFields, values12);
}

function writeToTable(table, fields, values) {
  for(let i = 0; i < fields.length; i++) {
    table.querySelector(`.${fields[i]}`).innerHTML = formatNumber(values[i], 2);
  }
}

function populateMainTable(calculator) {
  // Variable names inside calculator
  let valueNames = [];
  if(calculator.isUOP()) {
    valueNames = ['grossSalary', 'pension', 'disability', 'sickness',
    'healthContribution', 'taxBase', 'tax', 'netSalary'];
  } else if(calculator.isB2B()) {
    valueNames = ['netSalary', 'pension', 'disability', 'sickness',
    'healthContribution', 'others', 'tax', 'salaryInHand'];
  };
  // Class names used in the table
  let tableFields = ['input-salary', 'pension', 'disability', 'sickness',
  'health', 'tax-base', 'tax', 'final-salary'];

  // Write monthly values
  for(let i = 0; i < 12; i++)
  {
    // Add suffix to the classnames based on the month
    let monthTableFields = tableFields.map((el) => {return el + `-${i}`});
    let values = [];
    // Retrieve the values for each variable from the calculator
    valueNames.forEach((name) => {
      values.push(calculator.monthly[name][i]);
    });
    // Write values to the table
    writeToTable(mainTable, monthTableFields, values);
  }

  // Write totals
  let values = [];
  // Retrieve the values for each variable from the calculator
  valueNames.forEach((name) => {
    values.push(calculator.annual[name]);
  });
  // Write values to the table
  writeToTable(mainTable.tFoot, tableFields, values);
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
  b2bOptions.taxType = (() => {
    if(taxProgressive.checked) return TAXTYPE.progressive;
    else return TAXTYPE.linear;
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
  net
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
  uopCalculator.calcSalary(salary, RATES, TAXRATE, AUXVALUESUOP);
  let b2bOptions =  {};
  b2bOptions = getB2BOptions(b2bOptions);
  b2bCalculator.calcSalary(salary, b2bOptions);

  //  Populate tables with the results
  if(contract === CONTRACT.UOP) {
    populateSummaryTable(uopCalculator);
    populateMainTable(uopCalculator);
  } else if(contract === CONTRACT.B2B) {
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
calculateButton.addEventListener('click', function() {calculate(selectedContract);});
salaryInput.addEventListener('keydown', function() {pressedKey(event, selectedContract);});
btnB2BOptions.addEventListener('click', function() {toggleB2BOptions();});
