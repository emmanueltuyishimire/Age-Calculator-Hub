
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
import { RefreshCcw, Landmark } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

const formSchema = z.object({
  startingPrincipal: z.coerce.number().min(0, "Must be non-negative."),
  annualAddition: z.coerce.number().min(0).optional(),
  monthlyAddition: z.coerce.number().min(0).optional(),
  additionAt: z.enum(['end', 'beginning']).default('end'),
  annualGrowthRate: z.coerce.number().min(0).max(30),
  afterYears: z.coerce.number().min(1).max(100),
});

type FormData = z.infer<typeof formSchema>;

interface ScheduleRow {
    year: number;
    startBalance: number;
    addition: number;
    return: number;
    endBalance: number;
}

interface Result {
  endBalance: number;
  totalAdditions: number;
  totalReturn: number;
  schedule: ScheduleRow[];
}

const currencySymbol = '$';

export default function AnnuityCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startingPrincipal: 20000,
      annualAddition: 10000,
      monthlyAddition: 0,
      additionAt: 'end',
      annualGrowthRate: 6,
      afterYears: 10,
    },
  });

  function onSubmit(values: FormData) {
    const { startingPrincipal, annualAddition = 0, monthlyAddition = 0, additionAt, annualGrowthRate, afterYears } = values;
    
    const r = annualGrowthRate / 100;
    const addAtBeginning = additionAt === 'beginning';
    
    let balance = startingPrincipal;
    let totalAdditions = 0;
    const schedule: ScheduleRow[] = [];

    for (let year = 1; year <= afterYears; year++) {
      const yearlyAddition = annualAddition + (monthlyAddition * 12);
      const yearStartBalance = balance;
      
      let interest = 0;
      let balanceBeforeInterest = yearStartBalance;

      if (addAtBeginning) {
        balanceBeforeInterest += yearlyAddition;
      }
      
      interest = balanceBeforeInterest * r;

      if (addAtBeginning) {
        balance = balanceBeforeInterest + interest;
      } else {
        balance = balanceBeforeInterest + interest + yearlyAddition;
      }
      
      totalAdditions += yearlyAddition;
      schedule.push({
        year,
        startBalance: yearStartBalance,
        addition: yearlyAddition,
        return: interest,
        endBalance: balance,
      });
    }

    setResult({
        endBalance: balance,
        totalAdditions,
        totalReturn: balance - startingPrincipal - totalAdditions,
        schedule,
    });
  }

  const pieData = result ? [
    { name: 'Starting Principal', value: form.getValues('startingPrincipal'), fill: 'hsl(var(--chart-1))' },
    { name: 'Total Additions', value: result.totalAdditions, fill: 'hsl(var(--chart-2))' },
    { name: 'Total Return', value: result.totalReturn, fill: 'hsl(var(--chart-3))' },
  ] : [];

  const barChartData = result?.schedule.map(row => ({
      name: `Year ${row.year}`,
      'Start Principal': row.startBalance,
      'Additions': row.addition,
      'Return/Interest': row.return,
  })) || [];

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField control={form.control} name="startingPrincipal" render={({ field }) => (<FormItem><FormLabel>Starting Principal</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="annualAddition" render={({ field }) => (<FormItem><FormLabel>Annual Addition</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="monthlyAddition" render={({ field }) => (<FormItem><FormLabel>Monthly Addition</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="additionAt" render={({ field }) => (<FormItem><FormLabel>Add at each period's</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="end">End</SelectItem><SelectItem value="beginning">Beginning</SelectItem></SelectContent></Select></FormItem>)} />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="annualGrowthRate" render={({ field }) => (<FormItem><FormLabel>Annual Growth Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl></FormItem>)} />
                        <FormField control={form.control} name="afterYears" render={({ field }) => (<FormItem><FormLabel>After (years)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        <Button type="submit" className="w-full"><Landmark className="mr-2 h-4 w-4"/>Calculate</Button>
                        <Button onClick={() => form.reset()} type="button" variant="outline" className="w-full sm:w-auto"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
                    </div>
                </form>
              </Form>
            </div>
            
            <div className="flex flex-col space-y-4">
                {result ? (
                <div className="space-y-4 animate-fade-in">
                    <div className="p-4 bg-muted rounded-lg text-center">
                        <h3 className="text-lg font-semibold text-muted-foreground">End Balance</h3>
                        <p className="text-4xl font-bold text-primary">{currencySymbol}{result.endBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer><PieChart><Tooltip content={<ChartTooltipContent hideLabel />} /><Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70}><Cell key="cell-0" fill="hsl(var(--chart-1))" /><Cell key="cell-1" fill="hsl(var(--chart-2))" /><Cell key="cell-2" fill="hsl(var(--chart-3))" /></Pie></ChartContainer>
                    </div>
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between"><span className="text-muted-foreground">Starting Principal:</span><span className="font-semibold">{currencySymbol}{form.getValues('startingPrincipal').toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Total Additions:</span><span className="font-semibold">{currencySymbol}{result.totalAdditions.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Total Return/Interest:</span><span className="font-semibold">{currencySymbol}{result.totalReturn.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                    </div>
                </div>
                ) : (
                    <div className="flex items-center justify-center h-full bg-muted rounded-lg p-8">
                        <div className="text-center"><Landmark className="mx-auto h-12 w-12 text-muted-foreground" /><p className="mt-4 text-muted-foreground">Your results will appear here.</p></div>
                    </div>
                )}
            </div>
        </div>
        {result && (
             <div className="mt-8">
                <h3 className="text-lg font-bold text-center mb-4">Accumulation Schedule</h3>
                <div className="h-[300px] w-full mb-4">
                     <ResponsiveContainer>
                        <BarChart data={barChartData} stackOffset="sign">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }}/>
                            <YAxis tickFormatter={(val) => `${currencySymbol}${val/1000}k`} tick={{ fontSize: 12 }} />
                            <Tooltip formatter={(value: number) => `${currencySymbol}${value.toLocaleString(undefined, {maximumFractionDigits: 0})}`} contentStyle={{ background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                            <Legend />
                            <Bar dataKey="Return/Interest" stackId="a" fill="hsl(var(--chart-3))" name="Return/Interest" radius={[0, 0, 4, 4]} />
                            <Bar dataKey="Additions" stackId="a" fill="hsl(var(--chart-2))" name="Additions" />
                            <Bar dataKey="Start Principal" stackId="a" fill="hsl(var(--chart-1))" name="Start Principal" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="h-[300px] overflow-y-auto border rounded-md">
                    <Table><TableHeader className="sticky top-0 bg-secondary"><TableRow><TableHead>Year</TableHead><TableHead className="text-right">Addition</TableHead><TableHead className="text-right">Return</TableHead><TableHead className="text-right">Ending Balance</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {result.schedule.map(row => (
                                <TableRow key={row.year}>
                                    <TableCell>{row.year}</TableCell>
                                    <TableCell className="text-right">{currencySymbol}{row.addition.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">{currencySymbol}{row.return.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">{currencySymbol}{row.endBalance.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
