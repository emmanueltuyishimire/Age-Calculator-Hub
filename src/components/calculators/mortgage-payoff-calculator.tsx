
"use client";

import React, { useState } from 'react';
import { z } from 'zod';
import { useForm, type UseFormReturn } from 'react-hook-form';
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
import { RefreshCcw, Home, Scale } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Bar, BarChart, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts';


const currencySymbol = '$';

// --- Shared Types & Helpers ---
interface Result {
  originalTermMonths: number;
  newTermMonths: number;
  originalTotalInterest: number;
  newTotalInterest: number;
  interestSavings: number;
  originalTotalPayments: number;
  newTotalPayments: number;
  remainingBalance?: number;
  chartData: any[];
}

const calculatePayoff = (balance: number, rate: number, payment: number, extraMonthly: number, extraYearly: number, oneTime: number) => {
    let termMonths = 0;
    let totalInterest = 0;
    let currentBalance = balance - oneTime;

    while (currentBalance > 0 && termMonths < 480) { // Max 40 years to prevent infinite loops
        termMonths++;
        const interestForMonth = currentBalance * rate;
        totalInterest += interestForMonth;
        currentBalance += interestForMonth;

        let paymentForMonth = payment + extraMonthly;
        if (termMonths % 12 === 0) {
            paymentForMonth += extraYearly;
        }

        currentBalance -= paymentForMonth;
    }
    return { termMonths, totalInterest };
};


// --- Tab 1: Known Term Calculator ---
const knownTermSchema = z.object({
  originalLoanAmount: z.coerce.number().min(1),
  originalLoanTerm: z.coerce.number().min(1).max(40),
  interestRate: z.coerce.number().min(0).max(30),
  remainingTermYears: z.coerce.number().min(0).max(40),
  remainingTermMonths: z.coerce.number().min(0).max(11).optional(),
  extraMonthly: z.coerce.number().min(0).optional(),
  extraYearly: z.coerce.number().min(0).optional(),
  oneTime: z.coerce.number().min(0).optional(),
});
type KnownTermFormData = z.infer<typeof knownTermSchema>;

function KnownTermPayoffCalculator() {
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<KnownTermFormData>({
    resolver: zodResolver(knownTermSchema),
    defaultValues: {
      originalLoanAmount: 400000,
      originalLoanTerm: 30,
      interestRate: 6,
      remainingTermYears: 25,
      remainingTermMonths: 0,
      extraMonthly: 500,
    },
  });

  function onSubmit(values: KnownTermFormData) {
    setError(null);
    const { originalLoanAmount, originalLoanTerm, interestRate, remainingTermYears, remainingTermMonths = 0, extraMonthly = 0, extraYearly = 0, oneTime = 0 } = values;
    
    const r = interestRate / 100 / 12;
    const n_orig = originalLoanTerm * 12;
    
    const originalPayment = originalLoanAmount * (r * Math.pow(1 + r, n_orig)) / (Math.pow(1 + r, n_orig) - 1);
    
    const paymentsMade = n_orig - (remainingTermYears * 12 + remainingTermMonths);
    if(paymentsMade < 0) {
        setError("Remaining term cannot be longer than original term.");
        return;
    }
    
    const remainingBalance = originalLoanAmount * (Math.pow(1 + r, n_orig) - Math.pow(1 + r, paymentsMade)) / (Math.pow(1 + r, n_orig) - 1);

    const originalPlan = calculatePayoff(remainingBalance, r, originalPayment, 0, 0, 0);
    const newPlan = calculatePayoff(remainingBalance, r, originalPayment, extraMonthly, extraYearly, oneTime);

    if (originalPayment + extraMonthly <= remainingBalance * r) {
        setError("Monthly payment is too low to cover interest. Loan will never be paid off.");
        return;
    }

    const chartData = [
      { name: 'Original', Balance: originalLoanAmount, Interest: originalPlan.totalInterest },
      { name: 'With Payoff', Balance: originalLoanAmount, Interest: newPlan.totalInterest },
    ];

    setResult({
      originalTermMonths: originalPlan.termMonths,
      newTermMonths: newPlan.termMonths,
      originalTotalInterest: originalPlan.totalInterest,
      newTotalInterest: newPlan.totalInterest,
      interestSavings: originalPlan.totalInterest - newPlan.totalInterest,
      originalTotalPayments: remainingBalance + originalPlan.totalInterest,
      newTotalPayments: remainingBalance + newPlan.totalInterest,
      remainingBalance,
      chartData,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>If you know the remaining loan term</CardTitle>
        <CardDescription>Good for new loans or loans with no extra payments made yet.</CardDescription>
      </CardHeader>
      <CardContent>
        {error && <Alert variant="destructive" className="mb-4"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
        <Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField control={form.control} name="originalLoanAmount" render={({ field }) => (<FormItem><FormLabel>Original loan amount</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
              <FormField control={form.control} name="originalLoanTerm" render={({ field }) => (<FormItem><FormLabel>Original loan term</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
              <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Interest rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl></FormItem>)} />
            </div>
            <FormItem><FormLabel>Remaining term</FormLabel><div className="flex gap-2">
                <FormField control={form.control} name="remainingTermYears" render={({ field }) => <FormControl><Input type="number" placeholder="Years" {...field} /></FormControl>} />
                <FormField control={form.control} name="remainingTermMonths" render={({ field }) => <FormControl><Input type="number" placeholder="Months" {...field} /></FormControl>} />
            </div></FormItem>
            <PayoffOptionsFields form={form} />
            <div className="flex gap-2"><Button type="submit" className="w-full">Calculate</Button><Button onClick={() => form.reset()} type="button" variant="outline" className="w-full sm:w-auto"><RefreshCcw className="h-4 w-4"/></Button></div>
        </form></Form>
        {result && <ResultDisplay result={result} formValues={form.getValues()} />}
      </CardContent>
    </Card>
  );
}


// --- Tab 2: Unknown Term Calculator ---
const unknownTermSchema = z.object({
  unpaidBalance: z.coerce.number().min(1),
  monthlyPayment: z.coerce.number().min(1),
  interestRate: z.coerce.number().min(0).max(30),
  extraMonthly: z.coerce.number().min(0).optional(),
  extraYearly: z.coerce.number().min(0).optional(),
  oneTime: z.coerce.number().min(0).optional(),
});
type UnknownTermFormData = z.infer<typeof unknownTermSchema>;

function UnknownTermPayoffCalculator() {
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<UnknownTermFormData>({
    resolver: zodResolver(unknownTermSchema),
    defaultValues: { unpaidBalance: 230000, monthlyPayment: 1500, interestRate: 6, extraMonthly: 500 },
  });

  function onSubmit(values: UnknownTermFormData) {
    setError(null);
    const { unpaidBalance, monthlyPayment, interestRate, extraMonthly = 0, extraYearly = 0, oneTime = 0 } = values;
    const r = interestRate / 100 / 12;

    if (monthlyPayment <= unpaidBalance * r) {
        setError("Monthly payment is too low to cover interest. Loan will never be paid off.");
        return;
    }
    
    const originalPlan = calculatePayoff(unpaidBalance, r, monthlyPayment, 0, 0, 0);
    const newPlan = calculatePayoff(unpaidBalance, r, monthlyPayment, extraMonthly, extraYearly, oneTime);
    
    const chartData = [
      { name: 'Original', Balance: unpaidBalance, Interest: originalPlan.totalInterest },
      { name: 'With Payoff', Balance: unpaidBalance, Interest: newPlan.totalInterest },
    ];

    setResult({
      originalTermMonths: originalPlan.termMonths,
      newTermMonths: newPlan.termMonths,
      originalTotalInterest: originalPlan.totalInterest,
      newTotalInterest: newPlan.totalInterest,
      interestSavings: originalPlan.totalInterest - newPlan.totalInterest,
      originalTotalPayments: unpaidBalance + originalPlan.totalInterest,
      newTotalPayments: unpaidBalance + newPlan.totalInterest,
      chartData
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>If you don't know the remaining loan term</CardTitle>
        <CardDescription>Use your current balance and payment from your mortgage statement.</CardDescription>
      </CardHeader>
      <CardContent>
        {error && <Alert variant="destructive" className="mb-4"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
        <Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField control={form.control} name="unpaidBalance" render={({ field }) => (<FormItem><FormLabel>Unpaid principal balance</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
              <FormField control={form.control} name="monthlyPayment" render={({ field }) => (<FormItem><FormLabel>Monthly payment</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
              <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Interest rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl></FormItem>)} />
            </div>
            <PayoffOptionsFields form={form} />
            <div className="flex gap-2"><Button type="submit" className="w-full">Calculate</Button><Button onClick={() => form.reset()} type="button" variant="outline" className="w-full sm:w-auto"><RefreshCcw className="h-4 w-4"/></Button></div>
        </form></Form>
        {result && <ResultDisplay result={result} formValues={form.getValues()} />}
      </CardContent>
    </Card>
  );
}

// --- Shared Sub-Components ---
const PayoffOptionsFields = ({ form }: { form: UseFormReturn<any> }) => (
  <>
    <h4 className="font-semibold pt-2">Repayment options:</h4>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FormField control={form.control} name="extraMonthly" render={({ field }) => (<FormItem><FormLabel>Extra per month</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
      <FormField control={form.control} name="extraYearly" render={({ field }) => (<FormItem><FormLabel>Extra per year</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
      <FormField control={form.control} name="oneTime" render={({ field }) => (<FormItem><FormLabel>One time</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
    </div>
  </>
);

const ResultDisplay = ({ result, formValues }: { result: Result, formValues: any }) => {
    const timeSavingsMonths = result.originalTermMonths - result.newTermMonths;
    const timeSavingsYears = Math.floor(timeSavingsMonths / 12);
    const timeSavingsMonthsPart = timeSavingsMonths % 12;

    return (
    <div className="p-4 bg-muted rounded-lg mt-6 space-y-4 animate-fade-in">
        <div className="text-center">
            <h3 className="text-xl font-bold text-foreground">Payoff in {Math.floor(result.newTermMonths / 12)} years and {result.newTermMonths % 12} months</h3>
            {result.interestSavings > 0 && <p>You will save <strong className="text-primary">{currencySymbol}{result.interestSavings.toLocaleString(undefined, {maximumFractionDigits:0})}</strong> in interest.</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 border rounded-lg bg-background text-center">
                <h4 className="font-semibold text-muted-foreground">Interest Savings</h4>
                <p className="text-2xl font-bold text-primary">{currencySymbol}{result.interestSavings.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
                <p className="text-xs text-green-600">Pay {(result.interestSavings / result.originalTotalInterest * 100).toFixed(0)}% less on interest</p>
            </div>
             <div className="p-3 border rounded-lg bg-background text-center">
                <h4 className="font-semibold text-muted-foreground">Time Savings</h4>
                <p className="text-2xl font-bold text-primary">{timeSavingsYears} years, {timeSavingsMonthsPart} months</p>
                <p className="text-xs text-green-600">Payoff {(timeSavingsMonths / result.originalTermMonths * 100).toFixed(0)}% faster</p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-2 border rounded-lg text-left bg-background"><h4 className="font-bold text-center">Original</h4>
                <p className="flex justify-between"><strong>Monthly pay:</strong> <span>{currencySymbol}{(formValues.monthlyPayment || result.originalTotalPayments / result.originalTermMonths).toFixed(2)}</span></p>
                <p className="flex justify-between"><strong>Total interest:</strong> <span>{currencySymbol}{result.originalTotalInterest.toLocaleString(undefined, {maximumFractionDigits:0})}</span></p>
                <p className="flex justify-between"><strong>Payoff in:</strong> <span>{Math.floor(result.originalTermMonths / 12)}y {result.originalTermMonths % 12}m</span></p>
            </div>
            <div className="p-2 border rounded-lg text-left bg-background"><h4 className="font-bold text-center">With payoff</h4>
                 <p className="flex justify-between"><strong>Monthly pay:</strong> <span>{currencySymbol}{(result.newTotalPayments / result.newTermMonths).toFixed(2)}</span></p>
                <p className="flex justify-between"><strong>Total interest:</strong> <span>{currencySymbol}{result.newTotalInterest.toLocaleString(undefined, {maximumFractionDigits:0})}</span></p>
                <p className="flex justify-between"><strong>Payoff in:</strong> <span>{Math.floor(result.newTermMonths / 12)}y {result.newTermMonths % 12}m</span></p>
            </div>
        </div>
        <div className="h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(val) => `${currencySymbol}${val/1000}k`} />
                    <Tooltip formatter={(value: number) => `${currencySymbol}${value.toLocaleString(undefined, {maximumFractionDigits: 0})}`} />
                    <Legend />
                    <Bar dataKey="Interest" stackId="a" fill="hsl(var(--chart-2))" name="Interest" />
                    <Bar dataKey="Balance" stackId="a" fill="hsl(var(--chart-1))" name="Principal" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
    )
};


// --- Main Exported Component ---
export default function MortgagePayoffCalculator() {
  const [activeTab, setActiveTab] = useState("known");
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="known">Known Term</TabsTrigger>
        <TabsTrigger value="unknown">Unknown Term</TabsTrigger>
      </TabsList>
      <TabsContent value="known">
        <KnownTermPayoffCalculator />
      </TabsContent>
      <TabsContent value="unknown">
        <UnknownTermPayoffCalculator />
      </TabsContent>
    </Tabs>
  );
}

