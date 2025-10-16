
"use client";

import { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
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

const cardSchema = z.object({
  name: z.string().optional(),
  balance: z.coerce.number().min(0.01, "Balance is required."),
  minPayment: z.coerce.number().min(1, "Min payment is required."),
  apr: z.coerce.number().min(0, "APR is required."),
});

const formSchema = z.object({
  monthlyBudget: z.coerce.number().min(1, "Budget is required."),
  cards: z.array(cardSchema).min(1, "At least one card is required."),
});

type FormData = z.infer<typeof formSchema>;

interface Payment {
  cardName: string;
  paymentAmount: number;
}

interface ScheduleRow {
  month: number;
  payments: Payment[];
  totalPayment: number;
  endingBalances: { cardName: string; balance: number }[];
}

interface Result {
  payoffMonths: number;
  totalInterest: number;
  totalPaid: number;
  schedule: ScheduleRow[];
}

export default function CreditCardPayoffCalculator() {
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlyBudget: 500,
      cards: [
        { name: 'Card 1', balance: 4600, minPayment: 100, apr: 18.99 },
        { name: 'Card 2', balance: 3900, minPayment: 90, apr: 19.99 },
        { name: 'Card 3', balance: 6000, minPayment: 120, apr: 15.99 },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'cards',
  });

  function onSubmit(values: FormData) {
    setError(null);
    setResult(null);

    const totalMinPayments = values.cards.reduce((sum, card) => sum + card.minPayment, 0);
    if (values.monthlyBudget < totalMinPayments) {
      setError(`Your monthly budget ($${values.monthlyBudget}) is less than the total minimum payments ($${totalMinPayments}). Please increase your budget.`);
      return;
    }

    let cards = values.cards.map((c, i) => ({ ...c, id: i, name: c.name || `Card ${i + 1}`, currentBalance: c.balance }));
    const schedule: ScheduleRow[] = [];
    let month = 0;
    let totalInterestPaid = 0;

    while (cards.some(c => c.currentBalance > 0)) {
      month++;
      if (month > 600) { // Safety break
        setError("Calculation is taking too long. Please check your inputs, as the debt may not be decreasing.");
        return;
      }
      
      // Sort by APR for Debt Avalanche
      cards.sort((a, b) => b.apr - a.apr);
      
      let budgetRemaining = values.monthlyBudget;
      const payments: Payment[] = [];
      
      // Accrue interest for the month
      cards.forEach(card => {
        if (card.currentBalance > 0) {
          const monthlyRate = card.apr / 100 / 12;
          const interest = card.currentBalance * monthlyRate;
          card.currentBalance += interest;
          totalInterestPaid += interest;
        }
      });
      
      // Make minimum payments
      const minPayments: Payment[] = [];
      cards.forEach(card => {
        if (card.currentBalance > 0) {
          const payment = Math.min(card.currentBalance, card.minPayment);
          minPayments.push({ cardName: card.name, paymentAmount: payment });
          card.currentBalance -= payment;
          budgetRemaining -= payment;
        }
      });
      
      // Apply extra payments (avalanche)
      const extraPayments: Payment[] = [];
      for (const card of cards) {
        if (card.currentBalance > 0 && budgetRemaining > 0) {
          const extraPayment = Math.min(card.currentBalance, budgetRemaining);
          extraPayments.push({ cardName: card.name, paymentAmount: extraPayment });
          card.currentBalance -= extraPayment;
          budgetRemaining -= extraPayment;
        }
      }

      // Consolidate payments for the schedule
      const monthlyPaymentsMap = new Map<string, number>();
      [...minPayments, ...extraPayments].forEach(p => {
          monthlyPaymentsMap.set(p.cardName, (monthlyPaymentsMap.get(p.cardName) || 0) + p.paymentAmount);
      });
      const consolidatedPayments = Array.from(monthlyPaymentsMap, ([cardName, paymentAmount]) => ({ cardName, paymentAmount }));

      schedule.push({
        month,
        payments: consolidatedPayments,
        totalPayment: values.monthlyBudget - budgetRemaining,
        endingBalances: cards.map(c => ({ cardName: c.name, balance: c.currentBalance > 0 ? c.currentBalance : 0 }))
      });
    }

    setResult({
      payoffMonths: month,
      totalInterest: totalInterestPaid,
      totalPaid: totalInterestPaid + values.cards.reduce((sum, card) => sum + card.balance, 0),
      schedule,
    });
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">Credit Card Payoff Inputs</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
            <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="monthlyBudget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Monthly Budget for Credit Cards</FormLabel>
                  <FormControl><Input type="number" {...field} className="max-w-xs" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Your Credit Cards</h3>
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-5 gap-2 items-end p-2 border rounded-lg">
                  <FormField control={form.control} name={`cards.${index}.name`} render={({ field }) => (<FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder={`Card ${index+1}`} {...field} /></FormControl></FormItem>)} />
                  <FormField control={form.control} name={`cards.${index}.balance`} render={({ field }) => (<FormItem><FormLabel>Balance</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name={`cards.${index}.minPayment`} render={({ field }) => (<FormItem><FormLabel>Min. Payment</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name={`cards.${index}.apr`} render={({ field }) => (<FormItem><FormLabel>APR (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} aria-label={`Remove card ${index + 1}`}><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => append({ balance: 0, minPayment: 0, apr: 0 })}><PlusCircle className="mr-2 h-4 w-4" /> Add Card</Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button type="submit" className="w-full"><DollarSign className="mr-2 h-4 w-4"/>Calculate Payoff</Button>
              <Button onClick={() => form.reset()} type="button" variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
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
                                    {row.payments.map(p => `${p.cardName}: $${p.paymentAmount.toFixed(2)}`).join(' | ')}
                                </TableCell>
                                <TableCell>${row.totalPayment.toFixed(2)}</TableCell>
                                <TableCell className="text-right">
                                    {row.endingBalances.map(b => `${b.cardName}: $${b.balance.toFixed(2)}`).join(' | ')}
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
