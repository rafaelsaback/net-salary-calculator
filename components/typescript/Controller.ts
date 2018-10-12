/// <reference path="references.ts" />

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

  // Update the table data in case it has already been calculated
  if(isCalculated) {
    populateSummaryTable(calculator);
    populateMainTable(calculator);
  }
}

function formatNumber(number, precision){
  return number.toFixed(precision).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function isValid(grossSalary){
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

var calculate = function(contract) {
  document.activeElement.blur();
  let salary = salaryInput.value;
  // If the alary value is not valid, interrupt the code
  if(!isValid(salary)) return false;
  salary = parseFloat(salary);

  if(radioAnnually.checked) salary /= 12;

  // Calculate net salary
  uopCalculator.calcSalary(salary, RATES, TAX, UOPOPTIONS);
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
