
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
import { RefreshCcw, Landmark, Scale } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const formSchema = z.object({
  age1: z.coerce.number().min(62, "Min age is 62").max(70, "Max age is 70"),
  payment1: z.coerce.number().min(1, "Payment must be positive."),
  age2: z.coerce.number().min(62, "Min age is 62").max(70, "Max age is 70"),
  payment2: z.coerce.number().min(1, "Payment must be positive."),
  lifeExpectancy: z.coerce.number().min(70, "Must be 70 or greater").max(100),
}).refine(data => data.age1 !== data.age2, {
  message: "Claiming ages must be different.",
  path: ["age2"],
});

type FormData = z.infer<typeof formSchema>;

interface Result {
  breakEvenAge: { years: number; months: number };
  totalBenefit1: number;
  totalBenefit2: number;
  chartData: { age: number; option1: number; option2: number; }[];
}

export default function SocialSecurityCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age1: 62,
      payment1: 2000,
      age2: 70,
      payment2: 3500,
      lifeExpectancy: 85,
    },
  });

  function onSubmit(values: FormData) {
    const earlyAge = Math.min(values.age1, values.age2);
    const lateAge = Math.max(values.age1, values.age2);
    const earlyPayment = values.age1 < values.age2 ? values.payment1 : values.payment2;
    const latePayment = values.age1 > values.age2 ? values.payment1 : values.payment2;

    const crossoverAmount = earlyPayment * (lateAge - earlyAge) * 12;
    const monthlyDifference = latePayment - earlyPayment;

    if (monthlyDifference <= 0) {
        // This case should ideally be caught by validation (higher age should have higher payment)
        // For now, handle it gracefully.
        setResult(null);
        return;
    }
    
    const monthsToBreakEven = crossoverAmount / monthlyDifference;
    const breakEvenTotalMonths = lateAge * 12 + monthsToBreakEven;
    const breakEvenYears = Math.floor(breakEvenTotalMonths / 12);
    const breakEvenMonths = Math.round(breakEvenTotalMonths % 12);

    // Calculate total benefits at life expectancy
    const totalBenefit1 = (values.lifeExpectancy - values.age1) * 12 * values.payment1;
    const totalBenefit2 = (values.lifeExpectancy - values.age2) * 12 * values.payment2;
    
    // Generate chart data
    const chartData = [];
    for(let age = earlyAge; age <= values.lifeExpectancy; age++) {
        const option1Total = age >= values.age1 ? (age - values.age1) * 12 * values.payment1 : 0;
        const option2Total = age >= values.age2 ? (age - values.age2) * 12 * values.payment2 : 0;
        chartData.push({ age, option1: option1Total, option2: option2Total });
    }

    setResult({
      breakEvenAge: { years: breakEvenYears, months: breakEvenMonths },
      totalBenefit1,
      totalBenefit2,
      chartData,
    });
  }

  function handleReset() {
    form.reset();
    setResult(null);
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">Compare Two Claiming Ages</CardTitle>
        <CardDescription className="text-center">Enter two scenarios to find your break-even point.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold text-center">Claiming Option 1</h3>
                <FormField control={form.control} name="age1" render={({ field }) => (<FormItem><FormLabel>Claiming Age</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="payment1" render={({ field }) => (<FormItem><FormLabel>Monthly Benefit Amount</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
              <div className="space-y-4 p-4 border rounded-lg">
                 <h3 className="font-semibold text-center">Claiming Option 2</h3>
                <FormField control={form.control} name="age2" render={({ field }) => (<FormItem><FormLabel>Claiming Age</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="payment2" render={({ field }) => (<FormItem><FormLabel>Monthly Benefit Amount</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
               <FormField control={form.control} name="lifeExpectancy" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Expected Life Expectancy</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><Scale className="mr-2 h-4 w-4"/>Calculate Break-Even</Button>
              <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
            </div>
          </form>
        </Form>
        
        {result && (
          <div className="p-4 bg-muted rounded-lg mt-6 space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-center text-foreground">Your Break-Even Analysis</h3>
            <div className="text-center p-4 border rounded-lg bg-background">
                <h4 className="font-semibold text-muted-foreground">Your break-even age is approximately:</h4>
                <p className="text-3xl font-bold text-primary">{result.breakEvenAge.years} years and {result.breakEvenAge.months} months</p>
                 <p className="text-xs text-muted-foreground mt-1">If you live past this age, waiting to claim is financially better.</p>
            </div>
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <XAxis dataKey="age" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(val) => `$${(val / 1000)}k`} tick={{ fontSize: 12 }}/>
                  <Tooltip
                    formatter={(value: number) => `$${value.toLocaleString(undefined, {maximumFractionDigits: 0})}`}
                    labelFormatter={(label) => `At Age ${label}`}
                    contentStyle={{ background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Bar dataKey="option1" fill="hsl(var(--chart-1))" name={`Claim at ${form.getValues('age1')}`} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="option2" fill="hsl(var(--chart-2))" name={`Claim at ${form.getValues('age2')}`} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
             <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 border rounded-lg bg-background">
                    <h4 className="font-semibold text-muted-foreground">Total Lifetime Benefit (Option 1)</h4>
                    <p className="text-lg font-bold text-primary">${result.totalBenefit1.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                </div>
                <div className="p-3 border rounded-lg bg-background">
                    <h4 className="font-semibold text-muted-foreground">Total Lifetime Benefit (Option 2)</h4>
                    <p className="text-lg font-bold text-primary">${result.totalBenefit2.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
