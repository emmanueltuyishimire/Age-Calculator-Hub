
"use client";

import { useState, useMemo } from 'react';
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
import { RefreshCcw, Landmark, LineChart } from 'lucide-react';
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
import { Area, AreaChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from '../ui/switch';

const currencySymbol = '$';

const formSchema = z.object({
  n: z.coerce.number().min(0, "Must be non-negative."),
  iy: z.coerce.number().min(-99).max(100),
  pv: z.coerce.number(),
  pmt: z.coerce.number(),
  fv: z.coerce.number(),
  compounding: z.enum(['annually', 'semiannually', 'quarterly', 'monthly']).default('annually'),
  paymentAt: z.enum(['end', 'beginning']).default('end'),
});
type FormData = z.infer<typeof formSchema>;

interface ScheduleRow {
  period: number;
  startPV: number;
  pmt: number;
  interest: number;
  endFV: number;
}

interface Result {
  calculatedValue: number;
  totalPayments: number;
  totalInterest: number;
  schedule: ScheduleRow[];
}

// Financial formulas
const solveFV = (n: number, r: number, pv: number, pmt: number, pmtAtBeginning: boolean) => {
  const pmtFactor = pmtAtBeginning ? 1 + r : 1;
  return -(pv * Math.pow(1 + r, n) + pmt * pmtFactor * (Math.pow(1 + r, n) - 1) / r);
};

const solvePV = (n: number, r: number, pmt: number, fv: number, pmtAtBeginning: boolean) => {
  const pmtFactor = pmtAtBeginning ? 1 + r : 1;
  return -((fv + pmt * pmtFactor * (Math.pow(1 + r, n) - 1) / r) / Math.pow(1 + r, n));
};

const solvePMT = (n: number, r: number, pv: number, fv: number, pmtAtBeginning: boolean) => {
  const pmtFactor = pmtAtBeginning ? 1 + r : 1;
  return -((pv * Math.pow(1 + r, n) + fv) / (pmtFactor * (Math.pow(1 + r, n) - 1) / r));
};

const solveN = (r: number, pv: number, pmt: number, fv: number, pmtAtBeginning: boolean) => {
  const pmtFactor = pmtAtBeginning ? 1 + r : 1;
  if (r === 0) return -(pv + fv) / pmt;
  return Math.log((-fv * r + pmt * pmtFactor) / (pv * r + pmt * pmtFactor)) / Math.log(1 + r);
};

const solveRate = (n: number, pv: number, pmt: number, fv: number, pmtAtBeginning: boolean): number => {
    // Simplified Newton-Raphson method to solve for rate
    let rate = 0.1;
    for (let i = 0; i < 20; i++) {
        const pmtFactor = pmtAtBeginning ? 1 + rate : 1;
        const f = pv * Math.pow(1 + rate, n) + pmt * pmtFactor * (Math.pow(1 + rate, n) - 1) / rate + fv;
        const df = n * pv * Math.pow(1 + rate, n - 1) + pmt * pmtFactor * (n * rate * Math.pow(1 + rate, n - 1) - (Math.pow(1 + rate, n) - 1)) / (rate * rate);
        const newRate = rate - f / df;
        if (Math.abs(newRate - rate) < 1e-6) return newRate;
        rate = newRate;
    }
    return rate;
};


export default function FinanceCalculator() {
  const [result, setResult] = useState<Result | null>(null);
  const [activeTab, setActiveTab] = useState<keyof FormData>("fv");
  const [showSettings, setShowSettings] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { n: 10, iy: 6, pv: 20000, pmt: -2000, fv: 0, compounding: 'annually', paymentAt: 'end' },
  });

  const getCompoundingPeriods = (c: string) => {
    switch (c) {
      case 'semiannually': return 2;
      case 'quarterly': return 4;
      case 'monthly': return 12;
      default: return 1;
    }
  };

  function onSubmit(values: FormData) {
    const compoundingPeriods = getCompoundingPeriods(values.compounding);
    const r = values.iy / 100 / compoundingPeriods;
    const n = values.n * compoundingPeriods;
    const pv = values.pv;
    const pmt = values.pmt;
    const fv = values.fv;
    const pmtAtBeginning = values.paymentAt === 'beginning';

    let calculatedValue = 0;
    
    try {
        switch (activeTab) {
        case 'fv': calculatedValue = solveFV(n, r, pv, pmt, pmtAtBeginning); form.setValue('fv', calculatedValue); break;
        case 'pmt': calculatedValue = solvePMT(n, r, pv, fv, pmtAtBeginning); form.setValue('pmt', calculatedValue); break;
        case 'iy': 
            const periodicRate = solveRate(n, pv, pmt, fv, pmtAtBeginning);
            calculatedValue = periodicRate * compoundingPeriods * 100;
            form.setValue('iy', calculatedValue);
            break;
        case 'n':
            calculatedValue = solveN(r, pv, pmt, fv, pmtAtBeginning) / compoundingPeriods;
            form.setValue('n', calculatedValue);
            break;
        case 'pv': calculatedValue = solvePV(n, r, pmt, fv, pmtAtBeginning); form.setValue('pv', calculatedValue); break;
        }

        // Generate schedule
        const schedule: ScheduleRow[] = [];
        let currentPV = pv;
        const currentPMT = form.getValues('pmt');
        const numPeriods = Math.ceil(form.getValues('n') * compoundingPeriods);

        for (let i = 1; i <= numPeriods; i++) {
            const interest = currentPV * r;
            let endFV: number;
            if (pmtAtBeginning) {
                 endFV = (currentPV + currentPMT) * (1 + r);
            } else {
                 endFV = currentPV * (1 + r) + currentPMT;
            }

            schedule.push({ period: i, startPV: currentPV, pmt: currentPMT, interest, endFV });
            currentPV = endFV;
        }

        setResult({
        calculatedValue,
        totalPayments: currentPMT * numPeriods,
        totalInterest: (currentPV - pv - (currentPMT * numPeriods)),
        schedule,
        });
    } catch(e) {
        console.error("Calculation error", e);
        // Handle error display
    }
  }

  function handleReset() {
    form.reset();
    setResult(null);
  }

  const isCalcDisabled = (fieldName: keyof FormData) => activeTab === fieldName;

  const chartData = useMemo(() => result?.schedule.map(row => ({
      name: `Period ${row.period}`,
      'Present Value': row.startPV,
      'Future Value': row.endFV,
      'Payment': row.pmt,
      'Interest': row.interest,
  })) || [], [result]);

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={(val) => { setActiveTab(val as keyof FormData); setResult(null); }} className="w-full">
            <TabsList className="grid w-full grid-cols-5 h-auto">
                <TabsTrigger value="fv">FV</TabsTrigger>
                <TabsTrigger value="pmt">PMT</TabsTrigger>
                <TabsTrigger value="iy">I/Y</TabsTrigger>
                <TabsTrigger value="n">N</TabsTrigger>
                <TabsTrigger value="pv">PV</TabsTrigger>
            </TabsList>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div className="space-y-6">
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="n" render={({ field }) => (<FormItem><FormLabel>N (# of periods)</FormLabel><FormControl><Input type="number" {...field} disabled={isCalcDisabled('n')} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="iy" render={({ field }) => (<FormItem><FormLabel>I/Y (Interest per year %)</FormLabel><FormControl><Input type="number" {...field} disabled={isCalcDisabled('iy')} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="pv" render={({ field }) => (<FormItem><FormLabel>PV (Present Value)</FormLabel><FormControl><Input type="number" {...field} disabled={isCalcDisabled('pv')} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="pmt" render={({ field }) => (<FormItem><FormLabel>PMT (Periodic Payment)</FormLabel><FormControl><Input type="number" {...field} disabled={isCalcDisabled('pmt')} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="fv" render={({ field }) => (<FormItem><FormLabel>FV (Future Value)</FormLabel><FormControl><Input type="number" {...field} disabled={isCalcDisabled('fv')} /></FormControl><FormMessage /></FormItem>)} />
                        
                        <div className="flex items-center space-x-2 pt-2">
                           <Button type="button" variant="link" onClick={() => setShowSettings(!showSettings)}>+ Settings</Button>
                        </div>
                        {showSettings && (
                            <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                                <FormField control={form.control} name="compounding" render={({ field }) => (<FormItem><FormLabel>Compounding</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="annually">Annually</SelectItem><SelectItem value="semiannually">Semiannually</SelectItem><SelectItem value="quarterly">Quarterly</SelectItem><SelectItem value="monthly">Monthly</SelectItem></SelectContent></Select></FormItem>)} />
                                <FormField control={form.control} name="paymentAt" render={({ field }) => (<FormItem className="flex items-center space-x-2"><FormLabel>Payment at:</FormLabel><div className="flex items-center gap-2"><p>End</p><FormControl><Switch checked={field.value === 'beginning'} onCheckedChange={c => field.onChange(c ? 'beginning' : 'end')} /></FormControl><p>Beginning</p></div></FormItem>)} />
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-2 pt-2">
                            <Button type="submit" className="w-full"><Landmark className="mr-2 h-4 w-4"/>Calculate</Button>
                            <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
                            <ShareButton title="Finance Calculator" text="A powerful TVM calculator for all your finance needs." url="/finance-calculator" />
                        </div>
                    </form>
                    </Form>
                </div>
                
                <div className="flex flex-col space-y-4">
                    {result ? (
                    <div className="space-y-4 animate-fade-in">
                        <div className="p-4 bg-muted rounded-lg text-center">
                            <h3 className="text-lg font-semibold text-muted-foreground uppercase">{activeTab} Result</h3>
                            <p className="text-4xl font-bold text-primary">{currencySymbol}{result.calculatedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-muted-foreground">Sum of all payments:</span><span className="font-semibold">{currencySymbol}{result.totalPayments.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Total Interest:</span><span className="font-semibold">{currencySymbol}{result.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                        </div>

                         <div className="mt-4">
                            <h3 className="text-lg font-bold text-center mb-2">Value Changes Over Time</h3>
                             <div className="h-[200px]">
                                <ChartContainer config={{}} className="w-full h-full">
                                <AreaChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                                    <YAxis tickFormatter={(val) => currencySymbol + (val/1000) + 'k'} tick={{ fontSize: 10 }} />
                                    <Tooltip content={<ChartTooltipContent formatter={(value) => currencySymbol + Number(value).toFixed(2)}/>} />
                                    <Area type="monotone" dataKey="Future Value" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                                </AreaChart>
                                </ChartContainer>
                            </div>
                        </div>
                    </div>
                    ) : (
                        <div className="flex items-center justify-center h-full bg-muted rounded-lg p-8">
                            <div className="text-center">
                                <LineChart className="mx-auto h-12 w-12 text-muted-foreground" />
                                <p className="mt-4 text-muted-foreground">Your results will appear here.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {result && (
                 <div className="mt-8">
                    <h3 className="text-lg font-bold text-center mb-4">Schedule</h3>
                    <div className="h-[300px] overflow-y-auto border rounded-md">
                    <Table>
                        <TableHeader className="sticky top-0 bg-secondary">
                            <TableRow>
                                <TableHead>Period</TableHead>
                                <TableHead className="text-right">PV</TableHead>
                                <TableHead className="text-right">PMT</TableHead>
                                <TableHead className="text-right">Interest</TableHead>
                                <TableHead className="text-right">FV</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {result.schedule.map((row) => (
                                <TableRow key={row.period}>
                                    <TableCell className="font-medium">{row.period}</TableCell>
                                    <TableCell className="text-right">{currencySymbol}{row.startPV.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                    <TableCell className="text-right">{currencySymbol}{row.pmt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                    <TableCell className="text-right">{currencySymbol}{row.interest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                    <TableCell className="text-right">{currencySymbol}{row.endFV.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
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
