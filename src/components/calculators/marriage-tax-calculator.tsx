
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

const spouseSchema = z.object({
  filingStatus: z.enum(['single', 'headOfHousehold', 'qualifyingWidow']),
  salary: z.coerce.number().min(0).optional(),
  interestDividends: z.coerce.number().min(0).optional(),
  ltcg: z.coerce.number().min(0).optional(),
  qualifiedDividends: z.coerce.number().min(0).optional(),
  otherIncome: z.coerce.number().min(0).optional(),
  deductions401k: z.coerce.number().min(0).optional(),
  stateTaxRate: z.coerce.number().min(0).max(20).optional(),
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

const calculateTax = (income: any, filingStatus: FilingStatus): TaxResult => {
    const yearData = taxData['2025']; // Hardcoded to 2025 as per requirement
    
    const totalIncome = (income.salary || 0) + (income.interestDividends || 0) + (income.ltcg || 0) + (income.otherIncome || 0);
    const agi = totalIncome - (income.deductions401k || 0);

    const deduction = yearData.standardDeduction[filingStatus];
    let taxableIncome = Math.max(0, agi - deduction);
    
    let ordinaryTaxableIncome = taxableIncome - (income.ltcg || 0) - (income.qualifiedDividends || 0);
    if(ordinaryTaxableIncome < 0) ordinaryTaxableIncome = 0;
    
    let tax = 0;
    const brackets = yearData.taxBrackets[filingStatus];
    for (const bracket of brackets) {
        if (ordinaryTaxableIncome > bracket.from) {
            tax += (Math.min(ordinaryTaxableIncome, bracket.to) - bracket.from) * bracket.rate;
        }
    }

    // Simplified LTCG tax
    const ltcgBrackets = yearData.ltcgBrackets[filingStatus];
    const capitalGains = (income.ltcg || 0) + (income.qualifiedDividends || 0);
    if (capitalGains > 0) {
        if(ordinaryTaxableIncome < ltcgBrackets[0]) {
            const taxedAt0 = Math.min(capitalGains, ltcgBrackets[0] - ordinaryTaxableIncome);
            const remainingGains = capitalGains - taxedAt0;
            if(remainingGains > 0) {
                 const taxedAt15 = Math.min(remainingGains, ltcgBrackets[1] - ltcgBrackets[0]);
                 tax += taxedAt15 * 0.15;
                 if(remainingGains - taxedAt15 > 0) {
                    tax += (remainingGains - taxedAt15) * 0.20;
                 }
            }
        } else if (ordinaryTaxableIncome < ltcgBrackets[1]) {
             const taxedAt15 = Math.min(capitalGains, ltcgBrackets[1] - ordinaryTaxableIncome);
             tax += taxedAt15 * 0.15;
             if (capitalGains - taxedAt15 > 0) {
                tax += (capitalGains - taxedAt15) * 0.20;
             }
        } else {
            tax += capitalGains * 0.20;
        }
    }
    
    return { taxLiability: tax, totalIncome, taxableIncome };
}

export default function MarriageTaxCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      spouse1: { filingStatus: 'single', salary: 65000, deductions401k: 10000, stateTaxRate: 5 },
      spouse2: { filingStatus: 'single', salary: 45000, deductions401k: 6000, stateTaxRate: 5 },
    },
  });

  function onSubmit(values: FormData) {
    const single1Result = calculateTax(values.spouse1, values.spouse1.filingStatus);
    const single2Result = calculateTax(values.spouse2, values.spouse2.filingStatus);
    
    const jointIncome = {
      salary: (values.spouse1.salary || 0) + (values.spouse2.salary || 0),
      interestDividends: (values.spouse1.interestDividends || 0) + (values.spouse2.interestDividends || 0),
      ltcg: (values.spouse1.ltcg || 0) + (values.spouse2.ltcg || 0),
      qualifiedDividends: (values.spouse1.qualifiedDividends || 0) + (values.spouse2.qualifiedDividends || 0),
      otherIncome: (values.spouse1.otherIncome || 0) + (values.spouse2.otherIncome || 0),
      deductions401k: (values.spouse1.deductions401k || 0) + (values.spouse2.deductions401k || 0),
    };
    
    const jointResult = calculateTax(jointIncome, 'marriedFilingJointly');
    
    const totalSingleTax = single1Result.taxLiability + single2Result.taxLiability;
    const marriageBonusOrPenalty = totalSingleTax - jointResult.taxLiability;

    setResult({ single1Result, single2Result, jointResult, marriageBonusOrPenalty });
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg animate-fade-in">
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
    <FormField control={form.control} name={`${spouse}.filingStatus`} render={({ field }) => (
        <FormItem><FormLabel>Filing Status (Before Marriage)</FormLabel>
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
    <FormField control={form.control} name={`${spouse}.salary`} render={({ field }) => (<FormItem><FormLabel>Salary/Business Income</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
    <FormField control={form.control} name={`${spouse}.interestDividends`} render={({ field }) => (<FormItem><FormLabel>Interest/Dividends</FormLabel><FormControl><Input type="number" {...field} placeholder="0" /></FormControl></FormItem>)} />
    <FormField control={form.control} name={`${spouse}.ltcg`} render={({ field }) => (<FormItem><FormLabel>Long-Term Capital Gains</FormLabel><FormControl><Input type="number" {...field} placeholder="0" /></FormControl></FormItem>)} />
    <FormField control={form.control} name={`${spouse}.qualifiedDividends`} render={({ field }) => (<FormItem><FormLabel>Qualified Dividends</FormLabel><FormControl><Input type="number" {...field} placeholder="0" /></FormControl></FormItem>)} />
    <FormField control={form.control} name={`${spouse}.deductions401k`} render={({ field }) => (<FormItem><FormLabel>401k/IRA Savings (pre-tax)</FormLabel><FormControl><Input type="number" {...field} placeholder="0" /></FormControl></FormItem>)} />
    <FormField control={form.control} name={`${spouse}.stateTaxRate`} render={({ field }) => (<FormItem><FormLabel>State Tax Rate (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
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
