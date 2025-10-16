
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
import { RefreshCcw, DollarSign } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const formSchema = z.object({
  initialInvestment: z.coerce.number().min(0, "Cannot be negative."),
  annualContribution: z.coerce.number().min(0).optional(),
  monthlyContribution: z.coerce.number().min(0).optional(),
  contributionAt: z.enum(['end', 'beginning']).default('end'),
  interestRate: z.coerce.number().min(0).max(50),
  compounding: z.enum(['annually', 'semiannually', 'quarterly', 'monthly']),
  termYears: z.coerce.number().min(0).int(),
  termMonths: z.coerce.number().min(0).max(11).int().optional(),
  taxRate: z.coerce.number().min(0).max(100).optional(),
  inflationRate: z.coerce.number().min(0).max(50).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface Result {
  endingBalance: number;
  totalPrincipal: number;
  totalContributions: number;
  totalInterest: number;
  initialInvestmentInterest: number;
  contributionsInterest: number;
  realValue: number;
  schedule: ScheduleRow[];
}

interface ScheduleRow {
  period: number;
  deposit: number;
  interest: number;
  endingBalance: number;
}

const currencySymbol = '$';

export default function CompoundInterestCalculator() {
  const [result, setResult] = useState<Result | null>(null);
  const [activeTab, setActiveTab] = useState<'annual' | 'monthly'>('annual');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { initialInvestment: 20000, annualContribution: 5000, monthlyContribution: 0, contributionAt: 'end', interestRate: 5, compounding: 'annually', termYears: 5, termMonths: 0, taxRate: 0, inflationRate: 3, },
  });

  function onSubmit(values: FormData) {
    const { initialInvestment, annualContribution = 0, monthlyContribution = 0, contributionAt, interestRate, compounding, termYears, termMonths = 0, taxRate = 0, inflationRate = 0 } = values;

    const periodsPerYear = { annually: 1, semiannually: 2, quarterly: 4, monthly: 12 }[compounding];
    const totalMonths = termYears * 12 + termMonths;
    const totalPeriods = Math.floor(totalMonths / (12 / periodsPerYear));
    const periodicRate = interestRate / 100 / periodsPerYear;
    const periodicTaxRate = taxRate / 100 / periodsPerYear;
    
    const periodicContribution = (annualContribution / periodsPerYear) + monthlyContribution * (12 / periodsPerYear);

    const schedule: ScheduleRow[] = [];
    let balance = initialInvestment;
    let totalInterest = 0;
    let initialInterest = 0;
    let contributionsInterest = 0;

    for (let i = 1; i <= totalPeriods; i++) {
        let interest = 0;
        let deposit = periodicContribution;

        if (contributionAt === 'beginning') {
            balance += deposit;
        }

        interest = balance * periodicRate;
        
        if (taxRate > 0) {
            interest *= (1 - periodicTaxRate);
        }

        balance += interest;

        if (contributionAt === 'end') {
            balance += deposit;
        }
        
        totalInterest += interest;
        
        // Simplified interest allocation
        const initialProportion = initialInvestment / (initialInvestment + periodicContribution * i);
        initialInterest += interest * initialProportion;
        contributionsInterest += interest * (1-initialProportion);

        schedule.push({ period: i, deposit, interest, endingBalance: balance });
    }

    const realValue = balance / Math.pow(1 + (inflationRate / 100), termYears + termMonths / 12);
    
    const totalContributions = periodicContribution * totalPeriods;

    setResult({
      endingBalance: balance,
      totalPrincipal: initialInvestment + totalContributions,
      totalContributions,
      totalInterest,
      initialInvestmentInterest: initialInterest,
      contributionsInterest,
      realValue,
      schedule,
    });
  }

  const pieData = result ? [
    { name: 'Initial Investment', value: form.getValues('initialInvestment'), fill: 'hsl(var(--chart-1))' },
    { name: 'Contributions', value: result.totalContributions, fill: 'hsl(var(--chart-2))' },
    { name: 'Interest', value: result.totalInterest, fill: 'hsl(var(--chart-3))' },
  ] : [];
  
  const barChartData = result?.schedule.map(row => ({
    name: `P ${row.period}`,
    Interest: row.interest,
    'Initial investment': form.getValues('initialInvestment'),
    Contributions: row.deposit * row.period,
  })) || [];


  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="initialInvestment" render={({ field }) => (<FormItem><FormLabel>Initial investment</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="annualContribution" render={({ field }) => (<FormItem><FormLabel>Annual contribution</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="monthlyContribution" render={({ field }) => (<FormItem><FormLabel>Monthly contribution</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="contributionAt" render={({ field }) => (<FormItem><FormLabel>Contribute at the</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl><SelectContent><SelectItem value="end">End of period</SelectItem><SelectItem value="beginning">Beginning of period</SelectItem></SelectContent></Select></FormItem>)} />
                    <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Interest rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="compounding" render={({ field }) => (<FormItem><FormLabel>Compound</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl><SelectContent><SelectItem value="annually">Annually</SelectItem><SelectItem value="semiannually">Semiannually</SelectItem><SelectItem value="quarterly">Quarterly</SelectItem><SelectItem value="monthly">Monthly</SelectItem></SelectContent></Select></FormItem>)} />
                    <FormItem className="col-span-2"><FormLabel>Investment length</FormLabel><div className="flex gap-2">
                        <FormField control={form.control} name="termYears" render={({ field }) => <FormControl><Input type="number" placeholder="Years" {...field} /></FormControl>} />
                        <FormField control={form.control} name="termMonths" render={({ field }) => <FormControl><Input type="number" placeholder="Months" {...field} /></FormControl>} />
                    </div></FormItem>
                    <FormField control={form.control} name="taxRate" render={({ field }) => (<FormItem><FormLabel>Tax rate (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="inflationRate" render={({ field }) => (<FormItem><FormLabel>Inflation rate (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    </div>
                    <Button type="submit" className="w-full"><DollarSign className="mr-2 h-4 w-4"/>Calculate</Button>
                </form>
                </Form>
            </div>
            <div className="flex flex-col space-y-4">
                {result ? (
                <div className="space-y-4 animate-fade-in">
                    <div className="p-4 bg-muted rounded-lg text-center">
                        <h3 className="text-lg font-semibold text-muted-foreground">Ending balance</h3>
                        <p className="text-4xl font-bold text-primary">{currencySymbol}{result.endingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <div className="space-y-1 text-sm border p-2 rounded-lg">
                        <div className="flex justify-between"><span>Total principal:</span><span className="font-semibold">{currencySymbol}{result.totalPrincipal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                        <div className="flex justify-between"><span>Total contributions:</span><span className="font-semibold">{currencySymbol}{result.totalContributions.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                        <div className="flex justify-between"><span>Total interest:</span><span className="font-semibold">{currencySymbol}{result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                        <div className="flex justify-between border-t pt-1 mt-1"><span>Buying power after inflation:</span><span className="font-semibold">{currencySymbol}{result.realValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                    </div>
                    <div className="h-[150px]"><ChartContainer config={{}} className="mx-auto aspect-square h-full"><PieChart><Tooltip content={<ChartTooltipContent hideLabel />} /><Pie data={pieData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={60}><Cell key="cell-0" fill="hsl(var(--chart-1))" /><Cell key="cell-1" fill="hsl(var(--chart-2))" /><Cell key="cell-2" fill="hsl(var(--chart-3))" /></Pie></PieChart></ChartContainer></div>
                </div>
                ) : (
                    <div className="flex items-center justify-center h-full bg-muted rounded-lg p-8"><div className="text-center"><DollarSign className="mx-auto h-12 w-12 text-muted-foreground" /><p className="mt-4 text-muted-foreground">Your results will appear here.</p></div></div>
                )}
            </div>
        </div>
        {result && (
             <div className="mt-8">
                <h3 className="text-lg font-bold text-center mb-4">Accumulation Schedule</h3>
                <div className="h-[250px] w-full mb-4">
                    <ResponsiveContainer><BarChart data={barChartData}><XAxis dataKey="name" tick={{ fontSize: 12 }}/><YAxis tickFormatter={(val) => `${currencySymbol}${val/1000}k`} tick={{ fontSize: 12 }} /><Tooltip formatter={(value: number) => `${currencySymbol}${value.toLocaleString(undefined, {maximumFractionDigits: 0})}`} contentStyle={{ background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/><Legend /><Bar dataKey="Initial investment" stackId="a" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} /><Bar dataKey="Contributions" stackId="a" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} /><Bar dataKey="Interest" stackId="a" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer>
                </div>
                <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)}>
                    <TabsList className="grid w-full grid-cols-2"><TabsTrigger value="annual">Annual</TabsTrigger><TabsTrigger value="monthly">Monthly</TabsTrigger></TabsList>
                    <div className="h-[300px] overflow-y-auto border rounded-md mt-2">
                        <Table><TableHeader className="sticky top-0 bg-secondary"><TableRow><TableHead>Period</TableHead><TableHead>Deposit</TableHead><TableHead>Interest</TableHead><TableHead>Ending balance</TableHead></TableRow></TableHeader>
                            <TableBody>
                            {result.schedule.map(row => (
                                <TableRow key={row.period}><TableCell>{row.period}</TableCell><TableCell>{currencySymbol}{row.deposit.toFixed(2)}</TableCell><TableCell>{currencySymbol}{row.interest.toFixed(2)}</TableCell><TableCell>{currencySymbol}{row.endingBalance.toFixed(2)}</TableCell></TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </div>
                </Tabs>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
