
"use client";

import { useState } from 'react';
import { z } from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { RefreshCcw, Scale } from 'lucide-react';
import { Progress } from '../ui/progress';

const formSchema = z.object({
  grossMonthlyIncome: z.coerce.number().min(1, "Income must be greater than zero."),
  monthlyDebts: z.coerce.number().min(0, "Debts cannot be negative."),
});

type FormData = z.infer<typeof formSchema>;

interface Result {
  dtiRatio: number;
}

const getDtiInterpretation = (dti: number) => {
    if (dti <= 36) return { text: "Excellent", color: "text-green-600" };
    if (dti <= 43) return { text: "Good", color: "text-yellow-600" };
    if (dti <= 50) return { text: "Concerning", color: "text-orange-600" };
    return { text: "High Risk", color: "text-destructive" };
};

export default function DtiCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      grossMonthlyIncome: 6000,
      monthlyDebts: 1650,
    },
  });

  function onSubmit(values: FormData) {
    const { grossMonthlyIncome, monthlyDebts } = values;
    const dtiRatio = (monthlyDebts / grossMonthlyIncome) * 100;
    setResult({
      dtiRatio: dtiRatio,
    });
  }

  function handleReset() {
    form.reset({
        grossMonthlyIncome: undefined,
        monthlyDebts: undefined,
    });
    setResult(null);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">DTI Ratio Calculator</CardTitle>
        <CardDescription className="text-center">Enter your total gross monthly income and debt payments.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="grossMonthlyIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gross Monthly Income</FormLabel>
                    <FormControl><Input type="number" placeholder="e.g., 6000" {...field} /></FormControl>
                    <FormDescription className="text-xs">Your total income before taxes.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="monthlyDebts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Monthly Debt Payments</FormLabel>
                    <FormControl><Input type="number" placeholder="e.g., 1650" {...field} /></FormControl>
                     <FormDescription className="text-xs">Mortgage/rent, loans, credit cards, etc.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><Scale className="mr-2 h-4 w-4"/>Calculate DTI</Button>
              <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
            </div>
          </form>
        </Form>
        
        {result && (
          <div className="p-4 bg-muted rounded-lg text-center mt-6 space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-foreground">Your Debt-to-Income Ratio</h3>
            <div className="p-4 rounded-lg bg-background">
                <p className="text-5xl font-bold text-primary">{result.dtiRatio.toFixed(2)}%</p>
            </div>
            <div className="space-y-2">
                <Progress value={result.dtiRatio} className="h-4" />
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>36%</span>
                    <span>43%</span>
                    <span>50%+</span>
                </div>
            </div>
            <p className="font-semibold text-lg">
                Your DTI ratio is <span className={getDtiInterpretation(result.dtiRatio).color}>{getDtiInterpretation(result.dtiRatio).text}</span>.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
