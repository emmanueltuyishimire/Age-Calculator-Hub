
"use client";

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
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
import { RefreshCcw, Flame } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { evaluate, log, pow } from 'mathjs';

const formSchema = z.object({
  base: z.string().optional(),
  exponent: z.string().optional(),
  result: z.string().optional(),
  useE: z.boolean().default(false),
}).refine(data => {
    let definedCount = 0;
    if (data.base || data.useE) definedCount++;
    if (data.exponent) definedCount++;
    if (data.result) definedCount++;
    return definedCount === 2;
}, {
    message: "Please provide exactly two values to solve for the third.",
});

type FormData = z.infer<typeof formSchema>;

export default function ExponentCalculator() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      base: '2',
      exponent: '5',
      result: '',
      useE: false,
    },
  });

  const { watch, setValue } = form;
  const useE = watch('useE');

  function onSubmit(values: FormData) {
    let { base, exponent, result } = values;
    
    try {
      const baseValue = useE ? Math.E : parseFloat(base || '');
      const exponentValue = parseFloat(exponent || '');
      const resultValue = parseFloat(result || '');

      if (!base && !useE) {
        // Solve for base: a = result^(1/n)
        const solvedBase = pow(resultValue, 1 / exponentValue);
        setValue('base', solvedBase.toString());
      } else if (!exponent) {
        // Solve for exponent: n = log_a(result) = log(result) / log(a)
        const solvedExponent = log(resultValue, baseValue);
        setValue('exponent', solvedExponent.toString());
      } else if (!result) {
        // Solve for result: result = a^n
        const solvedResult = pow(baseValue, exponentValue);
        setValue('result', solvedResult.toString());
      }
    } catch (e) {
      console.error("Calculation error", e);
      // You could set an error state here to display in the UI
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="base"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Base</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Base (a)"
                          {...field}
                          disabled={useE}
                          aria-label="Base value"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <span className="text-xl font-semibold">^</span>
              <div className="w-24">
                 <FormField
                  control={form.control}
                  name="exponent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Exponent</FormLabel>
                      <FormControl>
                        <Input placeholder="Exp (n)" {...field} aria-label="Exponent value" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <span className="text-xl font-semibold">=</span>
               <div className="flex-1">
                 <FormField
                  control={form.control}
                  name="result"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Result</FormLabel>
                      <FormControl>
                        <Input placeholder="Result" {...field} aria-label="Result value"/>
                      </FormControl>
                    </FormItem>
                  )}
                />
               </div>
            </div>
            {form.formState.errors.root && (
              <p className="text-sm font-medium text-destructive">{form.formState.errors.root.message}</p>
            )}

            <div className="flex items-center justify-between">
                <FormField
                    control={form.control}
                    name="useE"
                    render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                        <FormControl>
                            <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                                field.onChange(checked);
                                if (checked) setValue('base', '');
                            }}
                            />
                        </FormControl>
                        <FormLabel>Use <span className="italic font-mono">e</span> as base</FormLabel>
                        </FormItem>
                    )}
                />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><Flame className="mr-2 h-4 w-4"/>Calculate</Button>
              <Button onClick={() => form.reset()} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
