
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
import { RefreshCcw, Car, Scale } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '../ui/separator';

const states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
const statesNoTaxRebate = ["Alaska", "Arizona", "Delaware", "Iowa", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Minnesota", "Missouri", "Montana", "Nebraska", "New Hampshire", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "Texas", "Utah", "Vermont", "Wyoming"];

const currencySymbol = '$';

const formSchema = z.object({
  cashBack: z.coerce.number().min(0).optional(),
  highRate: z.coerce.number().min(0).max(50),
  lowRate: z.coerce.number().min(0).max(50),
  autoPrice: z.coerce.number().min(1),
  loanTerm: z.coerce.number().min(12).max(96),
  downPayment: z.coerce.number().min(0).optional(),
  tradeIn: z.coerce.number().min(0).optional(),
  state: z.string().optional(),
  salesTax: z.coerce.number().min(0).max(20),
  otherFees: z.coerce.number().min(0).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface OfferResult {
  totalLoanAmount: number;
  saleTaxAmount: number;
  upfrontPayment: number;
  monthlyPay: number;
  totalPayments: number;
  totalInterest: number;
  totalCost: number;
}

interface Result {
  cashBackOffer: OfferResult;
  lowRateOffer: OfferResult;
  betterOffer: 'cash' | 'low';
  savings: number;
}

const calculateLoan = (loanAmount: number, rate: number, term: number): { monthly: number, totalInterest: number, totalPaid: number } => {
    const monthlyRate = rate / 100 / 12;
    if (monthlyRate === 0) {
        const monthly = loanAmount / term;
        return { monthly, totalInterest: 0, totalPaid: loanAmount };
    }
    const monthly = loanAmount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -term));
    const totalPaid = monthly * term;
    const totalInterest = totalPaid - loanAmount;
    return { monthly, totalInterest, totalPaid };
};


export default function CashBackOrLowInterestCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        cashBack: 1000,
        highRate: 5,
        lowRate: 2,
        autoPrice: 50000,
        loanTerm: 60,
        downPayment: 10000,
        tradeIn: 0,
        state: 'California',
        salesTax: 7,
        otherFees: 2000,
    },
  });

  function onSubmit(values: FormData) {
    const { cashBack = 0, highRate, lowRate, autoPrice, loanTerm, downPayment = 0, tradeIn = 0, state, salesTax, otherFees = 0 } = values;

    // --- Cash Back Offer ---
    const taxOnRebate = !statesNoTaxRebate.includes(state || '');
    const taxablePriceCashBack = taxOnRebate ? autoPrice : autoPrice - cashBack;
    const taxCashBack = taxablePriceCashBack * (salesTax / 100);
    const loanCashBack = autoPrice - cashBack - downPayment - tradeIn + taxCashBack + otherFees;
    const cashBackCalcs = calculateLoan(loanCashBack > 0 ? loanCashBack : 0, highRate, loanTerm);

    const cashBackOffer: OfferResult = {
        totalLoanAmount: loanCashBack > 0 ? loanCashBack : 0,
        saleTaxAmount: taxCashBack,
        upfrontPayment: downPayment + tradeIn,
        monthlyPay: cashBackCalcs.monthly,
        totalPayments: cashBackCalcs.totalPaid,
        totalInterest: cashBackCalcs.totalInterest,
        totalCost: autoPrice + cashBackCalcs.totalInterest + taxCashBack + otherFees,
    };

    // --- Low Rate Offer ---
    const taxLowRate = autoPrice * (salesTax / 100);
    const loanLowRate = autoPrice - downPayment - tradeIn + taxLowRate + otherFees;
    const lowRateCalcs = calculateLoan(loanLowRate > 0 ? loanLowRate : 0, lowRate, loanTerm);
    
    const lowRateOffer: OfferResult = {
        totalLoanAmount: loanLowRate > 0 ? loanLowRate : 0,
        saleTaxAmount: taxLowRate,
        upfrontPayment: downPayment + tradeIn,
        monthlyPay: lowRateCalcs.monthly,
        totalPayments: lowRateCalcs.totalPaid,
        totalInterest: lowRateCalcs.totalInterest,
        totalCost: autoPrice + lowRateCalcs.totalInterest + taxLowRate + otherFees,
    };
    
    const betterOffer = lowRateOffer.totalCost < cashBackOffer.totalCost ? 'low' : 'cash';
    const savings = Math.abs(lowRateOffer.totalCost - cashBackOffer.totalCost);

    setResult({ cashBackOffer, lowRateOffer, betterOffer, savings });
  }
  
  return (
    <Card className="w-full mx-auto shadow-lg animate-fade-in">
        <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold text-center">Cash Back Offer</h3>
                <FormField control={form.control} name="cashBack" render={({ field }) => (<FormItem><FormLabel>Cash Back Amount</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="highRate" render={({ field }) => (<FormItem><FormLabel>Interest Rate (High)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
              </div>
              <div className="space-y-4 p-4 border rounded-lg">
                 <h3 className="text-lg font-semibold text-center">Low Interest Rate Offer</h3>
                 <FormField control={form.control} name="lowRate" render={({ field }) => (<FormItem className="pt-[52px]"><FormLabel>Interest Rate (Low)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
              </div>
            </div>

            <div className="p-4 border rounded-lg">
                 <h3 className="text-lg font-semibold text-center mb-4">Other Information</h3>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <FormField control={form.control} name="autoPrice" render={({ field }) => (<FormItem><FormLabel>Auto Price</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="loanTerm" render={({ field }) => (<FormItem><FormLabel>Loan Term (months)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="downPayment" render={({ field }) => (<FormItem><FormLabel>Down Payment</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="tradeIn" render={({ field }) => (<FormItem><FormLabel>Trade-in Value</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="state" render={({ field }) => (<FormItem><FormLabel>Your State</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>{states.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></FormItem>)} />
                    <FormField control={form.control} name="salesTax" render={({ field }) => (<FormItem><FormLabel>Sales Tax (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="otherFees" render={({ field }) => (<FormItem className="col-span-2 md:col-span-1"><FormLabel>Title, Fees, etc.</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                 </div>
            </div>

            <Button type="submit" className="w-full"><Scale className="mr-2 h-4 w-4"/>Compare Offers</Button>
          </form>
        </Form>
        {result && (
          <div className="p-4 bg-muted rounded-lg mt-6 space-y-4 animate-fade-in">
            <div className={`p-4 border-2 rounded-lg text-center ${result.betterOffer === 'low' ? 'border-green-500' : 'border-blue-500'}`}>
                <h3 className="text-xl font-bold">The {result.betterOffer === 'low' ? 'Low Interest Rate' : 'Cash Back'} Offer is Better!</h3>
                {result.betterOffer === 'low' ? (
                     <p>The low rate will save you {currencySymbol}{result.lowRateOffer.totalInterest.toFixed(2)} in interest vs {currencySymbol}{result.cashBackOffer.totalInterest.toFixed(2)}.</p>
                ) : (
                    <p>The cash back of {currencySymbol}{form.getValues('cashBack')} is greater than the {currencySymbol}{result.savings.toFixed(2)} you would save in interest with the lower rate.</p>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ResultCard title="With Cash Back Offer" data={result.cashBackOffer} />
                <ResultCard title="With Low Interest Rate Offer" data={result.lowRateOffer} />
            </div>
          </div>
        )}
        </CardContent>
    </Card>
  );
}

const ResultCard = ({ title, data }: { title: string, data: OfferResult }) => (
    <div className="p-4 border rounded-lg bg-background text-sm space-y-1">
        <h4 className="font-bold text-center mb-2">{title}</h4>
        <div className="flex justify-between"><span>Total Loan Amount:</span><span>{currencySymbol}{data.totalLoanAmount.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Sales Tax:</span><span>{currencySymbol}{data.saleTaxAmount.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Upfront Payment:</span><span>{currencySymbol}{data.upfrontPayment.toFixed(2)}</span></div>
        <Separator className="my-2" />
        <div className="flex justify-between font-bold"><span>Monthly Payment:</span><span>{currencySymbol}{data.monthlyPay.toFixed(2)}</span></div>
        <Separator className="my-2" />
        <div className="flex justify-between"><span>Total of Payments:</span><span>{currencySymbol}{data.totalPayments.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Total Loan Interest:</span><span>{currencySymbol}{data.totalInterest.toFixed(2)}</span></div>
        <Separator className="my-2" />
        <div className="flex justify-between font-bold"><span>Total Cost:</span><span>{currencySymbol}{data.totalCost.toFixed(2)}</span></div>
    </div>
);
