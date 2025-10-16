
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
  initialDeposit: z.coerce.number().min(1, "Initial deposit is required."),
  interestRate: z.coerce.number().min(0, "Interest rate must be non-negative."),
  compounding: z.enum(['annually', 'semiannually', 'quarterly', 'monthly', 'daily']).default('annually'),
  depositLengthYears: z.coerce.number().min(0).optional(),
  depositLengthMonths: z.coerce.number().min(0).optional(),
  taxRate: z.coerce.number().min(0).max(100).optional(),
}).refine(data => (data.depositLengthYears || 0) + (data.depositLengthMonths || 0) > 0, {
    message: "Deposit length must be at least 1 month.",
    path: ["depositLengthMonths"],
});

type FormData = z.infer<typeof formSchema>;

interface ScheduleRow {
    year: number;
    interest: number;
    endBalance: number;
}

interface Result {
  endBalance: number;
  totalInterest: number;
  schedule: ScheduleRow[];
}

const currencySymbol = '$';

export default function CdCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initialDeposit: 10000,
      interestRate: 5,
      compounding: 'annually',
      depositLengthYears: 3,
      depositLengthMonths: 0,
      taxRate: 0,
    },
  });

  const getCompoundingPeriods = (c: string) => {
    switch (c) {
      case 'daily': return 365;
      case 'monthly': return 12;
      case 'quarterly': return 4;
      case 'semiannually': return 2;
      default: return 1;
    }
  };

  function onSubmit(values: FormData) {
    const { initialDeposit, interestRate, compounding, depositLengthYears = 0, depositLengthMonths = 0, taxRate = 0 } = values;
    
    const termInYears = depositLengthYears + (depositLengthMonths / 12);
    const n = getCompoundingPeriods(compounding);
    const netRate = (interestRate / 100) * (1 - (taxRate / 100));
    
    const endBalance = initialDeposit * Math.pow(1 + netRate / n, n * termInYears);
    const totalInterest = endBalance - initialDeposit;
    
    const schedule: ScheduleRow[] = [];
    let currentBalance = initialDeposit;
    for (let year = 1; year <= Math.ceil(termInYears); year++) {
        const interestThisYear = currentBalance * Math.pow(1 + netRate/n, n) - currentBalance;
        currentBalance += interestThisYear;
        schedule.push({
            year,
            interest: interestThisYear,
            endBalance: currentBalance,
        });
    }

    setResult({
      endBalance,
      totalInterest,
      schedule,
    });
  }

  const pieData = result ? [
    { name: 'Initial Deposit', value: form.getValues('initialDeposit'), fill: 'hsl(var(--chart-1))' },
    { name: 'Total Interest', value: result.totalInterest, fill: 'hsl(var(--chart-2))' },
  ] : [];

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="initialDeposit" render={({ field }) => (<FormItem><FormLabel>Initial deposit</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage/></FormItem>)} />
                  <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Interest rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage/></FormItem>)} />
                  <FormField control={form.control} name="compounding" render={({ field }) => (<FormItem><FormLabel>Compound</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="annually">Annually</SelectItem><SelectItem value="semiannually">Semiannually</SelectItem><SelectItem value="quarterly">Quarterly</SelectItem><SelectItem value="monthly">Monthly</SelectItem><SelectItem value="daily">Daily</SelectItem></SelectContent></Select><FormMessage/></FormItem>)} />
                  <FormItem>
                    <FormLabel>Deposit length</FormLabel>
                    <div className="flex gap-2">
                        <FormField control={form.control} name="depositLengthYears" render={({ field }) => <FormControl><Input type="number" placeholder="Years" {...field} /></FormControl>} />
                        <FormField control={form.control} name="depositLengthMonths" render={({ field }) => <FormControl><Input type="number" placeholder="Months" {...field} /></FormControl>} />
                    </div>
                    <FormMessage>{form.formState.errors.depositLengthMonths?.message}</FormMessage>
                  </FormItem>
                  <FormField control={form.control} name="taxRate" render={({ field }) => (<FormItem><FormLabel>Marginal tax rate (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage/></FormItem>)} />
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <Button type="submit" className="w-full"><PiggyBank className="mr-2 h-4 w-4"/>Calculate</Button>
                      <Button onClick={() => form.reset()} type="button" variant="outline" className="w-full sm:w-auto"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
                  </div>
              </form>
              </Form>
            </div>
            
            <div className="flex flex-col space-y-4">
                {result ? (
                <div className="space-y-4 animate-fade-in">
                    <div className="p-4 bg-muted rounded-lg text-center">
                        <h3 className="text-lg font-semibold text-muted-foreground">End Balance</h3>
                        <p className="text-4xl font-bold text-primary">{currencySymbol}{result.endBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                     <div className="h-[200px] w-full">
                        <ChartContainer config={{}} className="mx-auto aspect-square h-full">
                            <PieChart><Tooltip content={<ChartTooltipContent hideLabel formatter={(value) => `${currencySymbol}${Number(value).toLocaleString(undefined, {maximumFractionDigits:0})}`}/>} /><Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70}><Cell key="cell-0" fill="hsl(var(--chart-1))" /><Cell key="cell-1" fill="hsl(var(--chart-2))" /></Pie></ChartContainer>
                    </div>
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between"><span className="text-muted-foreground">Initial Deposit:</span><span className="font-semibold">{currencySymbol}{form.getValues('initialDeposit').toLocaleString()}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Total Interest:</span><span className="font-semibold">{currencySymbol}{result.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
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
                <div className="h-[300px] overflow-y-auto border rounded-md">
                <Table><TableHeader className="sticky top-0 bg-secondary"><TableRow><TableHead>Year</TableHead><TableHead className="text-right">Interest</TableHead><TableHead className="text-right">Ending balance</TableHead></TableRow></TableHeader>
                    <TableBody>
                        {result.schedule.map(row => (
                            <TableRow key={row.year}>
                                <TableCell>{row.year}</TableCell>
                                <TableCell className="text-right">{currencySymbol}{row.interest.toFixed(2)}</TableCell>
                                <TableCell className="text-right">{currencySymbol}{row.endBalance.toFixed(2)}</TableCell>
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
