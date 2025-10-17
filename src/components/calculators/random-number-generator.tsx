
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { create, all } from 'mathjs';

const math = create(all, {
  number: 'BigNumber',
  precision: 1000,
});

// --- Simple Integer Generator ---
const simpleSchema = z.object({
  lowerLimit: z.coerce.number().int(),
  upperLimit: z.coerce.number().int(),
}).refine(data => data.upperLimit > data.lowerLimit, {
  message: "Upper limit must be greater than lower limit.",
  path: ["upperLimit"],
});
type SimpleFormData = z.infer<typeof simpleSchema>;

function SimpleGenerator() {
    const [result, setResult] = useState<string | null>(null);
    const form = useForm<SimpleFormData>({
        resolver: zodResolver(simpleSchema),
        defaultValues: { lowerLimit: 1, upperLimit: 100 },
    });

    function onSubmit(values: SimpleFormData) {
        const { lowerLimit, upperLimit } = values;
        const randomInt = math.randomInt(lowerLimit, upperLimit + 1);
        setResult(randomInt.toString());
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Simple Random Integer</CardTitle>
                <CardDescription>Generates a single random integer in your chosen range.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex items-center gap-4">
                            <FormField control={form.control} name="lowerLimit" render={({ field }) => (<FormItem className="flex-1"><FormLabel>Lower Limit</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="upperLimit" render={({ field }) => (<FormItem className="flex-1"><FormLabel>Upper Limit</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                        <Button type="submit" className="w-full">Generate</Button>
                    </form>
                </Form>
                 {result && (
                    <div className="mt-4 p-4 bg-muted rounded-lg text-center">
                        <h3 className="text-lg font-bold">Result:</h3>
                        <p className="text-2xl text-primary font-mono break-all">{result}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

// --- Comprehensive Generator ---
const comprehensiveSchema = z.object({
    lowerLimit: z.string().min(1, "Required."),
    upperLimit: z.string().min(1, "Required."),
    count: z.coerce.number().int().min(1).max(100),
    type: z.enum(['integer', 'decimal']),
    precision: z.coerce.number().int().min(1).max(999),
}).refine(data => {
    try {
        return math.larger(math.bignumber(data.upperLimit), math.bignumber(data.lowerLimit));
    } catch {
        return false;
    }
}, {
  message: "Upper limit must be greater than lower limit.",
  path: ["upperLimit"],
});
type ComprehensiveFormData = z.infer<typeof comprehensiveSchema>;

function ComprehensiveGenerator() {
    const [results, setResults] = useState<string[]>([]);
    const form = useForm<ComprehensiveFormData>({
        resolver: zodResolver(comprehensiveSchema),
        defaultValues: { lowerLimit: '0.2', upperLimit: '112.5', count: 1, type: 'decimal', precision: 50 },
    });
    
    function onSubmit(values: ComprehensiveFormData) {
        const { lowerLimit, upperLimit, count, type, precision } = values;
        const low = math.bignumber(lowerLimit);
        const high = math.bignumber(upperLimit);
        
        math.config({ precision });

        const generated: string[] = [];
        for (let i = 0; i < count; i++) {
            if (type === 'integer') {
                const lowBigInt = BigInt(low.toFixed(0));
                const highBigInt = BigInt(high.toFixed(0));
                generated.push(math.randomInt(lowBigInt, highBigInt + 1n).toString());
            } else {
                 generated.push(math.format(math.add(math.multiply(math.bignumber(math.random()), math.subtract(high, low)), low)));
            }
        }
        setResults(generated);
    }
    
    return (
        <Card>
             <CardHeader>
                <CardTitle>Comprehensive Generator</CardTitle>
                <CardDescription>Generate one or many random integers or decimals with high precision.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <FormField control={form.control} name="lowerLimit" render={({ field }) => (<FormItem><FormLabel>Lower Limit</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                             <FormField control={form.control} name="upperLimit" render={({ field }) => (<FormItem><FormLabel>Upper Limit</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                             <FormField control={form.control} name="count" render={({ field }) => (<FormItem><FormLabel>Generate # numbers</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                             <FormField control={form.control} name="precision" render={({ field }) => (<FormItem><FormLabel>Precision (digits)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                        <FormField control={form.control} name="type" render={({ field }) => (
                            <FormItem className="space-y-3"><FormLabel>Type of result to generate?</FormLabel>
                                <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="integer" /></FormControl><FormLabel className="font-normal">Integer</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="decimal" /></FormControl><FormLabel className="font-normal">Decimal</FormLabel></FormItem>
                                </RadioGroup>
                                </FormControl>
                            <FormMessage /></FormItem>
                        )} />
                        <Button type="submit" className="w-full">Generate</Button>
                    </form>
                </Form>
                {results.length > 0 && (
                    <div className="mt-4 p-4 bg-muted rounded-lg text-center">
                        <h3 className="text-lg font-bold">Results:</h3>
                        <div className="p-2 border rounded-md bg-background max-h-60 overflow-y-auto font-mono text-sm break-all text-left">
                            {results.map((res, i) => <div key={i}>{res}</div>)}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}


export default function RandomNumberGenerator() {
  return (
    <div className="space-y-8">
        <SimpleGenerator />
        <ComprehensiveGenerator />
    </div>
  );
}
