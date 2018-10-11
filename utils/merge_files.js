const concat = require('concat');

var baseDir = __dirname.replace('utils','');
var inputDir = baseDir + 'components/typescript/';
var fileNames = [
  'VariablesCalculator.ts',
  'BaseCalculator.ts',
  'UOPCalculator.ts',
  'B2BCalculator.ts',
  'VariablesHTML.ts',
  'View.ts',
  'Controller.ts'
];
var inputFiles = fileNames.map(file => inputDir + file);

var outputFile = baseDir + 'components/typescript/merged/test.ts'

concat(inputFiles, outputFile);
