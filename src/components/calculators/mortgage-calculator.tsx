
"use client";

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, addMonths } from 'date-fns';
import {
  Card,
  CardContent,
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
import ShareButton from '../share-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend, Tooltip } from "recharts"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const currentYear = new Date().getFullYear();

const formSchema = z.object({
  homePrice: z.coerce.number().min(1, "Home price must be greater than zero."),
  downPayment: z.coerce.number().min(0, "Down payment cannot be negative."),
  downPaymentType: z.enum(['percent', 'amount']).default('percent'),
  loanTerm: z.coerce.number().min(1, "Loan term must be at least 1 year.").max(40),
  interestRate: z.coerce.number().min(0, "Rate cannot be negative.").max(30),
  propertyTax: z.coerce.number().min(0, "Cannot be negative.").optional(),
  propertyTaxType: z.enum(['percent', 'amount']).default('percent'),
  homeInsurance: z.coerce.number().min(0, "Cannot be negative.").optional(),
  pmi: z.coerce.number().min(0, "Cannot be negative.").optional(),
  hoa: z.coerce.number().min(0, "Cannot be negative.").optional(),
  otherCosts: z.coerce.number().min(0, "Cannot be negative.").optional(),
  startDateMonth: z.string().default((new Date().getMonth() + 1).toString()),
  startDateYear: z.coerce.number().default(currentYear + 1),
}).refine(data => {
    const dpAmount = data.downPaymentType === 'percent' ? data.homePrice * (data.downPayment / 100) : data.downPayment;
    return dpAmount < data.homePrice;
}, {
  message: "Down payment must be less than home price.",
  path: ["downPayment"],
});

type FormData = z.infer<typeof formSchema>;

interface AmortizationRow {
    year: number;
    interest: number;
    principal: number;
    balance: number;
}

interface MonthlyAmortizationRow {
    month: number;
    date: string;
    interest: number;
    principal: number;
    balance: number;
}

interface Result {
  monthlyPayment: number;
  principalAndInterest: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyPmi: number;
  monthlyHoa: number;
  monthlyOther: number;
  totalMonthly: number;
  totalInterest: number;
  totalPayments: number;
  loanAmount: number;
  downPaymentAmount: number;
  payoffDate: Date;
  annualSchedule: AmortizationRow[];
  monthlySchedule: MonthlyAmortizationRow[];
}

export default function MortgageCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      homePrice: 500000,
      downPayment: 20,
      downPaymentType: 'percent',
      loanTerm: 30,
      interestRate: 6.279,
      propertyTax: 1.2,
      propertyTaxType: 'percent',
      homeInsurance: 2500,
      pmi: 0,
      hoa: 0,
      otherCosts: 5000,
      startDateMonth: (new Date().getMonth() + 1).toString(),
      startDateYear: currentYear + 1,
    },
  });

  function onSubmit(values: FormData) {
    const { homePrice, downPayment, downPaymentType, loanTerm, interestRate, propertyTax, propertyTaxType, homeInsurance, pmi, hoa, otherCosts, startDateMonth, startDateYear } = values;

    const dpAmount = downPaymentType === 'percent' ? homePrice * (downPayment / 100) : downPayment;
    
    if (dpAmount >= homePrice) {
        form.setError("downPayment", { type: "manual", message: "Down payment must be less than home price." });
        return;
    }

    const loanAmount = homePrice - dpAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const principalAndInterest = loanAmount > 0 && monthlyRate >= 0
        ? monthlyRate > 0 ? loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1) : loanAmount / numberOfPayments
        : 0;
    
    const taxAmount = propertyTaxType === 'percent' ? homePrice * ((propertyTax || 0) / 100) : (propertyTax || 0);
    const monthlyTax = taxAmount / 12;
    
    const monthlyInsurance = (homeInsurance || 0) / 12;
    const monthlyPmi = (pmi || 0) / 12;
    const monthlyHoa = hoa || 0;
    const monthlyOther = (otherCosts || 0) / 12;
    
    const totalMonthly = principalAndInterest + monthlyTax + monthlyInsurance + monthlyPmi + monthlyHoa + monthlyOther;
    
    const totalPayments = principalAndInterest * numberOfPayments;
    const totalInterest = totalPayments - loanAmount;

    // Schedules
    let balance = loanAmount;
    const annualSchedule: AmortizationRow[] = [];
    const monthlySchedule: MonthlyAmortizationRow[] = [];
    const startDate = new Date(startDateYear, parseInt(startDateMonth, 10) - 1, 1);
    
    if (loanAmount > 0) {
        for (let i = 0; i < numberOfPayments; i++) {
            const interestForMonth = balance * monthlyRate;
            const principalForMonth = principalAndInterest - interestForMonth;
            balance -= principalForMonth;

            monthlySchedule.push({
                month: i + 1,
                date: format(addMonths(startDate, i), 'MMM yyyy'),
                interest: interestForMonth,
                principal: principalForMonth,
                balance: balance > 0 ? balance : 0,
            });
        }
        for (let year = 1; year <= loanTerm; year++) {
            const yearSlice = monthlySchedule.slice((year - 1) * 12, year * 12);
            annualSchedule.push({
                year: year,
                interest: yearSlice.reduce((acc, row) => acc + row.interest, 0),
                principal: yearSlice.reduce((acc, row) => acc + row.principal, 0),
                balance: yearSlice[11]?.balance || 0,
            });
        }
    }

    const payoffDate = addMonths(startDate, numberOfPayments - 1);

    setResult({
      monthlyPayment: principalAndInterest,
      totalMonthly,
      principalAndInterest,
      monthlyTax,
      monthlyInsurance,
      monthlyPmi,
      monthlyHoa,
      monthlyOther,
      totalInterest,
      totalPayments,
      loanAmount,
      downPaymentAmount: dpAmount,
      payoffDate,
      annualSchedule,
      monthlySchedule,
    });
  }
  
  const currencySymbol = '$';

  const pieData = result ? [
    { name: 'Mortgage Payment', value: result.monthlyPayment, fill: 'hsl(var(--chart-1))' },
    { name: 'Property Tax', value: result.monthlyTax, fill: 'hsl(var(--chart-2))' },
    { name: 'Home Insurance', value: result.monthlyInsurance, fill: 'hsl(var(--chart-3))' },
    { name: 'Other Costs', value: result.monthlyPmi + result.monthlyHoa + result.monthlyOther, fill: 'hsl(var(--chart-4))' }
  ].filter(item => item.value > 0) : [];
  
   const amortizationChartData = result?.annualSchedule.map(row => ({
      name: `Year ${row.year}`,
      Balance: row.balance,
      Interest: row.interest,
      Principal: row.principal,
    })) || [];


  return (
    <Card className="w-full mx-auto shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                <FormField control={form.control} name="homePrice" render={({ field }) => (<FormItem><FormLabel>Home Price</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormItem>
                    <FormLabel>Down Payment</FormLabel>
                    <div className="flex gap-2">
                    <FormField control={form.control} name="downPayment" render={({ field }) => (<FormControl><Input type="number" {...field} /></FormControl>)} />
                    <FormField control={form.control} name="downPaymentType" render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent><SelectItem value="percent">%</SelectItem><SelectItem value="amount">$</SelectItem></SelectContent>
                        </Select>
                    )} />
                    </div>
                    <FormMessage>{form.formState.errors.downPayment?.message}</FormMessage>
                </FormItem>
                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="loanTerm" render={({ field }) => (<FormItem><FormLabel>Loan Term</FormLabel><Select onValueChange={(val) => field.onChange(Number(val))} defaultValue={String(field.value)}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="30">30 Years</SelectItem><SelectItem value="20">20 Years</SelectItem><SelectItem value="15">15 Years</SelectItem><SelectItem value="10">10 Years</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Interest Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                <FormItem>
                    <FormLabel>Property Taxes</FormLabel>
                    <div className="flex gap-2">
                    <FormField control={form.control} name="propertyTax" render={({ field }) => (<FormControl><Input type="number" {...field} /></FormControl>)} />
                    <FormField control={form.control} name="propertyTaxType" render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent><SelectItem value="percent">%</SelectItem><SelectItem value="amount">$</SelectItem></SelectContent>
                        </Select>
                    )} />
                    </div>
                    <FormMessage>{form.formState.errors.propertyTax?.message}</FormMessage>
                </FormItem>
                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="homeInsurance" render={({ field }) => (<FormItem><FormLabel>Home Insurance (/yr)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="pmi" render={({ field }) => (<FormItem><FormLabel>PMI (/yr)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="hoa" render={({ field }) => (<FormItem><FormLabel>HOA Fee (/yr)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="otherCosts" render={({ field }) => (<FormItem><FormLabel>Other Costs (/yr)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                </div>
                <FormItem><FormLabel>Start Date</FormLabel><div className="flex gap-2">
                    <FormField control={form.control} name="startDateMonth" render={({ field }) => (<Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>{Array.from({length: 12}, (_, i) => <SelectItem key={i} value={(i+1).toString()}>{format(new Date(0, i), 'MMM')}</SelectItem>)}</SelectContent></Select>)} />
                    <FormField control={form.control} name="startDateYear" render={({ field }) => (<FormControl><Input type="number" {...field} /></FormControl>)} />
                </div></FormItem>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button type="submit" className="w-full"><Home className="mr-2 h-4 w-4"/>Calculate</Button>
                <Button onClick={() => form.reset()} variant="outline" className="w-full sm:w-auto"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
                </div>
            </form>
            </Form>
            <div className="flex flex-col space-y-4">
                {result ? (
                <div className="space-y-4 animate-fade-in">
                    <div className="p-4 bg-muted rounded-lg text-center">
                        <h3 className="text-lg font-semibold text-muted-foreground">Total Monthly Payment</h3>
                        <p className="text-4xl font-bold text-primary">{currencySymbol}{result.totalMonthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer><PieChart><Tooltip cursor={false} content={<ChartTooltipContent hideLabel formatter={(value) => `${currencySymbol}${Number(value).toFixed(2)}`} />} /><Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70} paddingAngle={5} strokeWidth={2}>{pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.fill} />))}</Pie></PieChart></ResponsiveContainer>
                    </div>
                    <div className="space-y-1 text-sm border-t pt-2">
                        <div className="flex justify-between"><span className="text-muted-foreground">House Price:</span><span className="font-semibold">{currencySymbol}{form.getValues('homePrice').toLocaleString()}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Down Payment:</span><span className="font-semibold">{currencySymbol}{result.downPaymentAmount.toLocaleString()}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Loan Amount:</span><span className="font-semibold">{currencySymbol}{result.loanAmount.toLocaleString()}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Total Interest:</span><span className="font-semibold">{currencySymbol}{result.totalInterest.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                         <div className="flex justify-between"><span className="text-muted-foreground">Total of {form.getValues('loanTerm') * 12} Payments:</span><span className="font-semibold">{currencySymbol}{result.totalPayments.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                        <div className="flex justify-between font-bold"><span className="text-muted-foreground">Payoff Date:</span><span>{format(result.payoffDate, 'MMM yyyy')}</span></div>
                    </div>
                </div>
                ) : (
                    <div className="flex items-center justify-center h-full bg-muted rounded-lg p-8"><div className="text-center"><Home className="mx-auto h-12 w-12 text-muted-foreground" /><p className="mt-4 text-muted-foreground">Your results will appear here.</p></div></div>
                )}
            </div>
        </div>
        {result && (
            <div className="mt-8">
                <h3 className="text-xl font-bold text-center mb-4">Amortization Schedule</h3>
                 <div className="h-[250px] w-full mb-4">
                    <ResponsiveContainer><BarChart data={amortizationChartData}><XAxis dataKey="name" tick={{ fontSize: 12 }}/><YAxis tickFormatter={(val) => `${currencySymbol}${val/1000}k`} tick={{ fontSize: 12 }} /><Tooltip formatter={(value: number) => `${currencySymbol}${value.toLocaleString(undefined, {maximumFractionDigits: 0})}`} contentStyle={{ background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/><Legend /><Bar dataKey="Principal" stackId="a" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} /><Bar dataKey="Interest" stackId="a" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer>
                </div>
                <Tabs defaultValue="annual">
                    <TabsList className="grid w-full grid-cols-2"><TabsTrigger value="annual">Annual</TabsTrigger><TabsTrigger value="monthly">Monthly</TabsTrigger></TabsList>
                    <TabsContent value="annual"><div className="h-[300px] overflow-y-auto border rounded-md">
                        <Table><TableHeader className="sticky top-0 bg-secondary"><TableRow><TableHead>Year</TableHead><TableHead className="text-right">Interest</TableHead><TableHead className="text-right">Principal</TableHead><TableHead className="text-right">Ending Balance</TableHead></TableRow></TableHeader><TableBody>{result.annualSchedule.map((row) => (<TableRow key={row.year}><TableCell className="font-medium">{row.year}</TableCell><TableCell className="text-right">{currencySymbol}{row.interest.toLocaleString(undefined, {maximumFractionDigits:0})}</TableCell><TableCell className="text-right">{currencySymbol}{row.principal.toLocaleString(undefined, {maximumFractionDigits:0})}</TableCell><TableCell className="text-right">{currencySymbol}{row.balance.toLocaleString(undefined, {maximumFractionDigits:0})}</TableCell></TableRow>))}</TableBody></Table>
                    </div></TabsContent>
                    <TabsContent value="monthly"><div className="h-[300px] overflow-y-auto border rounded-md">
                         <Table><TableHeader className="sticky top-0 bg-secondary"><TableRow><TableHead>Month</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Interest</TableHead><TableHead className="text-right">Principal</TableHead><TableHead className="text-right">Ending Balance</TableHead></TableRow></TableHeader><TableBody>{result.monthlySchedule.map((row) => (<TableRow key={row.month}><TableCell className="font-medium">{row.month}</TableCell><TableCell>{row.date}</TableCell><TableCell className="text-right">{currencySymbol}{row.interest.toLocaleString(undefined, {maximumFractionDigits:2})}</TableCell><TableCell className="text-right">{currencySymbol}{row.principal.toLocaleString(undefined, {maximumFractionDigits:2})}</TableCell><TableCell className="text-right">{currencySymbol}{row.balance.toLocaleString(undefined, {maximumFractionDigits:2})}</TableCell></TableRow>))}</TableBody></Table>
                    </div></TabsContent>
                </Tabs>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
