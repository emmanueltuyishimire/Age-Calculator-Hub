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
import { RefreshCcw, DollarSign } from 'lucide-react';
import ShareButton from '../share-button';

const formSchema = z.object({
  annualIncome: z.coerce.number().min(0, "Income cannot be negative."),
  incomeYears: z.coerce.number().min(1, "Must be at least 1 year.").max(50),
  debts: z.coerce.number().min(0, "Debts cannot be negative."),
  mortgage: z.coerce.number().min(0, "Mortgage cannot be negative."),
  education: z.coerce.number().min(0, "Education costs cannot be negative."),
  funeral: z.coerce.number().min(0, "Final expenses cannot be negative."),
  savings: z.coerce.number().min(0, "Savings cannot be negative."),
});

type FormData = z.infer<typeof formSchema>;

export default function LifeInsuranceNeedsCalculator() {
  const [coverage, setCoverage] = useState<number | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      annualIncome: 75000,
      incomeYears: 10,
      debts: 20000,
      mortgage: 250000,
      education: 100000,
      funeral: 15000,
      savings: 50000,
    },
  });

  function onSubmit(values: FormData) {
    const incomeReplacement = values.annualIncome * values.incomeYears;
    const totalNeeds = incomeReplacement + values.debts + values.mortgage + values.education + values.funeral;
    const netCoverage = totalNeeds - values.savings;
    setCoverage(netCoverage > 0 ? netCoverage : 0);
  }
  
  function handleReset() {
      form.reset();
      setCoverage(null);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">Estimate Your Coverage</CardTitle>
        <CardDescription className="text-center">Use the DIME method (Debt, Income, Mortgage, Education) to estimate your needs.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Income Section */}
              <FormField
                control={form.control}
                name="annualIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Income</FormLabel>
                    <FormControl><Input type="number" placeholder="e.g., 75000" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="incomeYears"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Income to Replace</FormLabel>
                    <FormControl><Input type="number" placeholder="e.g., 10" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Debts Section */}
              <FormField
                control={form.control}
                name="debts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Debts (non-mortgage)</FormLabel>
                    <FormControl><Input type="number" placeholder="e.g., 20000" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mortgage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mortgage Balance</FormLabel>
                    <FormControl><Input type="number" placeholder="e.g., 250000" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Education & Final Expenses */}
              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Future Education Costs</FormLabel>
                    <FormControl><Input type="number" placeholder="e.g., 100000" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="funeral"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Final Expenses Estimate</FormLabel>
                    <FormControl><Input type="number" placeholder="e.g., 15000" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               {/* Savings */}
              <FormField
                control={form.control}
                name="savings"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Current Savings & Existing Insurance</FormLabel>
                    <FormControl><Input type="number" placeholder="e.g., 50000" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><DollarSign className="mr-2 h-4 w-4"/>Calculate Coverage</Button>
               <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset">
                <RefreshCcw className="mr-2 h-4 w-4" /> Reset
              </Button>
              <ShareButton title="Life Insurance Needs Calculator" text="Find out how much life insurance you might need with this easy calculator!" url="/life-insurance-calculator" />
            </div>
          </form>
        </Form>
        
        {coverage !== null && (
          <div className="p-6 bg-muted rounded-lg text-center mt-6 space-y-2 animate-fade-in">
            <h3 className="text-lg font-medium text-muted-foreground">Estimated Life Insurance Coverage Needed:</h3>
            <div className="flex justify-center items-baseline space-x-2">
              <span className="text-4xl font-bold text-primary">${coverage.toLocaleString()}</span>
            </div>
            <p className="text-xs text-muted-foreground pt-2">This is an estimate. Consult a licensed financial professional for personalized advice.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
