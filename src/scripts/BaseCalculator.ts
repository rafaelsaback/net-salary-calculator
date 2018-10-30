export interface Monthly {
    [key:string]: number[];
}

export interface Annual {
    [key:string]: number;
}

export interface AuxVariable {
    [key:string]: any;
}

export const CONTRACT = {
    'B2B': Symbol('B2B'),
    'UOP': Symbol('Umowa o prace')
};

export const TAXRATE = {
    'rate18': (18/100),
    'rate19': (19/100),
    'rate32': (32/100),
};

export class BaseCalculator {
    monthly: Monthly = {};
    annual: Annual = {};
    contract!: Symbol;
    constructor() {
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

        this.annual.grossSalary = 0;
        this.annual.pension = 0;
        this.annual.disability = 0;
        this.annual.sickness = 0;
        this.annual.socialSecurity = 0;
        this.annual.healthContribution = 0;
        this.annual.taxBase = 0;
        this.annual.tax = 0;
        this.annual.netSalary = 0;
    }

    calcHealthDeductible(healthContribution: number[], rateDeductible: number,
        rateContribution: number): number[] {
            let healthDeductible = [];
            healthDeductible = healthContribution.map((value, i) => {
                return healthContribution[i] * (rateDeductible / rateContribution);
            });
            return healthDeductible;
        }

    roundNumber(number: number, decimals: number): number{
        return (Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals));
    }

    calcContribution(baseValue: number, rate: number): number{
        let contribution = baseValue * rate;
        contribution = this.roundNumber(contribution, 2);
        return contribution;
    }

    calcTotals(annual: Annual, monthly: Monthly): Annual {
        let totals: Annual = {};
        for(let value in annual){
            totals[value] = monthly[value].reduce((a, b) => a + b, 0);
        }
        return totals;
    }

    calcAccTaxBase(taxBase: number[]): number[] {
        return this.accumulateValue(taxBase);
    }

    calcTaxBase(grossSalary: number[], socialSecurity: number[],
        earningCost: number): number[]{
            let taxBase = new Array(12);
            for(let i = 0; i < taxBase.length; i++) {
                let tempTaxBase =  grossSalary[i] - socialSecurity[i] - earningCost;
                taxBase[i] = this.roundNumber(tempTaxBase, 0);
            };
            return taxBase;
        }

    calcProgressiveTax(taxBase: number[],  accTaxBase: number[], taxThreshold: number,
        healthDeductible: number[], monthlyRelief: number): number[] {
            let tax = new Array(12);

            for(let i = 0; i < tax.length; i++) {
                let tempTax = 0;
                // The montly relief is only applied in case the tax taxLimit has not been exceeded
                if(accTaxBase[i] < taxThreshold){
                    tempTax = (taxBase[i] * TAXRATE.rate18) - healthDeductible[i] - monthlyRelief;
                } else {
                    tempTax = (taxBase[i] * TAXRATE.rate32) - healthDeductible[i];
                }
                tax[i] = Math.round(100*tempTax)/100;
            };

            return tax;
        }

    calcFinalSalary(grossSalary: number[], ...costs: any): number[] {
        let finalSalary = new Array(12);
        for(let i = 0; i < finalSalary.length; i++){
            let tempFinalSalary = grossSalary[i];
            for(let j = 0; j < costs.length; j++){
                if(costs[j] instanceof Array) {
                    tempFinalSalary -= costs[j][i];
                } else {
                    tempFinalSalary -= costs[j];
                }
            }
            finalSalary[i] = this.roundNumber(tempFinalSalary,2);
        }
        return finalSalary;
    }

    accumulateValue(array: number[]): number[] {
        let accArray: number[] = [];
        array.reduce((a, b, i) => { return accArray[i] = a + b;}, 0);
        // Shift array by 1 element so it suits the tax logic (starting with 0)
        accArray.unshift(0);
        accArray.pop();
        return accArray;
    }

    isUOP(): boolean {
        return (this.contract === CONTRACT.UOP);
    }

    isB2B(): boolean {
        return (this.contract === CONTRACT.B2B);
    }
}
