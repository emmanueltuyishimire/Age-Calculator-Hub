
"use client";

import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Scale } from 'lucide-react';

const currencySymbol = '$';

// --- Lump Sum vs Monthly Calculator ---
const lumpSumSchema = z.object({
  retirementAge: z.coerce.number().min(50),
  lifeExpectancy: z.coerce.number().min(60),
  lumpSumAmount: z.coerce.number().min(1),
  investmentReturn: z.coerce.number().min(0),
  monthlyPension: z.coerce.number().min(1),
  cola: z.coerce.number().min(0),
}).refine(data => data.lifeExpectancy > data.retirementAge, { message: "Life expectancy must be greater than retirement age.", path: ["lifeExpectancy"] });
type LumpSumFormData = z.infer<typeof lumpSumSchema>;

function LumpSumVsMonthly() {
  const [result, setResult] = useState<{ lumpSumFinal: number; monthlyTotal: number } | null>(null);
  const form = useForm<LumpSumFormData>({
    resolver: zodResolver(lumpSumSchema),
    defaultValues: { retirementAge: 65, lifeExpectancy: 85, lumpSumAmount: 800000, investmentReturn: 5, monthlyPension: 5000, cola: 3.5 },
  });

  function onSubmit(values: LumpSumFormData) {
    const { retirementAge, lifeExpectancy, lumpSumAmount, investmentReturn, monthlyPension, cola } = values;
    const years = lifeExpectancy - retirementAge;
    const r = investmentReturn / 100;
    const lumpSumFinal = lumpSumAmount * Math.pow(1 + r, years);

    let monthlyTotal = 0;
    let currentMonthlyPension = monthlyPension;
    for (let i = 0; i < years; i++) {
        monthlyTotal += currentMonthlyPension * 12;
        currentMonthlyPension *= (1 + cola / 100);
    }
    setResult({ lumpSumFinal, monthlyTotal });
  }

  return (
    <Card>
      <CardHeader><CardTitle>Lump Sum vs. Monthly Pension</CardTitle><CardDescription>Compare a one-time payout to a stream of monthly payments.</CardDescription></CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="retirementAge" render={({ field }) => <FormItem><FormLabel>Retirement Age</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
              <FormField control={form.control} name="lifeExpectancy" render={({ field }) => <FormItem><FormLabel>Life Expectancy</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
            </div>
            <div className="p-4 border rounded-md space-y-2">
              <h4 className="font-semibold">Option 1: Lump Sum</h4>
              <FormField control={form.control} name="lumpSumAmount" render={({ field }) => <FormItem><FormLabel>Lump Sum Amount</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
              <FormField control={form.control} name="investmentReturn" render={({ field }) => <FormItem><FormLabel>Expected Investment Return (%)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl></FormItem>} />
            </div>
            <div className="p-4 border rounded-md space-y-2">
              <h4 className="font-semibold">Option 2: Monthly Pension</h4>
              <FormField control={form.control} name="monthlyPension" render={({ field }) => <FormItem><FormLabel>Monthly Pension Income</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
              <FormField control={form.control} name="cola" render={({ field }) => <FormItem><FormLabel>Cost-of-Living Adjustment (%)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl></FormItem>} />
            </div>
            <Button type="submit" className="w-full">Compare</Button>
          </form>
        </Form>
        {result && (
          <div className="mt-4 p-4 bg-muted rounded-lg text-center">
            <h3 className="text-lg font-bold">Comparison Results</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="p-2 border bg-background rounded-lg"><h4 className="font-semibold text-muted-foreground">Lump Sum Final Value</h4><p className="text-primary font-bold text-xl">{currencySymbol}{result.lumpSumFinal.toLocaleString(undefined, {maximumFractionDigits:0})}</p></div>
              <div className="p-2 border bg-background rounded-lg"><h4 className="font-semibold text-muted-foreground">Total Monthly Payouts</h4><p className="text-primary font-bold text-xl">{currencySymbol}{result.monthlyTotal.toLocaleString(undefined, {maximumFractionDigits:0})}</p></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// --- Single Life vs Joint Survivor Calculator ---
const jointLifeSchema = z.object({
  retirementAge: z.coerce.number().min(50),
  yourLifeExpectancy: z.coerce.number().min(60),
  spouseAge: z.coerce.number().min(50),
  spouseLifeExpectancy: z.coerce.number().min(60),
  singleLifePension: z.coerce.number().min(1),
  jointSurvivorPension: z.coerce.number().min(1),
  investmentReturn: z.coerce.number().min(0),
  cola: z.coerce.number().min(0),
}).refine(data => data.yourLifeExpectancy > data.retirementAge, { message: "Life expectancy must be > retirement age.", path: ["yourLifeExpectancy"] });
type JointLifeFormData = z.infer<typeof jointLifeSchema>;

function SingleVsJoint() {
  const [result, setResult] = useState<{ singleLifeTotal: number; jointSurvivorTotal: number } | null>(null);
  const form = useForm<JointLifeFormData>({
    resolver: zodResolver(jointLifeSchema),
    defaultValues: { retirementAge: 65, yourLifeExpectancy: 77, spouseAge: 62, spouseLifeExpectancy: 82, singleLifePension: 5000, jointSurvivorPension: 3000, investmentReturn: 5, cola: 3.5 },
  });

  const presentValue = (payment: number, rate: number, years: number, cola: number) => {
    let pv = 0;
    let currentPayment = payment * 12;
    for (let i = 1; i <= years; i++) {
        pv += currentPayment / Math.pow(1 + rate, i);
        currentPayment *= (1 + cola);
    }
    return pv;
  }
  
  function onSubmit(values: JointLifeFormData) {
    const { retirementAge, yourLifeExpectancy, spouseAge, spouseLifeExpectancy, singleLifePension, jointSurvivorPension, investmentReturn, cola } = values;
    const r = investmentReturn / 100;
    const c = cola / 100;

    const yourYears = yourLifeExpectancy - retirementAge;
    const spouseYearsAfterYou = Math.max(0, spouseLifeExpectancy - yourLifeExpectancy);

    const singleLifeTotal = presentValue(singleLifePension, r, yourYears, c);
    
    let jointSurvivorTotal = 0;
    // This is a simplified model, a true actuarial calculation is very complex.
    // We assume you live to your expectancy, then spouse lives to theirs.
    jointSurvivorTotal += presentValue(jointSurvivorPension, r, yourYears, c);
    
    // Calculate PV of survivor benefits
    let survivorPayment = jointSurvivorPension; // Simplified: assumes 100% survivor benefit for calculation
    let pvOfSurvivor = 0;
    for (let i=1; i <= spouseYearsAfterYou; i++) {
        survivorPayment *= (1+c);
        pvOfSurvivor += (survivorPayment * 12) / Math.pow(1+r, yourYears + i);
    }
    jointSurvivorTotal += pvOfSurvivor;

    setResult({ singleLifeTotal, jointSurvivorTotal });
  }

  return (
    <Card>
      <CardHeader><CardTitle>Single-Life vs. Joint-and-Survivor</CardTitle><CardDescription>Compare total lifetime payout values of two pension options.</CardDescription></CardHeader>
      <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="retirementAge" render={({ field }) => <FormItem><FormLabel>Your Retirement Age</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                    <FormField control={form.control} name="yourLifeExpectancy" render={({ field }) => <FormItem><FormLabel>Your Life Expectancy</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                    <FormField control={form.control} name="spouseAge" render={({ field }) => <FormItem><FormLabel>Spouse's Current Age</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                    <FormField control={form.control} name="spouseLifeExpectancy" render={({ field }) => <FormItem><FormLabel>Spouse's Life Expectancy</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                    <FormField control={form.control} name="singleLifePension" render={({ field }) => <FormItem><FormLabel>Single-Life Pension (/mo)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                    <FormField control={form.control} name="jointSurvivorPension" render={({ field }) => <FormItem><FormLabel>Joint-Survivor Pension (/mo)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                    <FormField control={form.control} name="investmentReturn" render={({ field }) => <FormItem><FormLabel>Investment Return (%)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl></FormItem>} />
                    <FormField control={form.control} name="cola" render={({ field }) => <FormItem><FormLabel>COLA (%)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl></FormItem>} />
                </div>
                 <Button type="submit" className="w-full">Compare</Button>
            </form>
        </Form>
        {result && (
           <div className="mt-4 p-4 bg-muted rounded-lg text-center">
            <h3 className="text-lg font-bold">Present Value of Lifetime Payouts</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="p-2 border bg-background rounded-lg"><h4 className="font-semibold text-muted-foreground">Single-Life</h4><p className="text-primary font-bold text-xl">{currencySymbol}{result.singleLifeTotal.toLocaleString(undefined, {maximumFractionDigits:0})}</p></div>
              <div className="p-2 border bg-background rounded-lg"><h4 className="font-semibold text-muted-foreground">Joint-Survivor</h4><p className="text-primary font-bold text-xl">{currencySymbol}{result.jointSurvivorTotal.toLocaleString(undefined, {maximumFractionDigits:0})}</p></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// --- Work Longer Calculator ---
const workLongerSchema = z.object({
  retireAge1: z.coerce.number().min(50),
  pension1: z.coerce.number().min(1),
  retireAge2: z.coerce.number().min(50),
  pension2: z.coerce.number().min(1),
  investmentReturn: z.coerce.number().min(0),
  cola: z.coerce.number().min(0),
  lifeExpectancy: z.coerce.number().min(60),
}).refine(data => data.retireAge2 > data.retireAge1, { message: "Option 2 age must be > Option 1.", path: ["retireAge2"] });
type WorkLongerFormData = z.infer<typeof workLongerSchema>;

function WorkLonger() {
  const [result, setResult] = useState<{ option1Total: number; option2Total: number; breakEven: number } | null>(null);
  const form = useForm<WorkLongerFormData>({
    resolver: zodResolver(workLongerSchema),
    defaultValues: { retireAge1: 60, pension1: 2500, retireAge2: 65, pension2: 3800, investmentReturn: 5, cola: 3.5, lifeExpectancy: 85 },
  });
  
  function onSubmit(values: WorkLongerFormData) {
    const { retireAge1, pension1, retireAge2, pension2, investmentReturn, cola, lifeExpectancy } = values;
    const r = investmentReturn / 100;
    const c = cola / 100;
    
    // Simplified PV calculation
    const presentValue = (payment: number, startAge: number, endAge: number) => {
        let pv = 0;
        let currentPayment = payment * 12;
        for (let i = startAge; i < endAge; i++) {
            pv += currentPayment / Math.pow(1 + r, i - form.getValues().retireAge1);
            currentPayment *= (1+c);
        }
        return pv;
    }

    const option1Total = presentValue(pension1, retireAge1, lifeExpectancy);
    const option2Total = presentValue(pension2, retireAge2, lifeExpectancy);
    
    // Find break-even age
    let breakEven = -1;
    let total1 = 0; let total2 = 0;
    for(let age = retireAge1; age <= lifeExpectancy; age++) {
        if (age >= retireAge1) total1 += pension1 * 12 * Math.pow(1+c, age - retireAge1);
        if (age >= retireAge2) total2 += pension2 * 12 * Math.pow(1+c, age - retireAge2);
        if (total2 > total1 && breakEven === -1) {
            breakEven = age;
        }
    }

    setResult({ option1Total, option2Total, breakEven });
  }

  return (
     <Card>
      <CardHeader><CardTitle>Work Longer for Better Pension</CardTitle><CardDescription>Compare retiring earlier vs. later for a larger pension.</CardDescription></CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-2 border rounded-md space-y-2"><h4 className="font-semibold text-center">Option 1</h4>
                <FormField control={form.control} name="retireAge1" render={({ field }) => <FormItem><FormLabel>Retirement Age</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                <FormField control={form.control} name="pension1" render={({ field }) => <FormItem><FormLabel>Monthly Pension</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
              </div>
              <div className="p-2 border rounded-md space-y-2"><h4 className="font-semibold text-center">Option 2</h4>
                <FormField control={form.control} name="retireAge2" render={({ field }) => <FormItem><FormLabel>Retirement Age</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                <FormField control={form.control} name="pension2" render={({ field }) => <FormItem><FormLabel>Monthly Pension</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
              </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
                <FormField control={form.control} name="investmentReturn" render={({ field }) => <FormItem><FormLabel>Investment Return (%)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl></FormItem>} />
                <FormField control={form.control} name="cola" render={({ field }) => <FormItem><FormLabel>COLA (%)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl></FormItem>} />
                <FormField control={form.control} name="lifeExpectancy" render={({ field }) => <FormItem><FormLabel>Life Expectancy</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
            </div>
            <Button type="submit" className="w-full">Compare</Button>
          </form>
        </Form>
        {result && (
           <div className="mt-4 p-4 bg-muted rounded-lg text-center">
            <h3 className="text-lg font-bold">Comparison Results</h3>
            <p className="text-sm text-muted-foreground">Waiting to retire becomes more profitable if you live past age <strong className="text-primary">{result.breakEven}</strong>.</p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="p-2 border bg-background rounded-lg"><h4 className="font-semibold text-muted-foreground">PV of Option 1 Payouts</h4><p className="text-primary font-bold text-xl">{currencySymbol}{result.option1Total.toLocaleString(undefined, {maximumFractionDigits:0})}</p></div>
              <div className="p-2 border bg-background rounded-lg"><h4 className="font-semibold text-muted-foreground">PV of Option 2 Payouts</h4><p className="text-primary font-bold text-xl">{currencySymbol}{result.option2Total.toLocaleString(undefined, {maximumFractionDigits:0})}</p></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


export default function PensionCalculator() {
  return (
    <div className="space-y-8">
      <LumpSumVsMonthly />
      <SingleVsJoint />
      <WorkLonger />
    </div>
  );
}
