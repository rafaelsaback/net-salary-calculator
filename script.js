const buttonUOP = document.querySelector('#tab-btn-uop');
const buttonB2B = document.querySelector('#tab-btn-b2b');
const formInputSalary = document.querySelector('#form-input-salary');
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
const netSalaryButton = document.querySelector('#btn-calculate');
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

const contractType = {
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

    this.contractType;
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

  calcTotals(annualVar, monthlyVar) {
    let annual = annualVar;
    for(let value in annual){
      annual[value] = monthlyVar[value].reduce((a, b) => a + b, 0);
    }
    return annual;
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
  constructor(){
    super();
    this.monthly.accTaxBase = new Array(12).fill(0);
    this.contractType = contractType.UOP;
  }

  calcSalary(grossSalary, ratesSocial, ratesHealth, ratesTax, auxValues) {
    this.monthly.grossSalary.fill(grossSalary);
    this.ratesSocial = ratesSocial;
    this.ratesHealth = ratesHealth;
    this.ratesTax = ratesTax;
    this.auxValues = auxValues;
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
    this.monthly.netSalary = this.calcNetSalary(this.monthly.grossSalary,
      this.monthly.socialSecurity, this.monthly.healthContribution, this.monthly.tax
    );
    this.annual = super.calcTotals(this.annual, this.monthly);
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
    this.monthly.salaryInHand = new Array(12).fill(0);
    this.annual.accident = 0;
    this.annual.laborFund = 0;
    this.annual.salaryInHand = 0;
    this.contractType = contractType.B2B;
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
      if(taxBeforeDeductible >= healthDeductible){
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

  updateTitles(calculator.contractType);
  let contractString;
  execBasedOnContract(calculator.contractType, () => {
    contractString = 'uop';
    if(!containerB2BOptions.classList.contains('is-hidden')) {
      containerB2BOptions.classList.add('is-hidden');
    }
  }, () => {
    contractString = 'b2b';
  });
  // Show the current tab, and add an 'active' class to the button that opened the tab
  document.getElementById('tab-btn-' + contractString).className += ' active';

  if(isCalculated) {
    populateSummaryTable(calculator);
    populateMainTable(calculator);
  }
}

function updateTitles(type) {
  execBasedOnContract(type, function() {
    selectedContract = contractType.UOP;
    formInputSalary.innerHTML = 'Gross salary';
  }, function() {
    document.getElementById('tab-b2b').style.display = 'block';
    selectedContract = contractType.B2B;
    formInputSalary.innerHTML = 'Net salary (from invoice)';
    document.getElementById('header-gross').innerHTML = 'Net salary <br> (from invoice)';
    document.getElementById('header-tax-base').innerHTML = 'Others';
    document.getElementById('header-net').innerHTML = 'Salary <br> in hand';
    let grossElements = document.getElementsByClassName('summary-header-gross');
    let netElements = document.getElementsByClassName('summary-header-net');
    for(let i = 0; i < grossElements.length; i++) {
      grossElements[i].innerHTML = 'Net (from invoice)';
      netElements[i].innerHTML = 'Salary in hand';
    }
  });
}

/* It sets the format to two decimals and uses space as thousand separator */
function formatNumber(number, precision){
  return number.toFixed(precision).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function populateSummaryTable(calculator){
  let body = summaryTable.tBodies[0];
  let body12 = summaryTable12Month.tBodies[0];
  execBasedOnContract(calculator.contractType, function() {
    body.rows[0].cells[1].innerHTML = formatNumber(calculator.monthly.grossSalary[0], 2);
    body.rows[4].cells[1].innerHTML = formatNumber(calculator.monthly.netSalary[0], 2);
    body12.rows[0].cells[1].innerHTML = formatNumber(calculator.annual.grossSalary/12, 2);
    body12.rows[4].cells[1].innerHTML = formatNumber(calculator.annual.netSalary/12, 2);
  }, function() {
    body.rows[0].cells[1].innerHTML = formatNumber(calculator.monthly.netSalary[0], 2);
    body.rows[4].cells[1].innerHTML = formatNumber(calculator.monthly.salaryInHand[0], 2);
    body12.rows[0].cells[1].innerHTML = formatNumber(calculator.annual.netSalary/12, 2);
    body12.rows[4].cells[1].innerHTML = formatNumber(calculator.annual.salaryInHand/12, 2);
  });
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
    execBasedOnContract(calculator.contractType, function() {
      body.rows[i].cells[1].innerHTML = formatNumber(calculator.monthly.grossSalary[i],2 );
      body.rows[i].cells[6].innerHTML = formatNumber(calculator.monthly.taxBase[i],2 );
      body.rows[i].cells[8].innerHTML = formatNumber(calculator.monthly.netSalary[i],2 );
    }, function() {
      body.rows[i].cells[1].innerHTML = formatNumber(calculator.monthly.netSalary[i],2 );
      body.rows[i].cells[6].innerHTML = formatNumber(
        (calculator.monthly.accident[i] + calculator.monthly.laborFund[i]), 2
      );
      body.rows[i].cells[8].innerHTML = formatNumber(calculator.monthly.salaryInHand[i],2 );
    });
    body.rows[i].cells[2].innerHTML = formatNumber(calculator.monthly.pension[i], 2);
    body.rows[i].cells[3].innerHTML = formatNumber(calculator.monthly.disability[i],2 );
    body.rows[i].cells[4].innerHTML = formatNumber(calculator.monthly.sickness[i],2 );
    body.rows[i].cells[5].innerHTML = formatNumber(calculator.monthly.healthContribution[i],2 );
    body.rows[i].cells[7].innerHTML = formatNumber(calculator.monthly.tax[i], 2);
  }

  /* Format total values */
  let foot = mainTable.tFoot;
  execBasedOnContract(calculator.contractType, function() {
    foot.rows[0].cells[1].innerHTML = formatNumber(calculator.annual.grossSalary,2 );
    foot.rows[0].cells[6].innerHTML = formatNumber(calculator.annual.taxBase,2 );
    foot.rows[0].cells[8].innerHTML = formatNumber(calculator.annual.netSalary,2 );
  }, function() {
    foot.rows[0].cells[1].innerHTML = formatNumber(calculator.annual.netSalary,2 );
    foot.rows[0].cells[6].innerHTML = formatNumber(
      (calculator.annual.accident + calculator.annual.laborFund), 2
    );
    foot.rows[0].cells[8].innerHTML = formatNumber(calculator.annual.salaryInHand,2 );
  });
  foot.rows[0].cells[2].innerHTML = formatNumber(calculator.annual.pension,2 );
  foot.rows[0].cells[3].innerHTML = formatNumber(calculator.annual.disability,2 );
  foot.rows[0].cells[4].innerHTML = formatNumber(calculator.annual.sickness,2 );
  foot.rows[0].cells[5].innerHTML = formatNumber(calculator.annual.healthContribution,2 );
  foot.rows[0].cells[7].innerHTML = formatNumber(calculator.annual.tax, 2);
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

function getVAT() {
  if(vat0.checked) return 0;
  else if(vat5.checked) return (5/100);
  else if(vat8.checked) return (8/100);
  else return (23/100);
}

function getTaxRate() {
  if(taxProgressive.checked) return taxRate.progressive;
  else return taxRate.linear;
}

function getZUS() {
  if(noZUS.checked) return ZUS.noZUS;
  else if(discountedZUS.checked) return ZUS.discountedZUS;
  else return ZUS.normalZUS;
}

function getPaySickness() {
  if(sicknessYes.checked) return true;
  else return false;
}

function getCosts() {
  if(costs.value.trim() != '') return costs.value;
  else return 0;
}

function getB2BOptions(b2bOptions) {
  b2bOptions.vat = getVAT();
  b2bOptions.taxRate = getTaxRate();
  b2bOptions.zus = getZUS();
  b2bOptions.paySickness = getPaySickness();
  b2bOptions.costs = getCosts();
  return b2bOptions;
}

function displayValueOnTab(uopCalculator, b2bCalculator) {
  let netSalary = formatNumber(uopCalculator.annual.netSalary/12, 0);
  buttonUOP.innerHTML = 'Umowa o pracę' +
  '<div class="big-font"> ' + netSalary  + ' zł</div>' +
  'net (in hand)'
  let salaryInHand = formatNumber(b2bCalculator.annual.salaryInHand/12, 0);
  buttonB2B.innerHTML = 'B2B contract' +
  '<div class="big-font"> ' + salaryInHand  + ' zł</div>' +
  'in hand'
}

function execBasedOnContract(type, funcUOP, funcB2B) {
  switch(type){
    case contractType.UOP:
    funcUOP();
    break;
    case contractType.B2B:
    funcB2B();
    break;
  }
}

var calculate = function(selectedContract) {
  document.activeElement.blur();
  let salary = salaryInput.value;
  /* If the result is false, interrupt the code */
  salary = checkValue(salary);
  if(!salary) return false;

  if(radioAnnually.checked) salary /= 12;

  /* Calculate net salary */
  uopCalculator.calcSalary(salary, ratesSocial, ratesHealth, ratesTax, auxValuesUOP);
  let b2bOptions =  {};
  b2bOptions = getB2BOptions(b2bOptions);
  b2bCalculator.calcSalary(salary, b2bOptions);

  /* Populate tables with the results */
  execBasedOnContract(selectedContract,
    function(){
      populateSummaryTable(uopCalculator);
      populateMainTable(uopCalculator);
    },
    function(){
      populateSummaryTable(b2bCalculator);
      populateMainTable(b2bCalculator);
    }
  );
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
