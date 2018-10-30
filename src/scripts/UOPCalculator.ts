import {BaseCalculator, AuxVariable, CONTRACT} from "./BaseCalculator";

export class UOPCalculator extends BaseCalculator{
    options: AuxVariable = {};
    constructor(options: AuxVariable){
        super();
        this.monthly.accTaxBase = new Array(12).fill(0);
        this.options = options;
        this.contract = CONTRACT.UOP;
    }

    calcSalary(grossSalary: number) {
        this.monthly.grossSalary.fill(grossSalary);

        // Accumulated gross salary
        this.monthly.accGrossSalary = this.calcAccGrossSalary(this.monthly.grossSalary);

        // Pension
        this.monthly.pension = this.calcPension(
            this.monthly.grossSalary, this.monthly.accGrossSalary,
            this.options.annualLimit, this.options.pension
        );

        // Disability insurance
        this.monthly.disability = this.calcDisability(
            this.monthly.grossSalary, this.monthly.accGrossSalary,
            this.options.annualLimit, this.options.disability
        );

        // Sickness insurance
        this.monthly.sickness = this.calcSickness(
            this.monthly.grossSalary, this.options.sickness
        );

        // Social security
        this.monthly.socialSecurity = this.calcSocialSecurity(
            this.monthly.pension, this.monthly.disability, this.monthly.sickness
        );

        // Health contribution
        this.monthly.healthContribution = this.calcHealthContribution(
            this.monthly.grossSalary, this.monthly.socialSecurity, this.options.healthContribution
        );

        // Health deductible
        this.monthly.healthDeductible = super.calcHealthDeductible(
            this.monthly.healthContribution, this.options.healthDeductible,
            this.options.healthContribution
        );

        // Tax base
        this.monthly.taxBase = super.calcTaxBase(
            this.monthly.grossSalary, this.monthly.socialSecurity, this.options.earningCost
        );

        // Accumulated tax base
        this.monthly.accTaxBase = super.calcAccTaxBase(this.monthly.taxBase);

        // Tax
        this.monthly.tax = super.calcProgressiveTax(
            this.monthly.taxBase, this.monthly.accTaxBase, this.options.taxThreshold,
            this.monthly.healthDeductible, this.options.monthlyRelief
        );

        // Net salary
        this.monthly.netSalary = super.calcFinalSalary(this.monthly.grossSalary,
            this.monthly.socialSecurity, this.monthly.healthContribution, this.monthly.tax
        );

        // Annual values
        this.annual = super.calcTotals(this.annual, this.monthly);
    }

    calcAccGrossSalary(grossSalary: number[]): number[]{
        return this.accumulateValue(grossSalary);
    }

    calcPension(grossSalary: number[], accGrossSalary: number[],
        annualLimit: number, pensionRate: number): number[] {
            return this.calcPensionDisability(grossSalary, accGrossSalary, annualLimit, pensionRate);
        }

    calcDisability(grossSalary: number[], accGrossSalary: number[],
        annualLimit: number, disabilityRate: number): number[] {
            return this.calcPensionDisability(grossSalary, accGrossSalary, annualLimit, disabilityRate);
        }

    calcPensionDisability(grossSalary: number[], accGrossSalary: number[],
        annualLimit: number, rate: number): number[] {
            let value = new Array(12);

            for(let i = 0; i < value.length; i++) {
                if((accGrossSalary[i] + grossSalary[i]) < annualLimit){
                    value[i] = this.calcContribution(grossSalary[i], rate);
                } else if (accGrossSalary[i] < annualLimit){
                    let baseGrossSalary = annualLimit - accGrossSalary[i];
                    value[i] = this.calcContribution(baseGrossSalary, rate);
                } else {
                    value[i] = 0;
                }
            }
            return value;
        }

    calcSickness(grossSalary: number[], sicknessRate: number): number[] {
        let sickness = new Array(12);
        for(let i = 0; i < sickness.length; i++){
            sickness[i] = this.calcContribution(grossSalary[i], sicknessRate);
        }
        return sickness;
    }

    calcSocialSecurity(pension: number[], disability: number[],
        sickness: number[]): number[] {
            return pension.map((pen, i) => pen + disability[i] + sickness[i]);
        }

    calcHealthContribution(grossSalary: number[], socialSecurity: number[],
        rateHealthContribution: number): number[] {
            let healthContribution = new Array(12);
            for(let i = 0; i < healthContribution.length; i++){
                let healthBase = grossSalary[i] - socialSecurity[i];
                healthContribution[i] = this.calcContribution(healthBase, rateHealthContribution);
            };
            return healthContribution;
        }
} // End of class UOPCalculator
