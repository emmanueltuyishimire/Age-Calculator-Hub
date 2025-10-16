
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
import ShareButton from '../share-button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis } from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const formSchema = z.object({
  loanAmount: z.coerce.number().min(1, "Amount must be greater than zero."),
  loanTermYears: z.coerce.number().min(0).max(50).optional(),
  loanTermMonths: z.coerce.number().min(0).max(11).optional(),
  interestRate: z.coerce.number().min(0, "Rate cannot be negative.").max(50),
}).refine(data => (data.loanTermYears || 0) + (data.loanTermMonths || 0) > 0, {
  message: "Loan term must be at least one month.",
  path: ["loanTermMonths"],
});

type FormData = z.infer<typeof formSchema>;

interface AmortizationRow {
    year: number;
    interest: number;
    principal: number;
    balance: number;
}

interface Result {
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  amortizationSchedule: AmortizationRow[];
}

export default function AmortizationCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loanAmount: 200000,
      loanTermYears: 15,
      loanTermMonths: 0,
      interestRate: 6,
    },
  });

  function onSubmit(values: FormData) {
    const { loanAmount, loanTermYears = 0, loanTermMonths = 0, interestRate } = values;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTermYears * 12 + loanTermMonths;

    const monthlyPayment = monthlyRate > 0
        ? loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
        : loanAmount / numberOfPayments;
    
    const totalCost = monthlyPayment * numberOfPayments;
    const totalInterest = totalCost - loanAmount;

    let balance = loanAmount;
    const schedule: AmortizationRow[] = [];
    let annualInterest = 0;
    let annualPrincipal = 0;
    
    for (let i = 1; i <= numberOfPayments; i++) {
        const interestForMonth = balance * monthlyRate;
        const principalForMonth = monthlyPayment - interestForMonth;
        
        annualInterest += interestForMonth;
        annualPrincipal += principalForMonth;
        balance -= principalForMonth;

        if (i % 12 === 0 || i === numberOfPayments) {
            schedule.push({
                year: Math.ceil(i/12),
                interest: annualInterest,
                principal: annualPrincipal,
                balance: balance > 0 ? balance : 0,
            });
            annualInterest = 0;
            annualPrincipal = 0;
        }
    }

    setResult({
      monthlyPayment,
      totalInterest,
      totalCost,
      amortizationSchedule: schedule,
    });
  }

  function handleReset() {
    form.reset({
      loanAmount: undefined,
      loanTermYears: undefined,
      loanTermMonths: undefined,
      interestRate: undefined,
    });
    setResult(null);
  }

  const currencySymbol = '$';

  const pieChartData = result ? [
    { name: 'Principal', value: form.getValues('loanAmount'), fill: 'hsl(var(--chart-1))' },
    { name: 'Interest', value: result.totalInterest, fill: 'hsl(var(--chart-2))' },
  ].filter(item => item.value > 0) : [];

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="loanAmount" render={({ field }) => (<FormItem><FormLabel>Loan Amount</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormItem>
                    <FormLabel>Loan Term</FormLabel>
                    <div className="flex gap-2">
                      <FormField control={form.control} name="loanTermYears" render={({ field }) => (<FormControl><Input type="number" placeholder="Years" {...field} /></FormControl>)} />
                      <FormField control={form.control} name="loanTermMonths" render={({ field }) => (<FormControl><Input type="number" placeholder="Months" {...field} /></FormControl>)} />
                    </div>
                     <FormMessage>{form.formState.errors.loanTermMonths?.message}</FormMessage>
                  </FormItem>
                  <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Annual Interest Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button type="submit" className="w-full"><Landmark className="mr-2 h-4 w-4"/>Calculate</Button>
                    <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
                  </div>
              </form>
              </Form>
              {result && (
                 <div className="p-4 bg-muted rounded-lg text-center mt-6 space-y-4 animate-fade-in">
                    <div className="p-2 border rounded-lg bg-background">
                        <h4 className="font-semibold text-muted-foreground">Monthly Payment</h4>
                        <p className="text-2xl font-bold text-primary">{currencySymbol}{result.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="p-2 border rounded-lg bg-background"><span className="text-muted-foreground block">Total Payments</span><span className="font-semibold">{currencySymbol}{result.totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                        <div className="p-2 border rounded-lg bg-background"><span className="text-muted-foreground block">Total Interest</span><span className="font-semibold">{currencySymbol}{result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                    </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col space-y-4">
                {result ? (
                <div className="space-y-4 animate-fade-in">
                    <div className="h-[200px]">
                        <ChartContainer config={{}} className="mx-auto aspect-square h-full">
                            <PieChart>
                                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel formatter={(value) => `${currencySymbol}${Number(value).toFixed(2)}`} />} />
                                <Pie data={pieChartData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70} paddingAngle={5} strokeWidth={2}>
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                    </div>
                </div>
                ) : (
                    <div className="flex items-center justify-center h-full bg-muted rounded-lg p-8">
                        <div className="text-center">
                            <Landmark className="mx-auto h-12 w-12 text-muted-foreground" />
                            <p className="mt-4 text-muted-foreground">Your amortization results will appear here.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
        {result && (
             <div className="mt-8">
                <h3 className="text-lg font-bold text-center mb-4">Amortization Schedule</h3>
                <div className="h-[300px] overflow-y-auto border rounded-md">
                <Table>
                    <TableHeader className="sticky top-0 bg-secondary">
                        <TableRow>
                            <TableHead>Year</TableHead>
                            <TableHead className="text-right">Interest</TableHead>
                            <TableHead className="text-right">Principal</TableHead>
                            <TableHead className="text-right">Ending Balance</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {result.amortizationSchedule.map((row) => (
                            <TableRow key={row.year}>
                                <TableCell className="font-medium">{row.year}</TableCell>
                                <TableCell className="text-right">{currencySymbol}{row.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                                <TableCell className="text-right">{currencySymbol}{row.principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                                <TableCell className="text-right">{currencySymbol}{row.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
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
