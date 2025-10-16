
"use client";

import React, { useState, useMemo } from 'react';
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
import { RefreshCcw, GraduationCap, DollarSign, AlertCircle, Scale, PieChart as PieChartIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from '../ui/switch';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { PieChart, Pie, Cell, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const currencySymbol = '$';

// --- Simple Calculator ---
const simpleLoanSchema = z.object({
  loanBalance: z.coerce.number().optional(),
  remainingTerm: z.coerce.number().optional(),
  interestRate: z.coerce.number().optional(),
  monthlyPayment: z.coerce.number().optional(),
});
type SimpleLoanFormData = z.infer<typeof simpleLoanSchema>;

function SimpleStudentLoanCalculator() {
    const [solveFor, setSolveFor] = useState<'monthlyPayment' | 'loanBalance' | 'remainingTerm' | 'interestRate'>('monthlyPayment');
    const [result, setResult] = useState<Partial<SimpleLoanFormData> | null>(null);

    const form = useForm<SimpleLoanFormData>({
        resolver: zodResolver(simpleLoanSchema),
        defaultValues: { loanBalance: 30000, remainingTerm: 10, interestRate: 6.8, monthlyPayment: undefined },
    });

    const onSubmit = (values: SimpleLoanFormData) => {
        let { loanBalance, remainingTerm, interestRate, monthlyPayment } = values;
        loanBalance = loanBalance || 0;
        remainingTerm = remainingTerm || 0;
        interestRate = interestRate || 0;
        monthlyPayment = monthlyPayment || 0;
        const n = remainingTerm * 12;
        const r = interestRate / 100 / 12;

        let calculatedValue: Partial<SimpleLoanFormData> = {};

        try {
            switch(solveFor) {
                case 'monthlyPayment':
                    if(r > 0) monthlyPayment = loanBalance * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                    else monthlyPayment = loanBalance / n;
                    calculatedValue = { monthlyPayment };
                    break;
                case 'loanBalance':
                    if (r > 0) loanBalance = monthlyPayment * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
                    else loanBalance = monthlyPayment * n;
                    calculatedValue = { loanBalance };
                    break;
                case 'remainingTerm':
                    if (r > 0) {
                        if (monthlyPayment <= loanBalance * r) throw new Error("Payment too low.");
                        remainingTerm = -(Math.log(1 - (loanBalance * r) / monthlyPayment)) / Math.log(1 + r) / 12;
                    } else {
                        remainingTerm = loanBalance / monthlyPayment / 12;
                    }
                    calculatedValue = { remainingTerm };
                    break;
                case 'interestRate': // Simplified iterative approach
                    let high = 1.0; let low = 0.0; let mid, pv;
                    for (let i = 0; i < 50; i++) {
                        mid = (high + low) / 2;
                        pv = monthlyPayment * (1 - Math.pow(1 + mid, -n)) / mid;
                        if (Math.abs(pv - loanBalance) < 0.01) break;
                        else if (pv > loanBalance) high = mid;
                        else low = mid;
                    }
                    interestRate = (mid || 0) * 12 * 100;
                    calculatedValue = { interestRate };
                    break;
            }
            setResult(calculatedValue);
        } catch (e) {
            // handle error display
        }
    };
    
    const totalInterest = (result?.monthlyPayment || form.getValues().monthlyPayment || 0) * (result?.remainingTerm || form.getValues().remainingTerm || 0) * 12 - (result?.loanBalance || form.getValues().loanBalance || 0);

    const pieData = result ? [
        { name: 'Principal', value: (result?.loanBalance || form.getValues().loanBalance || 0), fill: 'hsl(var(--chart-1))' },
        { name: 'Interest', value: totalInterest, fill: 'hsl(var(--chart-2))' },
    ] : [];

    return (
        <Card>
            <CardHeader><CardTitle>Simple Student Loan Calculator</CardTitle><CardDescription>Provide any three values to calculate the fourth.</CardDescription></CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <Tabs value={solveFor} onValueChange={(val) => setSolveFor(val as any)} className="w-full">
                            <TabsList className="grid w-full grid-cols-4 h-auto">
                                <TabsTrigger value="monthlyPayment">Payment</TabsTrigger>
                                <TabsTrigger value="loanBalance">Balance</TabsTrigger>
                                <TabsTrigger value="remainingTerm">Term</TabsTrigger>
                                <TabsTrigger value="interestRate">Rate</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="loanBalance" render={({ field }) => (<FormItem><FormLabel>Loan Balance</FormLabel><FormControl><Input type="number" {...field} disabled={solveFor === 'loanBalance'} /></FormControl></FormItem>)} />
                            <FormField control={form.control} name="remainingTerm" render={({ field }) => (<FormItem><FormLabel>Remaining Term (Years)</FormLabel><FormControl><Input type="number" {...field} disabled={solveFor === 'remainingTerm'} /></FormControl></FormItem>)} />
                            <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Interest Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} disabled={solveFor === 'interestRate'} /></FormControl></FormItem>)} />
                            <FormField control={form.control} name="monthlyPayment" render={({ field }) => (<FormItem><FormLabel>Monthly Payment</FormLabel><FormControl><Input type="number" {...field} disabled={solveFor === 'monthlyPayment'} /></FormControl></FormItem>)} />
                        </div>
                        <Button type="submit" className="w-full">Calculate</Button>
                    </form>
                </Form>
                 {result && (
                    <div className="mt-4 p-4 bg-muted rounded-lg text-center">
                        <h3 className="text-lg font-bold">Result</h3>
                        <p className="text-2xl text-primary font-bold">
                            {solveFor === 'monthlyPayment' && `${currencySymbol}${(result.monthlyPayment || 0).toFixed(2)} / month`}
                            {solveFor === 'loanBalance' && `${currencySymbol}${(result.loanBalance || 0).toFixed(2)}`}
                            {solveFor === 'remainingTerm' && `${(result.remainingTerm || 0).toFixed(2)} years`}
                            {solveFor === 'interestRate' && `${(result.interestRate || 0).toFixed(3)} %`}
                        </p>
                        <div className="h-[150px]"><ChartContainer config={{}} className="mx-auto aspect-square h-full"><PieChart><Tooltip content={<ChartTooltipContent hideLabel />} /><Pie data={pieData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={60}><Cell key="cell-0" fill="hsl(var(--chart-1))" /><Cell key="cell-1" fill="hsl(var(--chart-2))" /></Pie></PieChart></ChartContainer></div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

// --- Repayment Calculator ---
const repaymentSchema = z.object({
    loanBalance: z.coerce.number().min(1),
    monthlyPayment: z.coerce.number().min(1),
    interestRate: z.coerce.number().min(0),
    extraMonthly: z.coerce.number().optional(),
    extraYearly: z.coerce.number().optional(),
    oneTime: z.coerce.number().optional(),
});
type RepaymentFormData = z.infer<typeof repaymentSchema>;
interface RepaymentResult {
    originalTerm: number; originalInterest: number; originalTotal: number;
    newTerm: number; newInterest: number; newTotal: number; interestSavings: number;
}

function RepaymentCalculator() {
    const [result, setResult] = useState<RepaymentResult | null>(null);
    const form = useForm<RepaymentFormData>({
        resolver: zodResolver(repaymentSchema),
        defaultValues: { loanBalance: 30000, monthlyPayment: 350, interestRate: 6.8, extraMonthly: 150 },
    });

    const onSubmit = (values: RepaymentFormData) => {
        const { loanBalance, monthlyPayment, interestRate, extraMonthly = 0, extraYearly = 0, oneTime = 0 } = values;
        const r = interestRate / 100 / 12;

        const calculatePayoff = (balance: number, payment: number, yearly: number, firstPayment: number) => {
            let term = 0; let totalInterest = 0; let currentBalance = balance - firstPayment;
            while(currentBalance > 0) {
                term++;
                const interest = currentBalance * r;
                totalInterest += interest;
                currentBalance += interest;
                let currentPayment = payment;
                if(term % 12 === 0) currentPayment += yearly;
                currentBalance -= currentPayment;
            }
            return { term, totalInterest };
        }

        const original = calculatePayoff(loanBalance, monthlyPayment, 0, 0);
        const accelerated = calculatePayoff(loanBalance, monthlyPayment + extraMonthly, extraYearly, oneTime);
        
        setResult({
            originalTerm: original.term,
            originalInterest: original.totalInterest,
            originalTotal: loanBalance + original.totalInterest,
            newTerm: accelerated.term,
            newInterest: accelerated.totalInterest,
            newTotal: loanBalance + accelerated.totalInterest,
            interestSavings: original.totalInterest - accelerated.totalInterest,
        });
    }
    
    return (
         <Card>
            <CardHeader><CardTitle>Repayment Calculator</CardTitle><CardDescription>See how extra payments affect your payoff timeline.</CardDescription></CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField control={form.control} name="loanBalance" render={({ field }) => (<FormItem><FormLabel>Loan Balance</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                            <FormField control={form.control} name="monthlyPayment" render={({ field }) => (<FormItem><FormLabel>Monthly Payment</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                            <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Interest Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl></FormItem>)} />
                        </div>
                        <h4 className="font-semibold pt-2">Repayment Options (Extra Payments)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField control={form.control} name="extraMonthly" render={({ field }) => (<FormItem><FormLabel>Extra Monthly</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                            <FormField control={form.control} name="extraYearly" render={({ field }) => (<FormItem><FormLabel>Extra Yearly</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                            <FormField control={form.control} name="oneTime" render={({ field }) => (<FormItem><FormLabel>One Time</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                        </div>
                         <Button type="submit" className="w-full">Calculate</Button>
                    </form>
                </Form>
                {result && (
                    <div className="mt-4 p-4 bg-muted rounded-lg text-center">
                        <h3 className="text-lg font-bold">Payoff Comparison</h3>
                        <p>By paying extra, you could pay off your loan <strong className="text-primary">{Math.floor((result.originalTerm - result.newTerm) / 12)} years and {(result.originalTerm - result.newTerm) % 12} months</strong> earlier, saving <strong className="text-primary">{currencySymbol}{result.interestSavings.toFixed(2)}</strong> in interest.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                            <div className="p-2 border rounded-lg bg-background text-left"><h4 className="font-bold text-center">Accelerated Plan</h4>
                                <p><strong>Term:</strong> {Math.floor(result.newTerm / 12)}y {result.newTerm % 12}m</p>
                                <p><strong>Total Interest:</strong> {currencySymbol}{result.newInterest.toFixed(2)}</p>
                                <p><strong>Total Paid:</strong> {currencySymbol}{result.newTotal.toFixed(2)}</p>
                            </div>
                             <div className="p-2 border rounded-lg bg-background text-left"><h4 className="font-bold text-center">Original Plan</h4>
                                <p><strong>Term:</strong> {Math.floor(result.originalTerm / 12)}y {result.originalTerm % 12}m</p>
                                <p><strong>Total Interest:</strong> {currencySymbol}{result.originalInterest.toFixed(2)}</p>
                                <p><strong>Total Paid:</strong> {currencySymbol}{result.originalTotal.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

// --- Projection Calculator ---
const projectionSchema = z.object({
    toGraduateIn: z.coerce.number().min(0),
    estimatedLoan: z.coerce.number().min(0),
    currentBalance: z.coerce.number().min(0),
    loanTerm: z.coerce.number().min(1),
    gracePeriod: z.coerce.number().min(0),
    interestRate: z.coerce.number().min(0),
    payInterestInSchool: z.boolean().default(false),
});
type ProjectionFormData = z.infer<typeof projectionSchema>;
interface ProjectionResult {
    repayment: number; amountBorrowed: number; balanceAfterGrad: number;
    balanceAfterGrace: number; totalInterest: number;
}

function ProjectionCalculator() {
     const [result, setResult] = useState<ProjectionResult | null>(null);
    const form = useForm<ProjectionFormData>({
        resolver: zodResolver(projectionSchema),
        defaultValues: { toGraduateIn: 2, estimatedLoan: 10000, currentBalance: 20000, loanTerm: 10, gracePeriod: 6, interestRate: 6.8, payInterestInSchool: false },
    });

    const onSubmit = (values: ProjectionFormData) => {
        const { toGraduateIn, estimatedLoan, currentBalance, loanTerm, gracePeriod, interestRate, payInterestInSchool } = values;
        const r = interestRate / 100 / 12;
        let futureBalance = currentBalance;
        const amountBorrowed = currentBalance + (estimatedLoan * toGraduateIn);

        for(let i=0; i<toGraduateIn * 12; i++) {
            const interest = futureBalance * r;
            if(!payInterestInSchool) futureBalance += interest;
            if(i % 12 === 0) futureBalance += estimatedLoan;
        }
        const balanceAfterGrad = futureBalance;

        for(let i=0; i<gracePeriod; i++) {
            const interest = futureBalance * r;
            if(!payInterestInSchool) futureBalance += interest;
        }
        const balanceAfterGrace = futureBalance;

        const n = loanTerm * 12;
        const repayment = balanceAfterGrace * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalPaid = repayment * n;
        const totalInterest = totalPaid - amountBorrowed;
        
        setResult({ repayment, amountBorrowed, balanceAfterGrad, balanceAfterGrace, totalInterest });
    }
    
    return (
        <Card>
            <CardHeader><CardTitle>Projection Calculator</CardTitle><CardDescription>Estimate your loan balance and repayment after graduation.</CardDescription></CardHeader>
            <CardContent>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="toGraduateIn" render={({ field }) => (<FormItem><FormLabel>To Graduate In (Years)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                            <FormField control={form.control} name="estimatedLoan" render={({ field }) => (<FormItem><FormLabel>Estimated Loan (/year)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                            <FormField control={form.control} name="currentBalance" render={({ field }) => (<FormItem><FormLabel>Current Balance</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                            <FormField control={form.control} name="loanTerm" render={({ field }) => (<FormItem><FormLabel>Loan Term (Years)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                            <FormField control={form.control} name="gracePeriod" render={({ field }) => (<FormItem><FormLabel>Grace Period (Months)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                            <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Interest Rate (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                        </div>
                        <FormField control={form.control} name="payInterestInSchool" render={({ field }) => (<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm mt-4"><div className="space-y-0.5"><FormLabel>Pay interest during school?</FormLabel></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>)} />
                         <Button type="submit" className="w-full">Calculate Projection</Button>
                    </form>
                </Form>
                 {result && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                        <h3 className="text-lg font-bold text-center mb-2">Results</h3>
                        <div className="space-y-1 text-sm">
                            <p className="flex justify-between"><strong>Monthly Repayment:</strong> <span className="font-bold text-primary">{currencySymbol}{result.repayment.toFixed(2)}</span></p>
                            <p className="flex justify-between"><strong>Total Amount Borrowed:</strong> <span>{currencySymbol}{result.amountBorrowed.toFixed(2)}</span></p>
                            <p className="flex justify-between"><strong>Balance After Graduation:</strong> <span>{currencySymbol}{result.balanceAfterGrad.toFixed(2)}</span></p>
                            <p className="flex justify-between"><strong>Balance After Grace Period:</strong> <span>{currencySymbol}{result.balanceAfterGrace.toFixed(2)}</span></p>
                            <p className="flex justify-between"><strong>Total Interest:</strong> <span>{currencySymbol}{result.totalInterest.toFixed(2)}</span></p>
                        </div>
                    </div>
                 )}
            </CardContent>
        </Card>
    );
}

// Main component with tabs
export default function StudentLoanCalculator() {
  const [activeTab, setActiveTab] = useState("simple");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3 h-auto">
        <TabsTrigger value="simple">Simple Calculator</TabsTrigger>
        <TabsTrigger value="repayment">Repayment Calculator</TabsTrigger>
        <TabsTrigger value="projection">Projection Calculator</TabsTrigger>
      </TabsList>
      <TabsContent value="simple">
        <SimpleStudentLoanCalculator />
      </TabsContent>
      <TabsContent value="repayment">
        <RepaymentCalculator />
      </TabsContent>
       <TabsContent value="projection">
        <ProjectionCalculator />
      </TabsContent>
    </Tabs>
  );
}
