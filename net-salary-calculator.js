// const SALARYFORM = document.querySelector('fieldset');
const SALARYINPUT = document.querySelector('#gross-salary-input');
const NETSALARYBUTTON = document.querySelector('#calculate-button');
const TABLECONTAINER = document.querySelector('#table-container');
const TABLE = document.querySelector('#table');
const ISSAFARI = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
const RATES = {
  'pension': (9.76/100),
  'disability': (1.5/100),
  'sickness': (2.45/100),
  'healthContribution': (9/100),
  'healthDeductible': (7.75/100),
  'taxLevel1': (18/100),
  'taxLevel2': (32/100)
};
const AUXVALUES = {
  'earningCost': 111.25,
  'monthlyRelief': 46.33,
  'annualLimit': 133290, /* Annual limit for pension and disability calculations */
  'taxLimit': 85528
};

function roundNumber(number, decimals){
  return (Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals));
}

function calcContribution(baseValue, rate){
  let contribution = baseValue * rate;
  contribution = roundNumber(contribution, 2);
  return contribution;
}

function calcTax(i, calculator, taxLevel1, taxLevel2, earningCost, taxLimit, monthlyRelief) {
  /* Tax base */
  let taxBase = 0;
  taxBase = calculator.grossSalary[i] - calculator.socialSecurity[i] - earningCost;
  taxBase = roundNumber(taxBase, 0);

  /* Calculate the tax. The montly relief is only applied in case the tax taxLimit
  has not been exceed */
  let tax = 0;
  if(calculator.accTaxBase[i] < taxLimit){
    tax = (taxBase * taxLevel1) - calculator.healthDeductible[i] - monthlyRelief;
  } else {
    tax = (taxBase * taxLevel2) - calculator.healthDeductible[i];
  }
  tax = Math.round(tax, 0);


  calculator.taxBase[i] = taxBase;
  calculator.tax[i] = tax;
  if(i < 11) {
    calculator.accTaxBase[i + 1] = calculator.accTaxBase[i] + calculator.taxBase[i];
  }
  return calculator;
}

function calcHealthInsurance(i, calculator, rateHealthContribution, rateHealthDeductible) {
  let healthBase = calculator.grossSalary[i] - calculator.socialSecurity[i];
  calculator.healthContribution[i] = calcContribution(healthBase, rateHealthContribution);
  calculator.healthDeductible[i] = healthBase * rateHealthDeductible;
  return calculator;
}

function calcSocialSecurity(i, calculator) {
  calculator.socialSecurity[i] = calculator.pension[i] + calculator.disability[i] + calculator.sickness[i];
  return calculator;
}

function calcSickness(i, calculator, sicknessRate) {
  calculator.sickness[i] = calcContribution(calculator.grossSalary[i], sicknessRate);
  return calculator;
}

function calcDisability(i, calculator, disabilityRate, annualLimit) {
  let disability = 0;
  let accGrossSalary = calculator.accGrossSalary[i];
  let grossSalary = calculator.grossSalary[i];

  if((accGrossSalary + grossSalary) < annualLimit){
    disability = calcContribution(grossSalary, disabilityRate);
  } else if (accGrossSalary < annualLimit){
    let baseGrossSalary = annualLimit - accGrossSalary;
    disability = calcContribution(baseGrossSalary, disabilityRate);
  }
  calculator.disability[i] = disability;
  return calculator;
}

function calcPension(i, calculator, pensionRate, annualLimit) {
  let pension = 0;
  let accGrossSalary = calculator.accGrossSalary[i];
  let grossSalary = calculator.grossSalary[i];

  if((accGrossSalary + grossSalary) < annualLimit){
    pension = calcContribution(grossSalary, pensionRate);
  } else if (accGrossSalary < annualLimit){
    let baseGrossSalary = annualLimit - accGrossSalary;
    pension = calcContribution(baseGrossSalary, pensionRate);
  }
  calculator.pension[i] = pension;
  return calculator;
}

function calcNetSalary(i, calculator) {
  calculator.netSalary[i] = calculator.grossSalary[i] - calculator.socialSecurity[i] -
  calculator.healthContribution[i] - calculator.tax[i];
  calculator.netSalary[i] = roundNumber(calculator.netSalary[i], 2);
  return calculator;
}

function sumTotal(array){
  return array.reduce((a, b) => a + b, 0);
}

function calcTotals(calculator) {
  calculator.totalGrossSalary = sumTotal(calculator.grossSalary);
  calculator.totalPension = sumTotal(calculator.pension);
  calculator.totalDisability = sumTotal(calculator.disability);
  calculator.totalSickness = sumTotal(calculator.sickness);
  calculator.totalSocialSecurity = sumTotal(calculator.socialSecurity);
  calculator.totalHealth = sumTotal(calculator.healthContribution);
  calculator.totalTaxBase = sumTotal(calculator.taxBase);
  calculator.totalTax = sumTotal(calculator.tax);
  calculator.totalNetSalary = sumTotal(calculator.netSalary);
  return calculator;
}

function calcAccGrossSalary(i, calculator){
  if(i < 11) {
    calculator.accGrossSalary[i + 1] = calculator.accGrossSalary[i] + calculator.grossSalary[i];
  }
  return calculator;
}

function calcSalary(grossSalary) {
  let calculator = new SalaryCalculator(grossSalary);
  for(let i = 0; i < 12; i++){
    calculator = calcAccGrossSalary(i, calculator);
    calculator = calcPension(i, calculator, RATES.pension, AUXVALUES.annualLimit);
    calculator = calcDisability(i, calculator, RATES.disability, AUXVALUES.annualLimit);
    calculator = calcSickness(i, calculator, RATES.sickness);
    calculator = calcSocialSecurity(i, calculator);
    calculator = calcHealthInsurance(i, calculator, RATES.healthContribution, RATES.healthDeductible);
    calculator = calcTax(i, calculator, RATES.taxLevel1, RATES.taxLevel2, AUXVALUES.earningCost,
      AUXVALUES.taxLimit, AUXVALUES.monthlyRelief);
    calculator = calcNetSalary(i, calculator);
  }
  calculator = calcTotals(calculator);
  return calculator;
}


class SalaryCalculator{
  constructor(grossSalary){
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
    this.totalGrossSalary = 0;
    this.totalPension = 0;
    this.totalDisability = 0;
    this.totalSickness = 0;
    this.totalSocialSecurity = 0;
    this.totalHealth = 0;
    this.totalTaxBase = 0;
    this.totalTax = 0;
    this.totalNetSalary = 0;
  }
}
//
//     for(let i = 0; i < 11; i++){
//       this.accGrossSalary[i + 1] = this.accGrossSalary[i] + grossSalary;
//     }
//   }
//
//   roundNumber(number, decimals){
//     return (Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals));
//   }
//
//   calcContribution(baseValue, rate){
//     let contribution = baseValue * rate;
//     contribution = this.roundNumber(contribution, 2);
//     return contribution;
//   }
//
//   sumTotal(array){
//     return array.reduce((a, b) => a + b, 0);
//   }
//
//   calcNetSalary(){
//     /* Pension and disability contributions */
//     for(let i = 0; i < 12; i++){
//       if((this.accGrossSalary[i] + this.grossSalary[i]) < this.pensionDisabilityLimit){
//         this.pension[i] = this.calcContribution(this.grossSalary[i], this.percentagePension);
//         this.disabilityInsurance[i] = this.calcContribution(this.grossSalary[i], this.percentageDisability);
//       } else if (this.accGrossSalary[i] < this.pensionDisabilityLimit){
//         let baseGrossSalary = this.pensionDisabilityLimit - this.accGrossSalary[i];
//         this.pension[i] = this.calcContribution(baseGrossSalary, this.percentagePension);
//         this.disabilityInsurance[i] = this.calcContribution(baseGrossSalary, this.percentageDisability);
//       }
//
//       /* Sickness contribution */
//       this.sicknessInsurance[i] = this.calcContribution(this.grossSalary[i], this.percentageSickness);
//       this.socialSecurity[i] = this.pension[i] + this.disabilityInsurance[i] + this.sicknessInsurance[i];
//
//       /* Health insurance contribution and deductible */
//       let healthBase = (this.grossSalary[i] - this.socialSecurity[i]);
//       this.healthInsuranceCont[i] = this.calcContribution(healthBase, this.percentageHealthInsuranceCont);
//       this.healthInsuranceDed[i] = healthBase * this.percentageHealthInsuranceDed;
//
//       /* Tax base */
//       this.taxBase[i] = this.grossSalary[i] - this.socialSecurity[i] - this.earningCost;
//       this.taxBase[i] = this.roundNumber(this.taxBase[i], 0);
//       if(i != 11){
//         this.accTaxBase[i + 1] = this.accTaxBase[i] + this.taxBase[i];
//       }
//
//       /* Calculate the tax. The montly relief is only applied in case the tax taxLimit
//       has not been exceed */
//       if(this.accTaxBase[i] < this.taxLimit){
//         this.tax[i] = (this.taxBase[i] * 0.18) - this.healthInsuranceDed[i] - this.monthlyRelief;
//       } else {
//         this.tax[i] = (this.taxBase[i] * 0.32) - this.healthInsuranceDed[i];
//       }
//       this.tax[i] = Math.round(this.tax[i], 0);
//
//       /* Calculate netSalary */
//       this.netSalary[i] = this.grossSalary[i] - this.socialSecurity[i] -
//       this.healthInsuranceCont[i] - this.tax[i];
//       this.netSalary[i] = this.roundNumber(this.netSalary[i], 2);
//
//       /* Calculate totals */
//     }
//     return this.netSalary;
//   }
// }

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
    body.rows[i].cells[1].innerHTML = formatNumber(calculator.grossSalary[i]);
    body.rows[i].cells[2].innerHTML = formatNumber(calculator.pension[i]);
    body.rows[i].cells[3].innerHTML = formatNumber(calculator.disability[i]);
    body.rows[i].cells[4].innerHTML = formatNumber(calculator.sickness[i]);
    body.rows[i].cells[5].innerHTML = formatNumber(calculator.healthContribution[i]);
    body.rows[i].cells[6].innerHTML = formatNumber(calculator.taxBase[i]);
    body.rows[i].cells[7].innerHTML = formatNumber(calculator.tax[i]);
    body.rows[i].cells[8].innerHTML = formatNumber(calculator.netSalary[i]);
  }

  /* Format total values */
  let foot = TABLE.tFoot;
  foot.rows[0].cells[1].innerHTML = formatNumber(calculator.totalGrossSalary);
  foot.rows[0].cells[2].innerHTML = formatNumber(calculator.totalPension);
  foot.rows[0].cells[3].innerHTML = formatNumber(calculator.totalDisability);
  foot.rows[0].cells[4].innerHTML = formatNumber(calculator.totalSickness);
  foot.rows[0].cells[5].innerHTML = formatNumber(calculator.totalHealth);
  foot.rows[0].cells[6].innerHTML = formatNumber(calculator.totalTaxBase);
  foot.rows[0].cells[7].innerHTML = formatNumber(calculator.totalTax);
  foot.rows[0].cells[8].innerHTML = formatNumber(calculator.totalNetSalary);
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

/* Check if the presend key is enter */
var pressedKey = function(e){
  if(e.key === 'Enter'){
    calculate();
  }
};

/* MAIN ROUTINE */
NETSALARYBUTTON.addEventListener('click', calculate);
SALARYINPUT.addEventListener('keydown', pressedKey);
