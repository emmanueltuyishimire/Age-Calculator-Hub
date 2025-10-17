
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
import { create, all, format as mathFormat } from 'mathjs';

const math = create(all, { number: 'BigNumber', precision: 64 });

const formatToEng = (num: any) => {
  if (num.isZero()) return { mantissa: '0', exponent: 0 };
  const exponent = math.floor(math.log10(math.abs(num)));
  const engExponentVal = math.floor(math.divide(exponent, 3));
  const engExponent = engExponentVal.toNumber() * 3;
  const mantissa = math.divide(num, math.pow(10, engExponent));
  return {
    mantissa: math.format(mantissa, { notation: 'fixed', precision: 3 }),
    exponent: engExponent
  };
};

const toScientific = (num: any) => {
    if (num.isZero()) return { mantissa: '0', exponent: 0 };
    const exponent = math.floor(math.log10(math.abs(num))).toNumber();
    const mantissa = math.divide(num, math.pow(10, exponent));
    return {
        mantissa: math.format(mantissa, { notation: 'fixed', precision: 4 }),
        exponent: exponent
    };
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
            const sanitizedInput = values.number.toLowerCase().replace('x10^', 'e');
            const num = math.bignumber(sanitizedInput);
            const scientific = toScientific(num);

            setResult({
                scientific: scientific,
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
                <CardDescription>Enter a number to see it in various scientific formats.</CardDescription>
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
                        <div className="text-sm"><strong className="text-muted-foreground">Scientific Notation:</strong> <span className="font-mono text-primary">{result.scientific.mantissa} × 10<sup>{result.scientific.exponent}</sup></span></div>
                        <div className="text-sm"><strong className="text-muted-foreground">E-notation:</strong> <span className="font-mono text-primary">{result.eNotation}</span></div>
                        <div className="text-sm"><strong className="text-muted-foreground">Engineering Notation:</strong> <span className="font-mono text-primary">{result.engineering.mantissa} × 10<sup>{result.engineering.exponent}</sup></span></div>
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
  precision: z.coerce.number().int().min(1).max(100),
});
type ArithmeticFormData = z.infer<typeof arithmeticSchema>;

interface ArithmeticResult {
    value: { mantissa: string; exponent: number };
    operation: string;
}

function ArithmeticCalculator() {
    const [result, setResult] = useState<ArithmeticResult | null>(null);

    const form = useForm<ArithmeticFormData>({
        resolver: zodResolver(arithmeticSchema),
        defaultValues: { baseX: 1.23, expX: 7, baseY: 3.45, expY: 2, precision: 20 },
    });

    const calculateOperation = (op: 'add' | 'subtract' | 'multiply' | 'divide' | 'power' | 'sqrt' | 'sq') => {
        const values = form.getValues();
        const { baseX, expX, baseY, expY, precision } = values;

        try {
            math.config({ precision });
            const x = math.bignumber(baseX).mul(math.pow(10, expX));
            const y = math.bignumber(baseY).mul(math.pow(10, expY));
            
            let res: any;
            let operation = '';

            switch(op) {
                case 'add': res = math.add(x, y); operation = 'X + Y ='; break;
                case 'subtract': res = math.subtract(x, y); operation = 'X - Y ='; break;
                case 'multiply': res = math.multiply(x, y); operation = 'X × Y ='; break;
                case 'divide': res = math.divide(x, y); operation = 'X / Y ='; break;
                case 'power': res = math.pow(x, y); operation = 'X^Y ='; break;
                case 'sqrt': res = math.sqrt(x); operation = '√X ='; break;
                case 'sq': res = math.pow(x, 2); operation = 'X² ='; break;
            }
            
            const normalized = toScientific(res);
            setResult({ value: normalized, operation });

        } catch (e) {
            console.error(e);
            setResult(null); // Or set an error state
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Scientific Notation Calculator</CardTitle>
                <CardDescription>Perform calculations using scientific notation.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-4">
                        <div className="flex items-center gap-2">
                            <FormField control={form.control} name="baseX" render={({ field }) => <FormItem className="flex-1"><FormLabel>X =</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                            <span className="self-end pb-2">× 10<sup></sup></span>
                            <FormField control={form.control} name="expX" render={({ field }) => <FormItem className="w-16"><FormLabel className="invisible">exp</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                        </div>
                        <div className="flex items-center gap-2">
                            <FormField control={form.control} name="baseY" render={({ field }) => <FormItem className="flex-1"><FormLabel>Y =</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                            <span className="self-end pb-2">× 10<sup></sup></span>
                            <FormField control={form.control} name="expY" render={({ field }) => <FormItem className="w-16"><FormLabel className="invisible">exp</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                        </div>
                        <FormField control={form.control} name="precision" render={({ field }) => <FormItem><FormLabel>Precision (digits)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>} />
                        
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-2">
                            <Button type="button" onClick={() => calculateOperation('add')}>X + Y</Button>
                            <Button type="button" onClick={() => calculateOperation('subtract')}>X – Y</Button>
                            <Button type="button" onClick={() => calculateOperation('multiply')}>X × Y</Button>
                            <Button type="button" onClick={() => calculateOperation('divide')}>X / Y</Button>
                            <Button type="button" onClick={() => calculateOperation('power')}>X<sup>Y</sup></Button>
                            <Button type="button" onClick={() => calculateOperation('sqrt')}>√X</Button>
                            <Button type="button" onClick={() => calculateOperation('sq')}>X²</Button>
                        </div>
                    </form>
                </Form>
                 {result && (
                    <div className="mt-6 p-4 bg-muted rounded-lg space-y-2">
                        <h3 className="text-lg font-bold">Result:</h3>
                        <p className="text-xl font-mono text-primary break-all">
                            <span className="text-muted-foreground">{result.operation}</span> {result.value.mantissa} × 10<sup>{result.value.exponent}</sup>
                        </p>
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
      <ArithmeticCalculator />
    </div>
  );
}
