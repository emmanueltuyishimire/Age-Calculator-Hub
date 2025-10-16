
"use client";

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taxData, type FilingStatus } from '@/lib/tax-data';
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
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RefreshCcw, DollarSign } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Switch } from '../ui/switch';

const formSchema = z.object({
  grossSalary: z.coerce.number().min(1, "Salary must be positive."),
  payFrequency: z.enum(['annually', 'monthly', 'semi-monthly', 'bi-weekly', 'weekly']),
  filingStatus: z.enum(['single', 'marriedFilingJointly', 'marriedFilingSeparately', 'headOfHousehold', 'qualifyingWidow']),
  preTaxDeductions: z.coerce.number().min(0).optional(),
  stateTaxRate: z.coerce.number().min(0).max(20).optional(),
  localTaxRate: z.coerce.number().min(0).max(20).optional(),
  hasMultipleJobs: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

interface Result {
  grossPayPerPeriod: number;
  federalTax: number;
  stateTax: number;
  localTax: number;
  socialSecurity: number;
  medicare: number;
  preTaxDeductionsPerPeriod: number;
  netPayPerPeriod: number;
}

const payPeriodsPerYear = {
    annually: 1,
    monthly: 12,
    'semi-monthly': 24,
    'bi-weekly': 26,
    weekly: 52,
};

export default function SalaryCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      grossSalary: 80000,
      payFrequency: 'bi-weekly',
      filingStatus: 'single',
      preTaxDeductions: 6000,
      stateTaxRate: 0,
      localTaxRate: 0,
      hasMultipleJobs: false,
    },
  });

  function onSubmit(values: FormData) {
    const taxYear = '2024'; // Using fixed tax year for simplicity
    const yearData = taxData[taxYear];
    const { grossSalary, payFrequency, filingStatus, preTaxDeductions = 0, stateTaxRate = 0, localTaxRate = 0, hasMultipleJobs } = values;

    const periods = payPeriodsPerYear[payFrequency];
    const grossPayPerPeriod = grossSalary / periods;
    
    // Federal Tax Calculation (Simplified W-4 approach)
    let annualDeduction = yearData.standardDeduction[filingStatus as FilingStatus] + preTaxDeductions;
    let annualTaxableIncome = Math.max(0, grossSalary - preTaxDeductions);

    // If multiple jobs, the standard deduction and tax brackets are effectively split
    if (hasMultipleJobs) {
      annualTaxableIncome = annualTaxableIncome / 2; // Rough approximation
    }
    
    annualTaxableIncome = Math.max(0, annualTaxableIncome - (hasMultipleJobs ? annualDeduction / 2 : annualDeduction));

    let annualFederalTax = 0;
    const brackets = yearData.taxBrackets[filingStatus as FilingStatus];
    let incomeRemaining = annualTaxableIncome;
    for (const bracket of brackets) {
      if (incomeRemaining > bracket.from) {
        const taxableInBracket = Math.min(incomeRemaining, bracket.to) - bracket.from;
        annualFederalTax += taxableInBracket * bracket.rate;
      }
    }

    if (hasMultipleJobs) {
        annualFederalTax *= 2; // Apply tax to both "halves" of the income
    }

    const federalTaxPerPeriod = annualFederalTax / periods;

    // FICA Taxes
    const socialSecurityLimit = 168600; // For 2024
    const socialSecurityRate = 0.062;
    const medicareRate = 0.0145;

    const annualSocialSecurity = Math.min(grossSalary, socialSecurityLimit) * socialSecurityRate;
    const annualMedicare = grossSalary * medicareRate;
    
    const socialSecurityPerPeriod = annualSocialSecurity / periods;
    const medicarePerPeriod = annualMedicare / periods;
    
    // State & Local
    const preTaxDeductionsPerPeriod = preTaxDeductions / periods;
    const taxableForStateLocal = grossPayPerPeriod - preTaxDeductionsPerPeriod;
    const stateTax = taxableForStateLocal * (stateTaxRate / 100);
    const localTax = taxableForStateLocal * (localTaxRate / 100);
    
    // Net Pay
    const totalDeductions = federalTaxPerPeriod + socialSecurityPerPeriod + medicarePerPeriod + stateTax + localTax;
    const netPayPerPeriod = grossPayPerPeriod - totalDeductions - preTaxDeductionsPerPeriod;
    
    setResult({
      grossPayPerPeriod,
      federalTax: federalTaxPerPeriod,
      stateTax,
      localTax,
      socialSecurity: socialSecurityPerPeriod,
      medicare: medicarePerPeriod,
      preTaxDeductionsPerPeriod,
      netPayPerPeriod,
    });
  }

  function handleReset() {
    form.reset();
    setResult(null);
  }

  const currencySymbol = '$';
  
  const chartData = result ? [
    { name: 'Net Pay', value: result.netPayPerPeriod, fill: 'hsl(var(--chart-1))' },
    { name: 'Federal Tax', value: result.federalTax, fill: 'hsl(var(--chart-2))' },
    { name: 'FICA', value: result.socialSecurity + result.medicare, fill: 'hsl(var(--chart-3))' },
    { name: 'State/Local', value: result.stateTax + result.localTax, fill: 'hsl(var(--chart-4))' },
    { name: 'Deductions', value: result.preTaxDeductionsPerPeriod, fill: 'hsl(var(--chart-5))' },
  ].filter(item => item.value > 0) : [];

  return (
    <Card className="w-full mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">Paycheck Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="grossSalary" render={({ field }) => (<FormItem><FormLabel>Gross Annual Salary</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="payFrequency" render={({ field }) => (
                      <FormItem><FormLabel>Pay Frequency</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                          <SelectContent>
                            {Object.keys(payPeriodsPerYear).map(freq => (<SelectItem key={freq} value={freq}>{freq.charAt(0).toUpperCase() + freq.slice(1).replace('-', ' ')}</SelectItem>))}
                          </SelectContent>
                        </Select>
                      <FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="filingStatus" render={({ field }) => (
                      <FormItem className="sm:col-span-2"><FormLabel>Filing Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="marriedFilingJointly">Married Filing Jointly</SelectItem>
                            <SelectItem value="headOfHousehold">Head of Household</SelectItem>
                          </SelectContent>
                        </Select>
                      <FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="preTaxDeductions" render={({ field }) => (<FormItem><FormLabel>Annual Pre-Tax Deductions</FormLabel><FormControl><Input type="number" placeholder="e.g., 401k, health" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="stateTaxRate" render={({ field }) => (<FormItem><FormLabel>State Tax Rate (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                  <FormField
                    control={form.control}
                    name="hasMultipleJobs"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Do you have 2+ jobs?</FormLabel>
                          <FormDescription className="text-xs">
                            This affects tax withholding (W-4 Step 2c).
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button type="submit" className="w-full"><DollarSign className="mr-2 h-4 w-4"/>Calculate Paycheck</Button>
                    <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
                  </div>
              </form>
              </Form>
            </div>
            
            <div className="flex flex-col space-y-4">
                {result ? (
                <div className="space-y-4 animate-fade-in">
                    <div className="p-4 bg-muted rounded-lg text-center">
                        <h3 className="text-lg font-semibold text-muted-foreground">Estimated Take-Home Pay</h3>
                        <p className="text-4xl font-bold text-primary">{currencySymbol}{result.netPayPerPeriod.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <p className="text-muted-foreground">per {form.getValues('payFrequency').replace('-', ' ')}</p>
                    </div>
                    <div className="h-[200px]">
                       <ChartContainer config={{}} className="mx-auto aspect-square h-full">
                            <PieChart>
                                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel formatter={(value, name) => `${currencySymbol}${Number(value).toFixed(2)}`} />} />
                                <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70} paddingAngle={2} strokeWidth={2}>
                                    {chartData.map((entry) => (<Cell key={entry.name} fill={entry.fill} />))}
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                    </div>
                     <div className="space-y-1 text-sm border-t pt-2">
                        <div className="flex justify-between"><span className="text-muted-foreground">Gross Pay Per Period:</span><span className="font-semibold">{currencySymbol}{result.grossPayPerPeriod.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                        <div className="pl-4">
                            <div className="flex justify-between"><span className="text-muted-foreground">Federal Tax:</span><span className="font-semibold text-destructive">-{currencySymbol}{result.federalTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Social Security:</span><span className="font-semibold text-destructive">-{currencySymbol}{result.socialSecurity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Medicare:</span><span className="font-semibold text-destructive">-{currencySymbol}{result.medicare.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">State Tax:</span><span className="font-semibold text-destructive">-{currencySymbol}{result.stateTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Local Tax:</span><span className="font-semibold text-destructive">-{currencySymbol}{result.localTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Pre-Tax Deductions:</span><span className="font-semibold text-destructive">-{currencySymbol}{result.preTaxDeductionsPerPeriod.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                        </div>
                        <div className="flex justify-between border-t mt-1 pt-1"><span className="font-bold">Net Pay (Take-Home):</span><span className="font-bold">{currencySymbol}{result.netPayPerPeriod.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                    </div>
                </div>
                ) : (
                    <div className="flex items-center justify-center h-full bg-muted rounded-lg p-8">
                        <div className="text-center">
                            <DollarSign className="mx-auto h-12 w-12 text-muted-foreground" />
                            <p className="mt-4 text-muted-foreground">Your paycheck breakdown will appear here.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

    