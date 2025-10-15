
"use client";

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, differenceInMonths, isValid, isFuture } from 'date-fns';
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
import ShareButton from '../share-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/lib/utils';

const formSchema = z.object({
  currency: z.string().default('USD'),
  goalAmount: z.coerce.number().min(1, "Goal must be greater than zero."),
  initialSavings: z.coerce.number().min(0, "Cannot be negative."),
  targetDate: z.date({
    required_error: "A target date is required.",
  }),
  interestRate: z.coerce.number().min(0).max(50),
}).refine(data => data.goalAmount > data.initialSavings, {
  message: "Goal amount must be greater than your initial savings.",
  path: ["goalAmount"],
}).refine(data => isFuture(data.targetDate), {
    message: "Target date must be in the future.",
    path: ["targetDate"],
});

type FormData = z.infer<typeof formSchema>;

interface Result {
  monthlyContribution: number;
  dailyContribution: number;
  hourlyContribution: number;
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
      goalAmount: 0,
      initialSavings: 0,
      targetDate: undefined,
      interestRate: 4,
    },
  });

  function onSubmit(values: FormData) {
    const { goalAmount, initialSavings, targetDate, interestRate } = values;

    const months = differenceInMonths(targetDate, new Date());
    if (months <= 0) {
        form.setError("targetDate", {type: "manual", message: "Target date must be at least one month in the future."});
        return;
    }

    const monthlyRate = interestRate / 100 / 12;
    const futureValueOfInitial = initialSavings * Math.pow(1 + monthlyRate, months);
    const neededFromContributions = goalAmount - futureValueOfInitial;
    
    let monthlyContribution: number;
    if (monthlyRate > 0) {
        // Future value of an annuity formula rearranged for monthly payment
        const fvFactor = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
        monthlyContribution = neededFromContributions / fvFactor;
    } else {
        // Simple interest case
        monthlyContribution = neededFromContributions / months;
    }
    
    if (monthlyContribution <= 0) {
       setResult({
        monthlyContribution: 0,
        dailyContribution: 0,
        hourlyContribution: 0,
       });
       return;
    }

    setResult({
      monthlyContribution,
      dailyContribution: monthlyContribution / 30.44, // Average days in a month
      hourlyContribution: (monthlyContribution / 30.44) / 8, // Assuming an 8-hour work day
    });
  }

  function handleReset() {
    form.reset({
      currency: 'USD',
      goalAmount: 0,
      initialSavings: 0,
      targetDate: undefined,
      interestRate: 4,
    });
    setResult(null);
  }

  const selectedCurrency = form.watch('currency');
  const currencySymbol = currencySymbols[selectedCurrency] || '$';

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">Savings Goal Planner</CardTitle>
        <CardDescription className="text-center">What do you need to save to reach your goal?</CardDescription>
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
              <FormField
                control={form.control}
                name="targetDate"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Target Date</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value ? (
                                format(field.value, "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                    </FormItem>
                )}
                />
              <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Est. Annual Interest Rate (APY %)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><Goal className="mr-2 h-4 w-4"/>Calculate</Button>
              <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
              <ShareButton title="Savings Goal Calculator" text="Find out how much you need to save to reach your goals!" url="/savings-goal-calculator" />
            </div>
          </form>
        </Form>
        
        {result && (
          <div className="p-4 bg-muted rounded-lg text-center mt-6 space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-foreground">Your Savings Plan</h3>
            <p className="text-md">To reach your goal, you'll need to save:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg bg-background">
                    <h4 className="font-semibold text-muted-foreground">Per Month</h4>
                    <p className="text-2xl font-bold text-primary">{currencySymbol}{result.monthlyContribution.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                </div>
                <div className="p-4 border rounded-lg bg-background">
                    <h4 className="font-semibold text-muted-foreground">Per Day</h4>
                    <p className="text-2xl font-bold text-primary">{currencySymbol}{result.dailyContribution.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                </div>
                <div className="p-4 border rounded-lg bg-background">
                    <h4 className="font-semibold text-muted-foreground">Per Hour (8-hr day)</h4>
                    <p className="text-2xl font-bold text-primary">{currencySymbol}{result.hourlyContribution.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                </div>
            </div>
            <p className="text-xs text-muted-foreground pt-2">This is an estimate. Your actual returns may vary. Consult a licensed financial professional for personalized advice.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
