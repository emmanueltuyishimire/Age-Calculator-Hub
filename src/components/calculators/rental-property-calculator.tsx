
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
import { RefreshCcw, Home } from 'lucide-react';
import { Switch } from '../ui/switch';
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
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const formSchema = z.object({
  // Purchase
  purchasePrice: z.coerce.number().min(1),
  useLoan: z.boolean().default(true),
  downPayment: z.coerce.number().min(0),
  interestRate: z.coerce.number().min(0),
  loanTerm: z.coerce.number().min(1),
  closingCost: z.coerce.number().min(0),
  needRepairs: z.boolean().default(false),
  repairCost: z.coerce.number().min(0).optional(),
  // Income
  monthlyRent: z.coerce.number().min(0),
  otherMonthlyIncome: z.coerce.number().min(0),
  annualIncomeIncrease: z.coerce.number().min(0),
  vacancyRate: z.coerce.number().min(0).max(100),
  // Expenses
  propertyTax: z.coerce.number().min(0),
  insurance: z.coerce.number().min(0),
  hoaFee: z.coerce.number().min(0),
  maintenance: z.coerce.number().min(0),
  otherCosts: z.coerce.number().min(0),
  annualExpenseIncrease: z.coerce.number().min(0),
  managementFee: z.coerce.number().min(0).max(100),
  // Sell
  holdingLength: z.coerce.number().min(1),
  appreciation: z.coerce.number().min(0),
  costToSell: z.coerce.number().min(0).max(100),
});

type FormData = z.infer<typeof formSchema>;

interface Result {
  capRate: number;
  cashOnCashReturn: number;
  irr: number;
  schedule: any[];
}

// IRR calculation using Newton-Raphson method
function calculateIRR(cashFlows: number[], guess = 0.05) {
  const maxIterations = 1000;
  const precision = 1e-7;

  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let dNpv = 0;
    for (let t = 0; t < cashFlows.length; t++) {
      npv += cashFlows[t] / Math.pow(1 + guess, t);
      dNpv -= (t * cashFlows[t]) / Math.pow(1 + guess, t + 1);
    }
    const newGuess = guess - npv / dNpv;
    if (Math.abs(newGuess - guess) < precision) {
      return newGuess * 100;
    }
    guess = newGuess;
  }
  return NaN; // Failed to converge
}

export default function RentalPropertyCalculator() {
  const [result, setResult] = useState<Result | null>(null);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purchasePrice: 200000,
      useLoan: true,
      downPayment: 20,
      interestRate: 6,
      loanTerm: 30,
      closingCost: 6000,
      needRepairs: false,
      repairCost: 0,
      monthlyRent: 2000,
      otherMonthlyIncome: 0,
      annualIncomeIncrease: 3,
      vacancyRate: 5,
      propertyTax: 3000,
      insurance: 1200,
      hoaFee: 0,
      maintenance: 2000,
      otherCosts: 500,
      annualExpenseIncrease: 3,
      managementFee: 0,
      holdingLength: 20,
      appreciation: 3,
      costToSell: 8,
    },
  });

  function onSubmit(values: FormData) {
    const { purchasePrice, useLoan, downPayment, interestRate, loanTerm, closingCost, repairCost, monthlyRent, otherMonthlyIncome, annualIncomeIncrease, vacancyRate, propertyTax, insurance, hoaFee, maintenance, otherCosts, annualExpenseIncrease, managementFee, holdingLength, appreciation, costToSell } = values;

    const downPaymentAmount = purchasePrice * (downPayment / 100);
    const loanAmount = useLoan ? purchasePrice - downPaymentAmount : 0;
    
    let monthlyMortgage = 0;
    if (useLoan && loanAmount > 0) {
      const monthlyRate = interestRate / 100 / 12;
      const numberOfPayments = loanTerm * 12;
      monthlyMortgage = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }
    
    const initialInvestment = downPaymentAmount + closingCost + (repairCost || 0);

    const schedule = [];
    const cashFlows = [-initialInvestment];
    let currentPropertyValue = purchasePrice;
    let remainingLoanBalance = loanAmount;
    
    // Year 1 calculations for initial metrics
    const grossAnnualIncomeY1 = (monthlyRent + otherMonthlyIncome) * 12;
    const vacancyCostY1 = grossAnnualIncomeY1 * (vacancyRate / 100);
    const managementCostY1 = grossAnnualIncomeY1 * (managementFee / 100);
    const effectiveGrossIncomeY1 = grossAnnualIncomeY1 - vacancyCostY1;
    const annualExpensesY1 = propertyTax + insurance + hoaFee + maintenance + otherCosts + managementCostY1;
    const noiY1 = effectiveGrossIncomeY1 - annualExpensesY1;
    const debtServiceY1 = monthlyMortgage * 12;
    const cashFlowY1 = noiY1 - debtServiceY1;

    const capRate = (noiY1 / purchasePrice) * 100;
    const cashOnCashReturn = (cashFlowY1 / initialInvestment) * 100;

    // Full schedule
    for (let year = 1; year <= holdingLength; year++) {
      const grossAnnualIncome = ((monthlyRent + otherMonthlyIncome) * 12) * Math.pow(1 + annualIncomeIncrease / 100, year - 1);
      const vacancyCost = grossAnnualIncome * (vacancyRate / 100);
      const managementCost = (grossAnnualIncome - vacancyCost) * (managementFee / 100);
      const effectiveGrossIncome = grossAnnualIncome - vacancyCost;
      
      const annualExpenses = (propertyTax + insurance + hoaFee + maintenance + otherCosts) * Math.pow(1 + annualExpenseIncrease / 100, year - 1) + managementCost;
      const noi = effectiveGrossIncome - annualExpenses;
      
      let interestPaidThisYear = 0;
      let principalPaidThisYear = 0;
      if (useLoan) {
        for (let i = 0; i < 12; i++) {
          const interest = remainingLoanBalance * (interestRate / 100 / 12);
          const principal = monthlyMortgage - interest;
          interestPaidThisYear += interest;
          principalPaidThisYear += principal;
          remainingLoanBalance -= principal;
        }
      }
      const debtService = monthlyMortgage * 12;
      const cashFlow = noi - debtService;
      cashFlows.push(cashFlow);

      currentPropertyValue *= (1 + appreciation / 100);
      
      schedule.push({ year, grossAnnualIncome, vacancyCost, effectiveGrossIncome, annualExpenses, noi, debtService, cashFlow, propertyValue: currentPropertyValue, loanBalance: remainingLoanBalance > 0 ? remainingLoanBalance : 0 });
    }

    // Sell at end of holding period
    const finalPropertyValue = purchasePrice * Math.pow(1 + appreciation / 100, holdingLength);
    const sellCost = finalPropertyValue * (costToSell / 100);
    const finalLoanPayoff = remainingLoanBalance > 0 ? remainingLoanBalance : 0;
    const netProceeds = finalPropertyValue - sellCost - finalLoanPayoff;

    cashFlows[cashFlows.length - 1] += netProceeds;
    
    const irr = calculateIRR(cashFlows);

    setResult({ capRate, cashOnCashReturn, irr, schedule });
  }

  const { watch } = form;
  const useLoan = watch('useLoan');
  const needRepairs = watch('needRepairs');

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Sections */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">Purchase</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="purchasePrice" render={({ field }) => <FormItem><FormLabel>Purchase Price</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                <FormField control={form.control} name="closingCost" render={({ field }) => <FormItem><FormLabel>Closing Cost</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                <FormField control={form.control} name="useLoan" render={({ field }) => <FormItem className="flex items-center gap-2 pt-8"><FormLabel>Use Loan?</FormLabel><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>} />
                <FormField control={form.control} name="needRepairs" render={({ field }) => <FormItem className="flex items-center gap-2 pt-8"><FormLabel>Need Repairs?</FormLabel><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>} />
                {needRepairs && <FormField control={form.control} name="repairCost" render={({ field }) => <FormItem><FormLabel>Repair Cost</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />}
              </div>
              {useLoan && <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t mt-4">
                <FormField control={form.control} name="downPayment" render={({ field }) => <FormItem><FormLabel>Down Payment (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                <FormField control={form.control} name="interestRate" render={({ field }) => <FormItem><FormLabel>Interest Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl></FormItem>} />
                <FormField control={form.control} name="loanTerm" render={({ field }) => <FormItem><FormLabel>Loan Term (Years)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
              </div>}
            </div>

            <div className="space-y-4 p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">Income</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="monthlyRent" render={({ field }) => <FormItem><FormLabel>Monthly Rent</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                <FormField control={form.control} name="otherMonthlyIncome" render={({ field }) => <FormItem><FormLabel>Other Monthly Income</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                <FormField control={form.control} name="annualIncomeIncrease" render={({ field }) => <FormItem><FormLabel>Annual Income Increase (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                <FormField control={form.control} name="vacancyRate" render={({ field }) => <FormItem><FormLabel>Vacancy Rate (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
              </div>
            </div>

            <div className="space-y-4 p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">Recurring Operating Expenses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="propertyTax" render={({ field }) => <FormItem><FormLabel>Property Tax (Annual)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                <FormField control={form.control} name="insurance" render={({ field }) => <FormItem><FormLabel>Total Insurance (Annual)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                <FormField control={form.control} name="hoaFee" render={({ field }) => <FormItem><FormLabel>HOA Fee (Annual)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                <FormField control={form.control} name="maintenance" render={({ field }) => <FormItem><FormLabel>Maintenance (Annual)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                <FormField control={form.control} name="otherCosts" render={({ field }) => <FormItem><FormLabel>Other Costs (Annual)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                <FormField control={form.control} name="annualExpenseIncrease" render={({ field }) => <FormItem><FormLabel>Annual Expense Increase (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                <FormField control={form.control} name="managementFee" render={({ field }) => <FormItem className="md:col-span-2"><FormLabel>Management Fee (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
              </div>
            </div>

            <div className="space-y-4 p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">Sell</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField control={form.control} name="holdingLength" render={({ field }) => <FormItem><FormLabel>Holding Length (Years)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                <FormField control={form.control} name="appreciation" render={({ field }) => <FormItem><FormLabel>Value Appreciation (%/year)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                <FormField control={form.control} name="costToSell" render={({ field }) => <FormItem><FormLabel>Cost to Sell (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button type="submit" className="w-full"><Home className="mr-2 h-4 w-4"/>Calculate</Button>
              <Button onClick={() => form.reset()} type="button" variant="outline" className="w-full sm:w-auto"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
            </div>
          </form>
        </Form>
        
        {result && (
          <div className="p-4 bg-muted rounded-lg mt-6 space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-center text-foreground">Investment Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-3 border rounded-lg bg-background"><h4 className="font-semibold text-muted-foreground">IRR (Annualized Return)</h4><p className="text-2xl font-bold text-primary">{result.irr.toFixed(2)}%</p></div>
                <div className="p-3 border rounded-lg bg-background"><h4 className="font-semibold text-muted-foreground">Cap Rate (Year 1)</h4><p className="text-2xl font-bold text-primary">{result.capRate.toFixed(2)}%</p></div>
                <div className="p-3 border rounded-lg bg-background"><h4 className="font-semibold text-muted-foreground">Cash on Cash Return (Year 1)</h4><p className="text-2xl font-bold text-primary">{result.cashOnCashReturn.toFixed(2)}%</p></div>
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-bold text-center mb-2">Annual Financial Breakdown</h3>
                <div className="h-[400px] overflow-y-auto border rounded-md">
                <Table>
                    <TableHeader className="sticky top-0 bg-secondary"><TableRow>
                        <TableHead>Year</TableHead><TableHead>Cash Flow</TableHead><TableHead>NOI</TableHead>
                        <TableHead>Property Value</TableHead><TableHead>Loan Balance</TableHead>
                    </TableRow></TableHeader>
                    <TableBody>
                        {result.schedule.map(row => (<TableRow key={row.year}>
                            <TableCell>{row.year}</TableCell>
                            <TableCell className={row.cashFlow < 0 ? 'text-destructive' : 'text-green-600'}>${row.cashFlow.toLocaleString(undefined, {maximumFractionDigits:0})}</TableCell>
                            <TableCell>${row.noi.toLocaleString(undefined, {maximumFractionDigits:0})}</TableCell>
                            <TableCell>${row.propertyValue.toLocaleString(undefined, {maximumFractionDigits:0})}</TableCell>
                            <TableCell>${row.loanBalance.toLocaleString(undefined, {maximumFractionDigits:0})}</TableCell>
                        </TableRow>))}
                    </TableBody>
                </Table>
                </div>
            </div>
            <div className="h-[250px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={result.schedule} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={(val) => `$${(val / 1000)}k`} tick={{ fontSize: 12 }}/>
                    <Tooltip formatter={(value: number) => `$${value.toLocaleString(undefined, {maximumFractionDigits: 0})}`} contentStyle={{ background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                    <Legend />
                    <Bar dataKey="cashFlow" fill="hsl(var(--chart-1))" name="Cash Flow" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
