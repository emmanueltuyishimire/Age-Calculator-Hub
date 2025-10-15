
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
import { RefreshCcw, Home } from 'lucide-react';
import ShareButton from '../share-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { PieChart, Pie, Cell } from "recharts"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
  startDateMonth: z.string().default((new Date().getMonth() + 1).toString()),
  startDateYear: z.coerce.number().default(currentYear),
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

interface Result {
  monthlyPayment: number;
  principalAndInterest: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyPmi: number;
  monthlyHoa: number;
  totalInterest: number;
  totalPaid: number;
  loanAmount: number;
  downPaymentAmount: number;
  payoffDate: Date;
  amortizationSchedule: AmortizationRow[];
}

export default function MortgageCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      homePrice: 400000,
      downPayment: 20,
      downPaymentType: 'percent',
      loanTerm: 30,
      interestRate: 6.5,
      propertyTax: 1.2,
      propertyTaxType: 'percent',
      homeInsurance: 1500,
      pmi: 0,
      hoa: 0,
      startDateMonth: (new Date().getMonth() + 1).toString(),
      startDateYear: currentYear,
    },
  });

  function onSubmit(values: FormData) {
    const { homePrice, downPayment, downPaymentType, loanTerm, interestRate, propertyTax, propertyTaxType, homeInsurance, pmi, hoa, startDateMonth, startDateYear } = values;

    const dpAmount = downPaymentType === 'percent' ? homePrice * (downPayment / 100) : downPayment;
    
    if (dpAmount >= homePrice) {
        form.setError("downPayment", { type: "manual", message: "Down payment must be less than home price." });
        return;
    }

    const loanAmount = homePrice - dpAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const principalAndInterest = loanAmount > 0 && monthlyRate > 0
        ? loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
        : (loanAmount > 0 ? loanAmount / numberOfPayments : 0);
    
    const taxAmount = propertyTaxType === 'percent' ? homePrice * ((propertyTax || 0) / 100) : (propertyTax || 0);
    const monthlyTax = taxAmount / 12;
    
    const monthlyInsurance = (homeInsurance || 0) / 12;
    const monthlyPmi = pmi || 0;
    const monthlyHoa = hoa || 0;
    
    const monthlyPayment = principalAndInterest + monthlyTax + monthlyInsurance + monthlyPmi + monthlyHoa;
    
    const totalPaid = principalAndInterest * numberOfPayments;
    const totalInterest = totalPaid - loanAmount;

    // Amortization Schedule
    let balance = loanAmount;
    const schedule: AmortizationRow[] = [];
    let annualInterest = 0;
    let annualPrincipal = 0;
    
    if (loanAmount > 0) {
        for (let i = 1; i <= numberOfPayments; i++) {
            const interestForMonth = balance * monthlyRate;
            const principalForMonth = principalAndInterest - interestForMonth;
            
            annualInterest += interestForMonth;
            annualPrincipal += principalForMonth;
            balance -= principalForMonth;

            if (i % 12 === 0 || i === numberOfPayments) {
                schedule.push({
                    year: Math.ceil(i/12),
                    interest: annualInterest,
                    principal: annualPrincipal,
                    balance: balance > 0 ? balance : 0
                });
                annualInterest = 0;
                annualPrincipal = 0;
            }
        }
    }

    const startDate = new Date(startDateYear, parseInt(startDateMonth, 10) - 1, 1);
    const payoffDate = addMonths(startDate, numberOfPayments);

    setResult({
      monthlyPayment,
      principalAndInterest,
      monthlyTax,
      monthlyInsurance,
      monthlyPmi,
      monthlyHoa,
      totalInterest,
      totalPaid,
      loanAmount,
      downPaymentAmount: dpAmount,
      payoffDate,
      amortizationSchedule: schedule
    });
  }

  function handleReset() {
    form.reset({
      homePrice: undefined,
      downPayment: 20,
      downPaymentType: 'percent',
      loanTerm: 30,
      interestRate: 6.5,
      propertyTax: 1.2,
      propertyTaxType: 'percent',
      homeInsurance: 1500,
      pmi: 0,
      hoa: 0,
      startDateMonth: (new Date().getMonth() + 1).toString(),
      startDateYear: currentYear,
    });
    setResult(null);
  }

  const currencySymbol = '$';

  const chartData = result ? [
    { name: 'P&I', value: result.principalAndInterest, fill: 'hsl(var(--chart-1))' },
    { name: 'Taxes', value: result.monthlyTax, fill: 'hsl(var(--chart-2))' },
    { name: 'Insurance', value: result.monthlyInsurance, fill: 'hsl(var(--chart-3))' },
    { name: 'PMI/HOA', value: result.monthlyPmi + result.monthlyHoa, fill: 'hsl(var(--chart-4))' }
  ].filter(item => item.value > 0) : [];

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">Mortgage Payment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
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
                            <SelectContent>
                                <SelectItem value="percent">%</SelectItem>
                                <SelectItem value="amount">$</SelectItem>
                            </SelectContent>
                        </Select>
                    )} />
                    </div>
                    <FormMessage>{form.formState.errors.downPayment?.message}</FormMessage>
                </FormItem>
                <FormField control={form.control} name="loanTerm" render={({ field }) => (
                    <FormItem><FormLabel>Loan Term (Years)</FormLabel>
                        <Select onValueChange={(val) => field.onChange(Number(val))} defaultValue={String(field.value)}>
                            <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="30">30 Years</SelectItem>
                                <SelectItem value="20">20 Years</SelectItem>
                                <SelectItem value="15">15 Years</SelectItem>
                                <SelectItem value="10">10 Years</SelectItem>
                            </SelectContent>
                        </Select>
                    <FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Interest Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>)} />
                
                <FormItem>
                    <FormLabel>Property Tax</FormLabel>
                    <div className="flex gap-2">
                    <FormField control={form.control} name="propertyTax" render={({ field }) => (<FormControl><Input type="number" {...field} /></FormControl>)} />
                    <FormField control={form.control} name="propertyTaxType" render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="percent">%</SelectItem>
                                <SelectItem value="amount">$</SelectItem>
                            </SelectContent>
                        </Select>
                    )} />
                    </div>
                    <FormMessage>{form.formState.errors.propertyTax?.message}</FormMessage>
                </FormItem>

                <FormField control={form.control} name="homeInsurance" render={({ field }) => (<FormItem><FormLabel>Annual Home Insurance</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="pmi" render={({ field }) => (<FormItem><FormLabel>Monthly PMI</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="hoa" render={({ field }) => (<FormItem><FormLabel>Monthly HOA</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <div className="flex gap-2">
                    <FormField control={form.control} name="startDateMonth" render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent>
                                {Array.from({length: 12}, (_, i) => <SelectItem key={i} value={(i+1).toString()}>{format(new Date(0, i), 'MMM')}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    )} />
                    <FormField control={form.control} name="startDateYear" render={({ field }) => (<FormControl><Input type="number" {...field} /></FormControl>)} />
                    </div>
                </FormItem>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button type="submit" className="w-full"><Home className="mr-2 h-4 w-4"/>Calculate</Button>
                <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
                <ShareButton title="Mortgage Calculator" text="Estimate your monthly mortgage payments with this easy calculator!" url="/mortgage-calculator" />
                </div>
            </form>
            </Form>
            </div>
            <div className="flex flex-col space-y-4">
                {result ? (
                <div className="space-y-4 animate-fade-in">
                    <div className="p-4 bg-muted rounded-lg text-center">
                        <h3 className="text-lg font-semibold text-muted-foreground">Estimated Monthly Payment</h3>
                        <p className="text-4xl font-bold text-primary">{currencySymbol}{result.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <div className="h-[200px]">
                        <ChartContainer config={{}} className="mx-auto aspect-square h-full">
                            <PieChart>
                                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel formatter={(value) => `${currencySymbol}${Number(value).toFixed(2)}`} />} />
                                <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70} paddingAngle={5} strokeWidth={2}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-muted-foreground">Principal & Interest:</span><span className="font-semibold">{currencySymbol}{result.principalAndInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Property Tax:</span><span className="font-semibold">{currencySymbol}{result.monthlyTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Home Insurance:</span><span className="font-semibold">{currencySymbol}{result.monthlyInsurance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                        {(result.monthlyPmi > 0 || result.monthlyHoa > 0) && <div className="flex justify-between"><span className="text-muted-foreground">PMI/HOA:</span><span className="font-semibold">{currencySymbol}{(result.monthlyPmi + result.monthlyHoa).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>}
                    </div>
                        <div className="mt-4">
                        <h3 className="text-lg font-bold text-center mb-2">Amortization Schedule</h3>
                        <div className="h-[240px] overflow-y-auto border rounded-md">
                        <Table>
                            <TableHeader className="sticky top-0 bg-secondary">
                                <TableRow>
                                    <TableHead>Year</TableHead>
                                    <TableHead className="text-right">Interest</TableHead>
                                    <TableHead className="text-right">Principal</TableHead>
                                    <TableHead className="text-right">Balance</TableHead>
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
                </div>
                ) : (
                    <div className="flex items-center justify-center h-full bg-muted rounded-lg p-8">
                        <div className="text-center">
                            <Home className="mx-auto h-12 w-12 text-muted-foreground" />
                            <p className="mt-4 text-muted-foreground">Your results will appear here.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
