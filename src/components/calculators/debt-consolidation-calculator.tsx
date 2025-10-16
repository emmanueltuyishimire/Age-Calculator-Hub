
"use client";

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { RefreshCcw, DollarSign, PlusCircle, Trash2, AlertCircle, Scale } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Separator } from '../ui/separator';

const debtSchema = z.object({
  name: z.string().optional(),
  balance: z.coerce.number().min(0.01, "Balance required."),
  payment: z.coerce.number().min(1, "Payment required."),
  apr: z.coerce.number().min(0, "APR required."),
});

const formSchema = z.object({
  debts: z.array(debtSchema).min(1, "At least one debt is required."),
  consolidationLoanAmount: z.coerce.number().min(1, "Loan amount required."),
  consolidationApr: z.coerce.number().min(0, "APR required."),
  consolidationTermYears: z.coerce.number().min(0).max(30).optional(),
  consolidationTermMonths: z.coerce.number().min(0).max(11).optional(),
  consolidationFee: z.coerce.number().min(0).optional(),
}).refine(data => (data.consolidationTermYears || 0) + (data.consolidationTermMonths || 0) > 0, {
  message: "Loan term must be at least one month.",
  path: ["consolidationTermMonths"],
});

type FormData = z.infer<typeof formSchema>;

interface Result {
    currentTotalMonthly: number;
    currentTotalInterest: number;
    currentMonthsToPayoff: number;
    consolidatedMonthly: number;
    consolidatedTotalInterest: number;
    consolidatedMonthsToPayoff: number;
    interestSavings: number;
}

const currencySymbol = '$';

// Helper function to calculate months to pay off a single loan
const calculateMonths = (balance: number, payment: number, rate: number): number => {
    if (rate > 0 && payment <= balance * rate) return Infinity;
    if (rate === 0) return balance / payment;
    return -(Math.log(1 - (balance * rate) / payment) / Math.log(1 + rate));
};

export default function DebtConsolidationCalculator() {
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      debts: [
        { name: 'Credit Card 1', balance: 10000, payment: 260, apr: 17.99 },
        { name: 'Credit Card 2', balance: 7500, payment: 190, apr: 19.99 },
        { name: 'High Interest Debt', balance: 6500, payment: 180, apr: 18.99 },
      ],
      consolidationLoanAmount: 24000,
      consolidationApr: 10.99,
      consolidationTermYears: 5,
      consolidationTermMonths: 0,
      consolidationFee: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'debts',
  });

  function onSubmit(values: FormData) {
    setError(null);
    setResult(null);

    // Current Debt Scenario
    let currentTotalMonthly = 0;
    let currentTotalInterest = 0;
    let maxMonths = 0;
    
    values.debts.forEach(debt => {
      currentTotalMonthly += debt.payment;
      const monthlyRate = debt.apr / 100 / 12;
      const months = calculateMonths(debt.balance, debt.payment, monthlyRate);
      if (months === Infinity) {
          setError(`The payment for "${debt.name || 'a debt'}" is too low to cover interest. Debt will not be paid off.`);
          return;
      }
      maxMonths = Math.max(maxMonths, months);
      currentTotalInterest += (debt.payment * months) - debt.balance;
    });

    if(error) return; // Stop if there was an error in the loop

    // Consolidation Loan Scenario
    const loanAmountWithFee = values.consolidationLoanAmount * (1 + (values.consolidationFee || 0) / 100);
    const consolMonthlyRate = values.consolidationApr / 100 / 12;
    const consolTermMonths = (values.consolidationTermYears || 0) * 12 + (values.consolidationTermMonths || 0);

    const consolidatedMonthly = consolMonthlyRate > 0
        ? (loanAmountWithFee * consolMonthlyRate) / (1 - Math.pow(1 + consolMonthlyRate, -consolTermMonths))
        : loanAmountWithFee / consolTermMonths;
    
    const consolidatedTotalPaid = consolidatedMonthly * consolTermMonths;
    const consolidatedTotalInterest = consolidatedTotalPaid - values.consolidationLoanAmount;

    setResult({
        currentTotalMonthly,
        currentTotalInterest,
        currentMonthsToPayoff: Math.ceil(maxMonths),
        consolidatedMonthly,
        consolidatedTotalInterest,
        consolidatedMonthsToPayoff: consolTermMonths,
        interestSavings: currentTotalInterest - consolidatedTotalInterest,
    });
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
             {error && (
                <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Calculation Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Current Debts Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Your Current Debts</h3>
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-5 gap-2 items-end p-2 border rounded-lg">
                  <FormField control={form.control} name={`debts.${index}.name`} render={({ field }) => (<FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder={`Debt ${index + 1}`} {...field} /></FormControl></FormItem>)} />
                  <FormField control={form.control} name={`debts.${index}.balance`} render={({ field }) => (<FormItem><FormLabel>Balance</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name={`debts.${index}.payment`} render={({ field }) => (<FormItem><FormLabel>Payment</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name={`debts.${index}.apr`} render={({ field }) => (<FormItem><FormLabel>APR (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} aria-label={`Remove debt ${index + 1}`}><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => append({ balance: 0, payment: 0, apr: 0 })}><PlusCircle className="mr-2 h-4 w-4" /> Add Debt</Button>
            </div>
            
            <Separator />

            {/* Consolidation Loan Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Consolidation Loan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="consolidationLoanAmount" render={({ field }) => (<FormItem><FormLabel>Loan Amount</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="consolidationApr" render={({ field }) => (<FormItem><FormLabel>Interest Rate (APR %)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormItem>
                  <FormLabel>Loan Term</FormLabel>
                  <div className="flex gap-2">
                    <FormField control={form.control} name="consolidationTermYears" render={({ field }) => (<FormControl><Input type="number" placeholder="Years" {...field} /></FormControl>)} />
                    <FormField control={form.control} name="consolidationTermMonths" render={({ field }) => (<FormControl><Input type="number" placeholder="Months" {...field} /></FormControl>)} />
                  </div>
                  <FormMessage>{form.formState.errors.consolidationTermMonths?.message}</FormMessage>
                </FormItem>
                <FormField control={form.control} name="consolidationFee" render={({ field }) => (<FormItem><FormLabel>Loan Fee/Points (%)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button type="submit" className="w-full"><Scale className="mr-2 h-4 w-4"/>Compare</Button>
              <Button onClick={() => { form.reset(); setResult(null); setError(null); }} type="button" variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
            </div>
          </form>
        </Form>
        
        {result && (
          <div className="p-4 bg-muted rounded-lg mt-6 space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-center text-foreground">Comparison Summary</h3>
             <div className="text-center p-4 border-2 rounded-lg bg-background ${result.interestSavings > 0 ? 'border-green-500' : 'border-destructive'}">
                <h4 className="font-semibold text-muted-foreground">Potential Interest Savings</h4>
                <p className={`text-4xl font-bold ${result.interestSavings > 0 ? 'text-green-600' : 'text-destructive'}`}>
                    {currencySymbol}{result.interestSavings.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg bg-background">
                    <h4 className="font-semibold text-center mb-2">Current Debts</h4>
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between"><span>Monthly Payment:</span><span className="font-bold">{currencySymbol}{result.currentTotalMonthly.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>Payoff Time:</span><span className="font-bold">{Math.floor(result.currentMonthsToPayoff / 12)}y {result.currentMonthsToPayoff % 12}m</span></div>
                        <div className="flex justify-between"><span>Total Interest:</span><span className="font-bold">{currencySymbol}{result.currentTotalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                    </div>
                </div>
                 <div className="p-4 border rounded-lg bg-background">
                    <h4 className="font-semibold text-center mb-2">Consolidated Loan</h4>
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between"><span>Monthly Payment:</span><span className="font-bold">{currencySymbol}{result.consolidatedMonthly.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>Payoff Time:</span><span className="font-bold">{Math.floor(result.consolidatedMonthsToPayoff / 12)}y {result.consolidatedMonthsToPayoff % 12}m</span></div>
                        <div className="flex justify-between"><span>Total Interest:</span><span className="font-bold">{currencySymbol}{result.consolidatedTotalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                    </div>
                </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
