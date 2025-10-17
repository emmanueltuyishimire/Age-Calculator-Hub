
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
import { RefreshCcw, Settings, Sigma } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

type RoundingMode = 'halfUp' | 'halfDown' | 'up' | 'down' | 'halfToEven' | 'halfToOdd' | 'halfAwayFromZero' | 'halfTowardsZero';

const formSchema = z.object({
  number: z.coerce.number(),
  precision: z.string(),
  mode: z.string().default('halfUp'),
});

type FormData = z.infer<typeof formSchema>;

const precisionOptions = [
    { value: '0', label: 'Ones (0)' },
    { value: '1', label: 'Tenths (0.1)' },
    { value: '2', label: 'Hundredths (0.01)' },
    { value: '3', label: 'Thousandths (0.001)' },
    { value: '-1', label: 'Tens (10)' },
    { value: '-2', label: 'Hundreds (100)' },
    { value: '1/2', label: 'Nearest 1/2' },
    { value: '1/4', label: 'Nearest 1/4' },
    { value: '1/8', label: 'Nearest 1/8' },
    { value: '1/16', label: 'Nearest 1/16' },
    { value: '1/32', label: 'Nearest 1/32' },
];

const roundingModes = [
    { value: 'halfUp', label: 'Round half up' },
    { value: 'halfDown', label: 'Round half down' },
    { value: 'up', label: 'Round up (ceiling)' },
    { value: 'down', label: 'Round down (floor)' },
    { value: 'halfToEven', label: 'Round half to even' },
    { value: 'halfToOdd', label: 'Round half to odd' },
    { value: 'halfAwayFromZero', label: 'Round half away from zero' },
    { value: 'halfTowardsZero', label: 'Round half towards zero' },
];

const rounders: Record<RoundingMode, (n: number) => number> = {
    halfUp: (n) => Math.round(n),
    halfDown: (n) => n > 0 ? (n % 1 <= 0.5 ? Math.floor(n) : Math.ceil(n)) : (n % 1 >= -0.5 ? Math.ceil(n) : Math.floor(n)),
    up: (n) => Math.ceil(n),
    down: (n) => Math.floor(n),
    halfToEven: (n) => {
        const floor = Math.floor(n);
        if (n - floor !== 0.5) return Math.round(n);
        return floor % 2 === 0 ? floor : Math.ceil(n);
    },
    halfToOdd: (n) => {
        const floor = Math.floor(n);
        if (n - floor !== 0.5) return Math.round(n);
        return floor % 2 !== 0 ? floor : Math.ceil(n);
    },
    halfAwayFromZero: (n) => n > 0 ? Math.round(n) : Math.floor(n),
    halfTowardsZero: (n) => n > 0 ? (n % 1 < 0.5 ? Math.floor(n) : Math.ceil(n-0.5)) : (n % 1 > -0.5 ? Math.ceil(n) : Math.floor(n+0.5))
};

export default function RoundingCalculator() {
  const [result, setResult] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { number: 15.65, precision: '1/8', mode: 'halfUp' },
  });

  function onSubmit(values: FormData) {
    const { number, precision, mode } = values;
    const rounder = rounders[mode as RoundingMode];
    let roundedValue: number;

    if (precision.includes('/')) {
      const denominator = parseInt(precision.split('/')[1]);
      roundedValue = rounder(number * denominator) / denominator;
    } else {
      const decimalPlaces = parseInt(precision);
      const factor = Math.pow(10, decimalPlaces);
      roundedValue = rounder(number * factor) / factor;
    }
    
    setResult(roundedValue.toString());
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
        <CardHeader><CardTitle className="text-center">Rounding Calculator</CardTitle></CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="number" render={({ field }) => (<FormItem><FormLabel>Number</FormLabel><FormControl><Input type="number" step="any" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="precision" render={({ field }) => (<FormItem><FormLabel>Precision</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl><SelectContent>{precisionOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>)} />
            </div>
            <Collapsible>
                <CollapsibleTrigger asChild>
                    <Button variant="link" className="p-0 h-auto"><Settings className="mr-2 h-4 w-4"/>Settings</Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 border rounded-lg mt-2">
                    <FormField control={form.control} name="mode" render={({ field }) => (<FormItem><FormLabel>Rounding Method</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl><SelectContent>{roundingModes.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>)} />
                </CollapsibleContent>
            </Collapsible>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><Sigma className="mr-2 h-4 w-4"/>Round</Button>
              <Button onClick={() => { form.reset(); setResult(null); }} type="button" variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
            </div>
          </form>
        </Form>
        
        {result !== null && (
          <div className="p-4 bg-muted rounded-lg text-center mt-6 space-y-2 animate-fade-in">
            <h3 className="text-lg font-bold text-foreground">Rounded Result</h3>
            <p className="text-3xl font-bold text-primary">
                {result}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
