
"use client";

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, addMonths } from 'date-fns';
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
import { RefreshCcw, Home } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ShareButton from '../share-button';

const currentYear = new Date().getFullYear();

const formSchema = z.object({
  homePrice: z.coerce.number().min(1, "Home price is required."),
  downPayment: z.coerce.number().min(0, "Deposit cannot be negative.").max(100),
  loanTerm: z.coerce.number().min(1, "Term is required.").max(40),
  interestRate: z.coerce.number().min(0, "Rate is required.").max(30),
  propertyTax: z.coerce.number().min(0).optional(),
  homeInsurance: z.coerce.number().min(0).optional(),
  otherCosts: z.coerce.number().min(0).optional(),
  startDateMonth: z.string().default((new Date().getMonth() + 1).toString()),
  startDateYear: z.coerce.number().default(currentYear),
}).refine(data => {
    return data.downPayment < 100;
}, {
  message: "Mortgage Deposit must be less than 100%.",
  path: ["downPayment"],
});

type FormData = z.infer<typeof formSchema>;

interface AmortizationRow {
    year: number;
    interest: number;
    principal: number;
    balance: number;
}

interface Result {
  monthlyRepayment: number;
  principalAndInterest: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyOther: number;
  totalInterest: number;
  loanAmount: number;
  depositAmount: number;
  payoffDate: Date;
  amortizationSchedule: AmortizationRow[];
  interestOnlyPayment: number;
  totalOutOfPocket: number;
}

const currencySymbol = '£';

export default function MortgageCalculatorUk() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      homePrice: 500000,
      downPayment: 25,
      loanTerm: 25,
      interestRate: 5,
      propertyTax: 1.2,
      homeInsurance: 2500,
      otherCosts: 6000,
      startDateMonth: (new Date().getMonth() + 1).toString(),
      startDateYear: currentYear,
    },
  });

  function onSubmit(values: FormData) {
    const { homePrice, downPayment, loanTerm, interestRate, propertyTax, homeInsurance, otherCosts, startDateMonth, startDateYear } = values;

    const depositAmount = homePrice * (downPayment / 100);
    const loanAmount = homePrice - depositAmount;
    
    if (loanAmount <= 0) {
        setResult(null); // Or handle as a fully paid property
        return;
    }

    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const principalAndInterest = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const monthlyTax = (homePrice * ((propertyTax || 0) / 100)) / 12;
    const monthlyInsurance = (homeInsurance || 0) / 12;
    const monthlyOther = (otherCosts || 0) / 12;
    
    const monthlyRepayment = principalAndInterest + monthlyTax + monthlyInsurance + monthlyOther;
    const totalOutOfPocket = monthlyRepayment * numberOfPayments;
    const totalInterest = (principalAndInterest * numberOfPayments) - loanAmount;

    // Amortization
    let balance = loanAmount;
    const schedule: AmortizationRow[] = [];
    for (let year = 1; year <= loanTerm; year++) {
        let annualInterest = 0;
        let annualPrincipal = 0;
        for (let month = 1; month <= 12; month++) {
            const interestForMonth = balance * monthlyRate;
            const principalForMonth = principalAndInterest - interestForMonth;
            annualInterest += interestForMonth;
            annualPrincipal += principalForMonth;
            balance -= principalForMonth;
        }
        schedule.push({ year, interest: annualInterest, principal: annualPrincipal, balance: balance > 0 ? balance : 0 });
    }

    const startDate = new Date(startDateYear, parseInt(startDateMonth, 10) - 1, 1);
    const payoffDate = addMonths(startDate, numberOfPayments);

    setResult({
      monthlyRepayment,
      principalAndInterest,
      monthlyTax,
      monthlyInsurance,
      monthlyOther,
      totalInterest,
      loanAmount,
      depositAmount,
      payoffDate,
      amortizationSchedule: schedule,
      interestOnlyPayment: loanAmount * monthlyRate,
      totalOutOfPocket,
    });
  }

  const chartData = result ? [
    { name: 'Mortgage', value: result.principalAndInterest, fill: 'hsl(var(--chart-1))' },
    { name: 'Taxes', value: result.monthlyTax, fill: 'hsl(var(--chart-2))' },
    { name: 'Insurance', value: result.monthlyInsurance, fill: 'hsl(var(--chart-3))' },
    { name: 'Other', value: result.monthlyOther, fill: 'hsl(var(--chart-4))' }
  ].filter(item => item.value > 0) : [];

  return (
    <Card className="w-full mx-auto shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField control={form.control} name="homePrice" render={({ field }) => (<FormItem><FormLabel>Home Price</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="downPayment" render={({ field }) => (<FormItem><FormLabel>Mortgage Deposit (%)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="loanTerm" render={({ field }) => (<FormItem><FormLabel>Loan Term (Years)</FormLabel><Select onValueChange={(val) => field.onChange(Number(val))} defaultValue={String(field.value)}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="30">30 Years</SelectItem><SelectItem value="25">25 Years</SelectItem><SelectItem value="20">20 Years</SelectItem><SelectItem value="15">15 Years</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Interest Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="propertyTax" render={({ field }) => (<FormItem><FormLabel>Taxes (% of price/year)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="homeInsurance" render={({ field }) => (<FormItem><FormLabel>Home Insurance (£/year)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="otherCosts" render={({ field }) => (<FormItem><FormLabel>Other Costs (£/year)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormItem><FormLabel>Start Date</FormLabel><div className="flex gap-2">
                        <FormField control={form.control} name="startDateMonth" render={({ field }) => (<Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>{Array.from({length: 12}, (_, i) => <SelectItem key={i} value={(i+1).toString()}>{format(new Date(0, i), 'MMM')}</SelectItem>)}</SelectContent></Select>)} />
                        <FormField control={form.control} name="startDateYear" render={({ field }) => (<FormControl><Input type="number" {...field} /></FormControl>)} />
                    </div></FormItem>
                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        <Button type="submit" className="w-full"><Home className="mr-2 h-4 w-4"/>Calculate</Button>
                    </div>
                </form>
              </Form>
            </div>
            <div className="flex flex-col space-y-4">
                {result ? (
                <div className="space-y-4 animate-fade-in">
                    <div className="p-4 bg-muted rounded-lg text-center">
                        <h3 className="text-lg font-semibold text-muted-foreground">Estimated Monthly Repayment</h3>
                        <p className="text-4xl font-bold text-primary">{currencySymbol}{result.monthlyRepayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <div className="p-2 border rounded-lg text-center"><span className="text-muted-foreground">Interest Only:</span><span className="font-semibold"> {currencySymbol}{result.interestOnlyPayment.toFixed(2)}/month</span></div>
                    <div className="h-[200px]">
                        <ChartContainer config={{}} className="mx-auto aspect-square h-full">
                            <PieChart><Tooltip cursor={false} content={<ChartTooltipContent hideLabel formatter={(value) => `${currencySymbol}${Number(value).toFixed(2)}`} />} /><Pie data={chartData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70} paddingAngle={2}><Cell/><Cell/><Cell/><Cell/></Pie></ChartContainer>
                    </div>
                    <div className="space-y-1 text-sm border-t pt-2">
                        <div className="flex justify-between"><span className="text-muted-foreground">Loan Amount:</span><span className="font-semibold">{currencySymbol}{result.loanAmount.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Mortgage Deposit:</span><span className="font-semibold">{currencySymbol}{result.depositAmount.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Total Interest:</span><span className="font-semibold">{currencySymbol}{result.totalInterest.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Total Out-of-Pocket:</span><span className="font-semibold">{currencySymbol}{result.totalOutOfPocket.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Payoff Date:</span><span className="font-semibold">{format(result.payoffDate, 'MMM yyyy')}</span></div>
                    </div>
                </div>
                ) : (
                    <div className="flex items-center justify-center h-full bg-muted rounded-lg p-8">
                        <div className="text-center"><Home className="mx-auto h-12 w-12 text-muted-foreground" /><p className="mt-4 text-muted-foreground">Your UK mortgage results will appear here.</p></div>
                    </div>
                )}
            </div>
        </div>
         {result && (
            <div className="mt-8"><h3 className="text-lg font-bold text-center mb-2">Amortization Schedule</h3><div className="h-[300px] overflow-y-auto border rounded-md">
                <Table><TableHeader className="sticky top-0 bg-secondary"><TableRow><TableHead>Year</TableHead><TableHead className="text-right">Interest</TableHead><TableHead className="text-right">Principal</TableHead><TableHead className="text-right">Balance</TableHead></TableRow></TableHeader>
                    <TableBody>{result.amortizationSchedule.map((row) => (<TableRow key={row.year}><TableCell className="font-medium">{row.year}</TableCell><TableCell className="text-right">{currencySymbol}{row.interest.toLocaleString(undefined, {maximumFractionDigits:0})}</TableCell><TableCell className="text-right">{currencySymbol}{row.principal.toLocaleString(undefined, {maximumFractionDigits:0})}</TableCell><TableCell className="text-right">{currencySymbol}{row.balance.toLocaleString(undefined, {maximumFractionDigits:0})}</TableCell></TableRow>))}</TableBody>
                </Table>
            </div></div>
        )}
      </CardContent>
    </Card>
  );
}
