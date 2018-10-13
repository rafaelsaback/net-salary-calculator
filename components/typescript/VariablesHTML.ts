// Button elements
const btnUOP: HTMLButtonElement = document.querySelector('#tab-btn-uop');
const btnB2B: HTMLButtonElement = document.querySelector('#tab-btn-b2b');
const btnCalculate: HTMLButtonElement = document.querySelector('#btn-calculate');
const btnB2BOptions: HTMLButtonElement = document.querySelector('#btn-b2b-options');

// Input elements
const inputCosts: HTMLInputElement = document.querySelector('#costs');
const inputSalary: HTMLInputElement = document.querySelector('#input-gross-salary');
const rdoVat0: HTMLInputElement = document.querySelector('#vat-0');
const rdoVat5: HTMLInputElement = document.querySelector('#vat-5');
const rdoVat8: HTMLInputElement = document.querySelector('#vat-8');
const rdoAnnually: HTMLInputElement = document.querySelector('#annually');
const rdoTaxProgressive: HTMLInputElement = document.querySelector('#tax-progressive');
const rdoNoZUS: HTMLInputElement = document.querySelector('#no-zus');
const rdoDiscountedZUS: HTMLInputElement = document.querySelector('#discounted-zus');
const rdoSicknessYes: HTMLInputElement = document.querySelector('#sickness-yes');

// Table elements
const tblSummary: HTMLTableElement = document.querySelector('#table-summary-1st-month');
const tblSummary12Month: HTMLTableElement = document.querySelector('#table-summary-12-month');
const tblMain: HTMLTableElement = document.querySelector('#table-main');
const hdrGross: HTMLTableHeaderCellElement = document.querySelector('#header-gross');
const hdrTaxBase: HTMLTableHeaderCellElement = document.querySelector('#header-tax-base');
const hdrNet: HTMLTableHeaderCellElement = document.querySelector('#header-net');

// Others
const labelSalary: HTMLElement = document.getElementById('form-input-salary');
const ctnrB2B: HTMLElement = document.getElementById('tab-b2b');
const ctnrB2BOptions: HTMLElement = document.getElementById('b2b-options');
const ctnrResults: HTMLElement = document.getElementById('container-results');

// HTML collections
const elsGross: HTMLCollectionOf<Element> = document.getElementsByClassName('summary-header-gross');
const elsNet: HTMLCollectionOf<Element> = document.getElementsByClassName('summary-header-net');
