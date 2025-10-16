
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
  CardDescription,
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
import { RefreshCcw, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '../ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Separator } from '../ui/separator';

const formSchema = z.object({
  filingStatus: z.enum(['single', 'marriedFilingJointly', 'marriedFilingSeparately', 'headOfHousehold', 'qualifyingWidow']),
  youngDependents: z.coerce.number().min(0).int(),
  otherDependents: z.coerce.number().min(0).int(),
  taxYear: z.enum(['2024', '2025']),
  wages: z.coerce.number().min(0),
  wagesWithheld: z.coerce.number().min(0),
  interestIncome: z.coerce.number().min(0).optional(),
  ordinaryDividends: z.coerce.number().min(0).optional(),
  qualifiedDividends: z.coerce.number().min(0).optional(),
  shortTermGains: z.coerce.number().optional(),
  longTermGains: z.coerce.number().optional(),
  otherIncome: z.coerce.number().min(0).optional(),
  iraContributions: z.coerce.number().min(0).optional(),
  studentLoanInterest: z.coerce.number().min(0).optional(),
  stateAndLocalTaxes: z.coerce.number().min(0).optional(),
  mortgageInterest: z.coerce.number().min(0).optional(),
  charitableDonations: z.coerce.number().min(0).optional(),
  otherDeductions: z.coerce.number().min(0).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface Result {
  totalTax: number;
  refund: number;
  taxableIncome: number;
  effectiveRate: number;
}

export default function IncomeTaxCalculator() {
  const [result, setResult] = useState<Result | null>(null);
  const [showAdvanced, setShowAdvanced] = useState({ income: false, deductions: false });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      filingStatus: 'single',
      youngDependents: 0,
      otherDependents: 0,
      taxYear: '2024',
      wages: 80000,
      wagesWithheld: 9000,
    },
  });

  function onSubmit(values: FormData) {
    const yearData = taxData[values.taxYear];
    
    // 1. Calculate Total Income
    const totalIncome = (values.wages || 0) + (values.interestIncome || 0) + (values.ordinaryDividends || 0) + (values.shortTermGains || 0) + (values.longTermGains || 0) + (values.otherIncome || 0);

    // 2. Calculate Adjusted Gross Income (AGI)
    const aboveTheLineDeductions = (values.iraContributions || 0) + Math.min((values.studentLoanInterest || 0), yearData.studentLoanInterestMax);
    const agi = totalIncome - aboveTheLineDeductions;

    // 3. Determine Deduction (Standard vs. Itemized)
    const itemizedDeductions = Math.min((values.stateAndLocalTaxes || 0), yearData.saltCap) + (values.mortgageInterest || 0) + (values.charitableDonations || 0) + (values.otherDeductions || 0);
    const standardDeduction = yearData.standardDeduction[values.filingStatus as FilingStatus];
    const deduction = Math.max(itemizedDeductions, standardDeduction);

    // 4. Calculate Taxable Income
    let taxableIncome = agi - deduction;
    if (taxableIncome < 0) taxableIncome = 0;

    // 5. Calculate Tax Liability
    let tax = 0;
    const brackets = yearData.taxBrackets[values.filingStatus as FilingStatus];
    let incomeRemaining = taxableIncome;
    for (const bracket of brackets) {
        if (incomeRemaining > bracket.from) {
            const taxableInBracket = Math.min(incomeRemaining, bracket.to) - bracket.from;
            tax += taxableInBracket * bracket.rate;
        }
    }
    
    // Calculate Long-Term Capital Gains & Qualified Dividends Tax
    const ltcgIncome = (values.longTermGains || 0) + (values.qualifiedDividends || 0);
    if (ltcgIncome > 0) {
        // This is a simplified calculation. Real calculation is much more complex.
        const ltcgBrackets = yearData.ltcgBrackets[values.filingStatus as FilingStatus];
        let ltcgRemaining = ltcgIncome;
        
        let ordinaryIncomeUpToLtcg = taxableIncome - ltcgIncome;
        if(ordinaryIncomeUpToLtcg < 0) ordinaryIncomeUpToLtcg = 0;

        // 0% bracket
        let amountIn0Bracket = Math.max(0, ltcgBrackets[0] - ordinaryIncomeUpToLtcg);
        let taxedAt0 = Math.min(ltcgRemaining, amountIn0Bracket);
        ltcgRemaining -= taxedAt0;

        // 15% bracket
        let amountIn15Bracket = Math.max(0, ltcgBrackets[1] - (ordinaryIncomeUpToLtcg + taxedAt0));
        let taxedAt15 = Math.min(ltcgRemaining, amountIn15Bracket);
        tax += taxedAt15 * 0.15;
        ltcgRemaining -= taxedAt15;
        
        // 20% bracket
        if (ltcgRemaining > 0) {
            tax += ltcgRemaining * 0.20;
        }
    }

    // 6. Apply Credits
    const childTaxCredit = Math.min(values.youngDependents * yearData.childTaxCredit.perChild, values.youngDependents * yearData.childTaxCredit.refundable);
    const otherDependentCredit = values.otherDependents * yearData.otherDependentCredit;
    const totalCredits = childTaxCredit + otherDependentCredit;

    let finalTax = tax - totalCredits;
    if (finalTax < 0) finalTax = 0;

    const refund = (values.wagesWithheld || 0) - finalTax;

    setResult({
      totalTax: finalTax,
      refund: refund,
      taxableIncome: taxableIncome,
      effectiveRate: (finalTax / agi) * 100
    });
  }
  
  function handleReset() {
      form.reset();
      setResult(null);
  }

  const currencySymbol = '$';

  return (
    <Card className="w-full mx-auto shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Filing Info */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">Filing Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="filingStatus" render={({ field }) => (<FormItem><FormLabel>Filing Status</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl><SelectContent><SelectItem value="single">Single</SelectItem><SelectItem value="marriedFilingJointly">Married Filing Jointly</SelectItem><SelectItem value="marriedFilingSeparately">Married Filing Separately</SelectItem><SelectItem value="headOfHousehold">Head of Household</SelectItem><SelectItem value="qualifyingWidow">Qualifying Widow(er)</SelectItem></SelectContent></Select><FormMessage/></FormItem>)}/>
                <FormField control={form.control} name="taxYear" render={({ field }) => (<FormItem><FormLabel>Tax Year</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl><SelectContent><SelectItem value="2024">2024</SelectItem><SelectItem value="2025">2025</SelectItem></SelectContent></Select><FormMessage/></FormItem>)}/>
                <FormField control={form.control} name="youngDependents" render={({ field }) => (<FormItem><FormLabel>Young Dependents (0-16)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="otherDependents" render={({ field }) => (<FormItem><FormLabel>Other Dependents (17+)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
            </div>

            {/* Income */}
            <Collapsible open={showAdvanced.income} onOpenChange={(open) => setShowAdvanced(s => ({...s, income: open}))}>
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Income</h3>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                       {showAdvanced.income ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                       <span className="sr-only">Toggle Income Details</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="wages" render={({ field }) => (<FormItem><FormLabel>Wages, Tips (W-2)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="wagesWithheld" render={({ field }) => (<FormItem><FormLabel>Federal Tax Withheld</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                <CollapsibleContent className="space-y-4 mt-4">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="interestIncome" render={({ field }) => (<FormItem><FormLabel>Interest Income (1099-INT)</FormLabel><FormControl><Input type="number" {...field} placeholder="0" /></FormControl></FormItem>)} />
                      <FormField control={form.control} name="ordinaryDividends" render={({ field }) => (<FormItem><FormLabel>Ordinary Dividends</FormLabel><FormControl><Input type="number" {...field} placeholder="0" /></FormControl></FormItem>)} />
                      <FormField control={form.control} name="qualifiedDividends" render={({ field }) => (<FormItem><FormLabel>Qualified Dividends</FormLabel><FormControl><Input type="number" {...field} placeholder="0" /></FormControl></FormItem>)} />
                      <FormField control={form.control} name="shortTermGains" render={({ field }) => (<FormItem><FormLabel>Short-Term Capital Gains</FormLabel><FormControl><Input type="number" {...field} placeholder="0" /></FormControl></FormItem>)} />
                      <FormField control={form.control} name="longTermGains" render={({ field }) => (<FormItem><FormLabel>Long-Term Capital Gains</FormLabel><FormControl><Input type="number" {...field} placeholder="0" /></FormControl></FormItem>)} />
                      <FormField control={form.control} name="otherIncome" render={({ field }) => (<FormItem><FormLabel>Other Income (e.g., Unemployment)</FormLabel><FormControl><Input type="number" {...field} placeholder="0" /></FormControl></FormItem>)} />
                   </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
            
            {/* Deductions */}
            <Collapsible open={showAdvanced.deductions} onOpenChange={(open) => setShowAdvanced(s => ({...s, deductions: open}))}>
               <div className="space-y-4 p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Deductions & Credits</h3>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                       {showAdvanced.deductions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                       <span className="sr-only">Toggle Deductions Details</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>
                 <CollapsibleContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="iraContributions" render={({ field }) => (<FormItem><FormLabel>IRA Contributions</FormLabel><FormControl><Input type="number" {...field} placeholder="0" /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="studentLoanInterest" render={({ field }) => (<FormItem><FormLabel>Student Loan Interest</FormLabel><FormControl><Input type="number" {...field} placeholder="0" /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="stateAndLocalTaxes" render={({ field }) => (<FormItem><FormLabel>State & Local Taxes Paid (SALT)</FormLabel><FormControl><Input type="number" {...field} placeholder="0" /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="mortgageInterest" render={({ field }) => (<FormItem><FormLabel>Mortgage Interest</FormLabel><FormControl><Input type="number" {...field} placeholder="0" /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="charitableDonations" render={({ field }) => (<FormItem><FormLabel>Charitable Donations</FormLabel><FormControl><Input type="number" {...field} placeholder="0" /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="otherDeductions" render={({ field }) => (<FormItem><FormLabel>Other Itemized Deductions</FormLabel><FormControl><Input type="number" {...field} placeholder="0" /></FormControl></FormItem>)} />
                  </div>
                 </CollapsibleContent>
               </div>
            </Collapsible>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><DollarSign className="mr-2 h-4 w-4"/>Calculate Tax</Button>
              <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
            </div>
          </form>
        </Form>
        
        {result && (
          <div className="p-4 bg-muted rounded-lg text-center mt-6 space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-foreground">Your Estimated Federal Tax</h3>
             <div className={`p-4 border-2 rounded-lg ${result.refund >= 0 ? 'border-green-500' : 'border-destructive'}`}>
                <h4 className="font-semibold text-muted-foreground">{result.refund >= 0 ? 'Estimated Refund' : 'Estimated Tax Owed'}</h4>
                <p className={`text-4xl font-bold ${result.refund >= 0 ? 'text-green-600' : 'text-destructive'}`}>
                    {currencySymbol}{Math.abs(result.refund).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-3 border rounded-lg bg-background">
                    <span className="text-muted-foreground block">Taxable Income</span>
                    <span className="font-semibold">{currencySymbol}{result.taxableIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="p-3 border rounded-lg bg-background">
                    <span className="text-muted-foreground block">Total Tax</span>
                    <span className="font-semibold">{currencySymbol}{result.totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="p-3 border rounded-lg bg-background">
                    <span className="text-muted-foreground block">Effective Tax Rate</span>
                    <span className="font-semibold">{result.effectiveRate.toFixed(2)}%</span>
                </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
