
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
import { RefreshCcw, Landmark } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle } from 'lucide-react';

const currencySymbol = '$';

// Schemas
const fixedLengthSchema = z.object({
  principal: z.coerce.number().min(1, "Principal must be greater than zero."),
  interestRate: z.coerce.number().min(0).max(30),
  yearsToPayout: z.coerce.number().min(1).max(100),
  payoutFrequency: z.enum(['monthly', 'quarterly', 'annually']),
});
type FixedLengthFormData = z.infer<typeof fixedLengthSchema>;

const fixedPaymentSchema = z.object({
  principal: z.coerce.number().min(1, "Principal must be greater than zero."),
  interestRate: z.coerce.number().min(0).max(30),
  payoutAmount: z.coerce.number().min(1, "Payout must be greater than zero."),
  payoutFrequency: z.enum(['monthly', 'quarterly', 'annually']),
});
type FixedPaymentFormData = z.infer<typeof fixedPaymentSchema>;


// Result and Amortization types
interface AmortizationRow {
    year: number;
    beginningBalance: number;
    interestReturn: number;
    endingBalance: number;
}

interface Result {
  payoutAmount?: number;
  payoutYears?: number;
  totalPayments: number;
  totalInterest: number;
  amortizationSchedule: AmortizationRow[];
}

const payoutFrequencies = {
    monthly: 12,
    quarterly: 4,
    annually: 1,
};

// Main Component
export default function AnnuityPayoutCalculator() {
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("length");

  const fixedLengthForm = useForm<FixedLengthFormData>({
    resolver: zodResolver(fixedLengthSchema),
    defaultValues: { principal: 500000, interestRate: 6, yearsToPayout: 10, payoutFrequency: 'monthly' },
  });

  const fixedPaymentForm = useForm<FixedPaymentFormData>({
    resolver: zodResolver(fixedPaymentSchema),
    defaultValues: { principal: 500000, interestRate: 6, payoutAmount: 5000, payoutFrequency: 'monthly' },
  });

  function calculateAmortization(principal: number, periodicRate: number, numberOfPeriods: number, periodicPayment: number, payoutFrequency: 'monthly' | 'quarterly' | 'annually'): AmortizationRow[] {
    let balance = principal;
    const schedule: AmortizationRow[] = [];
    const periodsPerYear = payoutFrequencies[payoutFrequency];
    
    let yearStartBalance = principal;

    for (let year = 1; year <= Math.ceil(numberOfPeriods / periodsPerYear); year++) {
        let annualInterest = 0;
        const periodsThisYear = (year * periodsPerYear > numberOfPeriods) ? numberOfPeriods % periodsPerYear : periodsPerYear;
        
        for (let period = 1; period <= periodsThisYear; period++) {
            const interestForPeriod = balance * periodicRate;
            balance = balance + interestForPeriod - periodicPayment;
            annualInterest += interestForPeriod;
        }

        schedule.push({
            year: year,
            beginningBalance: yearStartBalance,
            interestReturn: annualInterest,
            endingBalance: balance > 0 ? balance : 0,
        });
        yearStartBalance = balance > 0 ? balance : 0;
    }
    return schedule;
  }

  function onFixedLengthSubmit(values: FixedLengthFormData) {
    setError(null);
    const { principal, interestRate, yearsToPayout, payoutFrequency } = values;
    const periodsPerYear = payoutFrequencies[payoutFrequency];
    const numberOfPeriods = yearsToPayout * periodsPerYear;
    const periodicRate = interestRate / 100 / periodsPerYear;

    let payoutAmount;
    if (periodicRate > 0) {
        payoutAmount = principal * periodicRate / (1 - Math.pow(1 + periodicRate, -numberOfPeriods));
    } else {
        payoutAmount = principal / numberOfPeriods;
    }
    
    const totalPayments = payoutAmount * numberOfPeriods;
    const totalInterest = totalPayments - principal;
    const amortizationSchedule = calculateAmortization(principal, periodicRate, numberOfPeriods, payoutAmount, payoutFrequency);

    setResult({ payoutAmount, totalPayments, totalInterest, amortizationSchedule });
  }

  function onFixedPaymentSubmit(values: FixedPaymentFormData) {
      setError(null);
      const { principal, interestRate, payoutAmount, payoutFrequency } = values;
      const periodsPerYear = payoutFrequencies[payoutFrequency];
      const periodicRate = interestRate / 100 / periodsPerYear;
      
      if (periodicRate > 0 && payoutAmount <= principal * periodicRate) {
          setError("Payout amount is too low to cover interest. The annuity will never deplete.");
          setResult(null);
          return;
      }
      
      let numberOfPeriods;
      if (periodicRate > 0) {
        numberOfPeriods = -Math.log(1 - (principal * periodicRate) / payoutAmount) / Math.log(1 + periodicRate);
      } else {
        numberOfPeriods = principal / payoutAmount;
      }

      const totalYears = numberOfPeriods / periodsPerYear;
      const totalPayments = payoutAmount * Math.ceil(numberOfPeriods);
      const totalInterest = totalPayments - principal;
      const amortizationSchedule = calculateAmortization(principal, periodicRate, Math.ceil(numberOfPeriods), payoutAmount, payoutFrequency);

      setResult({ payoutYears: totalYears, totalPayments, totalInterest, amortizationSchedule });
  }

  function handleReset(form: UseFormReturn<any>) {
    form.reset();
    setResult(null);
    setError(null);
  }

  const pieChartData = result ? [
    { name: 'Starting Principal', value: activeTab === 'length' ? fixedLengthForm.getValues('principal') : fixedPaymentForm.getValues('principal'), fill: 'hsl(var(--chart-1))' },
    { name: 'Total Interest', value: result.totalInterest, fill: 'hsl(var(--chart-2))' },
  ].filter(item => item.value > 0) : [];

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={(val) => { setActiveTab(val); setResult(null); setError(null); }} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="length">Fixed Length</TabsTrigger>
                <TabsTrigger value="payment">Fixed Payment</TabsTrigger>
            </TabsList>
            <TabsContent value="length">
                <AnnuityForm form={fixedLengthForm} onSubmit={onFixedLengthSubmit} onReset={() => handleReset(fixedLengthForm)} isLengthMode={true} result={result} pieChartData={pieChartData} error={error} />
            </TabsContent>
            <TabsContent value="payment">
                 <AnnuityForm form={fixedPaymentForm} onSubmit={onFixedPaymentSubmit} onReset={() => handleReset(fixedPaymentForm)} isLengthMode={false} result={result} pieChartData={pieChartData} error={error}/>
            </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Form and Results Component
interface AnnuityFormProps {
    form: UseFormReturn<any>;
    onSubmit: (values: any) => void;
    onReset: () => void;
    isLengthMode: boolean;
    result: Result | null;
    pieChartData: any[];
    error: string | null;
}

function AnnuityForm({ form, onSubmit, onReset, isLengthMode, result, pieChartData, error }: AnnuityFormProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField control={form.control} name="principal" render={({ field }) => (<FormItem><FormLabel>Starting Principal</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Interest/Return Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    
                    {isLengthMode ? (
                        <FormField control={form.control} name="yearsToPayout" render={({ field }) => (<FormItem><FormLabel>Years to Payout</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    ) : (
                        <FormField control={form.control} name="payoutAmount" render={({ field }) => (<FormItem><FormLabel>Payout per Period</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    )}

                    <FormField control={form.control} name="payoutFrequency" render={({ field }) => (<FormItem><FormLabel>Payout Frequency</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="monthly">Monthly</SelectItem><SelectItem value="quarterly">Quarterly</SelectItem><SelectItem value="annually">Annually</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                    
                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        <Button type="submit" className="w-full" aria-label="Calculate Payout"><Landmark className="mr-2 h-4 w-4"/>Calculate</Button>
                        <Button onClick={onReset} type="button" variant="outline" className="w-full sm:w-auto" aria-label="Reset Form"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
                    </div>
                </form>
                </Form>
            </div>
            
            <div className="flex flex-col space-y-4">
                 {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                {result ? (
                <div className="space-y-4 animate-fade-in">
                    <div className="p-4 bg-muted rounded-lg text-center">
                        {result.payoutAmount !== undefined && (
                            <>
                                <h3 className="text-lg font-semibold text-muted-foreground">You can withdraw</h3>
                                <p className="text-4xl font-bold text-primary">{currencySymbol}{result.payoutAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                <p className="text-muted-foreground">{form.getValues('payoutFrequency')}</p>
                            </>
                        )}
                        {result.payoutYears !== undefined && (
                             <>
                                <h3 className="text-lg font-semibold text-muted-foreground">Your annuity will last for</h3>
                                <p className="text-4xl font-bold text-primary">{result.payoutYears.toFixed(2)}</p>
                                <p className="text-muted-foreground">years</p>
                            </>
                        )}
                    </div>
                     <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-muted-foreground">Total Payments:</span><span className="font-semibold">{currencySymbol}{result.totalPayments.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Total Interest/Return:</span><span className="font-semibold">{currencySymbol}{result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                    </div>
                     <div className="h-[200px]">
                        <ChartContainer config={{}} className="mx-auto aspect-square h-full">
                            <PieChart>
                                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel formatter={(value) => `${currencySymbol}${Number(value).toFixed(2)}`} />} />
                                <Pie data={pieChartData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70} paddingAngle={5} strokeWidth={2}>
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                    </div>
                </div>
                ) : !error && (
                    <div className="flex items-center justify-center h-full bg-muted rounded-lg p-8">
                        <div className="text-center">
                            <Landmark className="mx-auto h-12 w-12 text-muted-foreground" />
                            <p className="mt-4 text-muted-foreground">Your results will appear here.</p>
                        </div>
                    </div>
                )}
            </div>
             {result && (
                 <div className="md:col-span-2 mt-8">
                    <h3 className="text-lg font-bold text-center mb-4">Annuity Balances Over Time</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={result.amortizationSchedule}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" tickFormatter={(val) => `Year ${val}`} />
                                <YAxis tickFormatter={(val) => currencySymbol + (val/1000) + 'k'} />
                                <Tooltip content={<ChartTooltipContent formatter={(value) => currencySymbol + Number(value).toFixed(2)}/>} />
                                <Line type="monotone" dataKey="endingBalance" name="Balance" stroke="hsl(var(--chart-1))" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="h-[300px] overflow-y-auto border rounded-md mt-4">
                    <Table>
                        <TableHeader className="sticky top-0 bg-secondary">
                            <TableRow>
                                <TableHead>Year</TableHead>
                                <TableHead className="text-right">Beginning Balance</TableHead>
                                <TableHead className="text-right">Interest/Return</TableHead>
                                <TableHead className="text-right">Ending Balance</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {result.amortizationSchedule.map((row) => (
                                <TableRow key={row.year}>
                                    <TableCell className="font-medium">{row.year}</TableCell>
                                    <TableCell className="text-right">{currencySymbol}{row.beginningBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</TableCell>
                                    <TableCell className="text-right">{currencySymbol}{row.interestReturn.toLocaleString(undefined, { maximumFractionDigits: 2 })}</TableCell>
                                    <TableCell className="text-right">{currencySymbol}{row.endingBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </div>
                </div>
            )}
        </div>
    );
}
