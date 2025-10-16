
export type FilingStatus = 'single' | 'marriedFilingJointly' | 'marriedFilingSeparately' | 'headOfHousehold' | 'qualifyingWidow';

interface TaxBracket {
    from: number;
    to: number;
    rate: number;
}

interface TaxYearData {
    standardDeduction: Record<FilingStatus, number>;
    taxBrackets: Record<FilingStatus, TaxBracket[]>;
    ltcgBrackets: Record<FilingStatus, number[]>;
    childTaxCredit: {
        perChild: number;
        refundable: number;
    };
    otherDependentCredit: number;
    studentLoanInterestMax: number;
    saltCap: number;
}

export const taxData: Record<'2024' | '2025', TaxYearData> = {
    '2024': {
        standardDeduction: {
            single: 14600,
            marriedFilingJointly: 29200,
            marriedFilingSeparately: 14600,
            headOfHousehold: 21900,
            qualifyingWidow: 29200,
        },
        taxBrackets: {
            single: [
                { from: 0, to: 11600, rate: 0.10 },
                { from: 11600, to: 47150, rate: 0.12 },
                { from: 47150, to: 100525, rate: 0.22 },
                { from: 100525, to: 191950, rate: 0.24 },
                { from: 191950, to: 243725, rate: 0.32 },
                { from: 243725, to: 609350, rate: 0.35 },
                { from: 609350, to: Infinity, rate: 0.37 },
            ],
            marriedFilingJointly: [
                { from: 0, to: 23200, rate: 0.10 },
                { from: 23200, to: 94300, rate: 0.12 },
                { from: 94300, to: 201050, rate: 0.22 },
                { from: 201050, to: 383900, rate: 0.24 },
                { from: 383900, to: 487450, rate: 0.32 },
                { from: 487450, to: 731200, rate: 0.35 },
                { from: 731200, to: Infinity, rate: 0.37 },
            ],
            marriedFilingSeparately: [
                { from: 0, to: 11600, rate: 0.10 },
                { from: 11600, to: 47150, rate: 0.12 },
                { from: 47150, to: 100525, rate: 0.22 },
                { from: 100525, to: 191950, rate: 0.24 },
                { from: 191950, to: 243725, rate: 0.32 },
                { from: 243725, to: 365600, rate: 0.35 },
                { from: 365600, to: Infinity, rate: 0.37 },
            ],
            headOfHousehold: [
                { from: 0, to: 16550, rate: 0.10 },
                { from: 16550, to: 63100, rate: 0.12 },
                { from: 63100, to: 100500, rate: 0.22 },
                { from: 100500, to: 191950, rate: 0.24 },
                { from: 191950, to: 243700, rate: 0.32 },
                { from: 243700, to: 609350, rate: 0.35 },
                { from: 609350, to: Infinity, rate: 0.37 },
            ],
            qualifyingWidow: [ // Same as married filing jointly
                { from: 0, to: 23200, rate: 0.10 },
                { from: 23200, to: 94300, rate: 0.12 },
                { from: 94300, to: 201050, rate: 0.22 },
                { from: 201050, to: 383900, rate: 0.24 },
                { from: 383900, to: 487450, rate: 0.32 },
                { from: 487450, to: 731200, rate: 0.35 },
                { from: 731200, to: Infinity, rate: 0.37 },
            ],
        },
        ltcgBrackets: { // [end of 0% bracket, end of 15% bracket]
            single: [47025, 518900],
            marriedFilingJointly: [94050, 583750],
            marriedFilingSeparately: [47025, 291850],
            headOfHousehold: [63000, 551350],
            qualifyingWidow: [94050, 583750],
        },
        childTaxCredit: { perChild: 2000, refundable: 1600 },
        otherDependentCredit: 500,
        studentLoanInterestMax: 2500,
        saltCap: 10000,
    },
    '2025': {
        standardDeduction: {
            single: 15300,
            marriedFilingJointly: 30600,
            marriedFilingSeparately: 15300,
            headOfHousehold: 23000,
            qualifyingWidow: 30600,
        },
        taxBrackets: { // Estimated, adjust with official numbers
            single: [
                { from: 0, to: 12150, rate: 0.10 },
                { from: 12150, to: 49400, rate: 0.12 },
                { from: 49400, to: 105275, rate: 0.22 },
                { from: 105275, to: 201000, rate: 0.24 },
                { from: 201000, to: 254200, rate: 0.32 },
                { from: 254200, to: 635500, rate: 0.35 },
                { from: 635500, to: Infinity, rate: 0.37 },
            ],
            marriedFilingJointly: [
                { from: 0, to: 24300, rate: 0.10 },
                { from: 24300, to: 98800, rate: 0.12 },
                { from: 98800, to: 210550, rate: 0.22 },
                { from: 210550, to: 402000, rate: 0.24 },
                { from: 402000, to: 508400, rate: 0.32 },
                { from: 508400, to: 762600, rate: 0.35 },
                { from: 762600, to: Infinity, rate: 0.37 },
            ],
            marriedFilingSeparately: [
                { from: 0, to: 12150, rate: 0.10 },
                { from: 12150, to: 49400, rate: 0.12 },
                { from: 49400, to: 105275, rate: 0.22 },
                { from: 105275, to: 201000, rate: 0.24 },
                { from: 201000, to: 254200, rate: 0.32 },
                { from: 254200, to: 381300, rate: 0.35 },
                { from: 381300, to: Infinity, rate: 0.37 },
            ],
            headOfHousehold: [
                { from: 0, to: 17350, rate: 0.10 },
                { from: 17350, to: 66250, rate: 0.12 },
                { from: 66250, to: 105250, rate: 0.22 },
                { from: 105250, to: 201000, rate: 0.24 },
                { from: 201000, to: 254200, rate: 0.32 },
                { from: 254200, to: 635500, rate: 0.35 },
                { from: 635500, to: Infinity, rate: 0.37 },
            ],
            qualifyingWidow: [ // Same as married filing jointly
                { from: 0, to: 24300, rate: 0.10 },
                { from: 24300, to: 98800, rate: 0.12 },
                { from: 98800, to: 210550, rate: 0.22 },
                { from: 210550, to: 402000, rate: 0.24 },
                { from: 402000, to: 508400, rate: 0.32 },
                { from: 508400, to: 762600, rate: 0.35 },
                { from: 762600, to: Infinity, rate: 0.37 },
            ],
        },
        ltcgBrackets: { // Estimated, adjust with official numbers
            single: [49230, 541450],
            marriedFilingJointly: [98450, 614350],
            marriedFilingSeparately: [49230, 307175],
            headOfHousehold: [66050, 577900],
            qualifyingWidow: [98450, 614350],
        },
        childTaxCredit: { perChild: 2000, refundable: 1700 }, // Refundable part increases
        otherDependentCredit: 500,
        studentLoanInterestMax: 2500,
        saltCap: 10000,
    },
};
