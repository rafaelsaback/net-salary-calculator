import {BaseCalculator} from './BaseCalculator';
import {B2BCalculator, B2BOptions} from './B2BCalculator';
import {UOPCalculator} from './UOPCalculator';
import {
  updateHeaderNames,
  populateSummaryTable,
  populateMainTable,
  displayValueOnTab,
  toggleB2BOptions
} from './View';

function selectContract(calculator: BaseCalculator): void {
  // Update global variable selectedContract
  selectedContract = calculator.contract;

  // Update table titles based on contract
  updateHeaderNames(calculator.contract);

  if(calculator.isUOP()) {
    // Highlight UOP button
    btnUOP.classList.add('active');
    // Remove highlight from B2B button
    btnB2B.classList.remove('active');
    // Hide B2B elements
    ctnrB2B.classList.add('is-hidden');
    ctnrB2BOptions.classList.add('is-hidden');
  } else if (calculator.isB2B()) {
    // Highlight B2B button
    btnB2B.classList.add('active');
    // Remove highlight from UOP button
    btnUOP.classList.remove('active');
    // Show B2B options button
    ctnrB2B.classList.remove('is-hidden');
  };

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

function getB2BOptions(b2bOptions: B2BOptions) {
  // VAT
  b2bOptions.vat = (() => {
    if(rdoVat0.checked) return 0;
    else if(rdoVat5.checked) return (5/100);
    else if(rdoVat8.checked) return (8/100);
    else return (23/100);
  })();

  // Tax rate modality (19% or 18%/32%)
  b2bOptions.taxType = (() => {
    if(rdoTaxProgressive.checked) return TAXTYPE.progressive;
    else return TAXTYPE.linear;
  })();

  // ZUS modality (no ZUS, discounted or normal)
  b2bOptions.zus = (() => {
    if(rdoNoZUS.checked) return ZUS.noZUS;
    else if(rdoDiscountedZUS.checked) return ZUS.discountedZUS;
    else return ZUS.normalZUS;
  })();

  // Pay sickness (yes or no)
  b2bOptions.paySickness = (() => {
    if(rdoSicknessYes.checked) return true;
    else return false;
  })();

  // Costs for running the business
  b2bOptions.costs = (() => {
    if(inputCosts.value.trim() != '') return parseFloat(inputCosts.value);
    else return 0;
  })();

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
  uopCalculator.calcSalary(salary, RATES, TAX, UOPOPTIONS);
  let b2bOptions: B2BOptions;
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
  if(ctnrResults.classList.contains('is-hidden')) {
    ctnrResults.classList.remove('is-hidden');
  }
  isCalculated = true;
  return true;
};

/* Check if enter key was pressed */
var pressedKey = function(e: KeyboardEvent, selectedContract: Symbol): void {
  if(e.key === 'Enter'){
    calculate(selectedContract);
  }
};

var uopCalculator = new UOPCalculator;
var b2bCalculator = new B2BCalculator;
var selectedContract: Symbol;
var isCalculated = false;
inputSalary.focus();
btnUOP.addEventListener('click', () => {selectContract(uopCalculator);});
btnB2B.addEventListener('click', () => {selectContract(b2bCalculator);});
btnUOP.click();
btnCalculate.addEventListener('click', () => {calculate(selectedContract);});
inputSalary.addEventListener('keydown', event => {pressedKey(event, selectedContract);});
btnB2BOptions.addEventListener('click', () => {toggleB2BOptions();});
