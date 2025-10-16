
"use client";

import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, addMonths } from 'date-fns';
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
import { RefreshCcw, Landmark, AlertCircle } from 'lucide-react';
import ShareButton from '../share-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const formSchema = z.object({
  currency: z.string().default('USD'),
  loanAmount: z.coerce.number().min(1, "Loan amount must be greater than zero."),
  interestRate: z.coerce.number().min(0, "Rate cannot be negative.").max(100),
  monthlyPayment: z.coerce.number().min(1, "Payment must be greater than zero."),
  extraPayment: z.coerce.number().min(0, "Cannot be negative.").optional(),
});

type FormData = z.infer<typeof formSchema>;

interface PayoffResult {
  payoffDate: Date;
  totalMonths: number;
  totalInterest: number;
}

interface ComparisonResult {
    original: PayoffResult;
    accelerated: PayoffResult;
    interestSavings: number;
    timeSavingsMonths: number;
}

const currencySymbols: { [key: string]: string } = {
    USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', JPY: '¥',
};

export default function LoanPayoffCalculator() {
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currency: 'USD',
      loanAmount: 250000,
      interestRate: 6.5,
      monthlyPayment: 1500,
      extraPayment: 200,
    },
  });

  const calculatePayoff = (balance: number, rate: number, payment: number): PayoffResult | string => {
    if (rate > 0 && payment <= balance * rate) {
      return "Monthly payment is too low to cover interest. The loan will never be paid off.";
    }

    let numberOfMonths;
    if (rate > 0) {
      numberOfMonths = -(Math.log(1 - (rate * balance) / payment) / Math.log(1 + rate));
    } else {
      numberOfMonths = balance / payment;
    }
    
    const totalMonths = Math.ceil(numberOfMonths);
    const payoffDate = addMonths(new Date(), totalMonths);
    const totalPaid = payment * totalMonths;
    const totalInterest = totalPaid - balance;

    return {
      totalMonths,
      payoffDate,
      totalInterest,
    };
  };


  function onSubmit(values: FormData) {
    const { loanAmount, interestRate, monthlyPayment, extraPayment = 0 } = values;
    setError(null);
    setResult(null);

    const monthlyRate = interestRate / 100 / 12;

    const originalResult = calculatePayoff(loanAmount, monthlyRate, monthlyPayment);
    if (typeof originalResult === 'string') {
        setError(originalResult);
        return;
    }
    
    const acceleratedResult = calculatePayoff(loanAmount, monthlyRate, monthlyPayment + extraPayment);
     if (typeof acceleratedResult === 'string') {
        setError(acceleratedResult.replace("Monthly payment", "Monthly payment with extra payment"));
        return;
    }

    setResult({
        original: originalResult,
        accelerated: acceleratedResult,
        interestSavings: originalResult.totalInterest - acceleratedResult.totalInterest,
        timeSavingsMonths: originalResult.totalMonths - acceleratedResult.totalMonths,
    });
  }

  function handleReset() {
    form.reset({
      currency: 'USD',
      loanAmount: undefined,
      interestRate: undefined,
      monthlyPayment: undefined,
      extraPayment: 0,
    });
    setResult(null);
    setError(null);
  }

  const selectedCurrency = form.watch('currency');
  const currencySymbol = currencySymbols[selectedCurrency] || '$';

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">Loan Details</CardTitle>
        <CardDescription className="text-center">Enter your loan and see how extra payments can help.</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
            <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Calculation Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="currency" render={({ field }) => (
              <FormItem><FormLabel>Currency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                <SelectContent>{Object.entries(currencySymbols).map(([code, symbol]) => (<SelectItem key={code} value={code}>{code} ({symbol})</SelectItem>))}</SelectContent>
              </Select></FormItem>
            )}/>
            <FormField control={form.control} name="loanAmount" render={({ field }) => (<FormItem><FormLabel>Loan Amount</FormLabel><FormControl><Input type="number" placeholder="e.g., 250000" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Annual Interest Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" placeholder="e.g., 6.5" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="monthlyPayment" render={({ field }) => (<FormItem><FormLabel>Current Monthly Payment</FormLabel><FormControl><Input type="number" placeholder="e.g., 1500" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="extraPayment" render={({ field }) => (<FormItem><FormLabel>Extra Monthly Payment</FormLabel><FormControl><Input type="number" placeholder="e.g., 200" {...field} /></FormControl><FormMessage /></FormItem>)} />
            
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><Landmark className="mr-2 h-4 w-4"/>Calculate Payoff</Button>
              <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
              <ShareButton title="Loan Payoff Calculator" text="Find out when you can be debt-free with this calculator!" url="/loan-payoff-calculator" />
            </div>
          </form>
        </Form>
        
        {result && (
          <div className="p-4 bg-muted rounded-lg text-center mt-6 space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-foreground">Your Payoff Comparison</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg bg-background">
                    <h4 className="font-semibold text-muted-foreground">Interest Savings</h4>
                    <p className="text-2xl font-bold text-primary">{currencySymbol}{result.interestSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="p-4 border rounded-lg bg-background">
                    <h4 className="font-semibold text-muted-foreground">You'll Be Debt-Free</h4>
                    <p className="text-2xl font-bold text-primary">{Math.floor(result.timeSavingsMonths/12)} yrs, {result.timeSavingsMonths % 12} mos earlier</p>
                </div>
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-sm">
                <div className="p-3 border rounded-lg bg-background space-y-1">
                    <h4 className="font-bold text-center">Original Plan</h4>
                    <p className="flex justify-between"><strong>Payoff Date:</strong> <span>{format(result.original.payoffDate, 'MMM yyyy')}</span></p>
                    <p className="flex justify-between"><strong>Total Interest:</strong> <span>{currencySymbol}{result.original.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></p>
                </div>
                <div className="p-3 border rounded-lg bg-background space-y-1">
                     <h4 className="font-bold text-center">Accelerated Plan</h4>
                    <p className="flex justify-between"><strong>Payoff Date:</strong> <span>{format(result.accelerated.payoffDate, 'MMM yyyy')}</span></p>
                    <p className="flex justify-between"><strong>Total Interest:</strong> <span>{currencySymbol}{result.accelerated.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></p>
                </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
