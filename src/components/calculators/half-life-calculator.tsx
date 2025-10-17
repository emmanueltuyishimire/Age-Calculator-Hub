
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
import { RefreshCcw, Atom, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

// --- Main Half-Life Calculator ---
const mainSchema = z.object({
  nt: z.coerce.number().optional(),
  n0: z.coerce.number().optional(),
  t: z.coerce.number().optional(),
  tHalf: z.coerce.number().optional(),
}).refine(data => {
    return [data.nt, data.n0, data.t, data.tHalf].filter(v => v !== undefined && v > 0).length === 3;
}, { message: "Please provide exactly three positive values."});

type MainFormData = z.infer<typeof mainSchema>;

function MainHalfLifeCalculator() {
    const [solveFor, setSolveFor] = useState<'nt' | 'n0' | 't' | 'tHalf'>('nt');
    const [result, setResult] = useState<number | null>(null);
    const form = useForm<MainFormData>({
        resolver: zodResolver(mainSchema),
        defaultValues: { n0: 100, t: 50, tHalf: 10 },
    });

    const onSubmit = (values: MainFormData) => {
        let { nt, n0, t, tHalf } = values;
        nt = nt || 0; n0 = n0 || 0; t = t || 0; tHalf = tHalf || 0;
        
        let calculatedValue: number;
        switch(solveFor) {
            case 'nt':
                calculatedValue = n0 * Math.pow(0.5, t / tHalf);
                break;
            case 'n0':
                calculatedValue = nt / Math.pow(0.5, t / tHalf);
                break;
            case 't':
                calculatedValue = tHalf * Math.log(nt / n0) / Math.log(0.5);
                break;
            case 'tHalf':
                calculatedValue = t * Math.log(0.5) / Math.log(nt / n0);
                break;
            default:
                return;
        }
        setResult(calculatedValue);
    };

    return (
        <Card>
            <CardHeader><CardTitle>Half-Life Calculator</CardTitle></CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <Tabs value={solveFor} onValueChange={(val) => setSolveFor(val as any)} className="w-full">
                           <TabsList className="grid w-full grid-cols-4 h-auto">
                                <TabsTrigger value="nt">Nt</TabsTrigger>
                                <TabsTrigger value="n0">N0</TabsTrigger>
                                <TabsTrigger value="t">t</TabsTrigger>
                                <TabsTrigger value="tHalf">t1/2</TabsTrigger>
                           </TabsList>
                        </Tabs>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField control={form.control} name="n0" render={({ field }) => <FormItem><FormLabel>Initial Quantity (N₀)</FormLabel><FormControl><Input type="number" {...field} disabled={solveFor === 'n0'} /></FormControl></FormItem>} />
                            <FormField control={form.control} name="nt" render={({ field }) => <FormItem><FormLabel>Remaining Quantity (Nₜ)</FormLabel><FormControl><Input type="number" {...field} disabled={solveFor === 'nt'} /></FormControl></FormItem>} />
                            <FormField control={form.control} name="tHalf" render={({ field }) => <FormItem><FormLabel>Half-Life (t₁/₂)</FormLabel><FormControl><Input type="number" {...field} disabled={solveFor === 'tHalf'} /></FormControl></FormItem>} />
                            <FormField control={form.control} name="t" render={({ field }) => <FormItem><FormLabel>Time Elapsed (t)</FormLabel><FormControl><Input type="number" {...field} disabled={solveFor === 't'} /></FormControl></FormItem>} />
                        </div>
                        {form.formState.errors.root && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{form.formState.errors.root.message}</AlertDescription></Alert>}
                        <Button type="submit" className="w-full">Calculate</Button>
                    </form>
                </Form>
                {result !== null && (
                    <div className="mt-4 p-4 bg-muted rounded-lg text-center">
                        <h3 className="text-lg font-bold">Result</h3>
                        <p className="text-2xl text-primary font-bold">{result.toLocaleString(undefined, { maximumFractionDigits: 6 })}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

// --- Conversion Calculator ---
const conversionSchema = z.object({
  tHalf: z.coerce.number().optional(),
  tau: z.coerce.number().optional(),
  lambda: z.coerce.number().optional(),
}).refine(data => {
    return [data.tHalf, data.tau, data.lambda].filter(v => v !== undefined).length === 1;
}, { message: "Please provide exactly one value." });

type ConversionFormData = z.infer<typeof conversionSchema>;

function ConversionCalculator() {
    const form = useForm<ConversionFormData>({
        resolver: zodResolver(conversionSchema),
        defaultValues: { tHalf: 10, tau: undefined, lambda: undefined },
    });
    
    const onSubmit = (values: ConversionFormData) => {
        const { tHalf, tau, lambda } = values;
        const ln2 = Math.LN2;
        if(tHalf !== undefined) {
            form.setValue('tau', tHalf / ln2);
            form.setValue('lambda', ln2 / tHalf);
        } else if (tau !== undefined) {
            form.setValue('tHalf', tau * ln2);
            form.setValue('lambda', 1 / tau);
        } else if (lambda !== undefined) {
            form.setValue('tHalf', ln2 / lambda);
            form.setValue('tau', 1 / lambda);
        }
    };
    
    return (
        <Card>
            <CardHeader><CardTitle>Half-Life, Mean Lifetime & Decay Constant Conversion</CardTitle></CardHeader>
            <CardContent>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField control={form.control} name="tHalf" render={({ field }) => <FormItem><FormLabel>Half-Life (t₁/₂)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                            <FormField control={form.control} name="tau" render={({ field }) => <FormItem><FormLabel>Mean Lifetime (τ)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                            <FormField control={form.control} name="lambda" render={({ field }) => <FormItem><FormLabel>Decay Constant (λ)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                        </div>
                        {form.formState.errors.root && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{form.formState.errors.root.message}</AlertDescription></Alert>}
                        <Button type="submit" className="w-full">Calculate</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

export default function HalfLifeCalculator() {
    return (
        <div className="space-y-8">
            <MainHalfLifeCalculator />
            <ConversionCalculator />
        </div>
    );
}
