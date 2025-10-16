
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
import { RefreshCcw, DollarSign, PiggyBank } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
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
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

const formSchema = z.object({
  n: z.coerce.number().min(0, "Must be non-negative."),
  pv: z.coerce.number().min(0, "Must be non-negative."),
  iy: z.coerce.number().min(0).max(50),
  pmt: z.coerce.number().min(0, "Must be non-negative."),
  compounding: z.enum(['annually', 'semiannually', 'quarterly', 'monthly']).default('annually'),
  paymentAt: z.enum(['end', 'beginning']).default('end'),
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
  futureValue: number;
  totalPrincipal: number;
  totalInterest: number;
  schedule: ScheduleRow[];
}

const currencySymbol = '$';

export default function FutureValueCalculator() {
  const [result, setResult] = useState<Result | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { n: 10, pv: 1000, iy: 6, pmt: 100, compounding: 'annually', paymentAt: 'end' },
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
    const { n: termYears, pv, iy, pmt, compounding, paymentAt } = values;
    const periodsPerYear = getCompoundingPeriods(compounding);
    const n = termYears * periodsPerYear;
    const r = iy / 100 / periodsPerYear;
    const pmtAtBeginning = paymentAt === 'beginning';

    const schedule: ScheduleRow[] = [];
    let balance = pv;
    let totalInterest = 0;

    for (let i = 1; i <= n; i++) {
        const startBalance = balance;
        const interest = pmtAtBeginning ? (balance + pmt) * r : balance * r;
        const deposit = pmt;
        
        balance = pmtAtBeginning ? (balance + pmt) * (1 + r) : balance * (1 + r) + pmt;
        totalInterest += interest;

        schedule.push({ period: i, startBalance, deposit, interest, endBalance: balance });
    }

    setResult({
      futureValue: balance,
      totalPrincipal: pv + (pmt * n),
      totalInterest,
      schedule,
    });
  }

  const pieData = result ? [
    { name: 'Starting Amount', value: form.getValues('pv'), fill: 'hsl(var(--chart-1))' },
    { name: 'Total Deposits', value: form.getValues('pmt') * form.getValues('n') * getCompoundingPeriods(form.getValues('compounding')), fill: 'hsl(var(--chart-2))' },
    { name: 'Total Interest', value: result.totalInterest, fill: 'hsl(var(--chart-3))' },
  ] : [];

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField control={form.control} name="n" render={({ field }) => (<FormItem><FormLabel>Number of Years (N)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="pv" render={({ field }) => (<FormItem><FormLabel>Starting Amount (PV)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="iy" render={({ field }) => (<FormItem><FormLabel>Interest Rate (I/Y %)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="pmt" render={({ field }) => (<FormItem><FormLabel>Periodic Deposit (PMT)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />

                    <div className="flex items-center space-x-2 pt-2">
                        <Button type="button" variant="link" onClick={() => setShowSettings(!showSettings)} className="p-0 h-auto">+ Advanced Settings</Button>
                    </div>

                    {showSettings && (
                        <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                            <FormField control={form.control} name="compounding" render={({ field }) => (<FormItem><FormLabel>Compounding</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="annually">Annually</SelectItem><SelectItem value="semiannually">Semiannually</SelectItem><SelectItem value="quarterly">Quarterly</SelectItem><SelectItem value="monthly">Monthly</SelectItem></SelectContent></Select></FormItem>)} />
                            <FormField control={form.control} name="paymentAt" render={({ field }) => (<FormItem><FormLabel>PMT made at the</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="end">End of Period</SelectItem><SelectItem value="beginning">Beginning of Period</SelectItem></SelectContent></Select></FormItem>)} />
                        </div>
                    )}
                    
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
                        <h3 className="text-lg font-semibold text-muted-foreground">Future Value</h3>
                        <p className="text-4xl font-bold text-primary">{currencySymbol}{result.futureValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                     <div className="h-[200px] w-full">
                        <ChartContainer config={{}} className="mx-auto aspect-square h-full">
                            <PieChart><Tooltip content={<ChartTooltipContent hideLabel />} /><Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70}><Cell key="cell-0" fill="hsl(var(--chart-1))" /><Cell key="cell-1" fill="hsl(var(--chart-2))" /><Cell key="cell-2" fill="hsl(var(--chart-3))" /></Pie></ChartContainer>
                    </div>
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between"><span className="text-muted-foreground">Starting Amount:</span><span className="font-semibold">{currencySymbol}{form.getValues('pv').toLocaleString()}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Total Periodic Deposits:</span><span className="font-semibold">{currencySymbol}{(form.getValues('pmt') * form.getValues('n') * getCompoundingPeriods(form.getValues('compounding'))).toLocaleString()}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Total Interest:</span><span className="font-semibold">{currencySymbol}{result.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                    </div>
                </div>
                ) : (
                    <div className="flex items-center justify-center h-full bg-muted rounded-lg p-8">
                        <div className="text-center">
                            <PiggyBank className="mx-auto h-12 w-12 text-muted-foreground" />
                            <p className="mt-4 text-muted-foreground">Your results will appear here.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
        {result && (
             <div className="mt-8">
                <h3 className="text-lg font-bold text-center mb-4">Investment Growth Schedule</h3>
                <div className="h-[300px] overflow-y-auto border rounded-md">
                <Table>
                    <TableHeader className="sticky top-0 bg-secondary">
                        <TableRow><TableHead>Period</TableHead><TableHead>Start Balance</TableHead><TableHead>Deposit</TableHead><TableHead>Interest</TableHead><TableHead>End Balance</TableHead></TableRow>
                    </TableHeader>
                    <TableBody>
                        {result.schedule.map(row => (
                            <TableRow key={row.period}>
                                <TableCell>{row.period}</TableCell>
                                <TableCell>{currencySymbol}{row.startBalance.toFixed(2)}</TableCell>
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
