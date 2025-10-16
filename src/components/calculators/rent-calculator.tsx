
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
import { RefreshCcw, Home } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const formSchema = z.object({
  currency: z.string().default('USD'),
  annualIncome: z.coerce.number().min(1000, "Income must be at least 1,000."),
  monthlyDebt: z.coerce.number().min(0, "Debt cannot be negative.").optional(),
});

type FormData = z.infer<typeof formSchema>;

interface Result {
  thirtyPercent: number;
  conservative: number;
}

const currencySymbols: { [key: string]: string } = {
    USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', JPY: '¥',
};

export default function RentCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currency: 'USD',
      annualIncome: 80000,
      monthlyDebt: 0,
    },
  });

  function onSubmit(values: FormData) {
    const { annualIncome, monthlyDebt = 0 } = values;
    const monthlyIncome = annualIncome / 12;

    const thirtyPercentRule = monthlyIncome * 0.3;
    
    // Using 36% DTI rule for a conservative estimate
    const conservative = (monthlyIncome * 0.36) - monthlyDebt;

    setResult({
      thirtyPercent: thirtyPercentRule > 0 ? thirtyPercentRule : 0,
      conservative: conservative > 0 ? conservative : 0,
    });
  }

  function handleReset() {
    form.reset({
      currency: 'USD',
      annualIncome: undefined,
      monthlyDebt: 0,
    });
    setResult(null);
  }

  const selectedCurrency = form.watch('currency');
  const currencySymbol = currencySymbols[selectedCurrency] || '$';
  
  const recommendedRent = result ? Math.min(result.thirtyPercent, result.conservative) : 0;

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">How Much Rent Can I Afford?</CardTitle>
        <CardDescription className="text-center">Enter your income and debts to get an estimate.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {Object.entries(currencySymbols).map(([code, symbol]) => (
                        <SelectItem key={code} value={code}>{code} ({symbol})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="annualIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Pre-Tax Annual Income</FormLabel>
                  <FormControl><Input type="number" placeholder="e.g., 80000" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="monthlyDebt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Monthly Debt Payments</FormLabel>
                  <FormControl><Input type="number" placeholder="e.g., 500" {...field} /></FormControl>
                  <CardDescription className="text-xs pt-1">Car loan, student loan, minimum credit card payments.</CardDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><Home className="mr-2 h-4 w-4"/>Calculate Affordable Rent</Button>
              <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
            </div>
          </form>
        </Form>
        
        {result && (
          <div className="p-4 bg-muted rounded-lg text-center mt-6 space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-foreground">Your Recommended Rent Budget</h3>
            <div className="p-4 border rounded-lg bg-background">
                <h4 className="font-semibold text-muted-foreground">Recommended Monthly Rent</h4>
                <p className="text-3xl font-bold text-primary">
                    {currencySymbol}{recommendedRent.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-2 border rounded-lg bg-background">
                    <span className="text-muted-foreground block">30% Rule Budget</span>
                    <span className="font-semibold">{currencySymbol}{result.thirtyPercent.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="p-2 border rounded-lg bg-background">
                    <span className="text-muted-foreground block">Conservative Budget (with debt)</span>
                    <span className="font-semibold">{currencySymbol}{result.conservative.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
            </div>
            <p className="text-xs text-muted-foreground pt-2">This is an estimate. Your personal budget and spending habits may vary.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
