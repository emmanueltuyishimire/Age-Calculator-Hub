
"use client";

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, addMonths } from 'date-fns';
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
import { RefreshCcw, Home } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const currentYear = new Date().getFullYear();

const formSchema = z.object({
  homePrice: z.coerce.number().min(1, "Home price is required."),
  downPayment: z.coerce.number().min(3.5, "Min. FHA down payment is 3.5%").max(100),
  loanTerm: z.coerce.number().min(1, "Term is required.").max(40),
  interestRate: z.coerce.number().min(0, "Rate is required.").max(30),
  upfrontMip: z.coerce.number().default(1.75),
  annualMip: z.coerce.number().min(0).max(5),
  annualMipDuration: z.enum(['loanTerm', '11']),
  propertyTax: z.coerce.number().min(0).optional(),
  homeInsurance: z.coerce.number().min(0).optional(),
  hoa: z.coerce.number().min(0).optional(),
  startDateMonth: z.string().default((new Date().getMonth() + 1).toString()),
  startDateYear: z.coerce.number().default(currentYear),
}).refine(data => {
    const dpAmount = data.homePrice * (data.downPayment / 100);
    return dpAmount < data.homePrice;
}, {
  message: "Down payment must be less than home price.",
  path: ["downPayment"],
});

type FormData = z.infer<typeof formSchema>;

interface AmortizationRow {
    year: number;
    interest: number;
    principal: number;
    mip: number;
    balance: number;
}

interface Result {
  monthlyPayment: number;
  principalAndInterest: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyMip: number;
  monthlyHoa: number;
  totalInterest: number;
  loanAmountWithMip: number;
  downPaymentAmount: number;
  payoffDate: Date;
  amortizationSchedule: AmortizationRow[];
}

export default function FhaLoanCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      homePrice: 500000,
      downPayment: 3.5,
      loanTerm: 30,
      interestRate: 6.279,
      upfrontMip: 1.75,
      annualMip: 0.55,
      annualMipDuration: 'loanTerm',
      propertyTax: 1.2,
      homeInsurance: 2500,
      hoa: 0,
      startDateMonth: (new Date().getMonth() + 1).toString(),
      startDateYear: currentYear,
    },
  });

  function onSubmit(values: FormData) {
    const { homePrice, downPayment, loanTerm, interestRate, upfrontMip, annualMip, annualMipDuration, propertyTax, homeInsurance, hoa, startDateMonth, startDateYear } = values;

    const downPaymentAmount = homePrice * (downPayment / 100);
    const baseLoanAmount = homePrice - downPaymentAmount;
    const upfrontMipAmount = baseLoanAmount * (upfrontMip / 100);
    const totalLoanAmount = baseLoanAmount + upfrontMipAmount;
    
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const principalAndInterest = totalLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const monthlyTax = (homePrice * ((propertyTax || 0) / 100)) / 12;
    const monthlyInsurance = (homeInsurance || 0) / 12;
    const monthlyHoa = hoa || 0;
    
    const monthlyMip = (baseLoanAmount * (annualMip / 100)) / 12;
    
    const monthlyPayment = principalAndInterest + monthlyTax + monthlyInsurance + monthlyMip + monthlyHoa;
    
    // Amortization Schedule
    let balance = totalLoanAmount;
    const schedule: AmortizationRow[] = [];
    const mipDurationMonths = annualMipDuration === '11' ? 11 * 12 : numberOfPayments;

    for (let year = 1; year <= loanTerm; year++) {
        let annualInterest = 0;
        let annualPrincipal = 0;
        let annualMipPaid = 0;
        for (let month = 1; month <= 12; month++) {
            const currentMonth = (year - 1) * 12 + month;
            if (currentMonth > numberOfPayments) break;

            const interestForMonth = balance * monthlyRate;
            const principalForMonth = principalAndInterest - interestForMonth;
            
            annualInterest += interestForMonth;
            annualPrincipal += principalForMonth;
            balance -= principalForMonth;

            if (currentMonth <= mipDurationMonths) {
                annualMipPaid += monthlyMip;
            }
        }
        schedule.push({ year, interest: annualInterest, principal: annualPrincipal, mip: annualMipPaid, balance: balance > 0 ? balance : 0 });
    }

    const totalInterest = schedule.reduce((acc, row) => acc + row.interest, 0);
    const startDate = new Date(startDateYear, parseInt(startDateMonth, 10) - 1, 1);
    const payoffDate = addMonths(startDate, numberOfPayments);

    setResult({
      monthlyPayment,
      principalAndInterest,
      monthlyTax,
      monthlyInsurance,
      monthlyMip,
      monthlyHoa,
      totalInterest,
      loanAmountWithMip: totalLoanAmount,
      downPaymentAmount,
      payoffDate,
      amortizationSchedule: schedule,
    });
  }

  return (
    <Card className="w-full mx-auto shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="homePrice" render={({ field }) => (<FormItem><FormLabel>Home Price</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="downPayment" render={({ field }) => (<FormItem><FormLabel>Down Payment (%)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="loanTerm" render={({ field }) => (<FormItem><FormLabel>Loan Term (Years)</FormLabel><Select onValueChange={(val) => field.onChange(Number(val))} defaultValue={String(field.value)}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="30">30</SelectItem><SelectItem value="15">15</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Interest Rate (%)</FormLabel><FormControl><Input type="number" step="0.001" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="upfrontMip" render={({ field }) => (<FormItem><FormLabel>Upfront FHA MIP (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="annualMip" render={({ field }) => (<FormItem><FormLabel>Annual FHA MIP (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="annualMipDuration" render={({ field }) => (<FormItem className="sm:col-span-2"><FormLabel>Annual MIP Duration</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl><SelectContent><SelectItem value="loanTerm">For the life of the loan</SelectItem><SelectItem value="11">11 years (for LTV ≤ 90%)</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="propertyTax" render={({ field }) => (<FormItem><FormLabel>Property Taxes (%/year)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="homeInsurance" render={({ field }) => (<FormItem><FormLabel>Home Insurance ($/year)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="hoa" render={({ field }) => (<FormItem><FormLabel>HOA Fee ($/month)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormItem className="sm:col-span-2">
                        <FormLabel>Start Date</FormLabel>
                        <div className="flex gap-2">
                        <FormField control={form.control} name="startDateMonth" render={({ field }) => (<Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>{Array.from({length: 12}, (_, i) => <SelectItem key={i} value={(i+1).toString()}>{format(new Date(0, i), 'MMM')}</SelectItem>)}</SelectContent></Select>)} />
                        <FormField control={form.control} name="startDateYear" render={({ field }) => (<FormControl><Input type="number" {...field} /></FormControl>)} />
                        </div>
                    </FormItem>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button type="submit" className="w-full"><Home className="mr-2 h-4 w-4"/>Calculate</Button>
                    <Button onClick={() => form.reset()} type="button" variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
                </div>
            </form>
            </Form>
            </div>
            <div className="flex flex-col space-y-4">
                {result ? (
                <div className="space-y-4 animate-fade-in">
                    <div className="p-4 bg-muted rounded-lg text-center">
                        <h3 className="text-lg font-semibold text-muted-foreground">Estimated Monthly Payment</h3>
                        <p className="text-4xl font-bold text-primary">${result.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <div className="h-[200px]">
                        <ChartContainer config={{}} className="mx-auto aspect-square h-full">
                            <PieChart><Tooltip cursor={false} content={<ChartTooltipContent hideLabel formatter={(value) => `$${Number(value).toFixed(2)}`} />} /><Pie data={[
                                {name: 'P&I', value: result.principalAndInterest, fill: 'hsl(var(--chart-1))'},
                                {name: 'Taxes', value: result.monthlyTax, fill: 'hsl(var(--chart-2))'},
                                {name: 'Insurance', value: result.monthlyInsurance, fill: 'hsl(var(--chart-3))'},
                                {name: 'MIP', value: result.monthlyMip, fill: 'hsl(var(--chart-4))'},
                                {name: 'HOA', value: result.monthlyHoa, fill: 'hsl(var(--chart-5))'},
                            ].filter(i=>i.value > 0)} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70} paddingAngle={2}><Cell/><Cell/><Cell/><Cell/><Cell/></Pie></ChartContainer>
                    </div>
                    <div className="space-y-1 text-sm border-t pt-2">
                        <div className="flex justify-between"><span className="text-muted-foreground">Principal & Interest:</span><span className="font-semibold">${result.principalAndInterest.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Property Tax:</span><span className="font-semibold">${result.monthlyTax.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Home Insurance:</span><span className="font-semibold">${result.monthlyInsurance.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Monthly MIP:</span><span className="font-semibold">${result.monthlyMip.toFixed(2)}</span></div>
                         {result.monthlyHoa > 0 && <div className="flex justify-between"><span className="text-muted-foreground">HOA:</span><span className="font-semibold">${result.monthlyHoa.toFixed(2)}</span></div>}
                    </div>
                     <div className="space-y-1 text-sm border-t pt-2">
                        <div className="flex justify-between"><span className="text-muted-foreground">Loan Amount w/ Upfront MIP:</span><span className="font-semibold">${result.loanAmountWithMip.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Total Interest:</span><span className="font-semibold">${result.totalInterest.toLocaleString(undefined, {maximumFractionDigits:0})}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Payoff Date:</span><span className="font-semibold">{format(result.payoffDate, 'MMM yyyy')}</span></div>
                    </div>
                </div>
                ) : (
                    <div className="flex items-center justify-center h-full bg-muted rounded-lg p-8">
                        <div className="text-center"><Home className="mx-auto h-12 w-12 text-muted-foreground" /><p className="mt-4 text-muted-foreground">Your FHA loan results will appear here.</p></div>
                    </div>
                )}
            </div>
        </div>
         {result && (
            <div className="mt-8"><h3 className="text-lg font-bold text-center mb-2">Amortization Schedule</h3><div className="h-[300px] overflow-y-auto border rounded-md">
                <Table><TableHeader className="sticky top-0 bg-secondary"><TableRow><TableHead>Year</TableHead><TableHead className="text-right">Interest</TableHead><TableHead className="text-right">Principal</TableHead><TableHead className="text-right">MIP</TableHead><TableHead className="text-right">Balance</TableHead></TableRow></TableHeader>
                    <TableBody>{result.amortizationSchedule.map((row) => (<TableRow key={row.year}><TableCell className="font-medium">{row.year}</TableCell><TableCell className="text-right">${row.interest.toLocaleString(undefined, {maximumFractionDigits:0})}</TableCell><TableCell className="text-right">${row.principal.toLocaleString(undefined, {maximumFractionDigits:0})}</TableCell><TableCell className="text-right">${row.mip.toLocaleString(undefined, {maximumFractionDigits:0})}</TableCell><TableCell className="text-right">${row.balance.toLocaleString(undefined, {maximumFractionDigits:0})}</TableCell></TableRow>))}</TableBody>
                </Table>
            </div></div>
        )}
      </CardContent>
    </Card>
  );
}

