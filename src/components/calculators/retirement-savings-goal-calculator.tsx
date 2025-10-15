
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
import { RefreshCcw, PiggyBank } from 'lucide-react';
import ShareButton from '../share-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const formSchema = z.object({
  currency: z.string().default('USD'),
  currentAge: z.coerce.number().min(18, "Must be at least 18").max(99),
  retirementAge: z.coerce.number().min(50, "Must be at least 50").max(100),
  desiredIncome: z.coerce.number().min(0, "Cannot be negative."),
  currentSavings: z.coerce.number().min(0, "Cannot be negative."),
  annualContribution: z.coerce.number().min(0, "Cannot be negative."),
  preRetirementReturn: z.coerce.number().min(0).max(20),
  withdrawalRate: z.coerce.number().min(1).max(10),
}).refine(data => data.retirementAge > data.currentAge, {
  message: "Retirement age must be greater than current age.",
  path: ["retirementAge"],
});

type FormData = z.infer<typeof formSchema>;

interface Result {
  totalNeeded: number;
  projectedSavings: number;
  shortfall: number;
}

const currencySymbols: { [key: string]: string } = {
    USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', JPY: '¥',
};

export default function RetirementSavingsGoalCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currency: 'USD',
      currentAge: 30,
      retirementAge: 65,
      preRetirementReturn: 7,
      withdrawalRate: 4,
    },
  });

  function onSubmit(values: FormData) {
    const { currentAge, retirementAge, desiredIncome, currentSavings, annualContribution, preRetirementReturn, withdrawalRate } = values;

    const yearsToGrow = retirementAge - currentAge;
    const annualReturnRate = preRetirementReturn / 100;
    
    // Calculate total nest egg needed
    const totalNeeded = desiredIncome / (withdrawalRate / 100);

    // Future value of current savings
    const fvCurrentSavings = currentSavings * Math.pow(1 + annualReturnRate, yearsToGrow);

    // Future value of annual contributions (annuity)
    let fvAnnualContributions = 0;
    if (annualReturnRate > 0) {
        fvAnnualContributions = annualContribution * ((Math.pow(1 + annualReturnRate, yearsToGrow) - 1) / annualReturnRate);
    } else { // Handle 0% return rate
        fvAnnualContributions = annualContribution * yearsToGrow;
    }
    
    const projectedSavings = fvCurrentSavings + fvAnnualContributions;
    const shortfall = totalNeeded - projectedSavings;

    setResult({
        totalNeeded,
        projectedSavings,
        shortfall: shortfall > 0 ? shortfall : 0,
    });
  }

  function handleReset() {
    form.reset({
      currency: 'USD',
      currentAge: 30,
      retirementAge: 65,
      desiredIncome: undefined,
      currentSavings: undefined,
      annualContribution: undefined,
      preRetirementReturn: 7,
      withdrawalRate: 4,
    });
    setResult(null);
  }

  const selectedCurrency = form.watch('currency');
  const currencySymbol = currencySymbols[selectedCurrency] || '$';

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">Retirement Savings Goal</CardTitle>
        <CardDescription className="text-center">Estimate how much you need to save for a comfortable retirement.</CardDescription>
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
              <FormField control={form.control} name="currentAge" render={({ field }) => (<FormItem><FormLabel>Current Age</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="retirementAge" render={({ field }) => (<FormItem><FormLabel>Target Retirement Age</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="currentSavings" render={({ field }) => (<FormItem><FormLabel>Current Retirement Savings</FormLabel><FormControl><Input type="number" placeholder="e.g., 50000" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="annualContribution" render={({ field }) => (<FormItem><FormLabel>Annual Contribution</FormLabel><FormControl><Input type="number" placeholder="e.g., 6000" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="desiredIncome" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Desired Annual Income in Retirement</FormLabel><FormControl><Input type="number" placeholder="e.g., 60000" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="preRetirementReturn" render={({ field }) => (<FormItem><FormLabel>Estimated Annual Return (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="withdrawalRate" render={({ field }) => (<FormItem><FormLabel>Annual Withdrawal Rate (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><PiggyBank className="mr-2 h-4 w-4"/>Calculate Goal</Button>
              <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
              <ShareButton title="Retirement Savings Goal Calculator" text="Find out how much you need to save for retirement with this easy calculator!" url="/retirement-savings-goal-calculator" />
            </div>
          </form>
        </Form>
        
        {result && (
          <div className="p-4 bg-muted rounded-lg text-center mt-6 space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-foreground">Your Retirement Goal</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg bg-background">
                    <h4 className="font-semibold text-muted-foreground">Total Nest Egg Needed</h4>
                    <p className="text-2xl font-bold text-primary">{currencySymbol}{result.totalNeeded.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                </div>
                <div className="p-4 border rounded-lg bg-background">
                    <h4 className="font-semibold text-muted-foreground">Projected Savings</h4>
                    <p className="text-2xl font-bold text-primary">{currencySymbol}{result.projectedSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                </div>
                <div className={`p-4 border rounded-lg bg-background ${result.shortfall > 0 ? 'border-destructive' : 'border-green-500'}`}>
                    <h4 className="font-semibold text-muted-foreground">Shortfall / Surplus</h4>
                    <p className={`text-2xl font-bold ${result.shortfall > 0 ? 'text-destructive' : 'text-green-600'}`}>
                        {result.shortfall > 0 ? currencySymbol + result.shortfall.toLocaleString(undefined, {maximumFractionDigits: 0}) : `${currencySymbol}${(result.projectedSavings - result.totalNeeded).toLocaleString(undefined, {maximumFractionDigits: 0})}` }
                    </p>
                </div>
            </div>
             <div className="h-[60px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={[{ name: 'Savings', projected: result.projectedSavings, needed: result.totalNeeded }]}
                        layout="vertical"
                        margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                        barGap={0}
                        barCategoryGap={0}
                    >
                        <XAxis type="number" hide domain={[0, 'dataMax']} />
                        <YAxis type="category" dataKey="name" hide />
                        <Tooltip
                            cursor={{fill: 'transparent'}}
                            contentStyle={{ background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                            formatter={(value: number) => `${currencySymbol}${value.toLocaleString(undefined, {maximumFractionDigits: 0})}`}
                        />
                        <Bar dataKey="projected" stackId="a" fill="hsl(var(--primary))" name="Projected Savings" radius={[4, 4, 4, 4]} />
                        <Bar dataKey="needed" stackId="b" fill="hsl(var(--secondary))" name="Total Needed" radius={[4, 4, 4, 4]} background={{ fill: 'hsl(var(--muted))', radius: 4 }} data={[{name: 'Needed', needed: result.totalNeeded}]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground pt-2">This is an estimate. Your actual returns may vary. Consult a licensed financial professional for personalized advice.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
