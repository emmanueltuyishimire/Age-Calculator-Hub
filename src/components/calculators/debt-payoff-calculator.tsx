
"use client";

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
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
import { RefreshCcw, DollarSign, PlusCircle, Trash2, AlertCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Switch } from '../ui/switch';

const debtSchema = z.object({
  name: z.string().optional(),
  balance: z.coerce.number().min(0.01, "Balance is required."),
  minPayment: z.coerce.number().min(1, "Min payment is required."),
  apr: z.coerce.number().min(0, "APR is required."),
});

const formSchema = z.object({
  monthlyBudget: z.coerce.number().optional(),
  extraMonthly: z.coerce.number().min(0).optional(),
  extraYearly: z.coerce.number().min(0).optional(),
  oneTimePayment: z.coerce.number().min(0).optional(),
  oneTimePaymentMonth: z.coerce.number().min(1).int().optional(),
  useFixedBudget: z.boolean().default(true),
  debts: z.array(debtSchema).min(1, "At least one debt is required."),
});

type FormData = z.infer<typeof formSchema>;

interface Payment {
  debtName: string;
  paymentAmount: number;
}

interface ScheduleRow {
  month: number;
  payments: Payment[];
  totalPayment: number;
  endingBalances: { debtName: string; balance: number }[];
}

interface Result {
  payoffMonths: number;
  totalInterest: number;
  totalPaid: number;
  schedule: ScheduleRow[];
}

export default function DebtPayoffCalculator() {
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      useFixedBudget: true,
      extraMonthly: 100,
      extraYearly: 0,
      oneTimePayment: 0,
      oneTimePaymentMonth: 5,
      debts: [
        { name: 'Auto loan', balance: 25000, minPayment: 519, apr: 4.9 },
        { name: 'Home mortgage', balance: 250000, minPayment: 1800, apr: 4 },
        { name: 'Credit card 1', balance: 6000, minPayment: 150, apr: 18.99 },
        { name: 'Credit card 2', balance: 3000, minPayment: 60, apr: 16.99 },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'debts',
  });

  function onSubmit(values: FormData) {
    setError(null);
    setResult(null);

    const totalMinPayments = values.debts.reduce((sum, debt) => sum + debt.minPayment, 0);
    const budget = values.useFixedBudget ? (values.monthlyBudget || totalMinPayments + (values.extraMonthly || 0)) : (totalMinPayments + (values.extraMonthly || 0));

    if (budget < totalMinPayments) {
      setError(`Your budget ($${budget}) is less than the total minimum payments ($${totalMinPayments}). Please increase your budget.`);
      return;
    }
    
    let debts = values.debts.map((d, i) => ({ ...d, id: i, name: d.name || `Debt ${i + 1}`, currentBalance: d.balance, originalMinPayment: d.minPayment }));
    const schedule: ScheduleRow[] = [];
    let month = 0;
    let totalInterestPaid = 0;

    while (debts.some(d => d.currentBalance > 0)) {
      month++;
      if (month > 600) { // Safety break
        setError("Calculation is taking too long. Check if payments cover interest.");
        return;
      }

      // Accrue interest
      debts.forEach(debt => {
        if (debt.currentBalance > 0) {
          const interest = debt.currentBalance * (debt.apr / 100 / 12);
          debt.currentBalance += interest;
          totalInterestPaid += interest;
        }
      });
      
      // One time payment
      if (month === values.oneTimePaymentMonth) {
        let oneTimeRemaining = values.oneTimePayment || 0;
        debts.sort((a,b) => b.apr - a.apr);
        for(const debt of debts) {
            if(debt.currentBalance > 0 && oneTimeRemaining > 0) {
                const payment = Math.min(debt.currentBalance, oneTimeRemaining);
                debt.currentBalance -= payment;
                oneTimeRemaining -= payment;
            }
        }
      }

      // Yearly payment
      let budgetForMonth = budget;
      if (month % 12 === 0 && values.extraYearly) {
        budgetForMonth += values.extraYearly;
      }
      
      let budgetRemaining = budgetForMonth;
      const paymentsThisMonth: { name: string, amount: number }[] = [];

      // Make minimum payments
      debts.forEach(debt => {
        if (debt.currentBalance > 0) {
          const payment = Math.min(debt.currentBalance, debt.originalMinPayment);
          paymentsThisMonth.push({ name: debt.name, amount: payment });
          debt.currentBalance -= payment;
          budgetRemaining -= debt.originalMinPayment; // Use original min payment for budget calc
        }
      });

      // Avalanche extra payments
      debts.sort((a, b) => b.apr - a.apr);
      for (const debt of debts) {
        if (debt.currentBalance > 0 && budgetRemaining > 0) {
          const extraPayment = Math.min(debt.currentBalance, budgetRemaining);
          const existingPayment = paymentsThisMonth.find(p => p.name === debt.name);
          if (existingPayment) {
            existingPayment.amount += extraPayment;
          } else {
            paymentsThisMonth.push({ name: debt.name, amount: extraPayment });
          }
          debt.currentBalance -= extraPayment;
          budgetRemaining -= extraPayment;
        }
      }
      
      schedule.push({
        month,
        payments: paymentsThisMonth.map(p => ({ debtName: p.name, paymentAmount: p.amount })),
        totalPayment: budgetForMonth - budgetRemaining,
        endingBalances: debts.map(d => ({ debtName: d.name, balance: Math.max(0, d.currentBalance) }))
      });
      
      if (!values.useFixedBudget) {
          const newTotalMin = debts.reduce((sum, d) => d.currentBalance > 0 ? sum + d.originalMinPayment : sum, 0);
          budget = newTotalMin + (values.extraMonthly || 0);
      }
    }

    setResult({
      payoffMonths: month,
      totalInterest: totalInterestPaid,
      totalPaid: totalInterestPaid + values.debts.reduce((sum, debt) => sum + debt.balance, 0),
      schedule,
    });
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">Debt Payoff Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <Alert variant="destructive" className="mb-4"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Your Debts</h3>
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-5 gap-2 items-end p-2 border rounded-lg">
                  <FormField control={form.control} name={`debts.${index}.name`} render={({ field }) => (<FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder={`Debt ${index+1}`} {...field} /></FormControl></FormItem>)} />
                  <FormField control={form.control} name={`debts.${index}.balance`} render={({ field }) => (<FormItem><FormLabel>Balance</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name={`debts.${index}.minPayment`} render={({ field }) => (<FormItem><FormLabel>Min. Payment</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name={`debts.${index}.apr`} render={({ field }) => (<FormItem><FormLabel>APR (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} aria-label={`Remove debt ${index + 1}`}><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => append({ name: '', balance: 0, minPayment: 0, apr: 0 })}><PlusCircle className="mr-2 h-4 w-4" /> Add Debt</Button>
            </div>
            
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-semibold">Extra Payments</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField control={form.control} name="extraMonthly" render={({ field }) => (<FormItem><FormLabel>Extra per month</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                  <FormField control={form.control} name="extraYearly" render={({ field }) => (<FormItem><FormLabel>Extra per year</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                  <div className="flex gap-2">
                    <FormField control={form.control} name="oneTimePayment" render={({ field }) => (<FormItem className="flex-1"><FormLabel>One-time</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="oneTimePaymentMonth" render={({ field }) => (<FormItem className="w-1/3"><FormLabel>in month</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                  </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
                <FormField
                  control={form.control}
                  name="useFixedBudget"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Fixed total monthly payment?</FormLabel>
                        <FormDescription>If yes, paid-off debt payments are reallocated (faster). If no, total payment decreases.</FormDescription>
                      </div>
                      <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                  )}
                />
                {form.watch('useFixedBudget') && <FormField control={form.control} name="monthlyBudget" render={({ field }) => (<FormItem><FormLabel>Total Monthly Budget for Debts</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormDescription>Leave blank to use sum of minimums + extra monthly.</FormDescription></FormItem>)} />}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button type="submit" className="w-full"><DollarSign className="mr-2 h-4 w-4"/>Calculate Payoff</Button>
              <Button onClick={() => {form.reset(); setResult(null); setError(null)}} type="button" variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="h-4 w-4"/> Reset</Button>
            </div>
          </form>
        </Form>
        
        {result && (
          <div className="p-4 bg-muted rounded-lg mt-6 space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-center text-foreground">Your Payoff Plan</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-3 border rounded-lg bg-background">
                    <h4 className="font-semibold text-muted-foreground">Payoff Time</h4>
                    <p className="text-2xl font-bold text-primary">{Math.floor(result.payoffMonths / 12)} years, {result.payoffMonths % 12} months</p>
                </div>
                 <div className="p-3 border rounded-lg bg-background">
                    <h4 className="font-semibold text-muted-foreground">Total Interest Paid</h4>
                    <p className="text-2xl font-bold text-primary">${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                </div>
                 <div className="p-3 border rounded-lg bg-background">
                    <h4 className="font-semibold text-muted-foreground">Total Paid</h4>
                    <p className="text-2xl font-bold text-primary">${result.totalPaid.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-bold text-center mb-2">Payoff Schedule</h3>
                <div className="h-[400px] overflow-y-auto border rounded-md">
                <Table>
                    <TableHeader className="sticky top-0 bg-secondary">
                        <TableRow>
                            <TableHead>Month</TableHead>
                            <TableHead>Payment Details</TableHead>
                            <TableHead>Total Payment</TableHead>
                            <TableHead className="text-right">Ending Balances</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {result.schedule.map((row) => (
                            <TableRow key={row.month}>
                                <TableCell className="font-medium">{row.month}</TableCell>
                                <TableCell>
                                    {row.payments.map(p => `${p.debtName}: $${p.paymentAmount.toFixed(2)}`).join(' | ')}
                                </TableCell>
                                <TableCell>${row.totalPayment.toFixed(2)}</TableCell>
                                <TableCell className="text-right">
                                    {row.endingBalances.map(b => `${b.debtName}: $${b.balance.toFixed(2)}`).join(' | ')}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
