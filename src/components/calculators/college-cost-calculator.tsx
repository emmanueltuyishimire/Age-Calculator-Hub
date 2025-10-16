
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
import { RefreshCcw, GraduationCap } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const formSchema = z.object({
  todayAnnualCost: z.coerce.number().min(1),
  costIncreaseRate: z.coerce.number().min(0),
  duration: z.coerce.number().min(1).max(10),
  percentFromSavings: z.coerce.number().min(0).max(100),
  currentSavings: z.coerce.number().min(0),
  returnRate: z.coerce.number().min(0),
  taxRate: z.coerce.number().min(0).max(100),
  yearsUntilCollege: z.coerce.number().min(0),
});

type FormData = z.infer<typeof formSchema>;

interface Result {
  totalCost: number;
  neededFromSavings: number;
  projectedSavings: number;
  shortfall: number;
  monthlySavingsNeeded: number;
}

const currencySymbol = '$';

export default function CollegeCostCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todayAnnualCost: 29910,
      costIncreaseRate: 5,
      duration: 4,
      percentFromSavings: 35,
      currentSavings: 0,
      returnRate: 5,
      taxRate: 25,
      yearsUntilCollege: 3,
    },
  });

  function onSubmit(values: FormData) {
    const { todayAnnualCost, costIncreaseRate, duration, percentFromSavings, currentSavings, returnRate, taxRate, yearsUntilCollege } = values;

    // Calculate future cost of college for all years
    let totalFutureCost = 0;
    for (let i = 0; i < duration; i++) {
      totalFutureCost += todayAnnualCost * Math.pow(1 + costIncreaseRate / 100, yearsUntilCollege + i);
    }
    
    const neededFromSavings = totalFutureCost * (percentFromSavings / 100);

    // Calculate future value of current savings
    const netReturnRate = (returnRate / 100) * (1 - taxRate / 100);
    const projectedSavings = currentSavings * Math.pow(1 + netReturnRate, yearsUntilCollege);
    
    // Calculate required monthly savings
    const shortfall = neededFromSavings - projectedSavings;
    let monthlySavingsNeeded = 0;
    if (shortfall > 0) {
      const monthsToSave = yearsUntilCollege * 12;
      const monthlyRate = netReturnRate / 12;
      if (monthlyRate > 0) {
        monthlySavingsNeeded = shortfall * (monthlyRate / (Math.pow(1 + monthlyRate, monthsToSave) - 1));
      } else {
        monthlySavingsNeeded = shortfall / monthsToSave;
      }
    }

    setResult({
      totalCost: totalFutureCost,
      neededFromSavings,
      projectedSavings,
      shortfall: Math.max(0, shortfall),
      monthlySavingsNeeded: Math.max(0, monthlySavingsNeeded),
    });
  }

  function handleReset() {
    form.reset();
    setResult(null);
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <FormField control={form.control} name="todayAnnualCost" render={({ field }) => (<FormItem><FormLabel>Today's Annual College Costs</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="costIncreaseRate" render={({ field }) => (<FormItem><FormLabel>Cost Increase Rate (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                      <FormField control={form.control} name="duration" render={({ field }) => (<FormItem><FormLabel>Attendance (Years)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    </div>
                     <FormField control={form.control} name="percentFromSavings" render={({ field }) => (<FormItem><FormLabel>Percent of Costs from Savings (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="currentSavings" render={({ field }) => (<FormItem><FormLabel>College Savings Balance Now</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <div className="grid grid-cols-2 gap-4">
                       <FormField control={form.control} name="returnRate" render={({ field }) => (<FormItem><FormLabel>Return Rate (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                       <FormField control={form.control} name="taxRate" render={({ field }) => (<FormItem><FormLabel>Tax Rate on Return (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    </div>
                    <FormField control={form.control} name="yearsUntilCollege" render={({ field }) => (<FormItem><FormLabel>College will start in (Years)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button type="submit" className="w-full"><GraduationCap className="mr-2 h-4 w-4"/>Calculate Cost</Button>
                    <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
                  </div>
              </form>
              </Form>
            </div>
            
            <div className="flex flex-col space-y-4">
                {result ? (
                <div className="space-y-4 animate-fade-in">
                    <div className="p-4 bg-muted rounded-lg text-center">
                        <h3 className="text-lg font-semibold text-muted-foreground">Monthly Savings Needed</h3>
                        <p className="text-4xl font-bold text-primary">{currencySymbol}{result.monthlySavingsNeeded.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <div className="space-y-2 text-sm border-t pt-2">
                        <div className="flex justify-between"><span className="text-muted-foreground">Total College Cost:</span><span className="font-semibold">{currencySymbol}{result.totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Needed from Savings:</span><span className="font-semibold">{currencySymbol}{result.neededFromSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Projected Savings:</span><span className="font-semibold">{currencySymbol}{result.projectedSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                        <div className={`flex justify-between font-bold ${result.shortfall > 0 ? 'text-destructive' : 'text-green-600'}`}><span className="text-foreground">Shortfall / Surplus:</span><span>{currencySymbol}{result.shortfall.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                    </div>
                    <div className="h-[250px] w-full mt-4">
                       <ResponsiveContainer>
                            <BarChart data={[{ name: 'Savings', projected: result.projectedSavings, needed: result.neededFromSavings }]}>
                                <XAxis dataKey="name" />
                                <YAxis tickFormatter={(value) => `${currencySymbol}${value/1000}k`} />
                                <Tooltip formatter={(value: number) => `${currencySymbol}${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
                                <Legend />
                                <Bar dataKey="needed" fill="hsl(var(--chart-2))" name="Amount Needed" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="projected" fill="hsl(var(--chart-1))" name="Projected Savings" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                ) : (
                    <div className="flex items-center justify-center h-full bg-muted rounded-lg p-8">
                        <div className="text-center">
                            <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground" />
                            <p className="mt-4 text-muted-foreground">Your college cost estimate will appear here.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
