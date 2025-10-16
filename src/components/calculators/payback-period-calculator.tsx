
"use client";

import { useState } from 'react';
import { z } from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const currencySymbol = '$';

interface ScheduleRow {
    year: number;
    cashFlow: number;
    discountedCashFlow: number;
    cumulativeCashFlow: number;
    cumulativeDiscountedCashFlow: number;
}

interface Result {
  paybackPeriod: string;
  discountedPaybackPeriod: string;
  schedule: ScheduleRow[];
}

// --- Fixed Cash Flow Calculator ---
const fixedSchema = z.object({
  initialInvestment: z.coerce.number().min(1, "Investment is required."),
  cashFlow: z.coerce.number().min(1, "Cash flow is required."),
  increase: z.coerce.number().min(0).max(100).optional(),
  numYears: z.coerce.number().min(1).max(50).int(),
  discountRate: z.coerce.number().min(0).max(100),
});
type FixedFormData = z.infer<typeof fixedSchema>;

function FixedPaybackCalculator() {
    const [result, setResult] = useState<Result | null>(null);
    const form = useForm<FixedFormData>({
        resolver: zodResolver(fixedSchema),
        defaultValues: { initialInvestment: 100000, cashFlow: 30000, increase: 5, numYears: 5, discountRate: 10 },
    });

    const calculatePayback = (initialInvestment: number, cashFlows: number[], discountRate: number) => {
        let cumulativeCF = -initialInvestment;
        let cumulativeDCF = -initialInvestment;
        let paybackPeriod = "Never";
        let discountedPaybackPeriod = "Never";
        const schedule: ScheduleRow[] = [];

        for (let i = 0; i < cashFlows.length; i++) {
            const year = i + 1;
            const cf = cashFlows[i];
            const dcf = cf / Math.pow(1 + discountRate / 100, year);

            const prevCumulativeCF = cumulativeCF;
            cumulativeCF += cf;

            const prevCumulativeDCF = cumulativeDCF;
            cumulativeDCF += dcf;

            if (prevCumulativeCF < 0 && cumulativeCF >= 0 && paybackPeriod === "Never") {
                paybackPeriod = `${year - 1 + (-prevCumulativeCF / cf)} years`;
            }
            if (prevCumulativeDCF < 0 && cumulativeDCF >= 0 && discountedPaybackPeriod === "Never") {
                discountedPaybackPeriod = `${year - 1 + (-prevCumulativeDCF / dcf)} years`;
            }

            schedule.push({ year, cashFlow: cf, discountedCashFlow: dcf, cumulativeCashFlow: cumulativeCF, cumulativeDiscountedCashFlow: cumulativeDCF });
        }
        
        return { paybackPeriod, discountedPaybackPeriod, schedule };
    };

    function onSubmit(values: FixedFormData) {
        const { initialInvestment, cashFlow, increase = 0, numYears, discountRate } = values;
        const cashFlows: number[] = [];
        for (let i = 0; i < numYears; i++) {
            cashFlows.push(cashFlow * Math.pow(1 + increase / 100, i));
        }
        setResult(calculatePayback(initialInvestment, cashFlows, discountRate));
    }

    return (
        <Card>
            <CardHeader><CardTitle>Fixed Cash Flow</CardTitle></CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="initialInvestment" render={({ field }) => (<FormItem><FormLabel>Initial Investment</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="cashFlow" render={({ field }) => (<FormItem><FormLabel>Cash Flow per Year</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="increase" render={({ field }) => (<FormItem><FormLabel>Annual Increase (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="numYears" render={({ field }) => (<FormItem><FormLabel>Number of Years</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="discountRate" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Discount Rate (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                        <Button type="submit" className="w-full">Calculate</Button>
                    </form>
                </Form>
                {result && <PaybackResultDisplay result={result} />}
            </CardContent>
        </Card>
    );
}

// --- Irregular Cash Flow Calculator ---
const irregularSchema = z.object({
  initialInvestment: z.coerce.number().min(1, "Investment is required."),
  discountRate: z.coerce.number().min(0).max(100),
  cashFlows: z.array(z.object({ value: z.coerce.number() })).min(1),
});
type IrregularFormData = z.infer<typeof irregularSchema>;

function IrregularPaybackCalculator() {
    const [result, setResult] = useState<Result | null>(null);
    const form = useForm<IrregularFormData>({
        resolver: zodResolver(irregularSchema),
        defaultValues: { initialInvestment: 100000, discountRate: 10, cashFlows: [{ value: 5000 }, { value: 25000 }, { value: 35000 }, { value: 40000 }, { value: 30000 }] },
    });
    const { fields, append, remove } = useFieldArray({ control: form.control, name: 'cashFlows' });

    function onSubmit(values: IrregularFormData) {
        const cashFlows = values.cashFlows.map(cf => cf.value);
        const { paybackPeriod, discountedPaybackPeriod, schedule } = (new FixedPaybackCalculator()).calculatePayback(values.initialInvestment, cashFlows, values.discountRate);
        setResult({ paybackPeriod, discountedPaybackPeriod, schedule });
    }

    return (
        <Card>
            <CardHeader><CardTitle>Irregular Cash Flow</CardTitle></CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="initialInvestment" render={({ field }) => (<FormItem><FormLabel>Initial Investment</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="discountRate" render={({ field }) => (<FormItem><FormLabel>Discount Rate (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                        <div className="space-y-2">
                          <Label>Cash Flows per Year</Label>
                          {fields.map((field, index) => (
                            <div key={field.id} className="flex items-center gap-2">
                              <FormField control={form.control} name={`cashFlows.${index}.value`} render={({ field }) => (<FormItem className="flex-1"><FormLabel className="sr-only">Year {index+1}</FormLabel><FormControl><Input type="number" placeholder={`Year ${index + 1}`} {...field} /></FormControl></FormItem>)} />
                              <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash2 className="h-4 w-4" /></Button>
                            </div>
                          ))}
                          <Button type="button" variant="outline" size="sm" onClick={() => append({ value: 0 })}><PlusCircle className="mr-2 h-4 w-4" /> Add Year</Button>
                        </div>
                        <Button type="submit" className="w-full">Calculate</Button>
                    </form>
                </Form>
                 {result && <PaybackResultDisplay result={result} />}
            </CardContent>
        </Card>
    )
}

function PaybackResultDisplay({ result }: { result: Result }) {
  return (
    <div className="p-4 bg-muted rounded-lg mt-6 space-y-4 animate-fade-in">
        <h3 className="text-xl font-bold text-center text-foreground">Payback Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="p-3 border rounded-lg bg-background">
                <h4 className="font-semibold text-muted-foreground">Payback Period</h4>
                <p className="text-2xl font-bold text-primary">{result.paybackPeriod}</p>
            </div>
            <div className="p-3 border rounded-lg bg-background">
                <h4 className="font-semibold text-muted-foreground">Discounted Payback Period</h4>
                <p className="text-2xl font-bold text-primary">{result.discountedPaybackPeriod}</p>
            </div>
        </div>
        <div className="h-[300px] overflow-y-auto border rounded-md">
            <Table>
                <TableHeader className="sticky top-0 bg-secondary">
                    <TableRow>
                        <TableHead>Year</TableHead>
                        <TableHead>Cash Flow</TableHead>
                        <TableHead>Discounted CF</TableHead>
                        <TableHead>Cumulative CF</TableHead>
                        <TableHead>Cumulative DCF</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {result.schedule.map(row => (
                        <TableRow key={row.year}>
                            <TableCell>{row.year}</TableCell>
                            <TableCell>{currencySymbol}{row.cashFlow.toFixed(2)}</TableCell>
                            <TableCell>{currencySymbol}{row.discountedCashFlow.toFixed(2)}</TableCell>
                            <TableCell className={row.cumulativeCashFlow < 0 ? 'text-destructive' : 'text-green-600'}>{currencySymbol}{row.cumulativeCashFlow.toFixed(2)}</TableCell>
                            <TableCell className={row.cumulativeDiscountedCashFlow < 0 ? 'text-destructive' : 'text-green-600'}>{currencySymbol}{row.cumulativeDiscountedCashFlow.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </div>
  );
}

export default function PaybackPeriodCalculator() {
  return (
    <div className="space-y-6">
        <FixedPaybackCalculator />
        <IrregularPaybackCalculator />
    </div>
  );
}
