
"use client";

import React, { useState, useCallback } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { create, all } from 'mathjs';

const math = create(all, { number: 'BigNumber', precision: 64 });

const formatToEng = (num: any) => {
  if (num.isZero()) return '0';
  const exponent = math.floor(math.log10(math.abs(num)));
  const engExponent = math.floor(math.divide(exponent, 3));
  const mantissa = math.divide(num, math.pow(10, math.multiply(engExponent, 3)));
  return `${math.format(mantissa, { notation: 'fixed', precision: 3 })} × 10^${engExponent * 3}`;
};


// --- Converter Component ---
const converterSchema = z.object({
  number: z.string().min(1, 'Number is required'),
});
type ConverterFormData = z.infer<typeof converterSchema>;

function NotationConverter() {
    const [result, setResult] = useState<any | null>(null);
    const form = useForm<ConverterFormData>({
        resolver: zodResolver(converterSchema),
        defaultValues: { number: '1568938' },
    });

    const onSubmit = useCallback((values: ConverterFormData) => {
        try {
            const num = math.bignumber(values.number);
            const exponent = math.floor(math.log10(math.abs(num))).toNumber();
            const mantissa = math.divide(num, math.pow(10, exponent));

            setResult({
                scientific: `${math.format(mantissa, { notation: 'fixed', precision: 4 })} × 10^${exponent}`,
                eNotation: math.format(num, { notation: 'exponential' }),
                engineering: formatToEng(num),
                real: math.format(num, { notation: 'fixed' }),
            });
        } catch (e) {
            setResult(null);
            form.setError('number', { message: 'Invalid number format.' });
        }
    }, [form]);
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Scientific Notation Converter</CardTitle>
                <CardDescription>Convert a number to scientific, E, and engineering notation.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="number" render={({ field }) => (
                            <FormItem><FormLabel>Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <Button type="submit" className="w-full">Convert</Button>
                    </form>
                </Form>
                {result && (
                    <div className="mt-4 p-4 bg-muted rounded-lg space-y-2">
                        <div className="text-sm"><strong className="text-muted-foreground">Scientific Notation:</strong> <span className="font-mono text-primary">{result.scientific}</span></div>
                        <div className="text-sm"><strong className="text-muted-foreground">E-notation:</strong> <span className="font-mono text-primary">{result.eNotation}</span></div>
                        <div className="text-sm"><strong className="text-muted-foreground">Engineering Notation:</strong> <span className="font-mono text-primary">{result.engineering}</span></div>
                        <div className="text-sm"><strong className="text-muted-foreground">Real Number:</strong> <span className="font-mono text-primary break-all">{result.real}</span></div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

// --- Arithmetic Calculator ---
const arithmeticSchema = z.object({
  baseX: z.coerce.number(),
  expX: z.coerce.number().int(),
  baseY: z.coerce.number(),
  expY: z.coerce.number().int(),
});
type ArithmeticFormData = z.infer<typeof arithmeticSchema>;

function ArithmeticCalculator() {
    const [result, setResult] = useState<any | null>(null);
    const [activeTab, setActiveTab] = useState<'add'|'subtract'|'multiply'|'divide'>('add');

    const form = useForm<ArithmeticFormData>({
        resolver: zodResolver(arithmeticSchema),
        defaultValues: { baseX: 1.23, expX: 7, baseY: 3.45, expY: 5 },
    });

    const onSubmit = (values: ArithmeticFormData) => {
        const { baseX, expX, baseY, expY } = values;
        const x = math.bignumber(baseX).mul(math.pow(10, expX));
        const y = math.bignumber(baseY).mul(math.pow(10, expY));
        
        let res, steps;
        
        switch(activeTab) {
            case 'add':
            case 'subtract': {
                const expDiff = expX - expY;
                let adjustedBaseY = baseY;
                let commonExp = expX;
                if (expDiff !== 0) {
                    adjustedBaseY = baseY * Math.pow(10, -expDiff);
                }
                const opResult = activeTab === 'add' ? baseX + adjustedBaseY : baseX - adjustedBaseY;
                steps = [
                    `1. Equalize exponents: ${baseY} × 10^${expY} = ${adjustedBaseY.toFixed(4)} × 10^${expX}`,
                    `2. ${activeTab === 'add' ? 'Add' : 'Subtract'} bases: ${baseX} ${activeTab === 'add' ? '+' : '-'} ${adjustedBaseY.toFixed(4)} = ${opResult.toFixed(4)}`,
                    `3. Combine: ${opResult.toFixed(4)} × 10^${commonExp}`,
                ];
                res = math.bignumber(opResult).mul(math.pow(10, commonExp));
                break;
            }
            case 'multiply': {
                const resBase = baseX * baseY;
                const resExp = expX + expY;
                steps = [
                    `1. Multiply bases: ${baseX} × ${baseY} = ${resBase}`,
                    `2. Add exponents: ${expX} + ${expY} = ${resExp}`,
                    `3. Combine: ${resBase} × 10^${resExp}`
                ];
                res = math.multiply(x, y);
                break;
            }
            case 'divide': {
                const resBase = baseX / baseY;
                const resExp = expX - expY;
                 steps = [
                    `1. Divide bases: ${baseX} / ${baseY} = ${resBase.toFixed(4)}`,
                    `2. Subtract exponents: ${expX} - ${expY} = ${resExp}`,
                    `3. Combine: ${resBase.toFixed(4)} × 10^${resExp}`
                ];
                res = math.divide(x, y);
                break;
            }
        }
        
        // Normalize result
        const finalExponent = math.floor(math.log10(math.abs(res))).toNumber();
        const finalMantissa = math.divide(res, math.pow(10, finalExponent));
        steps.push(`4. Normalize: ${math.format(finalMantissa, {notation: 'fixed', precision: 4})} × 10^${finalExponent}`);

        setResult({
            value: `${math.format(finalMantissa, { notation: 'fixed', precision: 4 })} × 10^${finalExponent}`,
            steps
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Scientific Notation Arithmetic</CardTitle>
                <CardDescription>Perform calculations with numbers in scientific notation and see the steps.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex items-center gap-2">
                            <FormField control={form.control} name="baseX" render={({ field }) => <FormItem className="flex-1"><FormLabel>X =</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                            <span className="self-end pb-2">× 10^</span>
                            <FormField control={form.control} name="expX" render={({ field }) => <FormItem className="w-16"><FormLabel className="invisible">exp</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                        </div>
                        <div className="flex justify-center my-2">
                             <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)} className="w-auto">
                                <TabsList>
                                    <TabsTrigger value="add">+</TabsTrigger>
                                    <TabsTrigger value="subtract">-</TabsTrigger>
                                    <TabsTrigger value="multiply">×</TabsTrigger>
                                    <TabsTrigger value="divide">÷</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                        <div className="flex items-center gap-2">
                            <FormField control={form.control} name="baseY" render={({ field }) => <FormItem className="flex-1"><FormLabel>Y =</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                            <span className="self-end pb-2">× 10^</span>
                            <FormField control={form.control} name="expY" render={({ field }) => <FormItem className="w-16"><FormLabel className="invisible">exp</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                        </div>
                        <Button type="submit" className="w-full">Calculate</Button>
                    </form>
                </Form>
                 {result && (
                    <div className="mt-4 p-4 bg-muted rounded-lg space-y-4">
                        <div>
                            <h3 className="text-lg font-bold">Result:</h3>
                            <p className="text-xl text-primary font-mono break-all">{result.value}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">Steps:</h3>
                            <ol className="list-decimal list-inside text-sm font-mono space-y-1">
                                {result.steps.map((step: string, i: number) => <li key={i}>{step}</li>)}
                            </ol>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default function ScientificNotationCalculator() {
  return (
    <div className="space-y-8">
      <ArithmeticCalculator />
      <NotationConverter />
    </div>
  );
}
