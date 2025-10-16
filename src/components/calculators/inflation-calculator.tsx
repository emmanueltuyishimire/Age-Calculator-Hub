
"use client";

import React, { useState, useMemo } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cpiData, type CpiYear } from '@/lib/cpi-data';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RefreshCcw, DollarSign, AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, CartesianGrid } from 'recharts';

const currencySymbol = '$';
const years = Object.keys(cpiData).sort((a, b) => Number(b) - Number(a));
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const getCpiValue = (year: string, month: string): number => {
    const yearData = cpiData[year as CpiYear];
    if (month === 'Average') {
        return yearData.Average;
    }
    return yearData[month as keyof typeof yearData];
};

// --- CPI Calculator ---
const cpiSchema = z.object({
  amount: z.coerce.number().min(0.01),
  startYear: z.string(),
  startMonth: z.string(),
  endYear: z.string(),
  endMonth: z.string(),
});
type CpiFormData = z.infer<typeof cpiSchema>;

function CpiCalculator() {
    const [result, setResult] = useState<number | null>(null);
    const form = useForm<CpiFormData>({
        resolver: zodResolver(cpiSchema),
        defaultValues: { amount: 100, startYear: '2015', startMonth: 'Average', endYear: '2025', endMonth: 'August' },
    });

    function onSubmit(values: CpiFormData) {
        const startCpi = getCpiValue(values.startYear, values.startMonth);
        const endCpi = getCpiValue(values.endYear, values.endMonth);
        if (startCpi > 0) {
            const resultValue = values.amount * (endCpi / startCpi);
            setResult(resultValue);
        }
    }
    return (
        <Card>
            <CardHeader><CardTitle>Inflation Calculator with U.S. CPI Data</CardTitle></CardHeader>
            <CardContent>
                <Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex items-end gap-2">
                        <FormField control={form.control} name="amount" render={({ field }) => <FormItem className="flex-1"><FormLabel>Amount</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                        <span className="pb-2">in</span>
                        <FormField control={form.control} name="startMonth" render={({ field }) => <FormItem className="w-1/3"><FormLabel>Month</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="Average">Average</SelectItem>{months.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent></Select></FormItem>} />
                        <FormField control={form.control} name="startYear" render={({ field }) => <FormItem className="w-1/4"><FormLabel>Year</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>{years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent></Select></FormItem>} />
                    </div>
                     <div className="flex items-end gap-2">
                        <span className="pb-2 font-bold">=</span>
                        <div className="p-2 border rounded-md text-center flex-1 h-10 font-bold text-primary bg-muted">
                            {result !== null ? `${currencySymbol}${result.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : '?'}
                        </div>
                        <span className="pb-2">in</span>
                        <FormField control={form.control} name="endMonth" render={({ field }) => <FormItem className="w-1/3"><FormLabel className="sr-only">End Month</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="Average">Average</SelectItem>{months.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent></Select></FormItem>} />
                        <FormField control={form.control} name="endYear" render={({ field }) => <FormItem className="w-1/4"><FormLabel className="sr-only">End Year</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>{years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent></Select></FormItem>} />
                    </div>
                    <Button type="submit" className="w-full">Calculate</Button>
                </form></Form>
            </CardContent>
        </Card>
    );
}

// --- Flat Rate Calculators ---
const flatRateSchema = z.object({ amount: z.coerce.number().min(0.01), rate: z.coerce.number().min(0), years: z.coerce.number().min(0) });
type FlatRateFormData = z.infer<typeof flatRateSchema>;

function ForwardFlatRateCalculator() {
  const [result, setResult] = useState<number | null>(null);
  const form = useForm<FlatRateFormData>({ resolver: zodResolver(flatRateSchema), defaultValues: { amount: 100, rate: 3, years: 10 } });
  function onSubmit(values: FlatRateFormData) { setResult(values.amount * Math.pow(1 + values.rate / 100, values.years)); }
  return (
    <Card>
      <CardHeader><CardTitle>Forward Flat Rate Inflation</CardTitle></CardHeader>
      <CardContent>
        <Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-end gap-2 flex-wrap">
                <FormField control={form.control} name="amount" render={({ field }) => <FormItem><FormLabel>Amount</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                <FormField control={form.control} name="rate" render={({ field }) => <FormItem><FormLabel>Inflation Rate (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                <FormField control={form.control} name="years" render={({ field }) => <FormItem><FormLabel>Years</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                <Button type="submit">=</Button>
                <div className="p-2 border rounded-md text-center flex-1 h-10 font-bold text-primary bg-muted min-w-[100px]">
                    {result !== null ? `${currencySymbol}${result.toFixed(2)}` : '?'}
                </div>
            </div>
        </form></Form>
      </CardContent>
    </Card>
  );
}

function BackwardFlatRateCalculator() {
  const [result, setResult] = useState<number | null>(null);
  const form = useForm<FlatRateFormData>({ resolver: zodResolver(flatRateSchema), defaultValues: { amount: 100, rate: 3, years: 10 } });
  function onSubmit(values: FlatRateFormData) { setResult(values.amount / Math.pow(1 + values.rate / 100, values.years)); }
  return (
     <Card>
      <CardHeader><CardTitle>Backward Flat Rate Inflation</CardTitle></CardHeader>
      <CardContent>
        <Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-end gap-2 flex-wrap">
                <FormField control={form.control} name="amount" render={({ field }) => <FormItem><FormLabel>Amount</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                <FormField control={form.control} name="rate" render={({ field }) => <FormItem><FormLabel>Inflation Rate (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                <FormField control={form.control} name="years" render={({ field }) => <FormItem><FormLabel>Years Ago</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                <Button type="submit">=</Button>
                <div className="p-2 border rounded-md text-center flex-1 h-10 font-bold text-primary bg-muted min-w-[100px]">
                    {result !== null ? `${currencySymbol}${result.toFixed(2)}` : '?'}
                </div>
            </div>
        </form></Form>
      </CardContent>
    </Card>
  );
}

// --- Historical Data Display ---
function HistoricalData() {
    const chartData = Object.entries(cpiData)
        .map(([year, data]) => ({
            year,
            inflation: (data.Average / cpiData[String(Number(year) - 1) as CpiYear]?.Average - 1) * 100,
        }))
        .filter(d => !isNaN(d.inflation) && d.year >= '1920')
        .reverse();

    return (
        <Card>
            <CardHeader><CardTitle>Historical Inflation Rate for the U.S.</CardTitle></CardHeader>
            <CardContent>
                <div className="h-[300px] w-full mb-4">
                    <ResponsiveContainer>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" tick={{ fontSize: 12 }} interval={4} angle={-30} textAnchor="end" height={50} />
                            <YAxis tickFormatter={(val) => `${val}%`} tick={{ fontSize: 12 }} />
                            <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} contentStyle={{ background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                            <Bar dataKey="inflation" fill="hsl(var(--primary))" name="Avg. Inflation" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="h-[400px] overflow-y-auto border rounded-md">
                    <Table>
                        <TableHeader className="sticky top-0 bg-secondary">
                            <TableRow>
                                <TableHead>Year</TableHead>
                                {months.map(m => <TableHead key={m}>{m.slice(0,3)}</TableHead>)}
                                <TableHead>Avg</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {years.map(year => (
                                <TableRow key={year}>
                                    <TableCell className="font-medium">{year}</TableCell>
                                    {months.map(month => (
                                        <TableCell key={`${year}-${month}`}>{getCpiValue(year, month) ? `${((getCpiValue(year, month) / getCpiValue(String(Number(year)-1), month)) - 1) * 100 .toFixed(2)}%` : ''}</TableCell>
                                    ))}
                                    <TableCell className="font-bold">{cpiData[year as CpiYear].Average ? `${((cpiData[year as CpiYear].Average / cpiData[String(Number(year) - 1) as CpiYear]?.Average) - 1) * 100 .toFixed(2)}%` : ''}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}

// Main component
export default function InflationCalculator() {
  return (
    <div className="space-y-8">
      <CpiCalculator />
      <ForwardFlatRateCalculator />
      <BackwardFlatRateCalculator />
      <HistoricalData />
    </div>
  );
}
