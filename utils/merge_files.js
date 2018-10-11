const concat = require('concat');

var baseDir = __dirname.replace('utils','');
var inputDir = baseDir + 'components/typescript/';
var fileNames = ['BaseCalculator.ts', 'UOPCalculator.ts'];
var outputFile = baseDir + 'components/typescript/merged/script.ts'

var inputFiles = fileNames.map(file => inputDir + file);

concat(inputFiles, outputFile);
