
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
import { RefreshCcw, Landmark } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const formSchema = z.object({
  currentBalance: z.coerce.number().min(0),
  annualContribution: z.coerce.number().min(0, "Contribution must be non-negative."),
  rateOfReturn: z.coerce.number().min(0).max(30),
  currentAge: z.coerce.number().min(18).max(99),
  retirementAge: z.coerce.number().min(18).max(100),
  currentTaxRate: z.coerce.number().min(0).max(70),
  retirementTaxRate: z.coerce.number().min(0).max(70),
}).refine(data => data.retirementAge > data.currentAge, {
  message: "Retirement age must be greater than current age.",
  path: ["retirementAge"],
});

type FormData = z.infer<typeof formSchema>;

interface AccountBalances {
  traditional: number;
  traditionalAfterTax: number;
  roth: number;
  taxable: number;
}

interface ScheduleRow {
    age: number;
    tradStart: number;
    tradEnd: number;
    tradEndAfterTax: number;
    rothStart: number;
    rothEnd: number;
    taxableStart: number;
    taxableEnd: number;
}

interface Result {
  finalBalances: AccountBalances;
  schedule: ScheduleRow[];
}

const currencySymbol = '$';

export default function IraCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { currentBalance: 20000, annualContribution: 7000, rateOfReturn: 6, currentAge: 30, retirementAge: 65, currentTaxRate: 25, retirementTaxRate: 15 },
  });

  function onSubmit(values: FormData) {
    const { currentBalance, annualContribution, rateOfReturn, currentAge, retirementAge, currentTaxRate, retirementTaxRate } = values;
    
    const yearsToRetirement = retirementAge - currentAge;
    const r = rateOfReturn / 100;
    const currentTax = currentTaxRate / 100;
    const retirementTax = retirementTaxRate / 100;

    const afterTaxContribution = annualContribution * (1 - currentTax);
    
    const schedule: ScheduleRow[] = [];

    // Initial balances
    let tradBalance = currentBalance;
    let rothBalance = currentBalance * (1 - currentTax);
    let taxableBalance = currentBalance * (1 - currentTax);

    for (let i = 0; i < yearsToRetirement; i++) {
        const age = currentAge + i;
        const row: Partial<ScheduleRow> = { age, tradStart: tradBalance, rothStart: rothBalance, taxableStart: taxableBalance };

        // Traditional IRA
        tradBalance = (tradBalance + annualContribution) * (1 + r);
        row.tradEnd = tradBalance;
        row.tradEndAfterTax = tradBalance * (1-retirementTax);

        // Roth IRA
        rothBalance = (rothBalance + afterTaxContribution) * (1 + r);
        row.rothEnd = rothBalance;

        // Taxable Savings
        const taxableGrowth = taxableBalance * r;
        const taxOnGrowth = taxableGrowth * currentTax; // Simplified capital gains tax
        taxableBalance = (taxableBalance + afterTaxContribution) + taxableGrowth - taxOnGrowth;
        row.taxableEnd = taxableBalance;

        schedule.push(row as ScheduleRow);
    }
    
    setResult({
        finalBalances: {
            traditional: tradBalance,
            traditionalAfterTax: tradBalance * (1 - retirementTax),
            roth: rothBalance,
            taxable: taxableBalance,
        },
        schedule
    });
  }

  function handleReset() {
    form.reset();
    setResult(null);
  }

  const chartData = result?.schedule.map(row => ({
    age: row.age,
    "Traditional (pre-tax)": row.tradEnd,
    "Traditional (after-tax)": row.tradEndAfterTax,
    "Roth IRA (after-tax)": row.rothEnd,
    "Taxable (after-tax)": row.taxableEnd,
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
                    <FormField control={form.control} name="annualContribution" render={({ field }) => (<FormItem><FormLabel>Annual Contribution</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="rateOfReturn" render={({ field }) => (<FormItem><FormLabel>Expected Return Rate (%)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="currentAge" render={({ field }) => (<FormItem><FormLabel>Current Age</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="retirementAge" render={({ field }) => (<FormItem><FormLabel>Retirement Age</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="currentTaxRate" render={({ field }) => (<FormItem><FormLabel>Current Tax Rate (%)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="retirementTaxRate" render={({ field }) => (<FormItem className="sm:col-span-2"><FormLabel>Expected Retirement Tax Rate (%)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>)} />
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
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between font-semibold"><span className="text-muted-foreground">Traditional IRA (pre-tax):</span><span>{currencySymbol}{result.finalBalances.traditional.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                          <div className="flex justify-between border-t pt-1 mt-1"><span className="text-muted-foreground">Traditional IRA (after-tax):</span><span>{currencySymbol}{result.finalBalances.traditionalAfterTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Roth IRA (after-tax):</span><span>{currencySymbol}{result.finalBalances.roth.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                           <div className="flex justify-between"><span className="text-muted-foreground">Taxable Savings (after-tax):</span><span>{currencySymbol}{result.finalBalances.taxable.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                        </div>
                    </div>
                     <div className="p-4 bg-muted rounded-lg space-y-2">
                         <p className="text-sm text-center text-muted-foreground">
                            A Traditional IRA can accumulate <strong className="text-primary">{currencySymbol}{(result.finalBalances.traditionalAfterTax - result.finalBalances.roth).toLocaleString(undefined, {maximumFractionDigits: 0})}</strong> more after-tax balance than a Roth IRA.
                            A Roth IRA can accumulate <strong className="text-primary">{currencySymbol}{(result.finalBalances.roth - result.finalBalances.taxable).toLocaleString(undefined, {maximumFractionDigits: 0})}</strong> more than a taxable account.
                         </p>
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
                            <Line type="monotone" dataKey="Traditional (pre-tax)" stroke="hsl(var(--chart-1))" dot={false} />
                            <Line type="monotone" dataKey="Traditional (after-tax)" stroke="hsl(var(--chart-2))" dot={false} />
                            <Line type="monotone" dataKey="Roth IRA (after-tax)" stroke="hsl(var(--chart-3))" dot={false} />
                            <Line type="monotone" dataKey="Taxable (after-tax)" stroke="hsl(var(--chart-4))" dot={false} />
                        </LineChart>
                    </ChartContainer>
                </div>
                <h3 className="text-lg font-bold text-center my-4">Annual Schedule</h3>
                <div className="h-[400px] overflow-y-auto border rounded-md">
                <Table>
                    <TableHeader className="sticky top-0 bg-secondary">
                        <TableRow>
                            <TableHead>Age</TableHead>
                            <TableHead colSpan={2} className="text-center">Traditional IRA (pre-tax)</TableHead>
                            <TableHead colSpan={2} className="text-center">Roth IRA (after-tax)</TableHead>
                            <TableHead colSpan={2} className="text-center">Taxable (after-tax)</TableHead>
                        </TableRow>
                         <TableRow>
                            <TableHead></TableHead>
                            <TableHead className="text-right">Start</TableHead>
                            <TableHead className="text-right">End</TableHead>
                            <TableHead className="text-right">Start</TableHead>
                            <TableHead className="text-right">End</TableHead>
                             <TableHead className="text-right">Start</TableHead>
                            <TableHead className="text-right">End</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {result.schedule.map((row) => (
                            <TableRow key={row.age}>
                                <TableCell className="font-medium">{row.age}</TableCell>
                                <TableCell className="text-right">{currencySymbol}{row.tradStart.toLocaleString(undefined, {maximumFractionDigits: 0})}</TableCell>
                                <TableCell className="text-right">{currencySymbol}{row.tradEnd.toLocaleString(undefined, {maximumFractionDigits: 0})}</TableCell>
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
