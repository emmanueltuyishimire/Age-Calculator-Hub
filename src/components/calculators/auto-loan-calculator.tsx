
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
import { RefreshCcw, Car } from 'lucide-react';
import ShareButton from '../share-button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { addMonths } from 'date-fns';

const formSchema = z.object({
  autoPrice: z.coerce.number().min(1, "Price must be greater than zero."),
  loanTerm: z.coerce.number().min(12, "Term must be at least 12 months.").max(96),
  interestRate: z.coerce.number().min(0, "Rate cannot be negative.").max(50),
  cashIncentives: z.coerce.number().min(0).optional(),
  downPayment: z.coerce.number().min(0, "Cannot be negative.").optional(),
  tradeInValue: z.coerce.number().min(0, "Cannot be negative.").optional(),
  owedOnTrade: z.coerce.number().min(0, "Cannot be negative.").optional(),
  salesTax: z.coerce.number().min(0, "Tax cannot be negative.").max(20).optional(),
  otherFees: z.coerce.number().min(0, "Fees cannot be negative.").optional(),
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
  totalLoanAmount: number;
  saleTaxAmount: number;
  upfrontPayment: number;
  totalPayments: number;
eafbe41398865668e14620f41e0a2944b55c68f8
  totalInterest: number;
  totalCost: number;
  amortizationSchedule: AmortizationRow[];
}

export default function AutoLoanCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      autoPrice: 50000,
      loanTerm: 60,
      interestRate: 5,
      cashIncentives: 0,
      downPayment: 10000,
      tradeInValue: 0,
      owedOnTrade: 0,
      salesTax: 7,
      otherFees: 2000,
    },
  });

  function onSubmit(values: FormData) {
    const { autoPrice, loanTerm, interestRate, cashIncentives = 0, downPayment = 0, tradeInValue = 0, owedOnTrade = 0, salesTax = 0, otherFees = 0 } = values;

    const saleTaxAmount = autoPrice * (salesTax / 100);
    const netTradeIn = tradeInValue - owedOnTrade;
    
    const totalLoanAmount = autoPrice + saleTaxAmount + otherFees - cashIncentives - downPayment - netTradeIn;
    
    if(totalLoanAmount <= 0) {
        setResult({
            monthlyPayment: 0, totalLoanAmount: 0, saleTaxAmount, upfrontPayment: downPayment, totalPayments: 0, totalInterest: 0, totalCost: autoPrice + saleTaxAmount + otherFees - cashIncentives, amortizationSchedule: []
        });
        return;
    }

    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = monthlyRate > 0
        ? (totalLoanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTerm))
        : totalLoanAmount / loanTerm;

    const totalPayments = monthlyPayment * loanTerm;
    const totalInterest = totalPayments - totalLoanAmount;
    const totalCost = autoPrice + saleTaxAmount + otherFees + totalInterest - cashIncentives;
    const upfrontPayment = downPayment + saleTaxAmount + otherFees;

    // Amortization Schedule
    let balance = totalLoanAmount;
    const schedule: AmortizationRow[] = [];
    let annualInterest = 0;
    let annualPrincipal = 0;
    
    for (let i = 1; i <= loanTerm; i++) {
        const interestForMonth = balance * monthlyRate;
        const principalForMonth = monthlyPayment - interestForMonth;
        
        annualInterest += interestForMonth;
        annualPrincipal += principalForMonth;
        balance -= principalForMonth;

        if (i % 12 === 0 || i === loanTerm) {
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

    setResult({
      monthlyPayment, totalLoanAmount, saleTaxAmount, upfrontPayment, totalPayments, totalInterest, totalCost, amortizationSchedule: schedule,
    });
  }

  function handleReset() {
    form.reset({ autoPrice: undefined, loanTerm: 60, interestRate: undefined, cashIncentives: 0, downPayment: undefined, tradeInValue: 0, owedOnTrade: 0, salesTax: undefined, otherFees: 0 });
    setResult(null);
  }
  
  const currencySymbol = '$';

  const chartData = result ? [
    { name: 'Principal', value: result.totalLoanAmount, fill: 'hsl(var(--chart-1))' },
    { name: 'Interest', value: result.totalInterest, fill: 'hsl(var(--chart-2))' },
  ].filter(item => item.value > 0) : [];

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <Tabs defaultValue="price" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="price">By Total Price</TabsTrigger>
                <TabsTrigger value="monthly" disabled>By Monthly Payment</TabsTrigger>
            </TabsList>
            <TabsContent value="price">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                    <div>
                        <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                            <FormField control={form.control} name="autoPrice" render={({ field }) => (<FormItem><FormLabel>Auto Price</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="loanTerm" render={({ field }) => (
                                <FormItem><FormLabel>Loan Term (Months)</FormLabel>
                                <Select onValueChange={(val) => field.onChange(Number(val))} defaultValue={String(field.value)}>
                                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="36">36</SelectItem>
                                        <SelectItem value="48">48</SelectItem>
                                        <SelectItem value="60">60</SelectItem>
                                        <SelectItem value="72">72</SelectItem>
                                        <SelectItem value="84">84</SelectItem>
                                    </SelectContent>
                                </Select><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Interest Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="cashIncentives" render={({ field }) => (<FormItem><FormLabel>Cash Incentives</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="downPayment" render={({ field }) => (<FormItem><FormLabel>Down Payment</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="tradeInValue" render={({ field }) => (<FormItem><FormLabel>Trade-in Value</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="owedOnTrade" render={({ field }) => (<FormItem><FormLabel>Amount Owed on Trade-in</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="salesTax" render={({ field }) => (<FormItem><FormLabel>Sales Tax (%)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="otherFees" render={({ field }) => (<FormItem><FormLabel>Title, Registration & Other Fees</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            
                            <div className="flex flex-col sm:flex-row gap-2 pt-2">
                                <Button type="submit" className="w-full"><Car className="mr-2 h-4 w-4"/>Calculate</Button>
                                <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
                                <ShareButton title="Auto Loan Calculator" text="Estimate your monthly car payment with this easy calculator!" url="/auto-loan-calculator" />
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
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="p-3 border rounded-lg"><span className="text-muted-foreground block">Total Loan Amount</span><span className="font-semibold">{currencySymbol}{result.totalLoanAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                                <div className="p-3 border rounded-lg"><span className="text-muted-foreground block">Sales Tax</span><span className="font-semibold">{currencySymbol}{result.saleTaxAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                                <div className="p-3 border rounded-lg col-span-2"><span className="text-muted-foreground block">Upfront Payment (Down Payment + Tax & Fees)</span><span className="font-semibold">{currencySymbol}{result.upfrontPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
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
                                <div className="flex justify-between"><span className="text-muted-foreground">Total of {form.getValues('loanTerm')} Payments:</span><span className="font-semibold">{currencySymbol}{result.totalPayments.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                                <div className="flex justify-between"><span className="text-muted-foreground">Total Loan Interest:</span><span className="font-semibold">{currencySymbol}{result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                                <div className="flex justify-between border-t pt-2 mt-2"><span className="text-muted-foreground font-bold">Total Cost:</span><span className="font-bold">{currencySymbol}{result.totalCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
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
                                    <Car className="mx-auto h-12 w-12 text-muted-foreground" />
                                    <p className="mt-4 text-muted-foreground">Your results will appear here.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="monthly">
                <div className="flex items-center justify-center h-48 bg-muted rounded-lg p-8 mt-6">
                    <p className="text-muted-foreground">Calculator coming soon!</p>
                </div>
            </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
