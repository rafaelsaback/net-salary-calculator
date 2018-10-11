function updateHeaderNames(type) {
  if(type === CONTRACT.UOP) {
    formInputSalary.innerHTML = 'Gross salary:';
    headerGross.innerHTML = 'Gross <br> salary';
    headerTaxBase.innerHTML = 'Tax base';
    headerNet.innerHTML = 'Net <br> salary';
    for(let i = 0; i < grossElements.length; i++) {
      grossElements[i].innerHTML = 'Gross salary';
      netElements[i].innerHTML = 'Net salary';
    }
  } else if(type === CONTRACT.B2B) {
    formInputSalary.innerHTML = 'Net salary (from invoice):';
    headerGross.innerHTML = 'Net salary <br> (from invoice)';
    headerTaxBase.innerHTML = 'Others';
    headerNet.innerHTML = 'Salary <br> in hand';
    for(let i = 0; i < grossElements.length; i++) {
      grossElements[i].innerHTML = 'Net (from invoice)';
      netElements[i].innerHTML = 'Salary in hand';
    }
  };
}

function populateSummaryTable(calculator){
  let tableFields = ['input-salary', 'social-security', 'health-contribution',
  'tax', 'final-salary'];
  let values = [];
  let values12 = [];
  let valueNames = [];

  if(calculator.isUOP()) {
    valueNames = ['grossSalary', 'socialSecurity', 'healthContribution', 'tax', 'netSalary'];
  } else if(calculator.isB2B()) {
    valueNames = ['netSalary', 'socialSecurity', 'healthContribution', 'tax', 'salaryInHand'];
  };
  valueNames.forEach((name) => {
    values.push(calculator.monthly[name][0]);
    values12.push(calculator.annual[name]/12);
  });
  writeToTable(summaryTable, tableFields, values);
  writeToTable(summaryTable12Month, tableFields, values12);
}

function writeToTable(table, fields, values) {
  for(let i = 0; i < fields.length; i++) {
    table.querySelector(`.${fields[i]}`).innerHTML = formatNumber(values[i], 2);
  }
}

function populateMainTable(calculator) {
  // Variable names inside calculator
  let valueNames = [];
  if(calculator.isUOP()) {
    valueNames = ['grossSalary', 'pension', 'disability', 'sickness',
    'healthContribution', 'taxBase', 'tax', 'netSalary'];
  } else if(calculator.isB2B()) {
    valueNames = ['netSalary', 'pension', 'disability', 'sickness',
    'healthContribution', 'others', 'tax', 'salaryInHand'];
  };
  // Class names used in the table
  let tableFields = ['input-salary', 'pension', 'disability', 'sickness',
  'health', 'tax-base', 'tax', 'final-salary'];

  // Write monthly values
  for(let i = 0; i < 12; i++)
  {
    // Add suffix to the classnames based on the month
    let monthTableFields = tableFields.map((el) => {return el + `-${i}`});
    let values = [];
    // Retrieve the values for each variable from the calculator
    valueNames.forEach((name) => {
      values.push(calculator.monthly[name][i]);
    });
    // Write values to the table
    writeToTable(mainTable, monthTableFields, values);
  }

  // Write totals
  let values = [];
  // Retrieve the values for each variable from the calculator
  valueNames.forEach((name) => {
    values.push(calculator.annual[name]);
  });
  // Write values to the table
  writeToTable(mainTable.tFoot, tableFields, values);
}

function displayValueOnTab(uopCalculator, b2bCalculator) {
  // Display net salary on Umowa o pracę's tab
  let netSalary = formatNumber(uopCalculator.annual.netSalary/12, 0);
  buttonUOP.innerHTML = `
  Umowa o pracę
  <div class="big-font"> ${netSalary} zł</div>
  net
  `;

  // Display salary in hand on B2B's tab
  let salaryInHand = formatNumber(b2bCalculator.annual.salaryInHand/12, 0);
  buttonB2B.innerHTML = `
  B2B contract
  <div class="big-font"> ${salaryInHand}  zł</div>
  in hand
  `;
}


var toggleB2BOptions = function() {
  containerB2BOptions.classList.toggle('is-hidden');
  if(containerB2BOptions.classList.contains('is-hidden')) {
    btnB2BOptions.innerHTML = "Show B2B options";
  } else {
    btnB2BOptions.innerHTML = "Hide B2B options";
  }
}
