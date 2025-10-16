
"use client";

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taxData, type FilingStatus } from '@/lib/tax-data';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Heart } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';

const spouseSchema = z.object({
  filingStatus: z.enum(['single', 'headOfHousehold', 'qualifyingWidow']),
  salary: z.coerce.number().min(0).optional(),
  interestDividends: z.coerce.number().min(0).optional(),
  rentalRoyaltyIncome: z.coerce.number().min(0).optional(),
  shortTermGains: z.coerce.number().min(0).optional(),
  longTermGains: z.coerce.number().min(0).optional(),
  qualifiedDividends: z.coerce.number().min(0).optional(),
  deductions401k: z.coerce.number().min(0).optional(),
  dependents: z.coerce.number().min(0).int().optional(),
  mortgageInterest: z.coerce.number().min(0).optional(),
  charitableDonations: z.coerce.number().min(0).optional(),
  studentLoanInterest: z.coerce.number().min(0).optional(),
  childCareExpenses: z.coerce.number().min(0).optional(),
  educationTuition: z.coerce.number().min(0).optional(),
  useStandardDeduction: z.boolean().default(true),
  stateTaxRate: z.coerce.number().min(0).max(20).optional(),
  isSelfEmployed: z.boolean().default(false),
});


const formSchema = z.object({
  spouse1: spouseSchema,
  spouse2: spouseSchema,
});

type FormData = z.infer<typeof formSchema>;

interface TaxResult {
  taxLiability: number;
  totalIncome: number;
  taxableIncome: number;
}

interface Result {
  single1Result: TaxResult;
  single2Result: TaxResult;
  jointResult: TaxResult;
  marriageBonusOrPenalty: number;
}

const currencySymbol = '$';

const calculateTax = (income: any, filingStatus: FilingStatus, numDependents: number = 0): TaxResult => {
    const yearData = taxData['2025'];
    
    const totalIncome = (income.salary || 0) + (income.interestDividends || 0) + (income.rentalRoyaltyIncome || 0) + (income.shortTermGains || 0) + (income.longTermGains || 0);
    const agi = totalIncome - (income.deductions401k || 0) - Math.min((income.studentLoanInterest || 0), yearData.studentLoanInterestMax);

    let deduction = 0;
    if (income.useStandardDeduction) {
        deduction = yearData.standardDeduction[filingStatus];
    } else {
        const salt = (income.stateTaxRate || 0)/100 * totalIncome;
        deduction = Math.min(salt, yearData.saltCap) + (income.mortgageInterest || 0) + (income.charitableDonations || 0);
    }
    
    let taxableIncome = Math.max(0, agi - deduction);
    
    let ordinaryTaxableIncome = taxableIncome - (income.longTermGains || 0) - (income.qualifiedDividends || 0);
    if(ordinaryTaxableIncome < 0) ordinaryTaxableIncome = 0;
    
    let tax = 0;
    const brackets = yearData.taxBrackets[filingStatus];
    for (const bracket of brackets) {
        if (ordinaryTaxableIncome > bracket.from) {
            tax += (Math.min(ordinaryTaxableIncome, bracket.to) - bracket.from) * bracket.rate;
        }
    }

    const ltcgBrackets = yearData.ltcgBrackets[filingStatus];
    const capitalGains = (income.longTermGains || 0) + (income.qualifiedDividends || 0);
    if (capitalGains > 0) {
        let remainingGains = capitalGains;
        let ltcgTax = 0;
        const ltcgBracket0End = ltcgBrackets[0];
        const ltcgBracket15End = ltcgBrackets[1];
        
        const taxableAt0 = Math.min(remainingGains, Math.max(0, ltcgBracket0End - ordinaryTaxableIncome));
        remainingGains -= taxableAt0;

        const taxableAt15 = Math.min(remainingGains, Math.max(0, ltcgBracket15End - (ordinaryTaxableIncome + taxableAt0)));
        ltcgTax += taxableAt15 * 0.15;
        remainingGains -= taxableAt15;
        
        if (remainingGains > 0) {
            ltcgTax += remainingGains * 0.20;
        }
        tax += ltcgTax;
    }
    
    const totalCredits = (numDependents * yearData.childTaxCredit.perChild) + (income.childCareExpenses ? Math.min(income.childCareExpenses, 3000) * 0.20 : 0);
    tax = Math.max(0, tax - totalCredits);
    
    return { taxLiability: tax, totalIncome, taxableIncome };
}

export default function MarriageTaxCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      spouse1: { filingStatus: 'single', salary: 65000, deductions401k: 10000, stateTaxRate: 5, useStandardDeduction: true },
      spouse2: { filingStatus: 'single', salary: 45000, deductions401k: 6000, stateTaxRate: 5, useStandardDeduction: true },
    },
  });

  function onSubmit(values: FormData) {
    const single1Result = calculateTax(values.spouse1, values.spouse1.filingStatus, values.spouse1.dependents);
    const single2Result = calculateTax(values.spouse2, values.spouse2.filingStatus, values.spouse2.dependents);
    
    const jointIncome = {
      salary: (values.spouse1.salary || 0) + (values.spouse2.salary || 0),
      interestDividends: (values.spouse1.interestDividends || 0) + (values.spouse2.interestDividends || 0),
      rentalRoyaltyIncome: (values.spouse1.rentalRoyaltyIncome || 0) + (values.spouse2.rentalRoyaltyIncome || 0),
      shortTermGains: (values.spouse1.shortTermGains || 0) + (values.spouse2.shortTermGains || 0),
      longTermGains: (values.spouse1.longTermGains || 0) + (values.spouse2.longTermGains || 0),
      qualifiedDividends: (values.spouse1.qualifiedDividends || 0) + (values.spouse2.qualifiedDividends || 0),
      deductions401k: (values.spouse1.deductions401k || 0) + (values.spouse2.deductions401k || 0),
      studentLoanInterest: (values.spouse1.studentLoanInterest || 0) + (values.spouse2.studentLoanInterest || 0),
      useStandardDeduction: values.spouse1.useStandardDeduction && values.spouse2.useStandardDeduction,
      mortgageInterest: (values.spouse1.mortgageInterest || 0) + (values.spouse2.mortgageInterest || 0),
      charitableDonations: (values.spouse1.charitableDonations || 0) + (values.spouse2.charitableDonations || 0),
      childCareExpenses: (values.spouse1.childCareExpenses || 0) + (values.spouse2.childCareExpenses || 0),
      stateTaxRate: Math.max(values.spouse1.stateTaxRate || 0, values.spouse2.stateTaxRate || 0), // Simplification
    };
    
    const jointResult = calculateTax(jointIncome, 'marriedFilingJointly', (values.spouse1.dependents || 0) + (values.spouse2.dependents || 0));
    
    const totalSingleTax = single1Result.taxLiability + single2Result.taxLiability;
    const marriageBonusOrPenalty = totalSingleTax - jointResult.taxLiability;

    setResult({ single1Result, single2Result, jointResult, marriageBonusOrPenalty });
  }

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SpouseForm spouse="spouse1" form={form} />
                <SpouseForm spouse="spouse2" form={form} />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button type="submit" className="w-full"><Heart className="mr-2 h-4 w-4"/>Calculate Tax Impact</Button>
              <Button onClick={() => {form.reset(); setResult(null);}} type="button" variant="outline" className="w-full sm:w-auto"><RefreshCcw className="h-4 w-4"/></Button>
            </div>
          </form>
        </Form>
        
        {result && (
          <div className="p-4 bg-muted rounded-lg mt-6 space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-center text-foreground">Marriage Tax Impact Summary</h3>
             <div className={`p-4 border-2 rounded-lg bg-background text-center ${result.marriageBonusOrPenalty >= 0 ? 'border-green-500' : 'border-destructive'}`}>
                <h4 className="font-semibold text-muted-foreground">{result.marriageBonusOrPenalty >= 0 ? 'Marriage Bonus' : 'Marriage Penalty'}</h4>
                <p className={`text-4xl font-bold ${result.marriageBonusOrPenalty >= 0 ? 'text-green-600' : 'text-destructive'}`}>
                    {currencySymbol}{Math.abs(result.marriageBonusOrPenalty).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <ResultCard title="Spouse 1 (as Single)" result={result.single1Result} />
                <ResultCard title="Spouse 2 (as Single)" result={result.single2Result} />
                <ResultCard title="Married Filing Jointly" result={result.jointResult} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const SpouseForm = ({ spouse, form }: { spouse: "spouse1" | "spouse2", form: any }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold border-b pb-2">{spouse === 'spouse1' ? 'Spouse 1' : 'Spouse 2'}</h3>
    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
    <FormField control={form.control} name={`${spouse}.salary`} render={({ field }) => (<FormItem className="col-span-2"><FormLabel>Salary/Business Income</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
    <FormField control={form.control} name={`${spouse}.interestDividends`} render={({ field }) => (<FormItem><FormLabel>Interest/Dividends</FormLabel><FormControl><Input type="number" {...field} placeholder="0" /></FormControl></FormItem>)} />
    <FormField control={form.control} name={`${spouse}.rentalRoyaltyIncome`} render={({ field }) => (<FormItem><FormLabel>Rental, Royalty, etc.</FormLabel><FormControl><Input type="number" {...field} placeholder="0" /></FormControl></FormItem>)} />
    <FormField control={form.control} name={`${spouse}.shortTermGains`} render={({ field }) => (<FormItem><FormLabel>Short Term Capital Gain</FormLabel><FormControl><Input type="number" {...field} placeholder="0" /></FormControl></FormItem>)} />
    <FormField control={form.control} name={`${spouse}.longTermGains`} render={({ field }) => (<FormItem><FormLabel>Long Term Capital Gain</FormLabel><FormControl><Input type="number" {...field} placeholder="0" /></FormControl></FormItem>)} />
     <FormField control={form.control} name={`${spouse}.qualifiedDividends`} render={({ field }) => (<FormItem><FormLabel>Qualified Dividends</FormLabel><FormControl><Input type="number" {...field} placeholder="0" /></FormControl></FormItem>)} />
    <FormField control={form.control} name={`${spouse}.deductions401k`} render={({ field }) => (<FormItem><FormLabel>401K, IRA... Savings</FormLabel><FormControl><Input type="number" {...field} placeholder="0" /></FormControl></FormItem>)} />
    <FormField control={form.control} name={`${spouse}.filingStatus`} render={({ field }) => (
        <FormItem><FormLabel>File Status (Before Marriage)</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
            <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="headOfHousehold">Head of Household</SelectItem>
                <SelectItem value="qualifyingWidow">Qualifying Widow(er)</SelectItem>
            </SelectContent>
        </Select>
        <FormMessage /></FormItem>
    )} />
    <FormField control={form.control} name={`${spouse}.dependents`} render={({ field }) => (<FormItem><FormLabel>No. of Dependents</FormLabel><FormControl><Input type="number" {...field} placeholder="0" /></FormControl></FormItem>)} />

    <FormField control={form.control} name={`${spouse}.mortgageInterest`} render={({ field }) => (<FormItem><FormLabel>Mortgage Interest</FormLabel><FormControl><Input type="number" {...field} placeholder="0" disabled={form.watch(`${spouse}.useStandardDeduction`)} /></FormControl></FormItem>)} />
    <FormField control={form.control} name={`${spouse}.charitableDonations`} render={({ field }) => (<FormItem><FormLabel>Charitable Donations</FormLabel><FormControl><Input type="number" {...field} placeholder="0" disabled={form.watch(`${spouse}.useStandardDeduction`)}/></FormControl></FormItem>)} />
    <FormField control={form.control} name={`${spouse}.studentLoanInterest`} render={({ field }) => (<FormItem><FormLabel>Student Loan Interest</FormLabel><FormControl><Input type="number" {...field} placeholder="0" /></FormControl></FormItem>)} />
    <FormField control={form.control} name={`${spouse}.childCareExpenses`} render={({ field }) => (<FormItem><FormLabel>Child Care Expenses</FormLabel><FormControl><Input type="number" {...field} placeholder="0" /></FormControl></FormItem>)} />
    <FormField control={form.control} name={`${spouse}.educationTuition`} render={({ field }) => (<FormItem><FormLabel>Education Tuition</FormLabel><FormControl><Input type="number" {...field} placeholder="0" /></FormControl></FormItem>)} />
    <FormField control={form.control} name={`${spouse}.stateTaxRate`} render={({ field }) => (<FormItem><FormLabel>State+City Tax Rate (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
    
    <FormField control={form.control} name={`${spouse}.useStandardDeduction`} render={({ field }) => (<FormItem className="col-span-2 flex items-center gap-2 pt-2"><FormLabel>Use Standard Deduction?</FormLabel><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>)} />
    <FormField control={form.control} name={`${spouse}.isSelfEmployed`} render={({ field }) => (<FormItem className="col-span-2 flex items-center gap-2"><FormLabel>Self-Employed?</FormLabel><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>)} />
    </div>
  </div>
);

const ResultCard = ({ title, result }: { title: string, result: TaxResult }) => (
  <div className="p-3 border rounded-lg bg-background text-left">
    <h4 className="font-bold text-center mb-2">{title}</h4>
    <div className="space-y-1">
      <div className="flex justify-between"><span>Tax Liability:</span><span className="font-bold">{currencySymbol}{result.taxLiability.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
      <div className="flex justify-between"><span>Total Income:</span><span>{currencySymbol}{result.totalIncome.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
      <div className="flex justify-between"><span>Taxable Income:</span><span>{currencySymbol}{result.taxableIncome.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
    </div>
  </div>
);
