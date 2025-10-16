
"use client";

import { useState } from 'react';
import { z } from 'zod';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
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
import { RefreshCcw, Car } from 'lucide-react';
import ShareButton from '../share-button';
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
import { PieChart, Pie, Cell } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const currencySymbol = '$';

// Schemas
const leaseSchema = z.object({
  autoPrice: z.coerce.number().min(1, "Price must be greater than zero."),
  leaseTerm: z.coerce.number().min(24).max(60),
  moneyFactor: z.coerce.number().min(0, "Money factor cannot be negative."),
  downPayment: z.coerce.number().min(0).optional(),
  tradeInValue: z.coerce.number().min(0).optional(),
  owedOnTrade: z.coerce.number().min(0).optional(),
  salesTax: z.coerce.number().min(0).max(20).optional(),
  residualValue: z.coerce.number().min(1, "Residual value is required."),
  residualValueType: z.enum(['percent', 'amount']).default('percent'),
});
type LeaseFormData = z.infer<typeof leaseSchema>;


// Result type
interface Result {
  monthlyPayment: number;
  totalLeaseCost: number;
  depreciationFee: number;
  financeFee: number;
  monthlyTax: number;
}

// Main Component
export default function AutoLeaseCalculator() {
  const [result, setResult] = useState<Result | null>(null);
  const form = useForm<LeaseFormData>({
    resolver: zodResolver(leaseSchema),
    defaultValues: { autoPrice: 50000, leaseTerm: 36, moneyFactor: 0.00208, downPayment: 0, tradeInValue: 0, owedOnTrade: 0, salesTax: 7, residualValue: 60, residualValueType: 'percent' },
  });

  function onSubmit(values: LeaseFormData) {
    const { autoPrice, leaseTerm, moneyFactor, downPayment = 0, tradeInValue = 0, owedOnTrade = 0, salesTax = 0, residualValue, residualValueType } = values;

    const netTradeIn = tradeInValue - owedOnTrade;
    const capitalizedCost = autoPrice - downPayment - netTradeIn;
    
    const finalResidualValue = residualValueType === 'percent' ? autoPrice * (residualValue / 100) : residualValue;

    const depreciation = capitalizedCost - finalResidualValue;
    const baseMonthlyPayment = depreciation / leaseTerm;
    
    const financeCharge = (capitalizedCost + finalResidualValue) * moneyFactor;
    
    const preTaxMonthlyPayment = baseMonthlyPayment + financeCharge;
    
    const monthlyTax = preTaxMonthlyPayment * (salesTax / 100);
    
    const monthlyPayment = preTaxMonthlyPayment + monthlyTax;
    const totalLeaseCost = monthlyPayment * leaseTerm + downPayment;

    setResult({
      monthlyPayment,
      totalLeaseCost,
      depreciationFee: baseMonthlyPayment,
      financeFee: financeCharge,
      monthlyTax,
    });
  }

  function handleReset() {
    form.reset();
    setResult(null);
  }

  const chartData = result ? [
    { name: 'Depreciation', value: result.depreciationFee, fill: 'hsl(var(--chart-1))' },
    { name: 'Finance Charge', value: result.financeFee, fill: 'hsl(var(--chart-2))' },
    { name: 'Taxes', value: result.monthlyTax, fill: 'hsl(var(--chart-3))' },
  ].filter(item => item.value > 0) : [];

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField control={form.control} name="autoPrice" render={({ field }) => (<FormItem><FormLabel>Auto Price (MSRP)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="leaseTerm" render={({ field }) => (<FormItem><FormLabel>Lease Term (Months)</FormLabel><Select onValueChange={(val) => field.onChange(Number(val))} defaultValue={String(field.value)}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="24">24</SelectItem><SelectItem value="36">36</SelectItem><SelectItem value="48">48</SelectItem><SelectItem value="60">60</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="moneyFactor" render={({ field }) => (<FormItem><FormLabel>Money Factor</FormLabel><FormControl><Input type="number" step="0.00001" {...field} placeholder="e.g. 0.0025" /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="downPayment" render={({ field }) => (<FormItem><FormLabel>Down Payment</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="tradeInValue" render={({ field }) => (<FormItem><FormLabel>Trade-in Value</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                     <FormField control={form.control} name="owedOnTrade" render={({ field }) => (<FormItem><FormLabel>Amount Owed on Trade-in</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="salesTax" render={({ field }) => (<FormItem><FormLabel>Sales Tax (%)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    
                    <FormItem>
                        <FormLabel>Residual Value</FormLabel>
                        <div className="flex gap-2">
                        <FormField control={form.control} name="residualValue" render={({ field }) => (<FormControl><Input type="number" {...field} /></FormControl>)} />
                        <FormField control={form.control} name="residualValueType" render={({ field }) => (
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center">
                                <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="percent" /></FormControl><FormLabel className="font-normal">%</FormLabel></FormItem>
                                <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="amount" /></FormControl><FormLabel className="font-normal">$</FormLabel></FormItem>
                            </RadioGroup>
                        )} />
                        </div>
                        <FormMessage>{form.formState.errors.residualValue?.message}</FormMessage>
                    </FormItem>
                    
                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        <Button type="submit" className="w-full"><Car className="mr-2 h-4 w-4"/>Calculate</Button>
                        <Button onClick={handleReset} type="button" variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
                        <ShareButton title="Auto Lease Calculator" text="Estimate your monthly car lease payment with this easy calculator!" url="/auto-lease-calculator" />
                    </div>
                </form>
                </Form>
            </div>
            
            <div className="flex flex-col space-y-4">
                {result ? (
                <div className="space-y-4 animate-fade-in">
                    <div className="p-4 bg-muted rounded-lg text-center">
                        <h3 className="text-lg font-semibold text-muted-foreground">Estimated Monthly Payment</h3>
                        <p className="text-4xl font-bold text-primary">{currencySymbol}{result.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <div className="h-[200px]">
                        <ChartContainer config={{}} className="mx-auto aspect-square h-full">
                            <PieChart>
                                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel formatter={(value, name) => `${currencySymbol}${Number(value).toFixed(2)} / mo`} />} />
                                <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70} paddingAngle={5} strokeWidth={2}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-muted-foreground">Monthly Depreciation:</span><span className="font-semibold">{currencySymbol}{result.depreciationFee.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Monthly Finance Fee:</span><span className="font-semibold">{currencySymbol}{result.financeFee.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Monthly Sales Tax:</span><span className="font-semibold">{currencySymbol}{result.monthlyTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                        <div className="flex justify-between border-t pt-2 mt-2"><span className="text-muted-foreground font-bold">Total Lease Cost:</span><span className="font-bold">{currencySymbol}{result.totalLeaseCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                    </div>
                </div>
                ) : (
                    <div className="flex items-center justify-center h-full bg-muted rounded-lg p-8">
                        <div className="text-center">
                            <Car className="mx-auto h-12 w-12 text-muted-foreground" />
                            <p className="mt-4 text-muted-foreground">Your lease payment results will appear here.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
