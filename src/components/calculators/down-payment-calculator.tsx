
"use client";

import React, { useState } from 'react';
import { z } from 'zod';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const currencySymbol = '$';

// --- Helper Functions ---
const calculateMonthlyPayment = (loanAmount: number, termYears: number, ratePercent: number): number => {
    if (loanAmount <= 0) return 0;
    const monthlyRate = ratePercent / 100 / 12;
    const numberOfPayments = termYears * 12;
    if (monthlyRate > 0) {
        return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }
    return loanAmount / numberOfPayments;
};

// --- Calculator 1: By Upfront Cash ---
const cashSchema = z.object({
  upfrontCash: z.coerce.number().min(1),
  downPaymentPercent: z.coerce.number().min(0).max(100),
  closingCostPercent: z.coerce.number().min(0).max(10),
  interestRate: z.coerce.number().min(0).max(30),
  loanTerm: z.coerce.number().min(1).max(40),
});
type CashFormData = z.infer<typeof cashSchema>;

function ByCashCalculator() {
    const [result, setResult] = useState<{ homePrice: number; downPayment: number; closingCosts: number; loanAmount: number; monthlyPayment: number; } | null>(null);
    const form = useForm<CashFormData>({
        resolver: zodResolver(cashSchema),
        defaultValues: { upfrontCash: 100000, downPaymentPercent: 20, closingCostPercent: 3, interestRate: 6.279, loanTerm: 30 },
    });

    function onSubmit(values: CashFormData) {
        const { upfrontCash, downPaymentPercent, closingCostPercent, interestRate, loanTerm } = values;
        const totalPercent = downPaymentPercent / 100 + closingCostPercent / 100;
        const homePrice = upfrontCash / totalPercent;
        const downPayment = homePrice * (downPaymentPercent / 100);
        const closingCosts = homePrice * (closingCostPercent / 100);
        const loanAmount = homePrice - downPayment;
        const monthlyPayment = calculateMonthlyPayment(loanAmount, loanTerm, interestRate);
        setResult({ homePrice, downPayment, closingCosts, loanAmount, monthlyPayment });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="upfrontCash" render={({ field }) => (<FormItem><FormLabel>Upfront Cash Available</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="downPaymentPercent" render={({ field }) => (<FormItem><FormLabel>Down Payment (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="closingCostPercent" render={({ field }) => (<FormItem><FormLabel>Est. Closing Costs (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Interest Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="loanTerm" render={({ field }) => (<FormItem className="sm:col-span-2"><FormLabel>Loan Term (Years)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                </div>
                <Button type="submit" className="w-full">Calculate</Button>
            </form>
            {result && <ResultDisplay result={result} isPriceMode={true} />}
        </Form>
    );
}

// --- Calculator 2: By Home Price ---
const priceSchema = z.object({
  homePrice: z.coerce.number().min(1),
  downPaymentPercent: z.coerce.number().min(0).max(100),
  closingCostPercent: z.coerce.number().min(0).max(10),
  interestRate: z.coerce.number().min(0).max(30),
  loanTerm: z.coerce.number().min(1).max(40),
});
type PriceFormData = z.infer<typeof priceSchema>;

function ByPriceCalculator() {
    const [result, setResult] = useState<{ downPayment: number; closingCosts: number; totalCashNeeded: number; loanAmount: number; monthlyPayment: number; } | null>(null);
    const form = useForm<PriceFormData>({
        resolver: zodResolver(priceSchema),
        defaultValues: { homePrice: 500000, downPaymentPercent: 20, closingCostPercent: 3, interestRate: 6.279, loanTerm: 30 },
    });

    function onSubmit(values: PriceFormData) {
        const { homePrice, downPaymentPercent, closingCostPercent, interestRate, loanTerm } = values;
        const downPayment = homePrice * (downPaymentPercent / 100);
        const closingCosts = homePrice * (closingCostPercent / 100);
        const totalCashNeeded = downPayment + closingCosts;
        const loanAmount = homePrice - downPayment;
        const monthlyPayment = calculateMonthlyPayment(loanAmount, loanTerm, interestRate);
        setResult({ downPayment, closingCosts, totalCashNeeded, loanAmount, monthlyPayment });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="homePrice" render={({ field }) => (<FormItem><FormLabel>Home Price</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="downPaymentPercent" render={({ field }) => (<FormItem><FormLabel>Down Payment (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="closingCostPercent" render={({ field }) => (<FormItem><FormLabel>Est. Closing Costs (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Interest Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl></FormItem>)} />
                     <FormField control={form.control} name="loanTerm" render={({ field }) => (<FormItem className="sm:col-span-2"><FormLabel>Loan Term (Years)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                </div>
                <Button type="submit" className="w-full">Calculate</Button>
            </form>
            {result && <ResultDisplay result={result} isPriceMode={false} />}
        </Form>
    );
}

// --- Calculator 3: By Home Price and Cash ---
const priceAndCashSchema = z.object({
  homePrice: z.coerce.number().min(1),
  upfrontCash: z.coerce.number().min(1),
  closingCostPercent: z.coerce.number().min(0).max(10),
  interestRate: z.coerce.number().min(0).max(30),
  loanTerm: z.coerce.number().min(1).max(40),
});
type PriceAndCashFormData = z.infer<typeof priceAndCashSchema>;

function ByPriceAndCashCalculator() {
    const [result, setResult] = useState<{ downPayment: number; downPaymentPercent: number; closingCosts: number; loanAmount: number; monthlyPayment: number; } | null>(null);
    const form = useForm<PriceAndCashFormData>({
        resolver: zodResolver(priceAndCashSchema),
        defaultValues: { homePrice: 500000, upfrontCash: 100000, closingCostPercent: 3, interestRate: 6.279, loanTerm: 30 },
    });

     function onSubmit(values: PriceAndCashFormData) {
        const { homePrice, upfrontCash, closingCostPercent, interestRate, loanTerm } = values;
        const closingCosts = homePrice * (closingCostPercent / 100);
        const downPayment = upfrontCash - closingCosts;
        if(downPayment < 0) {
            form.setError("upfrontCash", { message: "Cash is not enough to cover closing costs."});
            setResult(null);
            return;
        }
        const downPaymentPercent = (downPayment / homePrice) * 100;
        const loanAmount = homePrice - downPayment;
        const monthlyPayment = calculateMonthlyPayment(loanAmount, loanTerm, interestRate);
        setResult({ downPayment, downPaymentPercent, closingCosts, loanAmount, monthlyPayment });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="homePrice" render={({ field }) => (<FormItem><FormLabel>Home Price</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="upfrontCash" render={({ field }) => (<FormItem><FormLabel>Upfront Cash Available</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage/></FormItem>)} />
                    <FormField control={form.control} name="closingCostPercent" render={({ field }) => (<FormItem><FormLabel>Est. Closing Costs (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Interest Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="loanTerm" render={({ field }) => (<FormItem className="sm:col-span-2"><FormLabel>Loan Term (Years)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                </div>
                <Button type="submit" className="w-full">Calculate</Button>
            </form>
            {result && <ResultDisplay result={result} isPriceMode={false} isPercentMode={true} />}
        </Form>
    );
}


// --- Generic Result Display ---
const ResultDisplay = ({ result, isPriceMode, isPercentMode }: { result: any, isPriceMode: boolean, isPercentMode?: boolean }) => {
    return (
        <div className="p-4 bg-muted rounded-lg text-center mt-6 space-y-3 animate-fade-in">
            <div className="p-2 border rounded-lg bg-background">
                <h4 className="font-semibold text-muted-foreground">{isPriceMode ? 'Affordable Home Price' : (isPercentMode ? 'Down Payment' : 'Cash Needed for Upfront Costs')}</h4>
                <p className="text-3xl font-bold text-primary">
                    {isPriceMode ? `${currencySymbol}${result.homePrice.toLocaleString(undefined, {maximumFractionDigits:0})}` : 
                     isPercentMode ? `${result.downPaymentPercent.toFixed(1)}%` :
                     `${currencySymbol}${result.totalCashNeeded.toLocaleString(undefined, {maximumFractionDigits:0})}`}
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-left">
                <div className="p-2 space-y-1">
                    <p><strong>Down Payment:</strong> {currencySymbol}{result.downPayment.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
                    <p><strong>Closing Costs:</strong> {currencySymbol}{result.closingCosts.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
                </div>
                 <div className="p-2 space-y-1">
                    <p><strong>Loan Amount:</strong> {currencySymbol}{result.loanAmount.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
                    <p><strong>Est. Monthly Payment:</strong> {currencySymbol}{result.monthlyPayment.toLocaleString(undefined, {maximumFractionDigits:2})}</p>
                </div>
            </div>
        </div>
    );
};


// --- Main Exported Component ---
export default function DownPaymentCalculator() {
  return (
    <Tabs defaultValue="cash" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="cash">From Cash Available</TabsTrigger>
        <TabsTrigger value="price">From Home Price</TabsTrigger>
        <TabsTrigger value="priceAndCash">From Price & Cash</TabsTrigger>
      </TabsList>
      <TabsContent value="cash" className="mt-4">
        <ByCashCalculator />
      </TabsContent>
      <TabsContent value="price" className="mt-4">
        <ByPriceCalculator />
      </TabsContent>
      <TabsContent value="priceAndCash" className="mt-4">
        <ByPriceAndCashCalculator />
      </TabsContent>
    </Tabs>
  );
}
