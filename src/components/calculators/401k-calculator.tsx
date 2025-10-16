
"use client";

import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RefreshCcw, PiggyBank, AlertCircle, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Checkbox } from '../ui/checkbox';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const currencySymbol = '$';

// --- Retirement Calculator ---
const retirementSchema = z.object({
  currentAge: z.coerce.number().min(18),
  retirementAge: z.coerce.number().min(50),
  lifeExpectancy: z.coerce.number().min(65),
  currentSalary: z.coerce.number().min(1),
  currentBalance: z.coerce.number().min(0),
  contribution: z.coerce.number().min(0).max(100),
  employerMatch: z.coerce.number().min(0).max(100),
  matchLimit: z.coerce.number().min(0).max(100),
  salaryIncrease: z.coerce.number().min(0),
  annualReturn: z.coerce.number().min(0),
  inflationRate: z.coerce.number().min(0),
  retirementIncome: z.coerce.number().min(0),
});
type RetirementFormData = z.infer<typeof retirementSchema>;

function RetirementCalculator() {
  const [result, setResult] = useState<any | null>(null);
  const form = useForm<RetirementFormData>({
    resolver: zodResolver(retirementSchema),
    defaultValues: { currentAge: 30, retirementAge: 65, lifeExpectancy: 85, currentSalary: 75000, currentBalance: 35000, contribution: 10, employerMatch: 50, matchLimit: 3, salaryIncrease: 3, annualReturn: 6, inflationRate: 3, retirementIncome: 75 },
  });

  const onSubmit = (values: RetirementFormData) => {
    const { currentAge, retirementAge, currentSalary, currentBalance, contribution, employerMatch, matchLimit, salaryIncrease, annualReturn } = values;
    const yearsToRetirement = retirementAge - currentAge;
    let balance = currentBalance;
    let salary = currentSalary;
    const schedule = [];

    for (let i = 0; i < yearsToRetirement; i++) {
        const employeeContribution = salary * (contribution / 100);
        const employerContribution = Math.min(employeeContribution, salary * (matchLimit / 100)) * (employerMatch / 100);
        const totalContribution = employeeContribution + employerContribution;
        const interest = (balance + totalContribution / 2) * (annualReturn / 100); // Mid-year contribution approximation
        balance += totalContribution + interest;
        salary *= (1 + salaryIncrease / 100);
        schedule.push({ age: currentAge + i + 1, balance: Math.round(balance) });
    }
    setResult({ balanceAtRetirement: balance, schedule });
  }

  return (
    <Card>
      <CardHeader><CardTitle>Retirement Savings Calculator</CardTitle></CardHeader>
      <CardContent>
        <Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FormField control={form.control} name="currentAge" render={({ field }) => (<FormItem><FormLabel>Current Age</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="retirementAge" render={({ field }) => (<FormItem><FormLabel>Retirement Age</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="lifeExpectancy" render={({ field }) => (<FormItem><FormLabel>Life Expectancy</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="currentSalary" render={({ field }) => (<FormItem><FormLabel>Current Salary</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="currentBalance" render={({ field }) => (<FormItem><FormLabel>Current Balance</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="contribution" render={({ field }) => (<FormItem><FormLabel>Contribution (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="employerMatch" render={({ field }) => (<FormItem><FormLabel>Employer Match (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="matchLimit" render={({ field }) => (<FormItem><FormLabel>Match Limit (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="salaryIncrease" render={({ field }) => (<FormItem><FormLabel>Salary Increase (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="annualReturn" render={({ field }) => (<FormItem><FormLabel>Annual Return (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="inflationRate" render={({ field }) => (<FormItem><FormLabel>Inflation Rate (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="retirementIncome" render={({ field }) => (<FormItem><FormLabel>Retirement Income (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
            </div>
            <Button type="submit" className="w-full">Calculate</Button>
        </form></Form>
         {result && (
          <div className="mt-4 p-4 bg-muted rounded-lg text-center">
            <h3 className="font-semibold text-muted-foreground">Balance at Retirement (Age {form.getValues('retirementAge')})</h3>
            <p className="text-3xl text-primary font-bold">{currencySymbol}{result.balanceAtRetirement.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            <div className="h-[250px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={result.schedule}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="age" name="Age" /><YAxis tickFormatter={(val) => `$${(val/1000)}k`} /><Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} /><Line type="monotone" dataKey="balance" stroke="hsl(var(--primary))" dot={false} /></LineChart>
                </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// --- Early Withdrawal Calculator ---
const withdrawalSchema = z.object({
    amount: z.coerce.number().min(1),
    federalTax: z.coerce.number().min(0).max(50),
    stateTax: z.coerce.number().min(0).max(20),
    localTax: z.coerce.number().min(0).max(20).optional(),
    isEmployed: z.boolean().default(false),
    isDisabled: z.boolean().default(false),
    otherExemption: z.boolean().default(false),
});
type WithdrawalFormData = z.infer<typeof withdrawalSchema>;

function WithdrawalCalculator() {
  const [result, setResult] = useState<{netAmount: number, penalty: number, totalTaxes: number} | null>(null);
  const form = useForm<WithdrawalFormData>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: { amount: 10000, federalTax: 25, stateTax: 5, localTax: 0, isEmployed: true, isDisabled: false, otherExemption: false },
  });

  function onSubmit(values: WithdrawalFormData) {
    const { amount, federalTax, stateTax, localTax = 0, isEmployed, isDisabled, otherExemption } = values;
    const penaltyRate = (isEmployed && !isDisabled && !otherExemption) ? 0.10 : 0;
    const penalty = amount * penaltyRate;
    const fedTax = amount * (federalTax / 100);
    const stTax = amount * (stateTax / 100);
    const locTax = amount * (localTax / 100);
    const totalTaxes = fedTax + stTax + locTax;
    const netAmount = amount - penalty - totalTaxes;
    setResult({netAmount, penalty, totalTaxes});
  }

  return (
    <Card>
      <CardHeader><CardTitle>Early Withdrawal Costs Calculator</CardTitle></CardHeader>
      <CardContent>
        <Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="amount" render={({ field }) => (<FormItem><FormLabel>Withdrawal Amount</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="federalTax" render={({ field }) => (<FormItem><FormLabel>Federal Tax Rate (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="stateTax" render={({ field }) => (<FormItem><FormLabel>State Tax Rate (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="localTax" render={({ field }) => (<FormItem><FormLabel>Local Tax Rate (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
            </div>
            <div className="space-y-2">
                <FormField control={form.control} name="isEmployed" render={({ field }) => <FormItem className="flex items-center space-x-2"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel>Still employed with the company?</FormLabel></FormItem>} />
                <FormField control={form.control} name="isDisabled" render={({ field }) => <FormItem className="flex items-center space-x-2"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel>Do you have a qualifying disability?</FormLabel></FormItem>} />
                <FormField control={form.control} name="otherExemption" render={({ field }) => <FormItem className="flex items-center space-x-2"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel>Do you qualify for other penalty exemptions?</FormLabel></FormItem>} />
            </div>
            <Button type="submit" className="w-full">Calculate</Button>
        </form></Form>
         {result && (
          <div className="mt-4 p-4 bg-muted rounded-lg text-center">
            <h3 className="font-semibold text-muted-foreground">You will receive</h3>
            <p className="text-3xl text-primary font-bold">{currencySymbol}{result.netAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
             <p className="text-sm mt-2">After paying {currencySymbol}{result.penalty.toFixed(2)} in penalties and {currencySymbol}{result.totalTaxes.toFixed(2)} in taxes.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// --- Max Match Calculator ---
const matchSchema = z.object({
  salary: z.coerce.number().min(1),
  age: z.coerce.number().min(18),
  match1: z.coerce.number().min(0).optional(),
  match1Limit: z.coerce.number().min(0).optional(),
  match2: z.coerce.number().min(0).optional(),
  match2Limit: z.coerce.number().min(0).optional(),
});
type MatchFormData = z.infer<typeof matchSchema>;

function MaxMatchCalculator() {
    const [result, setResult] = useState<any | null>(null);
    const form = useForm<MatchFormData>({
        resolver: zodResolver(matchSchema),
        defaultValues: { salary: 75000, age: 30, match1: 50, match1Limit: 3, match2: 20, match2Limit: 6 },
    });
    
    function onSubmit(values: MatchFormData) {
        const { salary, age, match1 = 0, match1Limit = 0, match2 = 0, match2Limit = 0 } = values;
        const irsLimit = age >= 50 ? 31000 : 23500; // For 2025

        const totalMatchPercent = Math.max(match1Limit, match2Limit);
        const maxEmployeeContribution = salary * (totalMatchPercent / 100);
        
        const minContributionPercent = totalMatchPercent;
        const maxContributionPercent = (irsLimit / salary) * 100;
        
        setResult({
            min: minContributionPercent.toFixed(2),
            max: maxContributionPercent.toFixed(2)
        });
    }

    return (
        <Card>
            <CardHeader><CardTitle>Maximize Employer 401(k) Match Calculator</CardTitle></CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="salary" render={({ field }) => (<FormItem><FormLabel>Annual Salary</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                            <FormField control={form.control} name="age" render={({ field }) => (<FormItem><FormLabel>Your Age</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="match1" render={({ field }) => (<FormItem><FormLabel>Employer Match (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                             <FormField control={form.control} name="match1Limit" render={({ field }) => (<FormItem><FormLabel>Up to (%) of Salary</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <FormField control={form.control} name="match2" render={({ field }) => (<FormItem><FormLabel>Second Match (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                             <FormField control={form.control} name="match2Limit" render={({ field }) => (<FormItem><FormLabel>Up to (%) of Salary</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                        </div>
                        <Button type="submit" className="w-full">Calculate</Button>
                    </form>
                </Form>
                 {result && (
                    <div className="mt-4 p-4 bg-muted rounded-lg text-center">
                        <h3 className="font-semibold text-muted-foreground">Optimal Contribution Range</h3>
                        <p className="text-3xl text-primary font-bold">{result.min}% - {result.max}%</p>
                        <p className="text-sm mt-1">To get the full match without exceeding the IRS limit.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

// --- Main component with tabs ---
export default function FourOhOneKCalculator() {
  const [activeTab, setActiveTab] = useState("retirement");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3 h-auto">
        <TabsTrigger value="retirement">Retirement</TabsTrigger>
        <TabsTrigger value="withdrawal">Early Withdrawal</TabsTrigger>
        <TabsTrigger value="match">Maximize Match</TabsTrigger>
      </TabsList>
      <TabsContent value="retirement" className="mt-6">
        <RetirementCalculator />
      </TabsContent>
      <TabsContent value="withdrawal" className="mt-6">
        <WithdrawalCalculator />
      </TabsContent>
      <TabsContent value="match" className="mt-6">
        <MaxMatchCalculator />
      </TabsContent>
    </Tabs>
  );
}
