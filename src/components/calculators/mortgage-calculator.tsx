
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
import { RefreshCcw, Home, Percent, DollarSign } from 'lucide-react';
import ShareButton from '../share-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { PieChart, Pie, Cell } from "recharts"

const formSchema = z.object({
  homePrice: z.coerce.number().min(1, "Home price must be greater than zero."),
  downPayment: z.coerce.number().min(0, "Down payment cannot be negative."),
  downPaymentType: z.enum(['percent', 'amount']).default('percent'),
  loanTerm: z.coerce.number().min(1, "Loan term must be at least 1 year.").max(40),
  interestRate: z.coerce.number().min(0, "Rate cannot be negative.").max(30),
  propertyTax: z.coerce.number().min(0, "Cannot be negative.").optional(),
  homeInsurance: z.coerce.number().min(0, "Cannot be negative.").optional(),
});

type FormData = z.infer<typeof formSchema>;

interface Result {
  monthlyPayment: number;
  principalAndInterest: number;
  monthlyTax: number;
  monthlyInsurance: number;
  totalInterest: number;
  totalPaid: number;
  loanAmount: number;
}

export default function MortgageCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      homePrice: undefined,
      downPayment: 20,
      downPaymentType: 'percent',
      loanTerm: 30,
      interestRate: undefined,
      propertyTax: undefined,
      homeInsurance: undefined,
    },
  });

  function onSubmit(values: FormData) {
    const { homePrice, downPayment, downPaymentType, loanTerm, interestRate, propertyTax, homeInsurance } = values;

    const dpAmount = downPaymentType === 'percent' ? homePrice * (downPayment / 100) : downPayment;
    
    if (dpAmount >= homePrice) {
        form.setError("downPayment", { type: "manual", message: "Down payment must be less than home price." });
        return;
    }

    const loanAmount = homePrice - dpAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const principalAndInterest = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const monthlyTax = (propertyTax || 0) / 12;
    const monthlyInsurance = (homeInsurance || 0) / 12;
    const monthlyPayment = principalAndInterest + monthlyTax + monthlyInsurance;
    
    const totalPaid = principalAndInterest * numberOfPayments;
    const totalInterest = totalPaid - loanAmount;

    setResult({
      monthlyPayment,
      principalAndInterest,
      monthlyTax,
      monthlyInsurance,
      totalInterest,
      totalPaid,
      loanAmount
    });
  }

  function handleReset() {
    form.reset({
      homePrice: undefined,
      downPayment: 20,
      downPaymentType: 'percent',
      loanTerm: 30,
      interestRate: undefined,
      propertyTax: undefined,
      homeInsurance: undefined,
    });
    setResult(null);
  }

  const downPaymentType = form.watch('downPaymentType');
  const currencySymbol = '$'; // Assuming USD for now

  const chartData = result ? [
    { name: 'P&I', value: result.principalAndInterest, fill: 'hsl(var(--chart-1))' },
    { name: 'Taxes', value: result.monthlyTax, fill: 'hsl(var(--chart-2))' },
    { name: 'Insurance', value: result.monthlyInsurance, fill: 'hsl(var(--chart-3))' },
  ].filter(item => item.value > 0) : [];

  const chartConfig = result ? {
    payment: { label: "Payment" },
    pni: { label: "P&I", color: "hsl(var(--chart-1))" },
    taxes: { label: "Taxes", color: "hsl(var(--chart-2))" },
    insurance: { label: "Insurance", color: "hsl(var(--chart-3))" },
  } : {};

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">Mortgage Payment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="homePrice" render={({ field }) => (<FormItem><FormLabel>Home Price</FormLabel><FormControl><Input type="number" placeholder="e.g., 400000" {...field} /></FormControl><FormMessage /></FormItem>)} />
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
              <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Interest Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" placeholder="e.g., 6.5" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="propertyTax" render={({ field }) => (<FormItem><FormLabel>Annual Property Tax (optional)</FormLabel><FormControl><Input type="number" placeholder="e.g., 4500" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="homeInsurance" render={({ field }) => (<FormItem><FormLabel>Annual Home Insurance (optional)</FormLabel><FormControl><Input type="number" placeholder="e.g., 1500" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><Home className="mr-2 h-4 w-4"/>Calculate</Button>
              <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
              <ShareButton title="Mortgage Calculator" text="Estimate your monthly mortgage payments with this easy calculator!" url="/mortgage-calculator" />
            </div>
          </form>
        </Form>
        
        {result && chartConfig && (
          <div className="p-4 bg-muted rounded-lg mt-6 space-y-4 animate-fade-in">
            <div className="text-center">
                <h3 className="text-lg font-semibold text-muted-foreground">Estimated Monthly Payment (PITI)</h3>
                <p className="text-4xl font-bold text-primary">{currencySymbol}{result.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="h-[200px]">
                    <ChartContainer config={chartConfig} className="mx-auto aspect-square h-full">
                        <PieChart>
                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel formatter={(value, name) => `${currencySymbol}${Number(value).toFixed(2)}`} />} />
                            <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70} strokeWidth={2}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </div>
                 <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Principal & Interest:</span> <span className="font-semibold">{currencySymbol}{result.principalAndInterest.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Property Tax:</span> <span className="font-semibold">{currencySymbol}{result.monthlyTax.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Home Insurance:</span> <span className="font-semibold">{currencySymbol}{result.monthlyInsurance.toFixed(2)}</span></div>
                    <hr className="my-2"/>
                    <div className="flex justify-between font-bold"><span>Total Monthly Payment:</span> <span>{currencySymbol}{result.monthlyPayment.toFixed(2)}</span></div>
                 </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-center text-xs pt-4 border-t">
                 <div><span className="font-semibold">Loan Amount:</span> {currencySymbol}{result.loanAmount.toLocaleString()}</div>
                 <div><span className="font-semibold">Total Interest Paid:</span> {currencySymbol}{result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                 <div><span className="font-semibold">Total Paid Over Term:</span> {currencySymbol}{(result.loanAmount + result.totalInterest).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
            <p className="text-xs text-muted-foreground pt-2 text-center">This is an estimate and does not include PMI or HOA fees. Consult a mortgage professional for an exact quote.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
