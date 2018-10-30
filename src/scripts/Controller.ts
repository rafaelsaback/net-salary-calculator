import {UOPCalculator} from './UOPCalculator';
import {
  BaseCalculator,
  CONTRACT
} from './BaseCalculator';
import {
  B2BCalculator,
  B2BOptions,
  TAXTYPE,
  ZUS
} from './B2BCalculator';
import {
  switchPanel,
  updateHeaderNames,
  populateSummaryTable,
  populateMainTable,
  displayValueOnTab,
  displayResults,
  toggleB2BOptions
} from './View';

const taxThreshold = 85528;
const healthContribution = (9/100);
const healthDeductible = (7.75/100);
const monthlyRelief = 46.33;
  
const UOPOPTIONS = {
  'annualLimit': 133290, // Annual limit for pension and disability calculations
  'earningCost': 111.25,
  'monthlyRelief': 46.33,
  'taxThreshold': taxThreshold, // Tax threshold when the taxation changes from 18% to 32%
  // Rates
  'disability': (1.5/100),
  'healthContribution': healthContribution,
  'healthDeductible': healthDeductible,
  'pension': (9.76/100),
  'sickness': (2.45/100)
};

// HTML Variables

// Button elements
export const btnUOP: HTMLButtonElement = document.querySelector('#tab-btn-uop');
export const btnB2B: HTMLButtonElement = document.querySelector('#tab-btn-b2b');
export const btnB2BOptions: HTMLButtonElement = document.querySelector('#btn-b2b-options');
const btnCalculate: HTMLButtonElement = document.querySelector('#btn-calculate');

// Input elements
const inputCosts: HTMLInputElement = document.querySelector('#costs');
const inputSalary: HTMLInputElement = document.querySelector('#input-gross-salary');
const rdoVat0: HTMLInputElement = document.querySelector('#vat-0');
const rdoVat5: HTMLInputElement = document.querySelector('#vat-5');
const rdoVat8: HTMLInputElement = document.querySelector('#vat-8');
const rdoVat23: HTMLInputElement = document.querySelector('#vat-23');
const rdoAnnually: HTMLInputElement = document.querySelector('#annually');
const rdoTaxProgressive: HTMLInputElement = document.querySelector('#tax-progressive');
const rdoTaxLinear: HTMLInputElement = document.querySelector('#tax-linear');
const rdoNoZUS: HTMLInputElement = document.querySelector('#no-zus');
const rdoDiscountedZUS: HTMLInputElement = document.querySelector('#discounted-zus');
const rdoNormalZUS: HTMLInputElement = document.querySelector('#normal-zus');
const rdoSicknessYes: HTMLInputElement = document.querySelector('#sickness-yes');
const rdoSicknessNo: HTMLInputElement = document.querySelector('#sickness-no');

function selectContract(calculator: BaseCalculator): void {
  // Update global variable selectedContract
  selectedContract = calculator.contract;

  // Update table titles based on contract
  updateHeaderNames(calculator.contract);

  // Switch between panels
  switchPanel(calculator);

  // Update the table data in case it has already been calculated
  if(isCalculated) {
    populateSummaryTable(calculator);
    populateMainTable(calculator);
  }
}

function isValid(strSalary: string): boolean{
  if(strSalary === '') return false;
  let salary = parseFloat(strSalary);

  if(salary <= 0){
    alert('Please enter a positive value.');
    inputSalary.focus();
    return false;
  } else if(isNaN(salary)) {
    alert('Please enter a numeric value.');
    inputSalary.focus();
    return false;
  }
  return true;
}

function getB2BOptions() {
  let b2bOptions: B2BOptions = {
  // VAT
  "vat":(() => {
    if(rdoVat0.checked) return 0;
    else if(rdoVat5.checked) return (5/100);
    else if(rdoVat8.checked) return (8/100);
    else return (23/100);
  })(),

  // Tax rate modality (19% or 18%/32%)
  "taxType": (() => {
    if(rdoTaxProgressive.checked) return TAXTYPE.progressive;
    else return TAXTYPE.linear;
  })(),

  // ZUS modality (no ZUS, discounted or normal)
  "zus": (() => {
    if(rdoNoZUS.checked) return ZUS.noZUS;
    else if(rdoDiscountedZUS.checked) return ZUS.discountedZUS;
    else return ZUS.normalZUS;
  })(),

  // Pay sickness (yes or no)
  "paySickness": (() => {
    if(rdoSicknessYes.checked) return true;
    else return false;
  })(),

  // Costs for running the business
  "costs": (() => {
    if(inputCosts.value.trim() != '') return parseFloat(inputCosts.value);
    else return 0;
  })(),

  // Threshold for progressive tax (18%/32%)
  "taxThreshold": taxThreshold,
  // Rate for health contribution
  "healthContribution": healthContribution,
  // Rate for health deductible
  "healthDeductible": healthDeductible,
  "monthlyRelief": monthlyRelief
  }

  return b2bOptions;
}

var calculate = function(contract: Symbol): boolean {
  inputSalary.blur();
  let strSalary = inputSalary.value;
  // If the alary value is not valid, interrupt the code
  if(!isValid(strSalary)) return false;
  let salary = parseFloat(strSalary);

  if(rdoAnnually.checked) salary /= 12;

  // Calculate net salary
  uopCalculator.calcSalary(salary);
  let b2bOptions = getB2BOptions();
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
  displayResults();

  isCalculated = true;
  return true;
};

/* Check if enter key was pressed */
var pressedKey = function(e: KeyboardEvent, selectedContract: Symbol): void {
  if(e.key === 'Enter'){
    calculate(selectedContract);
  }
};

var uopCalculator = new UOPCalculator(UOPOPTIONS);
var b2bCalculator = new B2BCalculator;
var selectedContract: Symbol;
var isCalculated = false;
inputSalary.focus();
btnUOP.addEventListener('click', () => {selectContract(uopCalculator);});
btnB2B.addEventListener('click', () => {selectContract(b2bCalculator);});
btnUOP.click();
btnCalculate.addEventListener('click', () => {calculate(selectedContract);});
inputSalary.addEventListener('keydown', event => {pressedKey(event, selectedContract);});
inputCosts.addEventListener('keydown', event => {pressedKey(event, selectedContract);});
btnB2BOptions.addEventListener('click', () => {toggleB2BOptions();});

// Automatically calculate when changing B2B options (only it has been already calculated once)
rdoVat0.addEventListener('click', () => {if(isCalculated) calculate(selectedContract);});
rdoVat5.addEventListener('click', () => {if(isCalculated) calculate(selectedContract);});
rdoVat8.addEventListener('click', () => {if(isCalculated) calculate(selectedContract);});
rdoVat23.addEventListener('click', () => {if(isCalculated) calculate(selectedContract);});
rdoAnnually.addEventListener('click', () => {if(isCalculated) calculate(selectedContract);});
rdoTaxProgressive.addEventListener('click', () => {if(isCalculated) calculate(selectedContract);});
rdoTaxLinear.addEventListener('click', () => {if(isCalculated) calculate(selectedContract);});
rdoNoZUS.addEventListener('click', () => {if(isCalculated) calculate(selectedContract);});
rdoDiscountedZUS.addEventListener('click', () => {if(isCalculated) calculate(selectedContract);});
rdoNormalZUS.addEventListener('click', () => {if(isCalculated) calculate(selectedContract);});
rdoSicknessYes.addEventListener('click', () => {if(isCalculated) calculate(selectedContract);});
rdoSicknessNo.addEventListener('click', () => {if(isCalculated) calculate(selectedContract);});
