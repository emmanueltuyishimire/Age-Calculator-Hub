
"use client";

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { estateTaxData, type EstateTaxYear } from '@/lib/estate-tax-data';
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
import { Separator } from '../ui/separator';

const formSchema = z.object({
  yearOfDeath: z.string(),
  // Assets
  residence: z.coerce.number().min(0).optional(),
  investments: z.coerce.number().min(0).optional(),
  savings: z.coerce.number().min(0).optional(),
  vehicles: z.coerce.number().min(0).optional(),
  retirementPlans: z.coerce.number().min(0).optional(),
  lifeInsurance: z.coerce.number().min(0).optional(),
  otherAssets: z.coerce.number().min(0).optional(),
  // Liabilities
  debts: z.coerce.number().min(0).optional(),
  funeralExpenses: z.coerce.number().min(0).optional(),
  charitableContributions: z.coerce.number().min(0).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface Result {
  grossEstate: number;
  taxableEstate: number;
  estimatedTax: number;
}

export default function EstateTaxCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      yearOfDeath: '2024',
      residence: 0,
      investments: 0,
      savings: 0,
      vehicles: 0,
      retirementPlans: 0,
      lifeInsurance: 0,
      otherAssets: 0,
      debts: 0,
      funeralExpenses: 0,
      charitableContributions: 0,
    },
  });

  function onSubmit(values: FormData) {
    const assets = (values.residence || 0) + (values.investments || 0) + (values.savings || 0) + (values.vehicles || 0) + (values.retirementPlans || 0) + (values.lifeInsurance || 0) + (values.otherAssets || 0);
    const deductions = (values.debts || 0) + (values.funeralExpenses || 0) + (values.charitableContributions || 0);
    const taxableEstate = assets - deductions;
    
    const yearData = estateTaxData[values.yearOfDeath as EstateTaxYear];
    if (!yearData) {
        // Should not happen with form validation
        return;
    }
    
    const exemption = yearData.exemption;
    const rate = yearData.rate / 100;
    
    const amountSubjectToTax = taxableEstate - exemption;
    const estimatedTax = amountSubjectToTax > 0 ? amountSubjectToTax * rate : 0;
    
    setResult({
      grossEstate: assets,
      taxableEstate,
      estimatedTax,
    });
  }

  function handleReset() {
    form.reset();
    setResult(null);
  }

  const currencySymbol = '$';

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">Estate Tax Estimator</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="space-y-4 p-4 border rounded-lg">
                <FormField control={form.control} name="yearOfDeath" render={({ field }) => (
                    <FormItem><FormLabel>Year of Death</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent>
                                {Object.keys(estateTaxData).sort((a, b) => Number(b) - Number(a)).map(year => (
                                    <SelectItem key={year} value={year}>{year}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    <FormMessage /></FormItem>
                )} />
            </div>

            <div className="space-y-4 p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">Assets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="residence" render={({ field }) => (<FormItem><FormLabel>Residence & Real Estate</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="investments" render={({ field }) => (<FormItem><FormLabel>Stocks, Bonds, Investments</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="savings" render={({ field }) => (<FormItem><FormLabel>Savings & Checking</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="vehicles" render={({ field }) => (<FormItem><FormLabel>Vehicles & Other Property</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="retirementPlans" render={({ field }) => (<FormItem><FormLabel>Retirement Plans (401k, IRA)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="lifeInsurance" render={({ field }) => (<FormItem><FormLabel>Life Insurance Benefits</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="otherAssets" render={({ field }) => (<FormItem><FormLabel>Other Assets</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
              </div>
            </div>

            <div className="space-y-4 p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">Liabilities & Deductions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="debts" render={({ field }) => (<FormItem><FormLabel>Debts (Mortgages, Loans)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="funeralExpenses" render={({ field }) => (<FormItem><FormLabel>Funeral & Admin Expenses</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="charitableContributions" render={({ field }) => (<FormItem><FormLabel>Charitable Contributions</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><Landmark className="mr-2 h-4 w-4"/>Estimate Tax</Button>
              <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
            </div>
          </form>
        </Form>
        
        {result && (
          <div className="p-4 bg-muted rounded-lg text-center mt-6 space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-foreground">Your Estimated Federal Estate Tax</h3>
             <div className="p-4 border rounded-lg bg-background">
                <h4 className="font-semibold text-muted-foreground">Estimated Tax Due</h4>
                <p className="text-3xl font-bold text-primary">
                    {currencySymbol}{result.estimatedTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-left">
                <div className="p-3 border rounded-lg bg-background">
                    <span className="text-muted-foreground block">Gross Estate</span>
                    <span className="font-semibold">{currencySymbol}{result.grossEstate.toLocaleString()}</span>
                </div>
                <div className="p-3 border rounded-lg bg-background">
                    <span className="text-muted-foreground block">Taxable Estate</span>
                    <span className="font-semibold">{currencySymbol}{result.taxableEstate.toLocaleString()}</span>
                </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
