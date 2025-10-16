
"use client";

import { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const currencySymbol = '$';

// --- Amortized Loan ---
const amortizedSchema = z.object({
  loanAmount: z.coerce.number().min(1),
  loanTermYears: z.coerce.number().min(0),
  loanTermMonths: z.coerce.number().min(0),
  interestRate: z.coerce.number().min(0),
  compounding: z.enum(['monthly', 'annually', 'semiannually', 'quarterly']),
  payBack: z.enum(['monthly', 'weekly', 'bi-weekly']),
}).refine(data => (data.loanTermYears || 0) + (data.loanTermMonths || 0) > 0, { message: "Loan term must be positive." });

function AmortizedLoanCalculator() {
  const form = useForm<z.infer<typeof amortizedSchema>>({
    resolver: zodResolver(amortizedSchema),
    defaultValues: { loanAmount: 100000, loanTermYears: 10, loanTermMonths: 0, interestRate: 6, compounding: 'monthly', payBack: 'monthly' },
  });
  const [result, setResult] = useState<{ payment: number; total: number; totalInterest: number; schedule: any[] } | null>(null);

  const getPeriods = (freq: string, years: number, months: number) => {
    const totalMonths = years * 12 + months;
    if (freq === 'weekly') return Math.floor(totalMonths * 4.333);
    if (freq === 'bi-weekly') return Math.floor(totalMonths * 2.167);
    return totalMonths;
  };

  function onSubmit(values: z.infer<typeof amortizedSchema>) {
    const { loanAmount, loanTermYears, loanTermMonths, interestRate, compounding, payBack } = values;
    const annualRate = interestRate / 100;
    const compoundPeriods = { monthly: 12, annually: 1, semiannually: 2, quarterly: 4 }[compounding];
    
    // Effective annual rate for different compounding
    const effectiveRate = Math.pow(1 + annualRate / compoundPeriods, compoundPeriods) - 1;
    
    const payBackPeriodsPerYear = { monthly: 12, weekly: 52, 'bi-weekly': 26 }[payBack];
    const periodicRate = Math.pow(1 + effectiveRate, 1 / payBackPeriodsPerYear) - 1;

    const totalTermMonths = loanTermYears * 12 + loanTermMonths;
    const totalPayments = {
        monthly: totalTermMonths,
        weekly: totalTermMonths * 4.333,
        'bi-weekly': totalTermMonths * 2.167
    }[payBack];
    
    const payment = loanAmount * (periodicRate / (1 - Math.pow(1 + periodicRate, -totalPayments)));
    const totalPaid = payment * totalPayments;
    const totalInterest = totalPaid - loanAmount;

    setResult({ payment, total: totalPaid, totalInterest, schedule: [] });
  }

  const pieData = result ? [
    { name: 'Principal', value: form.getValues('loanAmount'), fill: 'hsl(var(--chart-1))' },
    { name: 'Interest', value: result.totalInterest, fill: 'hsl(var(--chart-2))' },
  ] : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Amortized Loan: Paying Back a Fixed Amount Periodically</CardTitle>
        <CardDescription>Use this calculator for common loan types like mortgages, auto loans, or personal loans.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="loanAmount" render={({ field }) => <FormItem><FormLabel>Loan Amount</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
              <FormItem>
                <FormLabel>Loan Term</FormLabel>
                <div className="flex gap-2">
                  <FormField control={form.control} name="loanTermYears" render={({ field }) => <FormControl><Input type="number" placeholder="Years" {...field} /></FormControl>} />
                  <FormField control={form.control} name="loanTermMonths" render={({ field }) => <FormControl><Input type="number" placeholder="Months" {...field} /></FormControl>} />
                </div>
              </FormItem>
              <FormField control={form.control} name="interestRate" render={({ field }) => <FormItem><FormLabel>Interest Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl></FormItem>} />
              <FormField control={form.control} name="compounding" render={({ field }) => <FormItem><FormLabel>Compound</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="monthly">Monthly (APR)</SelectItem><SelectItem value="annually">Annually (APY)</SelectItem></SelectContent></Select></FormItem>} />
              <FormField control={form.control} name="payBack" render={({ field }) => <FormItem className="md:col-span-2"><FormLabel>Pay Back</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="monthly">Every Month</SelectItem><SelectItem value="weekly">Every Week</SelectItem><SelectItem value="bi-weekly">Every 2 Weeks</SelectItem></SelectContent></Select></FormItem>} />
            </div>
            <Button type="submit" className="w-full">Calculate</Button>
          </form>
        </Form>
        {result && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-bold text-center mb-2">Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
              <div className="space-y-2 text-sm">
                <p className="flex justify-between"><strong>Payment Every {form.getValues('payBack').replace('-', ' ')}:</strong> <span className="font-bold text-primary">{currencySymbol}{result.payment.toFixed(2)}</span></p>
                <p className="flex justify-between"><strong>Total Payments:</strong> <span>{currencySymbol}{result.total.toFixed(2)}</span></p>
                <p className="flex justify-between"><strong>Total Interest:</strong> <span>{currencySymbol}{result.totalInterest.toFixed(2)}</span></p>
              </div>
              <div className="h-[150px]"><ChartContainer config={{}} className="mx-auto aspect-square h-full"><PieChart><Tooltip content={<ChartTooltipContent hideLabel />} /><Pie data={pieData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={60}><Cell fill="hsl(var(--chart-1))" /><Cell fill="hsl(var(--chart-2))" /></Pie></PieChart></ChartContainer></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// --- Deferred Payment Loan ---
const deferredSchema = z.object({
  loanAmount: z.coerce.number().min(1),
  loanTermYears: z.coerce.number().min(0),
  loanTermMonths: z.coerce.number().min(0),
  interestRate: z.coerce.number().min(0),
  compounding: z.enum(['annually', 'semiannually', 'quarterly', 'monthly']),
}).refine(data => (data.loanTermYears || 0) + (data.loanTermMonths || 0) > 0, { message: "Loan term must be positive." });

function DeferredPaymentCalculator() {
  const form = useForm<z.infer<typeof deferredSchema>>({
    resolver: zodResolver(deferredSchema),
    defaultValues: { loanAmount: 100000, loanTermYears: 10, loanTermMonths: 0, interestRate: 6, compounding: 'annually' },
  });
  const [result, setResult] = useState<{ amountDue: number; totalInterest: number } | null>(null);
  
  function onSubmit(values: z.infer<typeof deferredSchema>) {
    const { loanAmount, loanTermYears, loanTermMonths, interestRate, compounding } = values;
    const totalTermYears = loanTermYears + loanTermMonths / 12;
    const n = { annually: 1, semiannually: 2, quarterly: 4, monthly: 12 }[compounding];
    const amountDue = loanAmount * Math.pow(1 + (interestRate / 100) / n, n * totalTermYears);
    const totalInterest = amountDue - loanAmount;
    setResult({ amountDue, totalInterest });
  }

  const pieData = result ? [
    { name: 'Principal', value: form.getValues('loanAmount'), fill: 'hsl(var(--chart-1))' },
    { name: 'Interest', value: result.totalInterest, fill: 'hsl(var(--chart-2))' },
  ] : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deferred Payment Loan: Paying Back a Lump Sum Due at Maturity</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="loanAmount" render={({ field }) => <FormItem><FormLabel>Loan Amount</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
              <FormItem>
                <FormLabel>Loan Term</FormLabel>
                <div className="flex gap-2">
                  <FormField control={form.control} name="loanTermYears" render={({ field }) => <FormControl><Input type="number" placeholder="Years" {...field} /></FormControl>} />
                  <FormField control={form.control} name="loanTermMonths" render={({ field }) => <FormControl><Input type="number" placeholder="Months" {...field} /></FormControl>} />
                </div>
              </FormItem>
              <FormField control={form.control} name="interestRate" render={({ field }) => <FormItem><FormLabel>Interest Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl></FormItem>} />
              <FormField control={form.control} name="compounding" render={({ field }) => <FormItem><FormLabel>Compound</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="annually">Annually (APY)</SelectItem><SelectItem value="semiannually">Semiannually</SelectItem><SelectItem value="quarterly">Quarterly</SelectItem><SelectItem value="monthly">Monthly</SelectItem></SelectContent></Select></FormItem>} />
            </div>
            <Button type="submit" className="w-full">Calculate</Button>
          </form>
        </Form>
        {result && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-bold text-center mb-2">Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                <div className="space-y-2 text-sm">
                    <p className="flex justify-between"><strong>Amount Due at Loan Maturity:</strong> <span className="font-bold text-primary">{currencySymbol}{result.amountDue.toFixed(2)}</span></p>
                    <p className="flex justify-between"><strong>Total Interest:</strong> <span>{currencySymbol}{result.totalInterest.toFixed(2)}</span></p>
                </div>
                 <div className="h-[150px]"><ChartContainer config={{}} className="mx-auto aspect-square h-full"><PieChart><Tooltip content={<ChartTooltipContent hideLabel />} /><Pie data={pieData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={60}><Cell fill="hsl(var(--chart-1))" /><Cell fill="hsl(var(--chart-2))" /></Pie></PieChart></ChartContainer></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// --- Bond Calculator ---
const bondSchema = z.object({
  dueAmount: z.coerce.number().min(1),
  loanTermYears: z.coerce.number().min(0),
  loanTermMonths: z.coerce.number().min(0),
  interestRate: z.coerce.number().min(0),
  compounding: z.enum(['annually', 'semiannually', 'quarterly', 'monthly']),
}).refine(data => (data.loanTermYears || 0) + (data.loanTermMonths || 0) > 0, { message: "Loan term must be positive." });

function BondCalculator() {
    const form = useForm<z.infer<typeof bondSchema>>({
        resolver: zodResolver(bondSchema),
        defaultValues: { dueAmount: 100000, loanTermYears: 10, loanTermMonths: 0, interestRate: 6, compounding: 'annually' },
    });
    const [result, setResult] = useState<{ amountReceived: number, totalInterest: number } | null>(null);

    function onSubmit(values: z.infer<typeof bondSchema>) {
        const { dueAmount, loanTermYears, loanTermMonths, interestRate, compounding } = values;
        const totalTermYears = loanTermYears + loanTermMonths / 12;
        const n = { annually: 1, semiannually: 2, quarterly: 4, monthly: 12 }[compounding];
        const amountReceived = dueAmount / Math.pow(1 + (interestRate / 100) / n, n * totalTermYears);
        const totalInterest = dueAmount - amountReceived;
        setResult({ amountReceived, totalInterest });
    }

    const pieData = result ? [
        { name: 'Principal', value: result.amountReceived, fill: 'hsl(var(--chart-1))' },
        { name: 'Interest', value: result.totalInterest, fill: 'hsl(var(--chart-2))' },
    ] : [];

    return (
        <Card>
            <CardHeader><CardTitle>Bond: Paying Back a Predetermined Amount Due at Loan Maturity</CardTitle></CardHeader>
            <CardContent>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="dueAmount" render={({ field }) => <FormItem><FormLabel>Predetermined Due Amount</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                            <FormItem>
                                <FormLabel>Loan Term</FormLabel>
                                <div className="flex gap-2">
                                <FormField control={form.control} name="loanTermYears" render={({ field }) => <FormControl><Input type="number" placeholder="Years" {...field} /></FormControl>} />
                                <FormField control={form.control} name="loanTermMonths" render={({ field }) => <FormControl><Input type="number" placeholder="Months" {...field} /></FormControl>} />
                                </div>
                            </FormItem>
                            <FormField control={form.control} name="interestRate" render={({ field }) => <FormItem><FormLabel>Interest Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl></FormItem>} />
                            <FormField control={form.control} name="compounding" render={({ field }) => <FormItem><FormLabel>Compound</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="annually">Annually (APY)</SelectItem><SelectItem value="semiannually">Semiannually</SelectItem><SelectItem value="quarterly">Quarterly</SelectItem><SelectItem value="monthly">Monthly</SelectItem></SelectContent></Select></FormItem>} />
                        </div>
                        <Button type="submit" className="w-full">Calculate</Button>
                    </form>
                </Form>
                 {result && (
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                        <h3 className="text-lg font-bold text-center mb-2">Results</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                            <div className="space-y-2 text-sm">
                                <p className="flex justify-between"><strong>Amount Received When Loan Starts:</strong> <span className="font-bold text-primary">{currencySymbol}{result.amountReceived.toFixed(2)}</span></p>
                                <p className="flex justify-between"><strong>Total Interest:</strong> <span>{currencySymbol}{result.totalInterest.toFixed(2)}</span></p>
                            </div>
                            <div className="h-[150px]"><ChartContainer config={{}} className="mx-auto aspect-square h-full"><PieChart><Tooltip content={<ChartTooltipContent hideLabel />} /><Pie data={pieData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={60}><Cell fill="hsl(var(--chart-1))" /><Cell fill="hsl(var(--chart-2))" /></Pie></PieChart></ChartContainer></div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

// Main component with tabs
export default function LoanCalculator() {
  return (
    <div className="space-y-8">
      <AmortizedLoanCalculator />
      <DeferredPaymentCalculator />
      <BondCalculator />
    </div>
  );
}
