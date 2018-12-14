import {BaseCalculator, CONTRACT, TAXRATE} from "./BaseCalculator";

export interface B2BOptions {
    vat: number;
    taxType: Symbol;
    zus: Symbol;
    paySickness: boolean;
    costs: number;
    taxThreshold: number;
    healthContribution: number;
    healthDeductible: number;
    monthlyRelief: number;
}

export const TAXTYPE = {
    'progressive': Symbol('18%/32%'),
    'linear': Symbol('19%')
};

export const ZUS = {
    'noZUS': Symbol('No contributions in the first 6 months'),
    'discountedZUS': Symbol('Lower contributions in the first 2 years'),
    'normalZUS': Symbol('Normal contribution')
};

export class B2BCalculator extends BaseCalculator {
    options: B2BOptions;

    constructor() {
        super();
        this.monthly.acccident = new Array(12).fill(0);
        this.monthly.laborFund = new Array(12).fill(0);
        this.monthly.others = new Array(12).fill(0);
        this.monthly.salaryInHand = new Array(12).fill(0);
        this.annual.accident = 0;
        this.annual.laborFund = 0;
        this.annual.others = 0;
        this.annual.salaryInHand = 0;
        this.contract = CONTRACT.B2B;
    }

    calcSalary(netSalary: number, options: B2BOptions) {
        this.monthly.netSalary.fill(netSalary);
        this.options = options;

        // Pension
        this.monthly.pension = this.calcPension(this.options.zus);

        // Disability
        this.monthly.disability = this.calcDisability(this.options.zus);

        // Sickness
        this.monthly.sickness = this.calcSickness(this.options.paySickness, this.options.zus);

        // Health contribution
        this.monthly.healthContribution = this.calcHealthContribution();

        // Health deductible
        this.monthly.healthDeductible = super.calcHealthDeductible(
            this.monthly.healthContribution, this.options.healthDeductible, this.options.healthContribution
        );

        // Accident
        this.monthly.accident = this.calcAccident(this.options.zus);

        // Labor fund
        this.monthly.laborFund = this.calcLaborFund(this.options.zus);

        // Others = accident + labor fund
        this.monthly.others = this.calcOthers(this.monthly.accident, this.monthly.laborFund);

        // Social security
        this.monthly.socialSecurity = this.calcSocialSecurity(
            this.monthly.pension, this.monthly.disability, this.monthly.sickness,
            this.monthly.accident, this.monthly.laborFund
        );

        // Tax base
        this.monthly.taxBase = super.calcTaxBase(this.monthly.netSalary,
            this.monthly.socialSecurity, this.options.costs
        );

        // Accumulated tax base
        this.monthly.accTaxBase = super.calcAccTaxBase(this.monthly.taxBase);

        // Tax
        this.monthly.tax = this.calcTax(this.options.taxType, this.monthly.taxBase,
            this.monthly.accTaxBase, this.options.taxThreshold, this.options.monthlyRelief,
            this.monthly.healthDeductible
        );

        // Salary in hand
        this.monthly.salaryInHand = super.calcFinalSalary(this.monthly.netSalary,
            this.monthly.socialSecurity, this.monthly.healthContribution,
            this.monthly.tax
        );

        // Annual values
        this.annual = super.calcTotals(this.annual, this.monthly);
    }

    evalZUS(zusType: Symbol, noZUSValue: number, discountedZUSValue: number, normalZUSValue: number): number[] {
        let array = new Array(12);
        switch(zusType) {
            case ZUS.noZUS:
                array.fill(noZUSValue, 0, 6);
                array.fill(discountedZUSValue, 6, 12);
                break;
            case ZUS.discountedZUS:
                array.fill(discountedZUSValue);
                break;
            case ZUS.normalZUS:
                array.fill(normalZUSValue);
                break;
        }
        return array;
    }

    calcPension(zus: Symbol): number[] {
        return this.evalZUS(zus, 0, 122.98, 520.36);
    }

    calcDisability(zus: Symbol): number[] {
        return this.evalZUS(zus, 0, 50.40, 213.26);
    }

    calcSickness(paySickness: boolean, zus: Symbol): number[] {
        if(paySickness) return this.evalZUS(zus, 0, 15.44, 65.31);
        else return new Array(12).fill(0);
    }

    calcHealthContribution(): number[] {
        let healthArray = new Array(12).fill(319.94);
        return healthArray;
    }

    calcAccident(zus: Symbol): number[] {
        return this.evalZUS(zus, 0, 10.52, 47.98);
    }

    calcLaborFund(zus: Symbol): number[] {
        return this.evalZUS(zus, 0, 0, 65.31);
    }

    calcOthers(accident: number[], laborFund: number[]): number[] {
        return accident.map((acc, i) => acc + laborFund[i]);
    }

    calcSocialSecurity(pension: number[], disability: number[],
        sickness: number[], accident: number[], laborFund: number[]): number[] {
            return pension.map((pen, i) => pen + disability[i] + sickness[i] + accident[i] + laborFund[i]);
        }

    calcTax(taxType: Symbol, taxBase: number[], accTaxBase: number[], taxThreshold: number, monthlyRelief: number,
        healthDeductible: number[]): number[] {
            if(taxType == TAXTYPE.progressive) {
                return super.calcProgressiveTax(taxBase, accTaxBase, taxThreshold,
                    healthDeductible, monthlyRelief);
            } else {
                return this.calcLinearTax(taxBase, healthDeductible);
            }
        }

    calcLinearTax(taxBase: number[], healthDeductible: number[]): number[] {
        let tax = new Array(12);
        for(let i = 0; i < tax.length; i++){
            let taxBeforeDeductible = taxBase[i] * TAXRATE.rate19;
            if(taxBeforeDeductible >= healthDeductible[i]){
                tax[i] = taxBeforeDeductible - healthDeductible[i];
            } else {
                tax[i] = 0;
            }
        }
        return tax;
    }
} // End of class B2BCalculator
