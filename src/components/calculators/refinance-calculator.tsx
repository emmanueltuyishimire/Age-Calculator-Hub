
"use client";

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { RefreshCcw, Scale } from 'lucide-react';
import { Separator } from '../ui/separator';

const formSchema = z.object({
  // Current Loan
  currentBalance: z.coerce.number().min(1, "Balance is required."),
  currentPayment: z.coerce.number().min(1, "Payment is required."),
  currentRate: z.coerce.number().min(0).max(50),
  // New Loan
  newTerm: z.coerce.number().min(1, "Term is required.").max(40),
  newRate: z.coerce.number().min(0).max(50),
  points: z.coerce.number().min(0).optional(),
  fees: z.coerce.number().min(0).optional(),
  cashOut: z.coerce.number().min(0).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface Result {
  newMonthlyPayment: number;
  monthlySavings: number;
  breakEvenMonths: number;
  lifetimeSavings: number;
}

const currencySymbol = '$';

export default function RefinanceCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentBalance: 250000,
      currentPayment: 1800,
      currentRate: 7,
      newTerm: 20,
      newRate: 6,
      points: 2,
      fees: 1500,
      cashOut: 0,
    },
  });

  function onSubmit(values: FormData) {
    const { currentBalance, currentPayment, currentRate, newTerm, newRate, points = 0, fees = 0, cashOut = 0 } = values;
    
    // --- Current Loan Calculation ---
    const currentMonthlyRate = currentRate / 100 / 12;
    let remainingMonthsCurrent = 0;
    if (currentMonthlyRate > 0 && currentPayment > currentBalance * currentMonthlyRate) {
        remainingMonthsCurrent = -Math.log(1 - (currentBalance * currentMonthlyRate) / currentPayment) / Math.log(1 + currentMonthlyRate);
    } else if (currentMonthlyRate === 0) {
        remainingMonthsCurrent = currentBalance / currentPayment;
    }
    const totalToPayCurrent = remainingMonthsCurrent > 0 ? remainingMonthsCurrent * currentPayment : Infinity;

    // --- New Loan Calculation ---
    const newLoanAmount = currentBalance + cashOut;
    const closingCosts = (newLoanAmount * (points / 100)) + fees;
    const finalNewLoanAmount = newLoanAmount + closingCosts;
    const newMonthlyRate = newRate / 100 / 12;
    const numberOfPaymentsNew = newTerm * 12;
    
    const newMonthlyPayment = newMonthlyRate > 0
        ? (finalNewLoanAmount * newMonthlyRate) / (1 - Math.pow(1 + newMonthlyRate, -numberOfPaymentsNew))
        : finalNewLoanAmount / numberOfPaymentsNew;

    const totalToPayNew = newMonthlyPayment * numberOfPaymentsNew;
    
    const monthlySavings = currentPayment - newMonthlyPayment;
    const breakEvenMonths = closingCosts > 0 && monthlySavings > 0 ? closingCosts / monthlySavings : 0;
    const lifetimeSavings = totalToPayCurrent - totalToPayNew;

    setResult({
      newMonthlyPayment,
      monthlySavings,
      breakEvenMonths,
      lifetimeSavings,
    });
  }

  function handleReset() {
    form.reset();
    setResult(null);
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Current Loan */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Current Loan</h3>
                <FormField control={form.control} name="currentBalance" render={({ field }) => (<FormItem><FormLabel>Remaining Balance</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="currentPayment" render={({ field }) => (<FormItem><FormLabel>Monthly Payment (P&I)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="currentRate" render={({ field }) => (<FormItem><FormLabel>Interest Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
              
              {/* New Loan */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">New Loan</h3>
                 <FormField control={form.control} name="newTerm" render={({ field }) => (<FormItem><FormLabel>New Loan Term (Years)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="newRate" render={({ field }) => (<FormItem><FormLabel>New Interest Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="points" render={({ field }) => (<FormItem><FormLabel>Points (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="fees" render={({ field }) => (<FormItem><FormLabel>Costs & Fees</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="cashOut" render={({ field }) => (<FormItem><FormLabel>Cash Out Amount</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button type="submit" className="w-full"><Scale className="mr-2 h-4 w-4"/>Calculate & Compare</Button>
              <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
            </div>
          </form>
        </Form>
        
        {result && (
          <div className="p-4 bg-muted rounded-lg mt-6 space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-center text-foreground">Refinance Summary</h3>
            <div className={`p-4 border-2 rounded-lg bg-background text-center ${result.lifetimeSavings > 0 ? 'border-green-500' : 'border-destructive'}`}>
                <h4 className="font-semibold text-muted-foreground">Potential Lifetime Savings</h4>
                <p className={`text-4xl font-bold ${result.lifetimeSavings > 0 ? 'text-green-600' : 'text-destructive'}`}>
                    {currencySymbol}{result.lifetimeSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-3 border rounded-lg bg-background">
                    <h4 className="font-semibold text-muted-foreground">New Monthly Payment</h4>
                    <p className="text-2xl font-bold text-primary">{currencySymbol}{result.newMonthlyPayment.toFixed(2)}</p>
                    {result.monthlySavings > 0 ? (
                        <p className="text-sm text-green-600">You save {currencySymbol}{result.monthlySavings.toFixed(2)}/month</p>
                    ) : (
                        <p className="text-sm text-destructive">You pay {currencySymbol}{Math.abs(result.monthlySavings).toFixed(2)} more/month</p>
                    )}
                </div>
                <div className="p-3 border rounded-lg bg-background">
                    <h4 className="font-semibold text-muted-foreground">Break-Even Point</h4>
                    <p className="text-2xl font-bold text-primary">
                        {Math.floor(result.breakEvenMonths / 12)} <span className="text-lg">yrs</span> {Math.round(result.breakEvenMonths % 12)} <span className="text-lg">mos</span>
                    </p>
                    <p className="text-xs text-muted-foreground">Time to recoup costs</p>
                </div>
                <div className="p-3 border rounded-lg bg-background">
                     <h4 className="font-semibold text-muted-foreground">Interest Rate Change</h4>
                    <p className="text-2xl font-bold text-primary">
                        {(form.getValues().newRate - form.getValues().currentRate).toFixed(2)}%
                    </p>
                     <p className="text-xs text-muted-foreground">From {form.getValues().currentRate}% to {form.getValues().newRate}%</p>
                </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
