const SALARYINPUT = document.querySelector('#input-gross-salary');
const NETSALARYBUTTON = document.querySelector('#btn-calculate');
const TABLECONTAINER = document.querySelector('#container-results');
const SUMMARYTABLE = document.querySelector('#table-summary-1st-month');
const SUMMARYTABLE12MONTH = document.querySelector('#table-summary-12-month');
const MAINTABLE = document.querySelector('#table-main');
const ISSAFARI = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
const UOPRATES = {
  'pension': (9.76/100),
  'disability': (1.5/100),
  'sickness': (2.45/100),
  'healthContribution': (9/100),
  'healthDeductible': (7.75/100),
  'taxRate1': (18/100),
  'taxRate2': (32/100)
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
    this.socialSecurity = 0;
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

function calcNetSalary(calculator) {
  let grossSalary = calculator.monthly.grossSalary;
  let socialSecurity = calculator.monthly.socialSecurity;
  let healthContribution = calculator.monthly.healthContribution;
  let tax = calculator.monthly.tax;
  netSalary = [];

  netSalary = grossSalary.map((value, i) => {
    let tempNetSalary = grossSalary[i] - socialSecurity[i] - healthContribution[i] - tax[i];
    return (roundNumber(tempNetSalary,2));
  })

  calculator.monthly.netSalary = netSalary;
  return calculator;
};

function calcTax(calculator) {
  let taxRate1 = calculator.rates.taxRate1;
  let taxRate2 = calculator.rates.taxRate2;
  let taxLimit = calculator.auxValues.taxLimit;
  let monthlyRelief = calculator.auxValues.monthlyRelief;
  let tax = [];

  tax = calculator.monthly.tax.map((value, i) => {
    let taxBase = calculator.monthly.taxBase[i];
    let tempTax = 0;
    // The montly relief is only applied in case the tax taxLimit has not been exceeded
    if(calculator.monthly.accTaxBase[i] < taxLimit){
      tempTax = (taxBase * taxRate1) - calculator.monthly.healthDeductible[i] - monthlyRelief;
    } else {
      tempTax = (taxBase * taxRate2) - calculator.monthly.healthDeductible[i];
    }
    return Math.round(tempTax, 0);
  });

  calculator.monthly.tax = tax;
  return calculator;
};

function calcAccTaxBase(calculator) {
  let taxBase = calculator.monthly.taxBase;
  let accTaxBase = [];
  taxBase.reduce((a, b, i) => { return accTaxBase[i] = a + b}, 0);
  // Shift array by 1 element so it suits the tax logic (starting with 0)
  accTaxBase.unshift(0);
  accTaxBase.pop();
  calculator.monthly.accTaxBase = accTaxBase;
  return calculator;
};

function calcTaxBase(calculator){
  let earningCost = calculator.auxValues.earningCost;
  let grossSalary = calculator.monthly.grossSalary;
  let socialSecurity = calculator.monthly.socialSecurity;
  let taxBase = [];
  taxBase = grossSalary.map((value, i) => {
    let tempTaxBase =  grossSalary[i] - socialSecurity[i] - earningCost;
    return roundNumber(tempTaxBase, 0);
  });
  calculator.monthly.taxBase = taxBase;
  return calculator;
};

function calcHealthDeductible(calculator) {
  let rateHealthDeductible = calculator.rates.healthDeductible;
  let grossSalary = calculator.monthly.grossSalary;
  let socialSecurity = calculator.monthly.socialSecurity;
  let healthDeductible = [];
  healthDeductible = calculator.monthly.healthDeductible.map((value, i) => {
    let healthBase = grossSalary[i] - socialSecurity[i];
    return (healthBase * rateHealthDeductible);
  })
  calculator.monthly.healthDeductible = healthDeductible;
  return calculator;
};

function calcHealthContribution(calculator) {
  let rateHealthContribution = calculator.rates.healthContribution;
  let grossSalary = calculator.monthly.grossSalary;
  let socialSecurity = calculator.monthly.socialSecurity;
  let healthContribution = [];
  healthContribution = calculator.monthly.healthContribution.map((value, i) => {
    let healthBase = grossSalary[i] - socialSecurity[i];
    return calcContribution(healthBase, rateHealthContribution);
  })
  calculator.monthly.healthContribution = healthContribution;
  return calculator;
};

function calcSocialSecurity(calculator) {
  let pension = calculator.monthly.pension;
  let disability = calculator.monthly.disability;
  let sickness = calculator.monthly.sickness;
  let socialSecurity = [];
  socialSecurity = calculator.monthly.socialSecurity.map((value, i) => {return pension[i] + disability[i] + sickness[i]});
  calculator.monthly.socialSecurity = socialSecurity;
  return calculator;
};

function calcSickness(calculator) {
  let grossSalary = calculator.monthly.grossSalary[0];
  let sicknessRate = calculator.rates.sickness;
  let sickness = [];
  sickness = calculator.monthly.sickness.map((value, i) => {return calcContribution(grossSalary, sicknessRate)});
  calculator.monthly.sickness = sickness;
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

function calcDisability(calculator) {
  let disabilityRate = calculator.rates.disability;
  let disability = [];
  disability = calculator.monthly.disability.map((value, i) => {return calcPensionDisability(i, calculator, disabilityRate)});
  calculator.monthly.disability = disability;
  return calculator;
};

function calcPension(calculator) {
  let pensionRate = calculator.rates.pension;
  let pension = [];
  pension = calculator.monthly.pension.map((value, i) => {return calcPensionDisability(i, calculator, pensionRate)});
  calculator.monthly.pension = pension;
  return calculator;
};

function calcAccGrossSalary(calculator){
  let grossSalary = calculator.monthly.grossSalary;
  let accGrossSalary = [];
  grossSalary.reduce((a, b, i) => { return accGrossSalary[i] = a + b}, 0);
  // Shift array by 1 element so it suits the tax logic (starting with 0)
  accGrossSalary.unshift(0);
  accGrossSalary.pop();
  calculator.monthly.accGrossSalary = accGrossSalary;
  return calculator;
};

function calcSalary(grossSalary) {
  let calculator = new SalaryCalculator(grossSalary);
  calculator = calcAccGrossSalary(calculator);
  calculator = calcPension(calculator);
  calculator = calcDisability(calculator);
  calculator = calcSickness(calculator);
  calculator = calcSocialSecurity(calculator);
  calculator = calcHealthContribution(calculator);
  calculator = calcHealthDeductible(calculator);
  calculator = calcTaxBase(calculator);
  calculator = calcAccTaxBase(calculator);
  calculator = calcTax(calculator);
  calculator = calcNetSalary(calculator);
  calculator = calcTotals(calculator);
  return calculator;
}

/* It sets the format to two decimals and uses space as thousand separator */
function formatNumber(number){
  return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function populateSummaryTable(calculator){
  let body = SUMMARYTABLE.tBodies[0];
  body.rows[0].cells[1].innerHTML = formatNumber(calculator.monthly.grossSalary[0]);
  body.rows[1].cells[1].innerHTML = formatNumber(calculator.monthly.socialSecurity[0]);
  body.rows[2].cells[1].innerHTML = formatNumber(calculator.monthly.healthContribution[0]);
  body.rows[3].cells[1].innerHTML = formatNumber(calculator.monthly.tax[0]);
  body.rows[4].cells[1].innerHTML = formatNumber(calculator.monthly.netSalary[0]);

  body = SUMMARYTABLE12MONTH.tBodies[0];
  body.rows[0].cells[1].innerHTML = formatNumber(calculator.annual.grossSalary/12);
  body.rows[1].cells[1].innerHTML = formatNumber(calculator.annual.socialSecurity/12);
  body.rows[2].cells[1].innerHTML = formatNumber(calculator.annual.healthContribution/12);
  body.rows[3].cells[1].innerHTML = formatNumber(calculator.annual.tax/12);
  body.rows[4].cells[1].innerHTML = formatNumber(calculator.annual.netSalary/12);
}

function populateMainTable(calculator){
  let body = MAINTABLE.tBodies[0];

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
  let foot = MAINTABLE.tFoot;
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

  /* Populate tables with the results */
  populateSummaryTable(calculator);
  populateMainTable(calculator);

  /* Display the table */
  if(TABLECONTAINER.classList.contains('is-hidden')) {
    TABLECONTAINER.classList.remove('is-hidden');
  }

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
    TABLECONTAINER.scrollIntoView({block: 'start', behavior: 'smooth'});
  }
};

/* Check if enter key was pressed */
var pressedKey = function(e){
  if(e.key === 'Enter'){
    calculate();
  }
};

SALARYINPUT.focus();
NETSALARYBUTTON.addEventListener('click', calculate);
SALARYINPUT.addEventListener('keydown', pressedKey);
