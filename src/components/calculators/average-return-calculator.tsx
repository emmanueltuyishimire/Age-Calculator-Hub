
"use client";

import React, { useState, useCallback } from 'react';
import { z } from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { RefreshCcw, DollarSign, PlusCircle, Trash2, AlertCircle, Percent, TrendingUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';
import { format, differenceInDays } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const currencySymbol = '$';

// --- IRR (Cash Flow) Calculator ---
const cashFlowItemSchema = z.object({
  activity: z.enum(['deposit', 'withdraw']),
  amount: z.coerce.number().min(0.01, "Amount is required."),
  date: z.date({ required_error: "Date is required." }),
});

const cashFlowSchema = z.object({
  startBalance: z.coerce.number().min(0),
  startDate: z.date({ required_error: "Start date is required." }),
  endBalance: z.coerce.number().min(0),
  endDate: z.date({ required_error: "End date is required." }),
  cashFlows: z.array(cashFlowItemSchema),
}).refine(data => data.endDate > data.startDate, {
  message: "End date must be after start date.",
  path: ["endDate"],
});

type CashFlowFormData = z.infer<typeof cashFlowSchema>;

function irr(values: { amount: number, days: number }[], guess: number = 0.1): number {
    const maxIteration = 100;
    const precision = 1e-7;

    for (let i = 0; i < maxIteration; i++) {
        let npv = 0;
        let dnpv = 0;
        for (const value of values) {
            npv += value.amount / Math.pow(1 + guess, value.days / 365.25);
            dnpv -= (value.days / 365.25) * value.amount / Math.pow(1 + guess, (value.days / 365.25) + 1);
        }
        const newGuess = guess - npv / dnpv;
        if (Math.abs(newGuess - guess) < precision) {
            return newGuess;
        }
        guess = newGuess;
    }
    return guess;
}

function CashFlowCalculator() {
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CashFlowFormData>({
    resolver: zodResolver(cashFlowSchema),
    defaultValues: {
      startDate: new Date('2022-01-01'),
      startBalance: 5600,
      endDate: new Date('2025-10-16'),
      endBalance: 18000,
      cashFlows: [
        { activity: 'deposit', amount: 5000, date: new Date('2023-01-15') },
        { activity: 'withdraw', amount: 1500, date: new Date('2023-06-01') },
        { activity: 'deposit', amount: 3800, date: new Date('2024-01-18') },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "cashFlows",
  });

  const onSubmit = (values: CashFlowFormData) => {
    setError(null);
    setResult(null);

    const cashFlows: { amount: number, days: number }[] = [];
    cashFlows.push({ amount: -values.startBalance, days: 0 });

    for (const flow of values.cashFlows) {
        const days = differenceInDays(flow.date, values.startDate);
        if (days < 0) {
            setError('Cash flow dates must be after the start date.');
            return;
        }
        cashFlows.push({ amount: flow.activity === 'deposit' ? -flow.amount : flow.amount, days });
    }
    
    const totalDays = differenceInDays(values.endDate, values.startDate);
    cashFlows.push({ amount: values.endBalance, days: totalDays });
    
    try {
        const annualRate = irr(cashFlows);
        setResult(annualRate * 100);
    } catch(e) {
        setError("Could not calculate IRR. Check for invalid cash flows.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Return Based on Cash Flow (IRR)</CardTitle>
        <CardDescription>Estimates the money-weighted average annual return based on deposits and withdrawals.</CardDescription>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="startBalance" render={({ field }) => <FormItem><FormLabel>Starting Balance</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
              <FormField control={form.control} name="startDate" render={({ field }) => <FormItem><FormLabel>Start Date</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant="outline" className={cn("w-full text-left font-normal", !field.value && "text-muted-foreground")}><TrendingUp className="mr-2 h-4 w-4" />{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}</Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover></FormItem>} />
              <FormField control={form.control} name="endBalance" render={({ field }) => <FormItem><FormLabel>Ending Balance</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
              <FormField control={form.control} name="endDate" render={({ field }) => <FormItem><FormLabel>End Date</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant="outline" className={cn("w-full text-left font-normal", !field.value && "text-muted-foreground")}><TrendingUp className="mr-2 h-4 w-4" />{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}</Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover></FormItem>} />
            </div>

            <Separator />
            <h4 className="font-semibold">Cash Flows</h4>
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end p-2 border rounded-lg">
                <FormField control={form.control} name={`cashFlows.${index}.activity`} render={({ field }) => <FormItem><FormLabel>Activity</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="deposit">Deposit</SelectItem><SelectItem value="withdraw">Withdraw</SelectItem></SelectContent></Select></FormItem>} />
                <FormField control={form.control} name={`cashFlows.${index}.amount`} render={({ field }) => <FormItem><FormLabel>Amount</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>} />
                <FormField control={form.control} name={`cashFlows.${index}.date`} render={({ field }) => <FormItem><FormLabel>Date</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant="outline" className={cn("w-full text-left font-normal", !field.value && "text-muted-foreground")}><TrendingUp className="mr-2 h-4 w-4" />{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}</Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} /></PopoverContent></Popover></FormItem>} />
                <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} aria-label="Remove cash flow"><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => append({ activity: 'deposit', amount: 0, date: new Date() })}><PlusCircle className="mr-2 h-4 w-4" />Add Cash Flow</Button>
            
            <Button type="submit" className="w-full mt-4">Calculate</Button>
          </form>
        </Form>
        {result !== null && (
          <div className="mt-4 p-4 bg-muted rounded-lg text-center">
            <h3 className="font-semibold text-muted-foreground">Average Annual Return (IRR)</h3>
            <p className="text-2xl text-primary font-bold">{result.toFixed(2)}%</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// --- Cumulative Return Calculator ---
const investmentSchema = z.object({
  return: z.coerce.number(),
  years: z.coerce.number().min(0),
  months: z.coerce.number().min(0).max(11),
});
const cumulativeSchema = z.object({
  investments: z.array(investmentSchema).min(1),
});
type CumulativeFormData = z.infer<typeof cumulativeSchema>;

interface CumulativeResult {
  cumulativeReturn: number;
  geometricAverage: number;
}

function CumulativeReturnCalculator() {
  const [result, setResult] = useState<CumulativeResult | null>(null);
  
  const form = useForm<CumulativeFormData>({
    resolver: zodResolver(cumulativeSchema),
    defaultValues: {
      investments: [
        { return: 10, years: 1, months: 2 },
        { return: -2, years: 0, months: 5 },
        { return: 15, years: 2, months: 3 },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "investments",
  });

  const onSubmit = (values: CumulativeFormData) => {
    let cumulativeProduct = 1;
    let totalYears = 0;

    values.investments.forEach(inv => {
        const termInYears = inv.years + inv.months / 12;
        if(termInYears > 0) {
            cumulativeProduct *= Math.pow(1 + inv.return / 100, termInYears);
            totalYears += termInYears;
        }
    });

    const cumulativeReturn = (cumulativeProduct - 1) * 100;
    const geometricAverage = totalYears > 0 ? (Math.pow(cumulativeProduct, 1 / totalYears) - 1) * 100 : 0;
    
    setResult({ cumulativeReturn, geometricAverage });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Average and Cumulative Return</CardTitle>
        <CardDescription>Calculates returns for multiple investments with different holding periods.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end p-2 border rounded-lg">
                  <FormField control={form.control} name={`investments.${index}.return`} render={({ field }) => <FormItem><FormLabel>Return (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                  <FormField control={form.control} name={`investments.${index}.years`} render={({ field }) => <FormItem><FormLabel>Years</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                  <FormField control={form.control} name={`investments.${index}.months`} render={({ field }) => <FormItem><FormLabel>Months</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                  <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} aria-label="Remove investment"><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => append({ return: 0, years: 1, months: 0 })}><PlusCircle className="mr-2 h-4 w-4" />Add Investment</Button>
            </div>
            <Button type="submit" className="w-full mt-4">Calculate</Button>
          </form>
        </Form>
        {result && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-muted-foreground">Cumulative Return</h3>
                <p className="text-2xl text-primary font-bold">{result.cumulativeReturn.toFixed(2)}%</p>
            </div>
             <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-muted-foreground">Average Annual Return</h3>
                <p className="text-2xl text-primary font-bold">{result.geometricAverage.toFixed(2)}%</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Main component with tabs
export default function AverageReturnCalculator() {
  return (
    <div className="space-y-8">
      <CashFlowCalculator />
      <Separator />
      <CumulativeReturnCalculator />
    </div>
  );
}
