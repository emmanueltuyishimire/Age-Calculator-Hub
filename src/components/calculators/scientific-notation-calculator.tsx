
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
            setResult({
                scientific: math.format(num, { notation: 'fixed', precision: 4 }) + ' × 10^' + math.floor(math.log10(math.abs(num))),
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

// --- Calculator Component ---
const calculatorSchema = z.object({
  baseX: z.string().min(1),
  expX: z.coerce.number().int(),
  baseY: z.string().min(1),
  expY: z.coerce.number().int(),
  precision: z.coerce.number().int().min(1).max(100),
});
type CalculatorFormData = z.infer<typeof calculatorSchema>;

function NotationCalculator() {
    const [result, setResult] = useState<string | null>(null);
    const form = useForm<CalculatorFormData>({
        resolver: zodResolver(calculatorSchema),
        defaultValues: { baseX: '1.23', expX: 7, baseY: '3.45', expY: 2, precision: 20 },
    });

    const calculate = useCallback((operation: string) => {
        const values = form.getValues();
        math.config({ precision: values.precision });
        
        try {
            const x = math.bignumber(values.baseX).mul(math.pow(10, values.expX));
            const y = math.bignumber(values.baseY).mul(math.pow(10, values.expY));
            let res;
            switch(operation) {
                case '+': res = math.add(x, y); break;
                case '-': res = math.subtract(x, y); break;
                case '×': res = math.multiply(x, y); break;
                case '/': res = math.divide(x, y); break;
                case '^': res = math.pow(x, y); break;
                case '√': res = math.sqrt(x); break;
                case 'x²': res = math.pow(x, 2); break;
                default: return;
            }
            setResult(math.format(res, { notation: 'exponential' }));
        } catch {
            setResult('Error');
        }
    }, [form]);

    const buttons = ['+', '–', '×', '/', '^', '√', 'x²'];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Scientific Notation Calculator</CardTitle>
                <CardDescription>Perform arithmetic with numbers in scientific notation.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Form {...form}>
                    <form className="space-y-4">
                        <div className="flex items-center gap-2">
                             <FormField control={form.control} name="baseX" render={({ field }) => (<FormItem className="flex-1"><FormLabel>X =</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                             <span className="self-end pb-2">×10^</span>
                             <FormField control={form.control} name="expX" render={({ field }) => (<FormItem className="w-16"><FormLabel className="invisible">exp</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                        </div>
                         <div className="flex items-center gap-2">
                             <FormField control={form.control} name="baseY" render={({ field }) => (<FormItem className="flex-1"><FormLabel>Y =</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                             <span className="self-end pb-2">×10^</span>
                             <FormField control={form.control} name="expY" render={({ field }) => (<FormItem className="w-16"><FormLabel className="invisible">exp</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                        </div>
                        <FormField control={form.control} name="precision" render={({ field }) => (<FormItem><FormLabel>Precision</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                        <div className="grid grid-cols-4 gap-2 pt-2">
                            {buttons.map(op => <Button key={op} type="button" onClick={() => calculate(op)}>{op === '-' ? 'X-Y' : `X${op}Y`}</Button>)}
                        </div>
                    </form>
                </Form>
                 {result && (
                    <div className="mt-4 p-4 bg-muted rounded-lg text-center">
                        <h3 className="text-lg font-bold">Result:</h3>
                        <p className="text-xl text-primary font-mono break-all">{result}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}


export default function ScientificNotationCalculator() {
  return (
    <div className="space-y-8">
      <NotationConverter />
      <NotationCalculator />
    </div>
  );
}
