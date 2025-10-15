
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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { PieChart, Pie, Cell } from "recharts"

const formSchema = z.object({
  vehiclePrice: z.coerce.number().min(1, "Price must be greater than zero."),
  downPayment: z.coerce.number().min(0, "Cannot be negative.").optional(),
  tradeInValue: z.coerce.number().min(0, "Cannot be negative.").optional(),
  loanTerm: z.coerce.number().min(12, "Term must be at least 12 months.").max(96),
  interestRate: z.coerce.number().min(0, "Rate cannot be negative.").max(50),
  salesTax: z.coerce.number().min(0, "Tax cannot be negative.").max(20).optional(),
}).refine(data => (data.downPayment || 0) + (data.tradeInValue || 0) < data.vehiclePrice, {
  message: "Down payment and trade-in value cannot exceed the vehicle price.",
  path: ["downPayment"],
});

type FormData = z.infer<typeof formSchema>;

interface Result {
  monthlyPayment: number;
  totalLoanAmount: number;
  totalInterest: number;
  totalCost: number;
}

export default function AutoLoanCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehiclePrice: 35000,
      downPayment: 5000,
      tradeInValue: 2000,
      loanTerm: 60,
      interestRate: 7.5,
      salesTax: 6,
    },
  });

  function onSubmit(values: FormData) {
    const { vehiclePrice, downPayment = 0, tradeInValue = 0, loanTerm, interestRate, salesTax = 0 } = values;

    const taxAmount = vehiclePrice * (salesTax / 100);
    const totalCost = vehiclePrice + taxAmount;
    const loanAmount = totalCost - downPayment - tradeInValue;

    if (loanAmount <= 0) {
      setResult({
        monthlyPayment: 0,
        totalLoanAmount: 0,
        totalInterest: 0,
        totalCost: vehiclePrice,
      });
      return;
    }
    
    const monthlyRate = interestRate / 100 / 12;
    
    if (monthlyRate === 0) {
        const monthlyPayment = loanAmount / loanTerm;
        setResult({
            monthlyPayment,
            totalLoanAmount: loanAmount,
            totalInterest: 0,
            totalCost: totalCost,
        });
        return;
    }

    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
    const totalPaid = monthlyPayment * loanTerm;
    const totalInterest = totalPaid - loanAmount;

    setResult({
      monthlyPayment,
      totalLoanAmount: loanAmount,
      totalInterest,
      totalCost,
    });
  }

  function handleReset() {
    form.reset({
      vehiclePrice: undefined,
      downPayment: undefined,
      tradeInValue: undefined,
      loanTerm: 60,
      interestRate: undefined,
      salesTax: undefined,
    });
    setResult(null);
  }
  
  const currencySymbol = '$';

  const chartData = result ? [
    { name: 'Principal', value: result.totalLoanAmount, fill: 'hsl(var(--chart-1))' },
    { name: 'Interest', value: result.totalInterest, fill: 'hsl(var(--chart-2))' },
  ].filter(item => item.value > 0) : [];

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">Auto Loan Calculator</CardTitle>
        <CardDescription className="text-center">Estimate your monthly car payment.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="vehiclePrice" render={({ field }) => (<FormItem><FormLabel>Vehicle Price</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="downPayment" render={({ field }) => (<FormItem><FormLabel>Down Payment</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="tradeInValue" render={({ field }) => (<FormItem><FormLabel>Trade-in Value</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="loanTerm" render={({ field }) => (
                    <FormItem><FormLabel>Loan Term (Months)</FormLabel>
                        <FormControl>
                          <Select onValueChange={(val) => field.onChange(Number(val))} defaultValue={String(field.value)}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                  <SelectItem value="36">36 Months</SelectItem>
                                  <SelectItem value="48">48 Months</SelectItem>
                                  <SelectItem value="60">60 Months</SelectItem>
                                  <SelectItem value="72">72 Months</SelectItem>
                                  <SelectItem value="84">84 Months</SelectItem>
                              </SelectContent>
                          </Select>
                        </FormControl>
                    <FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Interest Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="salesTax" render={({ field }) => (<FormItem><FormLabel>Sales Tax (%)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>)} />
                
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button type="submit" className="w-full"><Car className="mr-2 h-4 w-4"/>Calculate</Button>
                <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
                <ShareButton title="Auto Loan Calculator" text="Estimate your monthly car payment with this easy calculator!" url="/auto-loan-calculator" />
                </div>
            </form>
            </Form>
        </div>
        
        <div className="flex flex-col justify-center">
            {result ? (
            <div className="p-4 bg-muted rounded-lg space-y-4 animate-fade-in">
                <div className="text-center">
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
                    <div className="flex justify-between"><span className="text-muted-foreground">Total Loan Amount:</span><span className="font-semibold">{currencySymbol}{result.totalLoanAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Total Interest Paid:</span><span className="font-semibold">{currencySymbol}{result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                    <div className="flex justify-between border-t pt-2 mt-2"><span className="text-muted-foreground font-bold">Total Cost of Vehicle:</span><span className="font-bold">{currencySymbol}{result.totalCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                </div>
                <p className="text-xs text-muted-foreground pt-2 text-center">This is an estimate. Your actual payment may vary.</p>
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
      </CardContent>
    </Card>
  );
}
