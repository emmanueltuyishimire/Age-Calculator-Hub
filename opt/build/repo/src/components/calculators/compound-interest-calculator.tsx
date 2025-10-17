
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
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RefreshCcw, PiggyBank } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

const formSchema = z.object({
  initialInvestment: z.coerce.number().min(0),
  annualContribution: z.coerce.number().min(0).optional(),
  monthlyContribution: z.coerce.number().min(0).optional(),
  contributionAt: z.enum(['end', 'beginning']).default('end'),
  interestRate: z.coerce.number().min(0),
  compounding: z.enum(['annually', 'semiannually', 'quarterly', 'monthly']).default('annually'),
  investmentLengthYears: z.coerce.number().min(0),
  investmentLengthMonths: z.coerce.number().min(0).optional(),
  taxRate: z.coerce.number().min(0).max(100).optional(),
  inflationRate: z.coerce.number().min(0).max(100).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface ScheduleRow {
    period: number;
    startBalance: number;
    deposit: number;
    interest: number;
    endBalance: number;
}

interface Result {
  endBalance: number;
  totalPrincipal: number;
  totalContributions: number;
  totalInterest: number;
  buyingPower: number;
  schedule: ScheduleRow[];
}

const currencySymbol = '$';

export default function FutureValueCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { initialInvestment: 20000, annualContribution: 5000, monthlyContribution: 0, contributionAt: 'end', interestRate: 5, compounding: 'annually', investmentLengthYears: 5, investmentLengthMonths: 0, taxRate: 0, inflationRate: 3 },
  });

  const getCompoundingPeriods = (c: string) => {
    switch (c) {
      case 'semiannually': return 2;
      case 'quarterly': return 4;
      case 'monthly': return 12;
      default: return 1;
    }
  };

  function onSubmit(values: FormData) {
    const { initialInvestment, annualContribution = 0, monthlyContribution = 0, contributionAt, interestRate, compounding, investmentLengthYears, investmentLengthMonths = 0, taxRate = 0, inflationRate = 0 } = values;
    
    const n = getCompoundingPeriods(compounding);
    const totalMonths = investmentLengthYears * 12 + investmentLengthMonths;
    const totalYears = totalMonths / 12;
    const totalPeriods = Math.ceil(totalYears * n);
    
    const r = interestRate / 100 / n;
    const actualTaxRate = taxRate / 100;
    
    const periodicContribution = (annualContribution / n) + (monthlyContribution * (12/n));

    let balance = initialInvestment;
    const schedule: ScheduleRow[] = [];

    const isBeginning = contributionAt === 'beginning';

    for (let i = 1; i <= totalPeriods; i++) {
        let periodStartBalance = balance;
        
        if (isBeginning) {
            balance += periodicContribution;
        }

        const interestForPeriod = balance * r;
        const taxOnInterest = interestForPeriod * actualTaxRate;
        const netInterest = interestForPeriod - taxOnInterest;

        balance += netInterest;
        
        if (!isBeginning) {
            balance += periodicContribution;
        }
        
        if (i % n === 0 || i === totalPeriods) {
            const periodNum = Math.ceil(i/n);
            schedule.push({
                period: periodNum,
                startBalance: periodStartBalance,
                deposit: periodicContribution * n, // This is an approximation for yearly schedule
                interest: balance - periodStartBalance - (periodicContribution * n),
                endBalance: balance,
            });
        }
    }
    
    const totalContributions = periodicContribution * totalPeriods;

    setResult({
        endBalance: balance,
        totalPrincipal: initialInvestment + totalContributions,
        totalContributions,
        totalInterest: balance - initialInvestment - totalContributions,
        buyingPower: balance / Math.pow(1 + inflationRate / 100, totalYears),
        schedule,
    });
  }

  const pieData = result ? [
    { name: 'Initial Investment', value: form.getValues('initialInvestment'), fill: 'hsl(var(--chart-1))' },
    { name: 'Total Contributions', value: result.totalContributions, fill: 'hsl(var(--chart-2))' },
    { name: 'Total Interest', value: result.totalInterest, fill: 'hsl(var(--chart-3))' },
  ] : [];

  const barChartData = result?.schedule.map(row => ({
      name: `Year ${row.period}`,
      'Principal': row.startBalance,
      'Contributions': row.deposit,
      'Interest': row.interest,
  })) || [];

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="initialInvestment" render={({ field }) => (<FormItem><FormLabel>Initial investment</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="annualContribution" render={({ field }) => (<FormItem><FormLabel>Annual contribution</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="monthlyContribution" render={({ field }) => (<FormItem><FormLabel>Monthly contribution</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                  </div>
                  <FormField control={form.control} name="contributionAt" render={({ field }) => (<FormItem><FormLabel>Contribute at the</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="end">End of period</SelectItem><SelectItem value="beginning">Beginning of period</SelectItem></SelectContent></Select></FormItem>)} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Interest rate</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="compounding" render={({ field }) => (<FormItem><FormLabel>Compound</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="annually">Annually</SelectItem><SelectItem value="semiannually">Semiannually</SelectItem><SelectItem value="quarterly">Quarterly</SelectItem><SelectItem value="monthly">Monthly</SelectItem></SelectContent></Select></FormItem>)} />
                  </div>
                  <FormItem><FormLabel>Investment length</FormLabel><div className="flex gap-2">
                    <FormField control={form.control} name="investmentLengthYears" render={({ field }) => <FormControl><Input type="number" placeholder="Years" {...field} /></FormControl>} />
                    <FormField control={form.control} name="investmentLengthMonths" render={({ field }) => <FormControl><Input type="number" placeholder="Months" {...field} /></FormControl>} />
                  </div></FormItem>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="taxRate" render={({ field }) => (<FormItem><FormLabel>Tax rate on interest (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="inflationRate" render={({ field }) => (<FormItem><FormLabel>Inflation rate (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <Button type="submit" className="w-full" aria-label="Calculate Compound Interest"><PiggyBank className="mr-2 h-4 w-4"/>Calculate</Button>
                      <Button onClick={() => form.reset()} type="button" variant="outline" className="w-full sm:w-auto" aria-label="Reset Form"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
                  </div>
              </form>
              </Form>
            </div>

            <div className="flex flex-col space-y-4">
                {result ? (
                <div className="space-y-4 animate-fade-in">
                    <div className="p-4 bg-muted rounded-lg text-center">
                        <h3 className="text-lg font-semibold text-muted-foreground">Ending Balance</h3>
                        <p className="text-4xl font-bold text-primary">{currencySymbol}{result.endBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <div className="h-[200px] w-full">
                        <ChartContainer config={{}} className="mx-auto aspect-square h-full">
                            <PieChart><Tooltip content={<ChartTooltipContent hideLabel />} /><Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70}><Cell key="cell-0" fill="hsl(var(--chart-1))" /><Cell key="cell-1" fill="hsl(var(--chart-2))" /><Cell key="cell-2" fill="hsl(var(--chart-3))" /></Pie></ChartContainer>
                    </div>
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between"><span className="text-muted-foreground">Total principal:</span><span className="font-semibold">{currencySymbol}{result.totalPrincipal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Total contributions:</span><span className="font-semibold">{currencySymbol}{result.totalContributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Total interest:</span><span className="font-semibold">{currencySymbol}{result.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></div>
                        <div className="flex justify-between border-t mt-1 pt-1"><span className="text-muted-foreground font-bold">Buying power of end balance:</span><span className="font-bold">{currencySymbol}{result.buyingPower.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                    </div>
                </div>
                ) : (
                    <div className="flex items-center justify-center h-full bg-muted rounded-lg p-8">
                        <div className="text-center"><PiggyBank className="mx-auto h-12 w-12 text-muted-foreground" /><p className="mt-4 text-muted-foreground">Your results will appear here.</p></div>
                    </div>
                )}
            </div>
        </div>
        {result && (
             <div className="mt-8">
                <h3 className="text-lg font-bold text-center mb-4">Accumulation Schedule</h3>
                <div className="h-[300px] w-full mb-4">
                    <ResponsiveContainer><BarChart data={barChartData}><XAxis dataKey="name" tick={{ fontSize: 12 }}/><YAxis tickFormatter={(val) => `${currencySymbol}${val/1000}k`} tick={{ fontSize: 12 }} /><Tooltip formatter={(value: number) => `${currencySymbol}${value.toLocaleString(undefined, {maximumFractionDigits: 0})}`} contentStyle={{ background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/><Legend /><Bar dataKey="Interest" stackId="a" fill="hsl(var(--chart-3))" /><Bar dataKey="Contributions" stackId="a" fill="hsl(var(--chart-2))" /><Bar dataKey="Principal" stackId="a" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer>
                </div>
                <div className="h-[300px] overflow-y-auto border rounded-md">
                <Table><TableHeader className="sticky top-0 bg-secondary"><TableRow><TableHead>Year</TableHead><TableHead>Deposit</TableHead><TableHead>Interest</TableHead><TableHead>Ending balance</TableHead></TableRow></TableHeader>
                    <TableBody>
                        {result.schedule.map(row => (
                            <TableRow key={row.period}>
                                <TableCell>{row.period}</TableCell>
                                <TableCell>{currencySymbol}{row.deposit.toFixed(2)}</TableCell>
                                <TableCell>{currencySymbol}{row.interest.toFixed(2)}</TableCell>
                                <TableCell>{currencySymbol}{row.endBalance.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
