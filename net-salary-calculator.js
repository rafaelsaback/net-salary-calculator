// const SALARYFORM = document.querySelector('fieldset');
const SALARYINPUT = document.querySelector('#gross-salary-input');
const NETSALARYBUTTON = document.querySelector('#calculate-button');
const TABLECONTAINER = document.querySelector('#table-container');
const TABLE = document.querySelector('#table');
const ISSAFARI = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

class NetSalaryCalculator{
  constructor(grossSalary){
    this.grossSalary = new Array(12).fill(grossSalary);
    this.accGrossSalary = new Array(12).fill(0);
    this.pension = new Array(12).fill(0);
    this.disabilityInsurance = new Array(12).fill(0);
    this.sicknessInsurance = new Array(12).fill(0);
    this.socialSecurity = new Array(12).fill(0);
    this.healthInsuranceCont = new Array(12).fill(0);
    this.healthInsuranceDed = new Array(12).fill(0);
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
    this.percentagePension = 9.76 / 100;
    this.percentageDisability = 1.5 / 100;
    this.percentageSickness = 2.45 / 100;
    this.percentageHealthInsuranceCont = 9 / 100;
    this.percentageHealthInsuranceDed = 7.75 / 100;
    this.earningCost = 111.25;
    this.monthlyRelief = 46.33;
    this.pensionDisabilityLimit = 133290;
    this.taxLimit = 85528;

    for(let i = 0; i < 11; i++){
      this.accGrossSalary[i + 1] = this.accGrossSalary[i] + grossSalary;
    }
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

  calcNetSalary(){
    /* Pension and disability contributions */
    for(let i = 0; i < 12; i++){
      if((this.accGrossSalary[i] + this.grossSalary[i]) < this.pensionDisabilityLimit){
        this.pension[i] = this.calcContribution(this.grossSalary[i], this.percentagePension);
        this.disabilityInsurance[i] = this.calcContribution(this.grossSalary[i], this.percentageDisability);
      } else if (this.accGrossSalary[i] < this.pensionDisabilityLimit){
        let baseGrossSalary = this.pensionDisabilityLimit - this.accGrossSalary[i];
        this.pension[i] = this.calcContribution(baseGrossSalary, this.percentagePension);
        this.disabilityInsurance[i] = this.calcContribution(baseGrossSalary, this.percentageDisability);
      }

      /* Sickness contribution */
      this.sicknessInsurance[i] = this.calcContribution(this.grossSalary[i], this.percentageSickness);
      this.socialSecurity[i] = this.pension[i] + this.disabilityInsurance[i] + this.sicknessInsurance[i];

      /* Health insurance contribution and deductible */
      let healthBase = (this.grossSalary[i] - this.socialSecurity[i]);
      this.healthInsuranceCont[i] = this.calcContribution(healthBase, this.percentageHealthInsuranceCont);
      this.healthInsuranceDed[i] = healthBase * this.percentageHealthInsuranceDed;

      /* Tax base */
      this.taxBase[i] = this.grossSalary[i] - this.socialSecurity[i] - this.earningCost;
      this.taxBase[i] = this.roundNumber(this.taxBase[i], 0);
      if(i != 11){
        this.accTaxBase[i + 1] = this.accTaxBase[i] + this.taxBase[i];
      }

      /* Calculate the tax. The montly relief is only applied in case the tax taxLimit
      has not been exceed */
      if(this.accTaxBase[i] < this.taxLimit){
        this.tax[i] = (this.taxBase[i] * 0.18) - this.healthInsuranceDed[i] - this.monthlyRelief;
      } else {
        this.tax[i] = (this.taxBase[i] * 0.32) - this.healthInsuranceDed[i];
      }
      this.tax[i] = Math.round(this.tax[i], 0);

      /* Calculate netSalary */
      this.netSalary[i] = this.grossSalary[i] - this.socialSecurity[i] -
      this.healthInsuranceCont[i] - this.tax[i];
      this.netSalary[i] = this.roundNumber(this.netSalary[i], 2);

      /* Calculate totals */
      this.totalGrossSalary = this.sumTotal(this.grossSalary);
      this.totalPension = this.sumTotal(this.pension);
      this.totalDisability = this.sumTotal(this.disabilityInsurance);
      this.totalSickness = this.sumTotal(this.sicknessInsurance);
      this.totalSocialSecurity = this.sumTotal(this.socialSecurity);
      this.totalHealth = this.sumTotal(this.healthInsuranceCont);
      this.totalTaxBase = this.sumTotal(this.taxBase);
      this.totalTax = this.sumTotal(this.tax);
      this.totalNetSalary = this.sumTotal(this.netSalary);
    }
    return this.netSalary;
  }
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
    body.rows[i].cells[1].innerHTML = formatNumber(calculator.grossSalary[i]);
    body.rows[i].cells[2].innerHTML = formatNumber(calculator.pension[i]);
    body.rows[i].cells[3].innerHTML = formatNumber(calculator.disabilityInsurance[i]);
    body.rows[i].cells[4].innerHTML = formatNumber(calculator.sicknessInsurance[i]);
    body.rows[i].cells[5].innerHTML = formatNumber(calculator.healthInsuranceCont[i]);
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

var calcNetSalary = function() {
  document.activeElement.blur();
  let grossSalary = SALARYINPUT.value;
  /* If the result is false, interrupt the code */
  grossSalary = checkValue(grossSalary);
  if(!grossSalary) return false;

  /* Calculate net salary */
  let calculator = new NetSalaryCalculator(grossSalary);
  calculator.calcNetSalary();

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
    calcNetSalary();
  }
};

/* MAIN ROUTINE */
NETSALARYBUTTON.addEventListener('click', calcNetSalary);
SALARYINPUT.addEventListener('keydown', pressedKey);
