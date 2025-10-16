
"use client";

import { useState, useMemo } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
import { RefreshCcw, Briefcase } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const formSchema = z.object({
  amount: z.coerce.number().min(0, "Amount cannot be negative."),
  frequency: z.enum(['hourly', 'daily', 'weekly', 'bi-weekly', 'semi-monthly', 'monthly', 'quarterly', 'annually']),
  hoursPerWeek: z.coerce.number().min(1).max(168),
  daysPerWeek: z.coerce.number().min(1).max(7),
  hoursPerDay: z.coerce.number().min(1).max(24),
  holidaysPerYear: z.coerce.number().min(0).max(50),
  vacationDaysPerYear: z.coerce.number().min(0).max(100),
});

type FormData = z.infer<typeof formSchema>;

interface SalaryBreakdown {
  hourly: number;
  daily: number;
  weekly: number;
  biWeekly: number;
  semiMonthly: number;
  monthly: number;
  quarterly: number;
  annually: number;
}

const currencySymbol = '$';

export default function SalaryCalculator() {
  const [result, setResult] = useState<{ unadjusted: SalaryBreakdown, adjusted: SalaryBreakdown } | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 50,
      frequency: 'hourly',
      hoursPerWeek: 40,
      daysPerWeek: 5,
      hoursPerDay: 8,
      holidaysPerYear: 10,
      vacationDaysPerYear: 15,
    },
  });

  function onSubmit(values: FormData) {
    const { amount, frequency, hoursPerWeek, daysPerWeek, hoursPerDay, holidaysPerYear, vacationDaysPerYear } = values;

    const weeksPerYear = 52;
    const unadjustedWorkDays = weeksPerYear * daysPerWeek;
    const unadjustedWorkHours = weeksPerYear * hoursPerWeek;

    let unadjustedAnnualSalary = 0;
    switch (frequency) {
        case 'hourly': unadjustedAnnualSalary = amount * unadjustedWorkHours; break;
        case 'daily': unadjustedAnnualSalary = amount * unadjustedWorkDays; break;
        case 'weekly': unadjustedAnnualSalary = amount * weeksPerYear; break;
        case 'bi-weekly': unadjustedAnnualSalary = amount * (weeksPerYear / 2); break;
        case 'semi-monthly': unadjustedAnnualSalary = amount * 24; break;
        case 'monthly': unadjustedAnnualSalary = amount * 12; break;
        case 'quarterly': unadjustedAnnualSalary = amount * 4; break;
        case 'annually': unadjustedAnnualSalary = amount; break;
    }
    
    const unadjusted = {
        annually: unadjustedAnnualSalary,
        quarterly: unadjustedAnnualSalary / 4,
        monthly: unadjustedAnnualSalary / 12,
        semiMonthly: unadjustedAnnualSalary / 24,
        biWeekly: unadjustedAnnualSalary / 26,
        weekly: unadjustedAnnualSalary / 52,
        daily: unadjustedWorkDays > 0 ? unadjustedAnnualSalary / unadjustedWorkDays : 0,
        hourly: unadjustedWorkHours > 0 ? unadjustedAnnualSalary / unadjustedWorkHours : 0,
    };
    
    // Adjusted Calculation
    const totalPaidTimeOffDays = holidaysPerYear + vacationDaysPerYear;
    const adjustedWorkDays = unadjustedWorkDays - totalPaidTimeOffDays;
    const adjustedWorkHours = adjustedWorkDays * hoursPerDay;

    const adjusted = {
        annually: unadjustedAnnualSalary,
        quarterly: unadjustedAnnualSalary / 4,
        monthly: unadjustedAnnualSalary / 12,
        semiMonthly: unadjustedAnnualSalary / 24,
        biWeekly: unadjustedAnnualSalary / 26,
        weekly: unadjustedAnnualSalary / 52,
        daily: adjustedWorkDays > 0 ? unadjustedAnnualSalary / adjustedWorkDays : 0,
        hourly: adjustedWorkHours > 0 ? unadjustedAnnualSalary / adjustedWorkHours : 0,
    };

    setResult({ unadjusted, adjusted });
  }

  function handleReset() {
    form.reset();
    setResult(null);
  }

  const resultsData = useMemo(() => {
    if (!result) return [];
    return [
      { frequency: 'Hourly', unadjusted: result.unadjusted.hourly, adjusted: result.adjusted.hourly },
      { frequency: 'Daily', unadjusted: result.unadjusted.daily, adjusted: result.adjusted.daily },
      { frequency: 'Weekly', unadjusted: result.unadjusted.weekly, adjusted: result.adjusted.weekly },
      { frequency: 'Bi-weekly', unadjusted: result.unadjusted.biWeekly, adjusted: result.adjusted.biWeekly },
      { frequency: 'Semi-monthly', unadjusted: result.unadjusted.semiMonthly, adjusted: result.adjusted.semiMonthly },
      { frequency: 'Monthly', unadjusted: result.unadjusted.monthly, adjusted: result.adjusted.monthly },
      { frequency: 'Quarterly', unadjusted: result.unadjusted.quarterly, adjusted: result.adjusted.quarterly },
      { frequency: 'Annual', unadjusted: result.unadjusted.annually, adjusted: result.adjusted.annually },
    ];
  }, [result]);

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="flex gap-2">
                    <FormField control={form.control} name="amount" render={({ field }) => (<FormItem className="flex-1"><FormLabel>Salary Amount</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="frequency" render={({ field }) => (<FormItem className="w-1/2"><FormLabel>per</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="hourly">Hour</SelectItem>
                            <SelectItem value="daily">Day</SelectItem>
                            <SelectItem value="weekly">Week</SelectItem>
                            <SelectItem value="bi-weekly">Bi-week</SelectItem>
                            <SelectItem value="semi-monthly">Semi-month</SelectItem>
                            <SelectItem value="monthly">Month</SelectItem>
                            <SelectItem value="quarterly">Quarter</SelectItem>
                            <SelectItem value="annually">Year</SelectItem>
                          </SelectContent>
                        </Select><FormMessage /></FormItem>
                    )} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormField control={form.control} name="hoursPerWeek" render={({ field }) => (<FormItem><FormLabel>Hours / week</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="daysPerWeek" render={({ field }) => (<FormItem><FormLabel>Days / week</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                     <FormField control={form.control} name="hoursPerDay" render={({ field }) => (<FormItem><FormLabel>Hours / day</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="holidaysPerYear" render={({ field }) => (<FormItem><FormLabel>Holidays / year</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="vacationDaysPerYear" render={({ field }) => (<FormItem><FormLabel>Vacation days / year</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button type="submit" className="w-full"><Briefcase className="mr-2 h-4 w-4"/>Calculate Salary</Button>
                    <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
                  </div>
              </form>
              </Form>
            </div>
            
            <div className="flex flex-col space-y-4">
                {result ? (
                <div className="space-y-4 animate-fade-in">
                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Frequency</TableHead>
                                    <TableHead className="text-right">Unadjusted</TableHead>
                                    <TableHead className="text-right">Adjusted</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {resultsData.map(row => (
                                    <TableRow key={row.frequency}>
                                        <TableCell className="font-medium">{row.frequency}</TableCell>
                                        <TableCell className="text-right">{currencySymbol}{row.unadjusted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                        <TableCell className="text-right">{currencySymbol}{row.adjusted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                     <p className="text-xs text-muted-foreground pt-2 text-center">"Adjusted" figures account for holidays and vacation days.</p>
                </div>
                ) : (
                    <div className="flex items-center justify-center h-full bg-muted rounded-lg p-8">
                        <div className="text-center">
                            <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
                            <p className="mt-4 text-muted-foreground">Your salary breakdown will appear here.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
