
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
import { RefreshCcw, Percent } from 'lucide-react';
import ShareButton from '../share-button';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle } from 'lucide-react';

const formSchema = z.object({
  loanAmount: z.coerce.number().min(1, "Amount must be greater than zero."),
  loanTermYears: z.coerce.number().min(0).max(50).optional(),
  loanTermMonths: z.coerce.number().min(0).max(599).optional(),
  monthlyPayment: z.coerce.number().min(1, "Payment must be greater than zero."),
}).refine(data => (data.loanTermYears || 0) + (data.loanTermMonths || 0) > 0, {
  message: "Loan term must be at least one month.",
  path: ["loanTermMonths"],
});

type FormData = z.infer<typeof formSchema>;

interface Result {
  interestRate: number;
  totalPayments: number;
  totalInterest: number;
}

// Function to solve for the interest rate using an iterative method (binary search)
function solveRate(loanAmount: number, numberOfPayments: number, monthlyPayment: number): number {
    if (monthlyPayment * numberOfPayments <= loanAmount) return 0; // No interest or negative interest

    let high = 1.0; // 100% monthly rate is a high upper bound
    let low = 0.0;
    let mid = 0.05;

    for (let i = 0; i < 100; i++) { // Max 100 iterations to prevent infinite loops
        const pv = monthlyPayment * (1 - Math.pow(1 + mid, -numberOfPayments)) / mid;
        if (Math.abs(pv - loanAmount) < 0.01) {
            break;
        } else if (pv > loanAmount) {
            high = mid;
        } else {
            low = mid;
        }
        mid = (high + low) / 2;
    }
    return mid * 12 * 100; // Return annual percentage rate
}

export default function InterestRateCalculator() {
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loanAmount: 32000,
      loanTermYears: 3,
      loanTermMonths: 0,
      monthlyPayment: 960,
    },
  });

  function onSubmit(values: FormData) {
    const { loanAmount, loanTermYears = 0, loanTermMonths = 0, monthlyPayment } = values;
    setError(null);
    setResult(null);

    const numberOfPayments = loanTermYears * 12 + loanTermMonths;
    
    if (monthlyPayment * numberOfPayments < loanAmount) {
        setError("Total payments are less than the loan amount. The interest rate would be negative, which is not supported.");
        return;
    }

    const interestRate = solveRate(loanAmount, numberOfPayments, monthlyPayment);
    const totalPayments = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayments - loanAmount;

    setResult({
      interestRate,
      totalPayments,
      totalInterest,
    });
  }

  function handleReset() {
    form.reset({
        loanAmount: undefined,
        loanTermYears: undefined,
        loanTermMonths: undefined,
        monthlyPayment: undefined,
    });
    setResult(null);
    setError(null);
  }

  const currencySymbol = '$';

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">Loan Details</CardTitle>
        <CardDescription className="text-center">Enter your loan information to solve for the interest rate.</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
            <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="loanAmount" render={({ field }) => (<FormItem><FormLabel>Loan Amount</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormItem>
              <FormLabel>Loan Term</FormLabel>
              <div className="flex gap-2">
                <FormField control={form.control} name="loanTermYears" render={({ field }) => (<FormControl><Input type="number" placeholder="Years" {...field} /></FormControl>)} />
                <FormField control={form.control} name="loanTermMonths" render={({ field }) => (<FormControl><Input type="number" placeholder="Months" {...field} /></FormControl>)} />
              </div>
              <FormMessage>{form.formState.errors.loanTermMonths?.message}</FormMessage>
            </FormItem>
            <FormField control={form.control} name="monthlyPayment" render={({ field }) => (<FormItem><FormLabel>Monthly Payment</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
            
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><Percent className="mr-2 h-4 w-4"/>Calculate Rate</Button>
              <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
              <ShareButton title="Interest Rate Calculator" text="Find out the interest rate of a loan with this calculator!" url="/interest-rate-calculator" />
            </div>
          </form>
        </Form>
        
        {result && (
          <div className="p-4 bg-muted rounded-lg text-center mt-6 space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-foreground">Your Loan Results</h3>
            <div className="p-4 border rounded-lg bg-background">
                <h4 className="font-semibold text-muted-foreground">Calculated Annual Interest Rate</h4>
                <p className="text-3xl font-bold text-primary">{result.interestRate.toFixed(3)}%</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-2 border rounded-lg bg-background">
                    <span className="text-muted-foreground block">Total Payments</span>
                    <span className="font-semibold">{currencySymbol}{result.totalPayments.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="p-2 border rounded-lg bg-background">
                    <span className="text-muted-foreground block">Total Interest</span>
                    <span className="font-semibold">{currencySymbol}{result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
