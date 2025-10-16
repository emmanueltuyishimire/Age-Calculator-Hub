
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
import { RefreshCcw, DollarSign } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const currencySymbol = '$';

const formSchema = z.object({
  principal: z.coerce.number().optional(),
  rate: z.coerce.number().optional(),
  term: z.coerce.number().optional(),
  endBalance: z.coerce.number().optional(),
});
type FormData = z.infer<typeof formSchema>;

interface ScheduleRow {
    year: number;
    interest: number;
    balance: number;
}

interface Result {
  calculatedValue: number;
  totalInterest: number;
  principal: number;
  schedule: ScheduleRow[];
}

export default function SimpleInterestCalculator() {
  const [result, setResult] = useState<Result | null>(null);
  const [solveFor, setSolveFor] = useState<'endBalance' | 'principal' | 'rate' | 'term'>('endBalance');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { principal: 20000, rate: 3, term: 10, endBalance: undefined },
  });
  
  function onSubmit(values: FormData) {
    let { principal = 0, rate = 0, term = 0, endBalance = 0 } = values;
    let calculatedValue: number;
    let totalInterest = 0;
    
    // I = Prt
    // A = P(1 + rt)

    try {
        switch(solveFor) {
            case 'endBalance':
                if (principal <= 0 || rate < 0 || term <= 0) throw new Error("Invalid inputs");
                totalInterest = principal * (rate / 100) * term;
                calculatedValue = principal + totalInterest;
                break;
            case 'principal':
                if (endBalance <= 0 || rate < 0 || term <= 0) throw new Error("Invalid inputs");
                calculatedValue = endBalance / (1 + (rate / 100) * term);
                principal = calculatedValue;
                totalInterest = endBalance - principal;
                break;
            case 'rate':
                if (endBalance <= 0 || principal <= 0 || term <= 0) throw new Error("Invalid inputs");
                calculatedValue = ((endBalance / principal) - 1) / term * 100;
                totalInterest = endBalance - principal;
                break;
            case 'term':
                if (endBalance <= 0 || principal <= 0 || rate <= 0) throw new Error("Invalid inputs");
                calculatedValue = ((endBalance / principal) - 1) / (rate / 100);
                totalInterest = endBalance - principal;
                break;
            default:
                throw new Error("Invalid calculation mode");
        }

        const schedule: ScheduleRow[] = [];
        const annualInterest = principal * (form.getValues().rate || 0) / 100;
        for (let i = 1; i <= Math.ceil(form.getValues().term || 0); i++) {
            schedule.push({
                year: i,
                interest: annualInterest,
                balance: principal + (annualInterest * i),
            });
        }
        
        setResult({ calculatedValue, totalInterest, principal, schedule });
    } catch (e) {
        setResult(null);
    }
  }

  function handleReset() {
    form.reset({ principal: 20000, rate: 3, term: 10, endBalance: undefined });
    setResult(null);
  }

  const isFieldDisabled = (fieldName: keyof FormData) => solveFor === fieldName;

  const getResultLabel = () => {
    switch (solveFor) {
      case 'endBalance': return "End Balance";
      case 'principal': return "Principal";
      case 'rate': return "Interest Rate";
      case 'term': return "Term";
    }
  };
  
  const getResultUnit = () => {
    switch (solveFor) {
      case 'rate': return "%";
      case 'term': return "years";
      default: return currencySymbol;
    }
  };

  const pieData = result ? [
    { name: 'Principal', value: result.principal, fill: 'hsl(var(--chart-1))' },
    { name: 'Interest', value: result.totalInterest, fill: 'hsl(var(--chart-2))' },
  ] : [];

  const chartData = result?.schedule.map(row => ({
    name: `Year ${row.year}`,
    Balance: row.balance,
    Interest: row.interest,
  })) || [];

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <Tabs value={solveFor} onValueChange={(val) => { setSolveFor(val as any); setResult(null); }} className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-auto">
                <TabsTrigger value="endBalance">Balance</TabsTrigger>
                <TabsTrigger value="principal">Principal</TabsTrigger>
                <TabsTrigger value="rate">Rate</TabsTrigger>
                <TabsTrigger value="term">Term</TabsTrigger>
            </TabsList>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="principal" render={({ field }) => (<FormItem><FormLabel>Principal</FormLabel><FormControl><Input type="number" {...field} disabled={isFieldDisabled('principal')} /></FormControl></FormItem>)} />
                        <FormField control={form.control} name="rate" render={({ field }) => (<FormItem><FormLabel>Interest Rate (% per year)</FormLabel><FormControl><Input type="number" {...field} disabled={isFieldDisabled('rate')} /></FormControl></FormItem>)} />
                        <FormField control={form.control} name="term" render={({ field }) => (<FormItem><FormLabel>Term (years)</FormLabel><FormControl><Input type="number" {...field} disabled={isFieldDisabled('term')} /></FormControl></FormItem>)} />
                        <FormField control={form.control} name="endBalance" render={({ field }) => (<FormItem><FormLabel>End Balance</FormLabel><FormControl><Input type="number" {...field} disabled={isFieldDisabled('endBalance')} /></FormControl></FormItem>)} />
                        
                        <div className="flex flex-col sm:flex-row gap-2 pt-2">
                            <Button type="submit" className="w-full"><DollarSign className="mr-2 h-4 w-4"/>Calculate</Button>
                            <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
                        </div>
                    </form>
                    </Form>
                </div>
                
                <div className="flex flex-col space-y-4">
                    {result ? (
                    <div className="space-y-4 animate-fade-in">
                        <div className="p-4 bg-muted rounded-lg text-center">
                            <h3 className="text-lg font-semibold text-muted-foreground">{getResultLabel()}</h3>
                            <p className="text-4xl font-bold text-primary">
                                {getResultUnit() !== currencySymbol && result.calculatedValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                {getResultUnit() === currencySymbol && currencySymbol}
                                {getResultUnit() === currencySymbol && result.calculatedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                {getResultUnit() !== currencySymbol && ` ${getResultUnit()}`}
                            </p>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-muted-foreground">Total Interest:</span><span className="font-semibold">{currencySymbol}{result.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                        </div>

                         <div className="h-[200px]">
                            <ChartContainer config={{}} className="mx-auto aspect-square h-full">
                                <PieChart>
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                    <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70} paddingAngle={5} strokeWidth={2}>
                                        {pieData.map((entry) => (<Cell key={entry.name} fill={entry.fill} />))}
                                    </Pie>
                                </PieChart>
                            </ChartContainer>
                        </div>
                    </div>
                    ) : (
                        <div className="flex items-center justify-center h-full bg-muted rounded-lg p-8">
                            <div className="text-center">
                                <DollarSign className="mx-auto h-12 w-12 text-muted-foreground" />
                                <p className="mt-4 text-muted-foreground">Your results will appear here.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {result && (
                <div className="mt-8">
                    <h3 className="text-lg font-bold text-center mb-4">Balance Accumulation Graph</h3>
                    <div className="h-[300px]">
                       <ChartContainer config={{}} className="w-full h-full">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis tickFormatter={(val) => `${currencySymbol}${val / 1000}k`} tick={{ fontSize: 12 }}/>
                                <Tooltip content={<ChartTooltipContent formatter={(value, name) => `${currencySymbol}${Number(value).toFixed(2)}`} />} />
                                <Bar dataKey="Interest" stackId="a" fill="hsl(var(--chart-2))" name="Interest" />
                                <Bar dataKey="Balance" stackId="a" fill="hsl(var(--chart-1))" name="Principal" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartContainer>
                    </div>
                    <h3 className="text-lg font-bold text-center my-4">Schedule</h3>
                    <div className="h-[300px] overflow-y-auto border rounded-md">
                    <Table>
                        <TableHeader className="sticky top-0 bg-secondary">
                            <TableRow>
                                <TableHead>Year</TableHead>
                                <TableHead className="text-right">Interest</TableHead>
                                <TableHead className="text-right">Ending Balance</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {result.schedule.map((row) => (
                                <TableRow key={row.year}>
                                    <TableCell className="font-medium">{row.year}</TableCell>
                                    <TableCell className="text-right">{currencySymbol}{row.interest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                    <TableCell className="text-right">{currencySymbol}{row.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </div>
                </div>
            )}
        </Tabs>
      </CardContent>
    </Card>
  );
}
