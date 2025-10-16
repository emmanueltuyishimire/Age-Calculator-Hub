
"use client";

import { useState } from 'react';
import { z } from 'zod';
import { useForm, type UseFormReturn } from 'react-hook-form';
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
import { RefreshCcw, CreditCard, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addMonths, format, differenceInMonths } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const currencySymbol = '$';

interface Result {
  monthsToPayoff?: number;
  totalInterest: number;
  payoffDate?: Date;
  requiredPayment?: number;
}

// --- Pay Over Time Calculator ---
const timeSchema = z.object({
  balance: z.coerce.number().min(1, "Balance is required."),
  apr: z.coerce.number().min(0, "APR is required."),
  monthlyPayment: z.coerce.number().min(1, "Payment is required."),
});
type TimeFormData = z.infer<typeof timeSchema>;

function PayOverTimeCalculator() {
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<TimeFormData>({
    resolver: zodResolver(timeSchema),
    defaultValues: { balance: 8000, apr: 18, monthlyPayment: 200 },
  });

  function onSubmit(values: TimeFormData) {
    setError(null);
    const { balance, apr, monthlyPayment } = values;
    const monthlyRate = apr / 100 / 12;

    if (monthlyPayment <= balance * monthlyRate) {
      setError("Monthly payment is too low to cover interest. The balance will never be paid off.");
      setResult(null);
      return;
    }

    const monthsToPayoff = -(Math.log(1 - (balance * monthlyRate) / monthlyPayment) / Math.log(1 + monthlyRate));
    const totalPaid = monthlyPayment * monthsToPayoff;
    const totalInterest = totalPaid - balance;
    
    setResult({
      monthsToPayoff: Math.ceil(monthsToPayoff),
      totalInterest,
      payoffDate: addMonths(new Date(), Math.ceil(monthsToPayoff)),
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pay Off Over Time</CardTitle>
        <CardDescription>Find out how long it will take to pay off your balance with a fixed monthly payment.</CardDescription>
      </CardHeader>
      <CardContent>
        {error && <Alert variant="destructive" className="mb-4"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <FormField control={form.control} name="balance" render={({ field }) => <FormItem><FormLabel>Credit Card Balance</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>} />
                <FormField control={form.control} name="apr" render={({ field }) => <FormItem><FormLabel>Interest Rate (APR %)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>} />
                <FormField control={form.control} name="monthlyPayment" render={({ field }) => <FormItem><FormLabel>Monthly Payment</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>} />
            </div>
            <Button type="submit" className="w-full">Calculate</Button>
          </form>
        </Form>
        {result && <ResultDisplay result={result} />}
      </CardContent>
    </Card>
  );
}

// --- Pay by Date Calculator ---
const dateSchema = z.object({
    balance: z.coerce.number().min(1, "Balance is required."),
    apr: z.coerce.number().min(0, "APR is required."),
    payoffMonths: z.coerce.number().min(1, "Months must be at least 1.").int(),
});
type DateFormData = z.infer<typeof dateSchema>;

function PayByDateCalculator() {
  const [result, setResult] = useState<Result | null>(null);
  const form = useForm<DateFormData>({
    resolver: zodResolver(dateSchema),
    defaultValues: { balance: 8000, apr: 18, payoffMonths: 60 },
  });

  function onSubmit(values: DateFormData) {
    const { balance, apr, payoffMonths } = values;
    const monthlyRate = apr / 100 / 12;

    const requiredPayment = monthlyRate > 0
        ? (balance * monthlyRate * Math.pow(1 + monthlyRate, payoffMonths)) / (Math.pow(1 + monthlyRate, payoffMonths) - 1)
        : balance / payoffMonths;

    const totalPaid = requiredPayment * payoffMonths;
    const totalInterest = totalPaid - balance;

    setResult({
      requiredPayment: requiredPayment,
      totalInterest,
    });
  }

  return (
     <Card>
      <CardHeader>
        <CardTitle>Pay Off By a Specific Date</CardTitle>
        <CardDescription>Find out the monthly payment needed to be debt-free within a certain timeframe.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <FormField control={form.control} name="balance" render={({ field }) => <FormItem><FormLabel>Credit Card Balance</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>} />
                <FormField control={form.control} name="apr" render={({ field }) => <FormItem><FormLabel>Interest Rate (APR %)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>} />
                <FormField control={form.control} name="payoffMonths" render={({ field }) => <FormItem><FormLabel>Payoff in (Months)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>} />
            </div>
            <Button type="submit" className="w-full">Calculate</Button>
          </form>
        </Form>
        {result && <ResultDisplay result={result} />}
      </CardContent>
    </Card>
  );
}

// --- Result Display ---
function ResultDisplay({ result }: { result: Result }) {
  return (
    <div className="p-4 bg-muted rounded-lg mt-6 space-y-4 animate-fade-in text-center">
        {result.monthsToPayoff !== undefined && (
             <div className="p-2 border rounded-lg bg-background">
                <h4 className="font-semibold text-muted-foreground">Payoff Time</h4>
                <p className="text-2xl font-bold text-primary">{Math.floor(result.monthsToPayoff / 12)} years, {result.monthsToPayoff % 12} months</p>
                {result.payoffDate && <p className="text-xs text-muted-foreground">You will be debt-free by {format(result.payoffDate, 'MMMM yyyy')}</p>}
            </div>
        )}
        {result.requiredPayment !== undefined && (
            <div className="p-2 border rounded-lg bg-background">
                <h4 className="font-semibold text-muted-foreground">Required Monthly Payment</h4>
                <p className="text-2xl font-bold text-primary">{currencySymbol}{result.requiredPayment.toFixed(2)}</p>
            </div>
        )}
        <div className="p-2 border rounded-lg bg-background">
            <h4 className="font-semibold text-muted-foreground">Total Interest Paid</h4>
            <p className="text-2xl font-bold text-primary">{currencySymbol}{result.totalInterest.toFixed(2)}</p>
        </div>
    </div>
  );
}


// --- Main Component ---
export default function CreditCardCalculator() {
  const [activeTab, setActiveTab] = useState("time");
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-xl mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="time">Pay Off Over Time</TabsTrigger>
        <TabsTrigger value="date">Pay Off By Date</TabsTrigger>
      </TabsList>
      <TabsContent value="time" className="mt-4">
        <PayOverTimeCalculator />
      </TabsContent>
      <TabsContent value="date" className="mt-4">
        <PayByDateCalculator />
      </TabsContent>
    </Tabs>
  );
}
