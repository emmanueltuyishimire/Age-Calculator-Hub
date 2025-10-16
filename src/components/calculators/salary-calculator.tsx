
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const formSchema = z.object({
  amount: z.coerce.number().min(0, "Amount cannot be negative."),
  frequency: z.enum(['hour', 'day', 'week', 'bi-weekly', 'semi-monthly', 'month', 'quarter', 'year']),
  hoursPerWeek: z.coerce.number().min(1).max(100),
  daysPerWeek: z.coerce.number().min(1).max(7),
  holidays: z.coerce.number().min(0).max(50),
  vacationDays: z.coerce.number().min(0).max(100),
});

type FormData = z.infer<typeof formSchema>;

interface Result {
  unadjusted: Record<string, number>;
  adjusted: Record<string, number>;
}

const WEEKS_PER_YEAR = 52;
const WEEKDAYS_PER_YEAR = 260; // 5 days * 52 weeks

export default function SalaryCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 50,
      frequency: 'hour',
      hoursPerWeek: 40,
      daysPerWeek: 5,
      holidays: 10,
      vacationDays: 15,
    },
  });

  function onSubmit(values: FormData) {
    const { amount, frequency, hoursPerWeek, daysPerWeek, holidays, vacationDays } = values;

    // First, convert everything to an unadjusted annual salary
    let unadjustedAnnual = 0;
    switch (frequency) {
        case 'hour':
            unadjustedAnnual = amount * hoursPerWeek * WEEKS_PER_YEAR;
            break;
        case 'day':
            unadjustedAnnual = amount * daysPerWeek * WEEKS_PER_YEAR;
            break;
        case 'week':
            unadjustedAnnual = amount * WEEKS_PER_YEAR;
            break;
        case 'bi-weekly':
            unadjustedAnnual = amount * (WEEKS_PER_YEAR / 2);
            break;
        case 'semi-monthly':
            unadjustedAnnual = amount * 24;
            break;
        case 'month':
            unadjustedAnnual = amount * 12;
            break;
        case 'quarter':
            unadjustedAnnual = amount * 4;
            break;
        case 'year':
            unadjustedAnnual = amount;
            break;
    }

    // Now calculate adjusted annual salary
    const totalPaidDaysOff = holidays + vacationDays;
    const actualWorkingDays = WEEKDAYS_PER_YEAR - totalPaidDaysOff;
    const unadjustedDaily = unadjustedAnnual / WEEKDAYS_PER_YEAR;
    const adjustedAnnual = unadjustedDaily * actualWorkingDays;
    
    // Now convert both annual salaries to all other frequencies
    const calculateFrequencies = (annualSalary: number, isAdjusted: boolean) => {
        const workingDays = isAdjusted ? actualWorkingDays : WEEKDAYS_PER_YEAR;
        const weeks = workingDays / daysPerWeek;
        const daily = annualSalary / workingDays;
        const hourly = daily / (hoursPerWeek / daysPerWeek);

        return {
            Hourly: hourly,
            Daily: daily,
            Weekly: daily * daysPerWeek,
            'Bi-weekly': daily * daysPerWeek * 2,
            'Semi-monthly': annualSalary / 24,
            Monthly: annualSalary / 12,
            Quarterly: annualSalary / 4,
            Annual: annualSalary,
        };
    };
    
    // The prompt says "hourly and daily salary inputs to be unadjusted values",
    // while others are "holidays and vacation days adjusted values".
    // This is complex and potentially confusing. Let's use a more standard approach:
    // We derive ONE annual salary from the user input and then calculate both adjusted and unadjusted from that.
    
    let baseAnnualSalary: number;
    if (frequency === 'hour' || frequency === 'day' || frequency === 'week') {
      baseAnnualSalary = unadjustedAnnual; // Treat these as unadjusted rates
    } else {
      // Treat bi-weekly, semi-monthly etc. as already adjusted for time off.
      // So we back-calculate the "unadjusted" annual salary.
      const dailyRate = amount / (frequency === 'bi-weekly' ? 10 : frequency === 'semi-monthly' ? WEEKDAYS_PER_YEAR / 24 : frequency === 'month' ? WEEKDAYS_PER_YEAR / 12 : frequency === 'quarter' ? WEEKDAYS_PER_YEAR / 4 : WEEKDAYS_PER_YEAR);
      baseAnnualSalary = dailyRate * WEEKDAYS_PER_YEAR;
    }
    
    const unadjustedResults = calculateFrequencies(baseAnnualSalary, false);
    const adjustedResults = calculateFrequencies(baseAnnualSalary, true);

    setResult({ unadjusted: unadjustedResults, adjusted: adjustedResults });
  }
  
  function handleReset() {
      form.reset();
      setResult(null);
  }

  const currencySymbol = '$';
  const frequencies = ['hour', 'day', 'week', 'bi-weekly', 'semi-monthly', 'month', 'quarter', 'year'];

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">Salary Conversion</CardTitle>
        <CardDescription className="text-center">Enter your salary and work schedule details.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Amount</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Per</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        {frequencies.map(freq => (
                          <SelectItem key={freq} value={freq}>{freq.charAt(0).toUpperCase() + freq.slice(1)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="hoursPerWeek" render={({ field }) => (<FormItem><FormLabel>Hours per week</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="daysPerWeek" render={({ field }) => (<FormItem><FormLabel>Days per week</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="holidays" render={({ field }) => (<FormItem><FormLabel>Holidays per year</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="vacationDays" render={({ field }) => (<FormItem><FormLabel>Vacation days per year</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><DollarSign className="mr-2 h-4 w-4"/>Calculate</Button>
              <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
            </div>
          </form>
        </Form>
        
        {result && (
          <div className="mt-6 animate-fade-in">
            <h3 className="text-xl font-bold text-center mb-4">Your Salary Breakdown</h3>
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Frequency</TableHead>
                            <TableHead className="text-right">Unadjusted</TableHead>
                            <TableHead className="text-right">Adjusted (Holidays & Vacation)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Object.keys(result.unadjusted).map((key) => (
                            <TableRow key={key}>
                                <TableCell className="font-medium">{key}</TableCell>
                                <TableCell className="text-right">{currencySymbol}{result.unadjusted[key].toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                <TableCell className="text-right">{currencySymbol}{result.adjusted[key].toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
             <p className="text-xs text-muted-foreground mt-2">Calculations are based on 260 weekdays per year.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
