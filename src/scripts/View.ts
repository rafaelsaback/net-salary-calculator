import { BaseCalculator, CONTRACT } from './BaseCalculator';
import { UOPCalculator } from './UOPCalculator';
import { B2BCalculator } from './B2BCalculator';
import { btnUOP, btnB2B, btnB2BOptions, btnCalculate } from './Controller';

// Table elements
const tblSummary: HTMLTableElement = document.querySelector(
  '#table-summary-1st-month',
);
const tblSummary12Month: HTMLTableElement = document.querySelector(
  '#table-summary-12-month',
);
const tblMain: HTMLTableElement = document.querySelector('#table-main');
const hdrGross: HTMLTableHeaderCellElement = document.querySelector(
  '#header-gross',
);
const hdrTaxBase: HTMLTableHeaderCellElement = document.querySelector(
  '#header-tax-base',
);
const hdrNet: HTMLTableHeaderCellElement = document.querySelector(
  '#header-net',
);

// Others
const labelSalary: HTMLElement = document.getElementById('form-input-salary');
const ctnrB2B: HTMLElement = document.getElementById('tab-b2b');
const ctnrB2BOptions: HTMLElement = document.getElementById('b2b-options');
const ctnrResults: HTMLElement = document.getElementById('container-results');

// HTML collections
const elsGross: HTMLCollectionOf<Element> = document.getElementsByClassName(
  'summary-header-gross',
);
const elsNet: HTMLCollectionOf<Element> = document.getElementsByClassName(
  'summary-header-net',
);

// Checks if browser is Safari
const isSafari =
  /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

export function switchPanel(calculator: BaseCalculator): void {
  if (calculator.isUOP()) {
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
  }
}

export function updateHeaderNames(type: symbol): void {
  if (type === CONTRACT.UOP) {
    labelSalary.innerHTML = 'Gross salary:';
    hdrGross.innerHTML = 'Gross <br> salary';
    hdrTaxBase.innerHTML = 'Tax base';
    hdrNet.innerHTML = 'Net <br> salary';
    for (let i = 0; i < elsGross.length; i++) {
      elsGross[i].innerHTML = 'Gross salary';
      elsNet[i].innerHTML = 'Net salary';
    }
  } else if (type === CONTRACT.B2B) {
    labelSalary.innerHTML = 'Net salary (from invoice):';
    hdrGross.innerHTML = 'Net salary <br> (from invoice)';
    hdrTaxBase.innerHTML = 'Others';
    hdrNet.innerHTML = 'Salary <br> in hand';
    for (let i = 0; i < elsGross.length; i++) {
      elsGross[i].innerHTML = 'Net (from invoice)';
      elsNet[i].innerHTML = 'Salary in hand';
    }
  }
}

export function populateSummaryTable(calculator: BaseCalculator): void {
  let tableFields = [
    'input-salary',
    'social-security',
    'health-contribution',
    'tax',
    'final-salary',
  ];
  let values: number[] = [];
  let values12: number[] = [];
  let valueNames: string[] = [];

  if (calculator.isUOP()) {
    valueNames = [
      'grossSalary',
      'socialSecurity',
      'healthContribution',
      'tax',
      'netSalary',
    ];
  } else if (calculator.isB2B()) {
    valueNames = [
      'netSalary',
      'socialSecurity',
      'healthContribution',
      'tax',
      'salaryInHand',
    ];
  }
  valueNames.forEach(name => {
    values.push(calculator.monthly[name][0]);
    values12.push(calculator.annual[name] / 12);
  });
  writeToTable(tblSummary, tableFields, values);
  writeToTable(tblSummary12Month, tableFields, values12);
}

function formatNumber(number: number, precision: number): string {
  return number.toFixed(precision).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function writeToTable(
  table: HTMLElement,
  fields: string[],
  values: number[],
): void {
  for (let i = 0; i < fields.length; i++) {
    table.querySelector(`.${fields[i]}`).innerHTML = formatNumber(values[i], 2);
  }
}

export function populateMainTable(calculator: BaseCalculator): void {
  // Variable names inside calculator
  let valueNames: string[] = [];
  if (calculator.isUOP()) {
    valueNames = [
      'grossSalary',
      'pension',
      'disability',
      'sickness',
      'healthContribution',
      'taxBase',
      'tax',
      'netSalary',
    ];
  } else if (calculator.isB2B()) {
    valueNames = [
      'netSalary',
      'pension',
      'disability',
      'sickness',
      'healthContribution',
      'others',
      'tax',
      'salaryInHand',
    ];
  }
  // Class names used in the table
  let tableFields = [
    'input-salary',
    'pension',
    'disability',
    'sickness',
    'health',
    'tax-base',
    'tax',
    'final-salary',
  ];

  // Write monthly values
  for (let i = 0; i < 12; i++) {
    // Add suffix to the classnames based on the month
    let monthTableFields = tableFields.map(el => {
      return el + `-${i}`;
    });
    let values: number[] = [];
    // Retrieve the values for each variable from the calculator
    valueNames.forEach(name => {
      values.push(calculator.monthly[name][i]);
    });
    // Write values to the table
    writeToTable(tblMain, monthTableFields, values);
  }

  // Write totals
  let values: number[] = [];
  // Retrieve the values for each variable from the calculator
  valueNames.forEach(name => {
    values.push(calculator.annual[name]);
  });
  // Write values to the table
  writeToTable(tblMain.tFoot, tableFields, values);
}

export function displayValueOnTab(
  uopCalculator: UOPCalculator,
  b2bCalculator: B2BCalculator,
): void {
  // Display net salary on Umowa o pracę's tab
  let netSalary = formatNumber(uopCalculator.annual.netSalary / 12, 0);
  btnUOP.innerHTML = `
  Umowa o pracę
  <div class="big-font"> ${netSalary} zł</div>
  net
  `;

  // Display salary in hand on B2B's tab
  let salaryInHand = formatNumber(b2bCalculator.annual.salaryInHand / 12, 0);
  btnB2B.innerHTML = `
  B2B contract
  <div class="big-font"> ${salaryInHand}  zł</div>
  in hand
  `;
}

export function displayResults(): void {
  ctnrResults.classList.remove('is-hidden');
}

export var toggleB2BOptions = function(): void {
  ctnrB2BOptions.classList.toggle('is-hidden');
  if (ctnrB2BOptions.classList.contains('is-hidden')) {
    btnB2BOptions.innerHTML = 'Show B2B options';
  } else {
    btnB2BOptions.innerHTML = 'Hide B2B options';
  }
};

export function scroll(): void {
  /* Scroll into table */
  if (window.innerWidth < 501) {
    /* Smartphone */
    setTimeout(function() {
      tblSummary.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, 500);
  } else if (window.innerWidth < 1000) {
    /* Ipad */
    /* Safari does not support the behavior arguments for scrolIntoView */
    setTimeout(function() {
      btnCalculate.scrollIntoView();
    }, 500);
  } else if (isSafari) {
    /* Safari on computer */
    btnCalculate.scrollIntoView();
  } else {
    /* Web */
    tblSummary.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }
}
