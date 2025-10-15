
"use client";

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addMonths, format, intervalToDuration } from 'date-fns';
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
import { RefreshCcw, Goal } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import ShareButton from '../share-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const formSchema = z.object({
  currency: z.string().default('USD'),
  goalAmount: z.coerce.number().min(1, "Goal must be greater than zero."),
  initialSavings: z.coerce.number().min(0, "Cannot be negative."),
  monthlyContribution: z.coerce.number().min(1, "Must be at least 1."),
  interestRate: z.coerce.number().min(0).max(50),
}).refine(data => data.goalAmount > data.initialSavings, {
  message: "Goal amount must be greater than your initial savings.",
  path: ["goalAmount"],
});

type FormData = z.infer<typeof formSchema>;

interface Result {
  monthsToGoal: number;
  years: number;
  months: number;
  goalDate: string;
  totalPrincipal: number;
  totalInterest: number;
  chartData: { month: number; principal: number; interest: number; total: number; }[];
}

const currencySymbols: { [key: string]: string } = {
    USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', JPY: '¥',
};

export default function SavingsGoalCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currency: 'USD',
      initialSavings: 0,
      monthlyContribution: 500,
      interestRate: 4,
    },
  });

  function onSubmit(values: FormData) {
    const { goalAmount, initialSavings, monthlyContribution, interestRate } = values;

    const monthlyRate = interestRate / 100 / 12;
    let balance = initialSavings;
    let months = 0;
    let totalInterest = 0;
    const chartData: Result['chartData'] = [{ month: 0, principal: initialSavings, interest: 0, total: initialSavings }];

    if (monthlyContribution <= 0) {
        form.setError("monthlyContribution", { type: "manual", message: "Contribution must be positive to reach goal." });
        return;
    }

    while (balance < goalAmount && months < 600) { // Limit to 50 years to prevent infinite loops
      const interest = balance * monthlyRate;
      balance += interest + monthlyContribution;
      totalInterest += interest;
      months++;
      chartData.push({ 
        month: months, 
        principal: initialSavings + (monthlyContribution * months), 
        interest: totalInterest,
        total: balance
      });
    }

    const duration = intervalToDuration({ start: 0, end: months * 30.44 * 24 * 60 * 60 * 1000 });
    
    setResult({
      monthsToGoal: months,
      years: duration.years || 0,
      months: duration.months || 0,
      goalDate: format(addMonths(new Date(), months), 'MMMM yyyy'),
      totalPrincipal: initialSavings + (monthlyContribution * months),
      totalInterest,
      chartData,
    });
  }

  function handleReset() {
    form.reset({
      currency: 'USD',
      goalAmount: undefined,
      initialSavings: 0,
      monthlyContribution: 500,
      interestRate: 4,
    });
    setResult(null);
  }

  const selectedCurrency = form.watch('currency');
  const currencySymbol = currencySymbols[selectedCurrency] || '$';

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">Savings Goal Planner</CardTitle>
        <CardDescription className="text-center">Find out how long it will take to reach your savings goal.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="currency" render={({ field }) => (
                <FormItem className="md:col-span-2"><FormLabel>Currency</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                  <SelectContent>{Object.entries(currencySymbols).map(([code, symbol]) => (<SelectItem key={code} value={code}>{code} ({symbol})</SelectItem>))}</SelectContent>
                </Select></FormItem>
              )}/>
              <FormField control={form.control} name="goalAmount" render={({ field }) => (<FormItem><FormLabel>Savings Goal</FormLabel><FormControl><Input type="number" placeholder="e.g., 25000" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="initialSavings" render={({ field }) => (<FormItem><FormLabel>Initial Savings</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="monthlyContribution" render={({ field }) => (<FormItem><FormLabel>Monthly Contribution</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Est. Annual Interest Rate (APY %)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><Goal className="mr-2 h-4 w-4"/>Calculate Goal</Button>
              <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
              <ShareButton title="Savings Goal Calculator" text="Plan your savings goals with this easy calculator!" url="/savings-goal-calculator" />
            </div>
          </form>
        </Form>
        
        {result && (
          <div className="p-4 bg-muted rounded-lg text-center mt-6 space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-foreground">Your Goal Projection</h3>
            <p className="text-lg">You will reach your savings goal in approximately:</p>
            <div className="flex justify-center items-baseline space-x-2">
                <span className="text-4xl font-bold text-primary">{result.years}</span>
                <span className="text-xl text-muted-foreground">years</span>
                <span className="text-4xl font-bold text-primary">{result.months}</span>
                <span className="text-xl text-muted-foreground">months</span>
            </div>
            <p className="text-muted-foreground">Around <span className="font-semibold">{result.goalDate}</span></p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left pt-4 border-t">
                <p><strong>Total Contributions:</strong> {currencySymbol}{result.totalPrincipal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                <p><strong>Total Interest Earned:</strong> {currencySymbol}{result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>

             <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={result.chartData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--secondary-foreground))" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="hsl(var(--secondary-foreground))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottom', offset: -5 }} />
                        <YAxis tickFormatter={(value) => `${currencySymbol}${Number(value) / 1000}k`} />
                        <Tooltip
                            contentStyle={{ background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                            formatter={(value: number, name: string) => [`${currencySymbol}${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, name.charAt(0).toUpperCase() + name.slice(1)]}
                        />
                        <Area type="monotone" dataKey="total" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorTotal)" />
                        <Area type="monotone" dataKey="principal" stroke="hsl(var(--muted-foreground))" fillOpacity={1} fill="url(#colorPrincipal)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground pt-2">This is an estimate. Your actual returns may vary.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
