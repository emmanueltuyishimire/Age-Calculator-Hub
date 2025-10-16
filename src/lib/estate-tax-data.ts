
export type EstateTaxYear = '2025' | '2024' | '2023' | '2022' | '2021' | '2020' | '2019' | '2018' | '2017' | '2016' | '2015' | '2014' | '2013' | '2012' | '2011' | '2010' | '2009' | '2008' | '2007' | '2006' | '2005' | '2004' | '2003' | '2002' | '2001';

interface YearData {
    exemption: number;
    rate: number;
}

export const estateTaxData: Record<EstateTaxYear, YearData> = {
    '2025': { exemption: 13990000, rate: 40 }, // Placeholder, official numbers may vary
    '2024': { exemption: 13610000, rate: 40 },
    '2023': { exemption: 12920000, rate: 40 },
    '2022': { exemption: 12060000, rate: 40 },
    '2021': { exemption: 11700000, rate: 40 },
    '2020': { exemption: 11580000, rate: 40 },
    '2019': { exemption: 11400000, rate: 40 },
    '2018': { exemption: 11180000, rate: 40 },
    '2017': { exemption: 5490000, rate: 40 },
    '2016': { exemption: 5450000, rate: 40 },
    '2015': { exemption: 5430000, rate: 40 },
    '2014': { exemption: 5340000, rate: 40 },
    '2013': { exemption: 5250000, rate: 40 },
    '2012': { exemption: 5120000, rate: 35 },
    '2011': { exemption: 5000000, rate: 35 },
    '2010': { exemption: Infinity, rate: 0 }, // Tax was repealed for 2010
    '2009': { exemption: 3500000, rate: 45 },
    '2008': { exemption: 2000000, rate: 45 },
    '2007': { exemption: 2000000, rate: 45 },
    '2006': { exemption: 2000000, rate: 46 },
    '2005': { exemption: 1500000, rate: 47 },
    '2004': { exemption: 1500000, rate: 48 },
    '2003': { exemption: 1000000, rate: 49 },
    '2002': { exemption: 1000000, rate: 50 },
    '2001': { exemption: 675000, rate: 55 },
};
