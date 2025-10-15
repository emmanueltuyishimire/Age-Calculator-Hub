
"use client";

import { useState } from 'react';
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
});

type FormData = z.infer<typeof formSchema>;

interface Result {
  payoffDate: Date;
  totalMonths: number;
  totalInterest: number;
}

const currencySymbols: { [key: string]: string } = {
    USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', JPY: '¥',
};

export default function LoanPayoffCalculator() {
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currency: 'USD',
      loanAmount: undefined,
      interestRate: undefined,
      monthlyPayment: undefined,
    },
  });

  function onSubmit(values: FormData) {
    const { loanAmount, interestRate, monthlyPayment } = values;
    setError(null);
    setResult(null);

    const monthlyRate = interestRate / 100 / 12;

    if (monthlyPayment <= loanAmount * monthlyRate) {
      setError("Your monthly payment is too low to cover the interest. The loan will never be paid off. Please increase your payment.");
      return;
    }

    // Loan payoff formula: n = -log(1 - (r * P) / M) / log(1 + r)
    const numberOfMonths = -(Math.log(1 - (monthlyRate * loanAmount) / monthlyPayment) / Math.log(1 + monthlyRate));
    const totalMonths = Math.ceil(numberOfMonths);
    const payoffDate = addMonths(new Date(), totalMonths);
    const totalPaid = monthlyPayment * totalMonths;
    const totalInterest = totalPaid - loanAmount;

    setResult({
      totalMonths,
      payoffDate,
      totalInterest,
    });
  }

  function handleReset() {
    form.reset({
      currency: 'USD',
      loanAmount: undefined,
      interestRate: undefined,
      monthlyPayment: undefined,
    });
    setResult(null);
    setError(null);
  }

  const selectedCurrency = form.watch('currency');
  const currencySymbol = currencySymbols[selectedCurrency] || '$';

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">Loan Payoff Details</CardTitle>
        <CardDescription className="text-center">Enter your loan information to see your debt-free date.</CardDescription>
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
            <div className="grid grid-cols-1 gap-4">
              <FormField control={form.control} name="currency" render={({ field }) => (
                <FormItem><FormLabel>Currency</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                  <SelectContent>{Object.entries(currencySymbols).map(([code, symbol]) => (<SelectItem key={code} value={code}>{code} ({symbol})</SelectItem>))}</SelectContent>
                </Select></FormItem>
              )}/>
              <FormField control={form.control} name="loanAmount" render={({ field }) => (<FormItem><FormLabel>Loan Amount</FormLabel><FormControl><Input type="number" placeholder="e.g., 250000" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Annual Interest Rate (%)</FormLabel><FormControl><Input type="number" placeholder="e.g., 6.5" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="monthlyPayment" render={({ field }) => (<FormItem><FormLabel>Monthly Payment</FormLabel><FormControl><Input type="number" placeholder="e.g., 1500" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><Landmark className="mr-2 h-4 w-4"/>Calculate Payoff</Button>
              <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
              <ShareButton title="Loan Payoff Calculator" text="Find out when you can be debt-free with this calculator!" url="/loan-payoff-calculator" />
            </div>
          </form>
        </Form>
        
        {result && (
          <div className="p-4 bg-muted rounded-lg text-center mt-6 space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-foreground">Your Loan Payoff Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg bg-background">
                    <h4 className="font-semibold text-muted-foreground">Payoff Date</h4>
                    <p className="text-2xl font-bold text-primary">{format(result.payoffDate, 'MMMM yyyy')}</p>
                    <p className="text-xs text-muted-foreground">in {Math.floor(result.totalMonths / 12)} years, {result.totalMonths % 12} months</p>
                </div>
                <div className="p-4 border rounded-lg bg-background">
                    <h4 className="font-semibold text-muted-foreground">Total Interest Paid</h4>
                    <p className="text-2xl font-bold text-primary">{currencySymbol}{result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                    <p className="text-xs text-muted-foreground">This is the total cost of borrowing.</p>
                </div>
            </div>
            <p className="text-xs text-muted-foreground pt-2">This is an estimate for a fixed-rate loan. Your actual payoff may vary.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
