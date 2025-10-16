
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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Landmark } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltipContent } from '../ui/chart';
import { Switch } from '../ui/switch';

const iraContributionLimits = {
  "2025": { under50: 7000, over50: 8000 },
  "2024": { under50: 7000, over50: 8000 },
};

const formSchema = z.object({
  currentBalance: z.coerce.number().min(0),
  annualContribution: z.coerce.number().min(0, "Contribution must be non-negative.").optional(),
  maximizeContribution: z.boolean().default(false),
  rateOfReturn: z.coerce.number().min(0).max(30),
  currentAge: z.coerce.number().min(18).max(99),
  retirementAge: z.coerce.number().min(18).max(100),
  taxRate: z.coerce.number().min(0).max(70),
}).refine(data => data.retirementAge > data.currentAge, {
  message: "Retirement age must be greater than current age.",
  path: ["retirementAge"],
});

type FormData = z.infer<typeof formSchema>;

interface AccountBalances {
  roth: number;
  taxable: number;
}

interface ScheduleRow {
    age: number;
    principalStart: number;
    principalEnd: number;
    rothStart: number;
    rothEnd: number;
    taxableStart: number;
    taxableEnd: number;
}

interface Result {
  finalBalances: AccountBalances;
  totalPrincipal: number;
  totalInterestRoth: number;
  totalInterestTaxable: number;
  totalTax: number;
  schedule: ScheduleRow[];
}

const currencySymbol = '$';

export default function RothIraCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { currentBalance: 20000, annualContribution: 7000, maximizeContribution: false, rateOfReturn: 6, currentAge: 30, retirementAge: 65, taxRate: 25 },
  });

  function onSubmit(values: FormData) {
    const { currentBalance, rateOfReturn, currentAge, retirementAge, taxRate, maximizeContribution } = values;
    
    const yearsToRetirement = retirementAge - currentAge;
    const r = rateOfReturn / 100;
    const currentTax = taxRate / 100;
    
    const schedule: ScheduleRow[] = [];
    let rothBalance = currentBalance;
    let taxableBalance = currentBalance;
    let principalBalance = currentBalance;
    let totalTaxPaid = 0;

    for (let i = 0; i < yearsToRetirement; i++) {
        const age = currentAge + i;
        const contributionLimit = age < 50 ? iraContributionLimits["2025"].under50 : iraContributionLimits["2025"].over50;
        const annualContribution = maximizeContribution ? contributionLimit : (values.annualContribution || 0);

        const row: Partial<ScheduleRow> = { age, principalStart: principalBalance, rothStart: rothBalance, taxableStart: taxableBalance };

        principalBalance += annualContribution;

        // Roth IRA
        rothBalance = (rothBalance + annualContribution) * (1 + r);
        row.rothEnd = rothBalance;

        // Taxable Savings
        const taxableGrowth = taxableBalance * r;
        const taxOnGrowth = taxableGrowth * currentTax; // Simplified capital gains tax
        totalTaxPaid += taxOnGrowth;
        taxableBalance = (taxableBalance + annualContribution) + taxableGrowth - taxOnGrowth;
        row.taxableEnd = taxableBalance;
        
        row.principalEnd = principalBalance;

        schedule.push(row as ScheduleRow);
    }
    
    setResult({
        finalBalances: {
            roth: rothBalance,
            taxable: taxableBalance,
        },
        totalPrincipal: principalBalance,
        totalInterestRoth: rothBalance - principalBalance,
        totalInterestTaxable: taxableBalance - principalBalance,
        totalTax: totalTaxPaid,
        schedule
    });
  }

  function handleReset() {
    form.reset();
    setResult(null);
  }

  const chartData = result?.schedule.map(row => ({
    age: row.age,
    "Roth IRA": row.rothEnd,
    "Taxable Account": row.taxableEnd,
    "Principal": row.principalEnd,
  })) || [];

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="currentBalance" render={({ field }) => (<FormItem><FormLabel>Current Balance</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="annualContribution" render={({ field }) => (<FormItem><FormLabel>Annual Contribution</FormLabel><FormControl><Input type="number" {...field} disabled={form.watch('maximizeContribution')} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                  <FormField control={form.control} name="maximizeContribution" render={({ field }) => (<FormItem className="flex items-center gap-2 pt-2"><FormLabel>Maximize contributions?</FormLabel><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>)} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="rateOfReturn" render={({ field }) => (<FormItem><FormLabel>Expected Return Rate (%)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="taxRate" render={({ field }) => (<FormItem><FormLabel>Marginal Tax Rate (%)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="currentAge" render={({ field }) => (<FormItem><FormLabel>Current Age</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="retirementAge" render={({ field }) => (<FormItem><FormLabel>Retirement Age</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button type="submit" className="w-full"><Landmark className="mr-2 h-4 w-4"/>Calculate</Button>
                    <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
                  </div>
              </form>
              </Form>
            </div>
            
            <div className="flex flex-col space-y-4">
                {result ? (
                <div className="space-y-4 animate-fade-in">
                    <div className="p-4 bg-muted rounded-lg space-y-2">
                        <h3 className="text-lg font-bold text-center">Balances at Age {form.getValues('retirementAge')}</h3>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-2 border rounded-lg bg-background"><h4 className="font-semibold text-muted-foreground">Roth IRA</h4><p className="text-primary font-bold text-2xl">{currencySymbol}{result.finalBalances.roth.toLocaleString(undefined, {maximumFractionDigits:0})}</p></div>
                             <div className="p-2 border rounded-lg bg-background"><h4 className="font-semibold text-muted-foreground">Taxable Account</h4><p className="text-primary font-bold text-2xl">{currencySymbol}{result.finalBalances.taxable.toLocaleString(undefined, {maximumFractionDigits:0})}</p></div>
                        </div>
                        <p className="text-sm text-center pt-2">
                            The Roth IRA could accumulate <strong className="text-primary">{currencySymbol}{(result.finalBalances.roth - result.finalBalances.taxable).toLocaleString(undefined, {maximumFractionDigits: 0})}</strong> more than a taxable account.
                        </p>
                    </div>
                     <div className="p-4 bg-muted rounded-lg space-y-2">
                        <h3 className="text-lg font-bold text-center">Breakdown</h3>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between"><span>Total Principal:</span><span>{currencySymbol}{result.totalPrincipal.toLocaleString(undefined, {maximumFractionDigits: 0})}</span></div>
                          <div className="flex justify-between"><span>Total Roth Interest:</span><span>{currencySymbol}{result.totalInterestRoth.toLocaleString(undefined, {maximumFractionDigits: 0})}</span></div>
                          <div className="flex justify-between"><span>Total Taxable Interest:</span><span>{currencySymbol}{result.totalInterestTaxable.toLocaleString(undefined, {maximumFractionDigits: 0})}</span></div>
                          <div className="flex justify-between"><span>Total Tax Paid (Taxable Acct):</span><span>{currencySymbol}{result.totalTax.toLocaleString(undefined, {maximumFractionDigits: 0})}</span></div>
                        </div>
                    </div>
                </div>
                ) : (
                    <div className="flex items-center justify-center h-full bg-muted rounded-lg p-8">
                        <div className="text-center">
                            <Landmark className="mx-auto h-12 w-12 text-muted-foreground" />
                            <p className="mt-4 text-muted-foreground">Your results will appear here.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
        {result && (
             <div className="mt-8">
                <h3 className="text-lg font-bold text-center mb-4">Balance Accumulation Graph</h3>
                <div className="h-[350px]">
                    <ChartContainer config={{}} className="w-full h-full">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="age" tickFormatter={(val) => `Age ${val}`} />
                            <YAxis tickFormatter={(val) => currencySymbol + (val/1000) + 'k'} />
                            <Tooltip content={<ChartTooltipContent formatter={(value) => currencySymbol + Number(value).toFixed(0)}/>} />
                            <Legend />
                            <Line type="monotone" dataKey="Roth IRA" stroke="hsl(var(--chart-1))" dot={false} />
                            <Line type="monotone" dataKey="Taxable Account" stroke="hsl(var(--chart-2))" dot={false} />
                            <Line type="monotone" dataKey="Principal" stroke="hsl(var(--chart-3))" dot={false} />
                        </LineChart>
                    </ChartContainer>
                </div>
                <h3 className="text-lg font-bold text-center my-4">Annual Schedule</h3>
                <div className="h-[400px] overflow-y-auto border rounded-md">
                <Table>
                    <TableHeader className="sticky top-0 bg-secondary">
                        <TableRow>
                            <TableHead>Age</TableHead>
                            <TableHead colSpan={2} className="text-center">Principal</TableHead>
                            <TableHead colSpan={2} className="text-center">Roth IRA</TableHead>
                            <TableHead colSpan={2} className="text-center">Taxable</TableHead>
                        </TableRow>
                         <TableRow>
                            <TableHead></TableHead>
                            <TableHead className="text-right">Start</TableHead><TableHead className="text-right">End</TableHead>
                            <TableHead className="text-right">Start</TableHead><TableHead className="text-right">End</TableHead>
                            <TableHead className="text-right">Start</TableHead><TableHead className="text-right">End</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {result.schedule.map((row) => (
                            <TableRow key={row.age}>
                                <TableCell className="font-medium">{row.age}</TableCell>
                                <TableCell className="text-right">{currencySymbol}{row.principalStart.toLocaleString(undefined, {maximumFractionDigits: 0})}</TableCell>
                                <TableCell className="text-right">{currencySymbol}{row.principalEnd.toLocaleString(undefined, {maximumFractionDigits: 0})}</TableCell>
                                <TableCell className="text-right">{currencySymbol}{row.rothStart.toLocaleString(undefined, {maximumFractionDigits: 0})}</TableCell>
                                <TableCell className="text-right">{currencySymbol}{row.rothEnd.toLocaleString(undefined, {maximumFractionDigits: 0})}</TableCell>
                                <TableCell className="text-right">{currencySymbol}{row.taxableStart.toLocaleString(undefined, {maximumFractionDigits: 0})}</TableCell>
                                <TableCell className="text-right">{currencySymbol}{row.taxableEnd.toLocaleString(undefined, {maximumFractionDigits: 0})}</TableCell>
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
