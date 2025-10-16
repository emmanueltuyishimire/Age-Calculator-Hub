
"use client";

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, differenceInDays, isFuture, isValid } from 'date-fns';
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
import { RefreshCcw, DollarSign, CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { PieChart, Pie, Cell } from "recharts"

const formSchema = z.object({
  amountInvested: z.coerce.number().min(0.01, "Amount must be greater than zero."),
  amountReturned: z.coerce.number().min(0, "Cannot be negative."),
  startDate: z.date({ required_error: "Start date is required." }),
  endDate: z.date({ required_error: "End date is required." }),
}).refine(data => data.endDate >= data.startDate, {
  message: "End date must be on or after start date.",
  path: ["endDate"],
});

type FormData = z.infer<typeof formSchema>;

interface Result {
  investmentGain: number;
  roi: number;
  annualizedRoi: number;
  investmentLength: number;
}

const currencySymbol = '$';

export default function RoiCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        amountInvested: 1000,
        amountReturned: 2000,
        startDate: new Date("2025-10-16"),
        endDate: new Date("2029-12-31"),
    },
  });

  function onSubmit(values: FormData) {
    const { amountInvested, amountReturned, startDate, endDate } = values;

    const investmentGain = amountReturned - amountInvested;
    const roi = (investmentGain / amountInvested) * 100;
    
    const days = differenceInDays(endDate, startDate);
    const investmentLength = days / 365.25;

    let annualizedRoi = 0;
    if (investmentLength > 0 && amountInvested > 0 && amountReturned >= 0) {
      if(investmentLength >= 1) {
        annualizedRoi = (Math.pow(amountReturned / amountInvested, 1 / investmentLength) - 1) * 100;
      } else {
        // For periods less than a year, annualize by simple extrapolation
        annualizedRoi = (roi / investmentLength);
      }
    }
    
    setResult({
      investmentGain,
      roi,
      annualizedRoi,
      investmentLength,
    });
  }

  function handleReset() {
    form.reset();
    setResult(null);
  }

  const pieChartData = result ? [
    { name: 'Invested', value: form.getValues('amountInvested'), fill: 'hsl(var(--secondary))' },
    { name: 'Profit', value: result.investmentGain > 0 ? result.investmentGain : 0, fill: 'hsl(var(--chart-1))' },
  ] : [];

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">ROI Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="amountInvested" render={({ field }) => (<FormItem><FormLabel>Amount Invested</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="amountReturned" render={({ field }) => (<FormItem><FormLabel>Amount Returned</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="startDate" render={({ field }) => (<FormItem className="flex flex-col"><FormLabel>Start Date</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4 opacity-50" />{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}</Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="endDate" render={({ field }) => (<FormItem className="flex flex-col"><FormLabel>End Date</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4 opacity-50" />{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}</Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>)} />
             </div>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><DollarSign className="mr-2 h-4 w-4"/>Calculate ROI</Button>
              <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
            </div>
          </form>
        </Form>
        
        {result && (
          <div className="p-4 bg-muted rounded-lg mt-6 space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-center text-foreground">Your Investment Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-3 border rounded-lg bg-background">
                    <h4 className="font-semibold text-muted-foreground">Total ROI</h4>
                    <p className="text-2xl font-bold text-primary">{result.roi.toFixed(2)}%</p>
                </div>
                <div className="p-3 border rounded-lg bg-background">
                    <h4 className="font-semibold text-muted-foreground">Annualized ROI</h4>
                    <p className="text-2xl font-bold text-primary">{result.annualizedRoi.toFixed(2)}%</p>
                </div>
                 <div className="p-3 border rounded-lg bg-background">
                    <h4 className="font-semibold text-muted-foreground">Investment Gain</h4>
                    <p className={`text-2xl font-bold ${result.investmentGain >= 0 ? 'text-primary' : 'text-destructive'}`}>
                        {currencySymbol}{result.investmentGain.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
                </div>
            </div>
            <div className="text-center text-sm text-muted-foreground">Over an investment period of {result.investmentLength.toFixed(3)} years.</div>
            <div className="h-[150px] w-full mt-4">
                <ChartContainer config={{}} className="mx-auto aspect-square h-full">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel formatter={(value) => `${currencySymbol}${Number(value).toFixed(2)}`} />} />
                        <Pie data={pieChartData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={60} paddingAngle={5} strokeWidth={2}>
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
