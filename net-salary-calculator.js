// const SALARYFORM = document.querySelector('fieldset');
const SALARYINPUT = document.querySelector('#gross-salary-input');
const NETSALARYBUTTON = document.querySelector('#calculate-button');
const TABLECONTAINER = document.querySelector('#table-container');
const TABLE = document.querySelector('#table');
const ISSAFARI = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
const UOPRATES = {
  'pension': (9.76/100),
  'disability': (1.5/100),
  'sickness': (2.45/100),
  'healthContribution': (9/100),
  'healthDeductible': (7.75/100),
  'taxLevel1': (18/100),
  'taxLevel2': (32/100)
};
const UOPAUXVALUES = {
  'earningCost': 111.25,
  'monthlyRelief': 46.33,
  'annualLimit': 133290, /* Annual limit for pension and disability calculations */
  'taxLimit': 85528
};

class MonthlyValues {
  constructor(grossSalary) {
    this.grossSalary = new Array(12).fill(grossSalary);
    this.accGrossSalary = new Array(12).fill(0);
    this.pension = new Array(12).fill(0);
    this.disability = new Array(12).fill(0);
    this.sickness = new Array(12).fill(0);
    this.socialSecurity = new Array(12).fill(0);
    this.healthContribution = new Array(12).fill(0);
    this.healthDeductible = new Array(12).fill(0);
    this.accTaxBase = new Array(12).fill(0);
    this.taxBase = new Array(12).fill(0);
    this.tax = new Array(12).fill(0);
    this.netSalary = new Array(12).fill(0);
  }
}

class AnnualValues {
  constructor() {
    this.grossSalary = 0;
    this.pension = 0;
    this.disability = 0;
    this.sickness = 0;
    this.healthContribution = 0;
    this.taxBase = 0;
    this.tax = 0;
    this.netSalary = 0;
  }
}

class SalaryCalculator{
  constructor(grossSalary){
    this.monthly = new MonthlyValues(grossSalary);
    this.annual = new AnnualValues();
    this.rates = UOPRATES;
    this.auxValues = UOPAUXVALUES;
  }
}

function roundNumber(number, decimals){
  return (Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals));
}

function calcContribution(baseValue, rate){
  let contribution = baseValue * rate;
  contribution = roundNumber(contribution, 2);
  return contribution;
}

function sumTotal(array){
  return array.reduce((a, b) => a + b, 0);
}

function calcTotals(calculator) {
  for(let value in calculator.annual){
    calculator.annual[value] = sumTotal(calculator.monthly[value]);
  }
  return calculator;
}

var calcNetSalary = function(i, calculator) {
  calculator.monthly.netSalary[i] = calculator.monthly.grossSalary[i] - calculator.monthly.socialSecurity[i] -
  calculator.monthly.healthContribution[i] - calculator.monthly.tax[i];
  calculator.monthly.netSalary[i] = roundNumber(calculator.monthly.netSalary[i], 2);
  return calculator;
};

var calcTax = function(i, calculator) {
  let taxLevel1 = calculator.rates.taxLevel1;
  let taxLevel2 = calculator.rates.taxLevel2;
  let taxLimit = calculator.auxValues.taxLimit;
  let monthlyRelief = calculator.auxValues.monthlyRelief;
  let taxBase = calculator.monthly.taxBase[i];

  /* The montly relief is only applied in case the tax taxLimit has not been exceed */
  let tax = 0;
  if(calculator.monthly.accTaxBase[i] < taxLimit){
    tax = (taxBase * taxLevel1) - calculator.monthly.healthDeductible[i] - monthlyRelief;
  } else {
    tax = (taxBase * taxLevel2) - calculator.monthly.healthDeductible[i];
  }
  tax = Math.round(tax, 0);

  calculator.monthly.tax[i] = tax;
  return calculator;
};

var calcAccTaxBase = function(i, calculator) {
  if(i < 11) {
    calculator.monthly.accTaxBase[i + 1] = calculator.monthly.accTaxBase[i] + calculator.monthly.taxBase[i];
  }
  return calculator;
};

var calcTaxBase = function(i, calculator){
  let earningCost = calculator.auxValues.earningCost;
  let taxBase = 0;
  taxBase = calculator.monthly.grossSalary[i] - calculator.monthly.socialSecurity[i] - earningCost;
  taxBase = roundNumber(taxBase, 0);
  calculator.monthly.taxBase[i] = taxBase;
  return calculator;
};

var calcHealthDeductible = function(i, calculator) {
  let rateHealthDeductible = calculator.rates.healthDeductible;
  let healthBase = calculator.monthly.grossSalary[i] - calculator.monthly.socialSecurity[i];
  calculator.monthly.healthDeductible[i] = healthBase * rateHealthDeductible;
  return calculator;
};

var calcHealthContribution = function(i, calculator) {
  let rateHealthContribution = calculator.rates.healthContribution;
  let healthBase = calculator.monthly.grossSalary[i] - calculator.monthly.socialSecurity[i];
  calculator.monthly.healthContribution[i] = calcContribution(healthBase, rateHealthContribution);
  return calculator;
};

var calcSocialSecurity = function(i, calculator) {
  calculator.monthly.socialSecurity[i] = calculator.monthly.pension[i] + calculator.monthly.disability[i] + calculator.monthly.sickness[i];
  return calculator;
};

var calcSickness = function(i, calculator) {
  let grossSalary = calculator.monthly.grossSalary[i];
  let sicknessRate = calculator.rates.sickness;
  calculator.monthly.sickness[i] = calcContribution(grossSalary, sicknessRate);
  return calculator;
};

function calcPensionDisability(i, calculator, rate) {
  let value = 0;
  let accGrossSalary = calculator.monthly.accGrossSalary[i];
  let grossSalary = calculator.monthly.grossSalary[i];
  let annualLimit = calculator.auxValues.annualLimit;

  if((accGrossSalary + grossSalary) < annualLimit){
    value = calcContribution(grossSalary, rate);
  } else if (accGrossSalary < annualLimit){
    let baseGrossSalary = annualLimit - accGrossSalary;
    value = calcContribution(baseGrossSalary, rate);
  }
  return value;
}

var calcDisability = function(i, calculator) {
  let disabilityRate = calculator.rates.disability;
  calculator.monthly.disability[i] = calcPensionDisability(i, calculator, disabilityRate);
  return calculator;
};

var calcPension = function(i, calculator) {
  let pensionRate = calculator.rates.pension;
  calculator.monthly.pension[i] = calcPensionDisability(i, calculator, pensionRate);
  return calculator;
};

var calcAccGrossSalary = function(i, calculator){
  if(i < 11) {
    calculator.monthly.accGrossSalary[i + 1] = calculator.monthly.accGrossSalary[i] + calculator.monthly.grossSalary[i];
  }
  return calculator;
};

function for0To11(calculator, func){
  for(let i = 0; i < 12; i++) {
    calculator = func(i, calculator);
  }
  return calculator;
}

function calcSalary(grossSalary) {
  let calculator = new SalaryCalculator(grossSalary);
  calculator = for0To11(calculator, calcAccGrossSalary);
  calculator = for0To11(calculator, calcPension);
  calculator = for0To11(calculator, calcDisability);
  calculator = for0To11(calculator, calcSickness);
  calculator = for0To11(calculator, calcSocialSecurity);
  calculator = for0To11(calculator, calcHealthContribution);
  calculator = for0To11(calculator, calcHealthDeductible);
  calculator = for0To11(calculator, calcTaxBase);
  calculator = for0To11(calculator, calcAccTaxBase);
  calculator = for0To11(calculator, calcTax);
  calculator = for0To11(calculator, calcNetSalary);
  calculator = calcTotals(calculator);
  return calculator;
}

/* It sets the format to two decimals and uses space as thousand separator */
function formatNumber(number){
  return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/* Populate the HTML table with the salary information */
function populateTable(calculator){
  let body = TABLE.tBodies[0];

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
  let foot = TABLE.tFoot;
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
    SALARYINPUT.focus();
    return false;
  } else if(isNaN(grossSalary)) {
    alert('Please enter a numeric value.');
    SALARYINPUT.focus();
    return false;
  }
  return grossSalary;
}

var calculate = function() {
  document.activeElement.blur();
  let grossSalary = SALARYINPUT.value;
  /* If the result is false, interrupt the code */
  grossSalary = checkValue(grossSalary);
  if(!grossSalary) return false;

  /* Calculate net salary */
  let calculator = new calcSalary(grossSalary);

  /* Populate table with the results */
  populateTable(calculator);

  /* Display the table */
  if(TABLECONTAINER.style.display === '') TABLECONTAINER.style.display = 'block';

  /* Scroll into table */
  if(window.innerWidth < 501){
    /* Smartphone */
    setTimeout(function(){
      TABLECONTAINER.scrollIntoView({block: 'start', behavior: 'smooth'});
    }, 500);
  } else if (window.innerWidth < 1000) {
    /* Ipad */
    /* Safari does not support the behavior arguments for scrolIntoView */
    setTimeout(function(){
      NETSALARYBUTTON.scrollIntoView();
    }, 500);
  } else if (ISSAFARI) {
    /* Safari on computer */
    NETSALARYBUTTON.scrollIntoView();
  } else {
    /* Web */
    TABLECONTAINER.scrollIntoView({block: 'end', behavior: 'smooth'});
  }
};

/* Check if enter key was pressed */
var pressedKey = function(e){
  if(e.key === 'Enter'){
    calculate();
  }
};

NETSALARYBUTTON.addEventListener('click', calculate);
SALARYINPUT.addEventListener('keydown', pressedKey);
