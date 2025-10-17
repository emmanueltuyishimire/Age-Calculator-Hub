
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
} from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RefreshCcw, FunctionSquare, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { log, pow } from 'mathjs';

const formSchema = z.object({
  base: z.string().optional(),
  x: z.string().optional(),
  y: z.string().optional(),
}).refine(data => {
    let definedCount = 0;
    if (data.base) definedCount++;
    if (data.x) definedCount++;
    if (data.y) definedCount++;
    return definedCount === 2;
}, {
    message: "Please provide exactly two values to solve for the third.",
});

type FormData = z.infer<typeof formSchema>;

export default function LogCalculator() {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { base: 'e', x: '100', y: '' },
  });

  const { setValue } = form;

  function onSubmit(values: FormData) {
    setError(null);
    let { base, x, y } = values;

    try {
        const baseVal = base?.toLowerCase() === 'e' ? Math.E : parseFloat(base || '');
        const xVal = parseFloat(x || '');
        const yVal = parseFloat(y || '');

        if (!base) { // Solve for base
            const solvedBase = pow(xVal, 1 / yVal);
            setValue('base', solvedBase.toLocaleString(undefined, { maximumFractionDigits: 8 }));
        } else if (!x) { // Solve for x
            const solvedX = pow(baseVal, yVal);
            setValue('x', solvedX.toLocaleString(undefined, { maximumFractionDigits: 8 }));
        } else if (!y) { // Solve for y
            const solvedY = log(xVal, baseVal);
            setValue('y', solvedY.toLocaleString(undefined, { maximumFractionDigits: 8 }));
        }
    } catch (e: any) {
      setError("Invalid input. Please check your values. Base and argument must be positive, and base cannot be 1.");
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardContent className="p-6">
        {error && (
            <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl font-semibold">log</span>
              <div className="w-16 relative">
                 <FormField control={form.control} name="base" render={({ field }) => (<FormItem><FormControl><Input placeholder="b" {...field} className="text-center" /></FormControl></FormItem>)} />
              </div>
              <div className="w-24 relative">
                 <FormField control={form.control} name="x" render={({ field }) => (<FormItem><FormControl><Input placeholder="x" {...field} className="text-center" /></FormControl></FormItem>)} />
              </div>
              <span className="text-xl font-semibold">=</span>
               <div className="w-24 relative">
                 <FormField control={form.control} name="y" render={({ field }) => (<FormItem><FormControl><Input placeholder="y" {...field} className="text-center" /></FormControl></FormItem>)} />
               </div>
            </div>
            {form.formState.errors.root && (
              <p className="text-sm font-medium text-destructive text-center">{form.formState.errors.root.message}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><FunctionSquare className="mr-2 h-4 w-4"/>Calculate</Button>
              <Button onClick={() => {form.reset(); setError(null);}} type="button" variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
