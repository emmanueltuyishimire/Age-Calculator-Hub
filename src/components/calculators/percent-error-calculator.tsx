
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
import { RefreshCcw, Percent } from 'lucide-react';
import { Switch } from '../ui/switch';

const formSchema = z.object({
  observedValue: z.coerce.number(),
  trueValue: z.coerce.number().refine(val => val !== 0, { message: "True value cannot be zero." }),
  useAbsolute: z.boolean().default(true),
});

type FormData = z.infer<typeof formSchema>;

interface Result {
  percentError: number;
}

export default function PercentErrorCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      observedValue: 10,
      trueValue: 11,
      useAbsolute: true,
    },
  });

  function onSubmit(values: FormData) {
    const { observedValue, trueValue, useAbsolute } = values;
    
    let error;
    if (useAbsolute) {
        error = Math.abs(observedValue - trueValue) / Math.abs(trueValue);
    } else {
        error = (observedValue - trueValue) / trueValue;
    }

    setResult({ percentError: error * 100 });
  }

  function handleReset() {
    form.reset();
    setResult(null);
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-center">Percent Error Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="observedValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observed Value</FormLabel>
                    <FormControl><Input type="number" step="any" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trueValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>True Value</FormLabel>
                    <FormControl><Input type="number" step="any" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="useAbsolute"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <FormLabel>Use Absolute Error</FormLabel>
                  <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><Percent className="mr-2 h-4 w-4"/>Calculate</Button>
              <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
            </div>
          </form>
        </Form>
        
        {result && (
          <div className="p-4 bg-muted rounded-lg text-center mt-6 space-y-2 animate-fade-in">
            <h3 className="text-lg font-bold text-foreground">Percent Error</h3>
            <p className="text-3xl font-bold text-primary">
                {result.percentError.toLocaleString(undefined, { maximumFractionDigits: 3 })}%
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
