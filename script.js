const radioMonthly = document.querySelector('#monthly');
const radioAnnually = document.querySelector('#annually');
const buttonUOP = document.querySelector('#tab-btn-uop');
const buttonB2B = document.querySelector('#tab-btn-b2b');
const containerB2B = document.querySelector('#b2b');
const inputCosts = document.querySelector('#costs');
const salaryInput = document.querySelector('#input-gross-salary');
const netSalaryButton = document.querySelector('#btn-calculate');
const tableContainer = document.querySelector('#container-results');
const summaryTable = document.querySelector('#table-summary-1st-month');
const summaryTable12Month = document.querySelector('#table-summary-12-month');
const mainTable = document.querySelector('#table-main');
const isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
const defaultInsurance = 504.66;
const defaultPvtInsurance = 100.00;
const defaultOthers = 0.00;
const noZUS = Symbol('No contributions in the first 6 months');
const preferentialZUS = Symbol('Lower contributions in the first 2 years');
const normalZUS = Symbol('Normal contribution');

const ratesSocial = {
  'pension': (9.76/100),
  'disability': (1.5/100),
  'sickness': (2.45/100),
};

const ratesHealth = {
  'contribution': (9/100),
  'deductible': (7.75/100),
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

  sumTotal(array){
    return array.reduce((a, b) => a + b, 0);
  }

  accumulateValue(array) {
    let accArray = [];
    array.reduce((a, b, i) => { return accArray[i] = a + b;}, 0);
    // Shift array by 1 element so it suits the tax logic (starting with 0)
    accArray.unshift(0);
    accArray.pop();
    return accArray;
  }
}

class UOPCalculator extends BaseCalculator{
  constructor(grossSalary, ratesSocial, ratesHealth, ratesTax, auxValues){
    super();
    this.monthly.grossSalary.fill(grossSalary);
    this.monthly.accTaxBase = new Array(12).fill(0);
    this.ratesSocial = ratesSocial;
    this.ratesHealth = ratesHealth;
    this.ratesTax = ratesTax;
    this.auxValues = auxValues;
    this.calcSalary();
  }

  calcSalary() {
    this.calcAccGrossSalary(this);
    this.calcPension(this);
    this.calcDisability(this);
    this.calcSickness(this);
    this.calcSocialSecurity(this);
    this.calcHealthContribution(this);
    this.calcHealthDeductible(this);
    this.calcTaxBase(this);
    this.calcAccTaxBase(this);
    this.calcTax(this);
    this.calcNetSalary(this);
    this.calcTotals(this);
  }

  calcAccGrossSalary(calculator){
    let grossSalary = calculator.monthly.grossSalary;
    let accGrossSalary = this.accumulateValue(grossSalary);
    calculator.monthly.accGrossSalary = accGrossSalary;
    return calculator;
  }

  calcPension(calculator) {
    let pensionRate = calculator.ratesSocial.pension;
    let pension = [];
    pension = calculator.monthly.pension.map((value, i) => {return this.calcPensionDisability(i, calculator, pensionRate);});
    calculator.monthly.pension = pension;
    return calculator;
  }

  calcDisability(calculator) {
    let disabilityRate = calculator.ratesSocial.disability;
    let disability = [];
    disability = calculator.monthly.disability.map((value, i) => {return this.calcPensionDisability(i, calculator, disabilityRate);});
    calculator.monthly.disability = disability;
    return calculator;
  }

  calcPensionDisability(i, calculator, rate) {
    let value = 0;
    let accGrossSalary = calculator.monthly.accGrossSalary[i];
    let grossSalary = calculator.monthly.grossSalary[i];
    let annualLimit = calculator.auxValues.annualLimit;

    if((accGrossSalary + grossSalary) < annualLimit){
      value = this.calcContribution(grossSalary, rate);
    } else if (accGrossSalary < annualLimit){
      let baseGrossSalary = annualLimit - accGrossSalary;
      value = this.calcContribution(baseGrossSalary, rate);
    }
    return value;
  }

  calcSickness(calculator) {
    let grossSalary = calculator.monthly.grossSalary[0];
    let sicknessRate = calculator.ratesSocial.sickness;
    let sickness = [];
    sickness = calculator.monthly.sickness.map(() => {return this.calcContribution(grossSalary, sicknessRate);});
    calculator.monthly.sickness = sickness;
    return calculator;
  }

  calcSocialSecurity(calculator) {
    let pension = calculator.monthly.pension;
    let disability = calculator.monthly.disability;
    let sickness = calculator.monthly.sickness;
    let socialSecurity = [];
    socialSecurity = calculator.monthly.socialSecurity.map((value, i) => {return pension[i] + disability[i] + sickness[i];});
    calculator.monthly.socialSecurity = socialSecurity;
    return calculator;
  }

  calcHealthContribution(calculator) {
    let rateHealthContribution = calculator.ratesHealth.contribution;
    let grossSalary = calculator.monthly.grossSalary;
    let socialSecurity = calculator.monthly.socialSecurity;
    let healthContribution = [];
    healthContribution = calculator.monthly.healthContribution.map((value, i) => {
      let healthBase = grossSalary[i] - socialSecurity[i];
      return this.calcContribution(healthBase, rateHealthContribution);
    });
    calculator.monthly.healthContribution = healthContribution;
    return calculator;
  }

  calcHealthDeductible(calculator) {
    let healthContribution = calculator.monthly.healthContribution;
    let rateDeductible = calculator.ratesHealth.deductible;
    let rateContribution = calculator.ratesHealth.contribution;
    let healthDeductible = super.calcHealthDeductible(healthContribution, rateDeductible, rateContribution);
    calculator.monthly.healthDeductible = healthDeductible;
    return calculator;
  }

  calcTaxBase(calculator){
    let earningCost = calculator.auxValues.earningCost;
    let grossSalary = calculator.monthly.grossSalary;
    let socialSecurity = calculator.monthly.socialSecurity;
    let taxBase = [];
    taxBase = grossSalary.map((value, i) => {
      let tempTaxBase =  grossSalary[i] - socialSecurity[i] - earningCost;
      return this.roundNumber(tempTaxBase, 0);
    });
    calculator.monthly.taxBase = taxBase;
    return calculator;
  }

  calcAccTaxBase(calculator) {
    let taxBase = calculator.monthly.taxBase;
    let accTaxBase = this.accumulateValue(taxBase);
    calculator.monthly.accTaxBase = accTaxBase;
    return calculator;
  }

  calcTax(calculator) {
    let rate18 = calculator.ratesTax.rate18;
    let rate32 = calculator.ratesTax.rate32;
    let taxLimit = calculator.auxValues.taxLimit;
    let monthlyRelief = calculator.auxValues.monthlyRelief;
    let tax = [];

    tax = calculator.monthly.tax.map((value, i) => {
      let taxBase = calculator.monthly.taxBase[i];
      let tempTax = 0;
      // The montly relief is only applied in case the tax taxLimit has not been exceeded
      if(calculator.monthly.accTaxBase[i] < taxLimit){
        tempTax = (taxBase * rate18) - calculator.monthly.healthDeductible[i] - monthlyRelief;
      } else {
        tempTax = (taxBase * rate32) - calculator.monthly.healthDeductible[i];
      }
      return Math.round(tempTax, 0);
    });

    calculator.monthly.tax = tax;
    return calculator;
  }

  calcNetSalary(calculator) {
    let grossSalary = calculator.monthly.grossSalary;
    let socialSecurity = calculator.monthly.socialSecurity;
    let healthContribution = calculator.monthly.healthContribution;
    let tax = calculator.monthly.tax;
    let netSalary = [];

    netSalary = grossSalary.map((value, i) => {
      let tempNetSalary = grossSalary[i] - socialSecurity[i] - healthContribution[i] - tax[i];
      return (this.roundNumber(tempNetSalary,2));
    });

    calculator.monthly.netSalary = netSalary;
    return calculator;
  }

  calcTotals(calculator) {
    for(let value in calculator.annual){
      calculator.annual[value] = this.sumTotal(calculator.monthly[value]);
    }
    return calculator;
  }
} // End of class UOPCalculator

class B2BCalculator extends BaseCalculator {
  constructor(netSalary, vat, zusContribution){
    super();
    this.monthly.netSalary.fill(netSalary);
    this.ratesSocial = ratesSocial;
    this.ratesHealth = ratesHealth;
    this.ratesTax = ratesTax;
  }
}

function selectContract(contractType) {
  // Declare all variables
  let i;
  let tabs;
  let tabLinks;

  // Get all elements with class='tab-content' and hide them
  tabs = document.getElementsByClassName('tab-content');
  for (i = 0; i < tabs.length; i++) {
    tabs[i].style.display = 'none';
  }

  // Get all elements with class='tab-link' and remove the class 'active'
  tabLinks = document.getElementsByClassName('tab-btn');
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(' active', '');
  }

  // Show the current tab, and add an 'active' class to the button that opened the tab
  document.getElementById('tab-' + contractType).style.display = 'block';
  document.getElementById('tab-btn-' + contractType).className += ' active';
}

/* It sets the format to two decimals and uses space as thousand separator */
function formatNumber(number){
  return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function populateSummaryTable(calculator){
  let body = summaryTable.tBodies[0];
  body.rows[0].cells[1].innerHTML = formatNumber(calculator.monthly.grossSalary[0]);
  body.rows[1].cells[1].innerHTML = formatNumber(calculator.monthly.socialSecurity[0]);
  body.rows[2].cells[1].innerHTML = formatNumber(calculator.monthly.healthContribution[0]);
  body.rows[3].cells[1].innerHTML = formatNumber(calculator.monthly.tax[0]);
  body.rows[4].cells[1].innerHTML = formatNumber(calculator.monthly.netSalary[0]);

  body = summaryTable12Month.tBodies[0];
  body.rows[0].cells[1].innerHTML = formatNumber(calculator.annual.grossSalary/12);
  body.rows[1].cells[1].innerHTML = formatNumber(calculator.annual.socialSecurity/12);
  body.rows[2].cells[1].innerHTML = formatNumber(calculator.annual.healthContribution/12);
  body.rows[3].cells[1].innerHTML = formatNumber(calculator.annual.tax/12);
  body.rows[4].cells[1].innerHTML = formatNumber(calculator.annual.netSalary/12);
}

function populateMainTable(calculator){
  let body = mainTable.tBodies[0];

  /* Format monthly values */
  for(let i = 0; i < body.rows.length; i++)
  {
    body.rows[i].cells[1].innerHTML = formatNumber(calculator.monthly.grossSalary[i]);
    body.rows[i].cells[2].innerHTML = formatNumber(calculator.monthly.pension[i]);
    body.rows[i].cells[3].innerHTML = formatNumber(calculator.monthly.disability[i]);
    body.rows[i].cells[4].innerHTML = formatNumber(calculator.monthly.sickness[i]);
    body.rows[i].cells[5].innerHTML = formatNumber(calculator.monthly.healthContribution[i]);
    body.rows[i].cells[6].innerHTML = formatNumber(calculator.monthly.taxBase[i]);
    body.rows[i].cells[7].innerHTML = formatNumber(calculator.monthly.tax[i]);
    body.rows[i].cells[8].innerHTML = formatNumber(calculator.monthly.netSalary[i]);
  }

  /* Format total values */
  let foot = mainTable.tFoot;
  foot.rows[0].cells[1].innerHTML = formatNumber(calculator.annual.grossSalary);
  foot.rows[0].cells[2].innerHTML = formatNumber(calculator.annual.pension);
  foot.rows[0].cells[3].innerHTML = formatNumber(calculator.annual.disability);
  foot.rows[0].cells[4].innerHTML = formatNumber(calculator.annual.sickness);
  foot.rows[0].cells[5].innerHTML = formatNumber(calculator.annual.healthContribution);
  foot.rows[0].cells[6].innerHTML = formatNumber(calculator.annual.taxBase);
  foot.rows[0].cells[7].innerHTML = formatNumber(calculator.annual.tax);
  foot.rows[0].cells[8].innerHTML = formatNumber(calculator.annual.netSalary);
}

/* Check if the input value is valid */
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

var calculate = function() {
  document.activeElement.blur();
  let salary = salaryInput.value;
  /* If the result is false, interrupt the code */
  salary = checkValue(salary);
  if(!salary) return false;

  if(radioAnnually.checked) salary /= 12;

  /* Calculate net salary */
  let uopCalculator = new UOPCalculator(salary, ratesSocial, ratesHealth, ratesTax, auxValuesUOP);
  let vat = 0.23;
  let zusContribution = preferentialZUS;
  let b2bCalculator = new B2BCalculator(salary, vat, zusContribution);

  /* Populate tables with the results */
  populateSummaryTable(uopCalculator);
  populateMainTable(uopCalculator);

  /* Display the table */
  if(tableContainer.classList.contains('is-hidden')) {
    tableContainer.classList.remove('is-hidden');
  }

  /* Scroll into table */
  if(window.innerWidth < 501){
    /* Smartphone */
    setTimeout(function(){
      tableContainer.scrollIntoView({block: 'start', behavior: 'smooth'});
    }, 500);
  } else if (window.innerWidth < 1000) {
    /* Ipad */
    /* Safari does not support the behavior arguments for scrolIntoView */
    setTimeout(function(){
      netSalaryButton.scrollIntoView();
    }, 500);
  } else if (isSafari) {
    /* Safari on computer */
    netSalaryButton.scrollIntoView();
  } else {
    /* Web */
    tableContainer.scrollIntoView({block: 'start', behavior: 'smooth'});
  }
};

/* Check if enter key was pressed */
var pressedKey = function(e){
  if(e.key === 'Enter'){
    calculate();
  }
};

salaryInput.focus();
buttonUOP.addEventListener('click', function() {selectContract('uop');});
buttonB2B.addEventListener('click', function() {selectContract('b2b');});
buttonUOP.click();
netSalaryButton.addEventListener('click', calculate);
salaryInput.addEventListener('keydown', pressedKey);
