
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RefreshCcw, FunctionSquare, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { evaluate } from 'mathjs';

const formSchema = z.object({
  a: z.string().refine(val => {
    try { return evaluate(val) !== 0; } catch { return false; }
  }, { message: "Value 'a' cannot be zero." }),
  b: z.string(),
  c: z.string(),
});

type FormData = z.infer<typeof formSchema>;

interface Result {
  x1: string;
  x2: string;
  discriminant: number;
  formulaSteps: { a: number, b: number, c: number };
}

export default function QuadraticCalculator() {
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { a: '1', b: '-4', c: '4' },
  });

  const evaluateSafely = (expr: string): number | null => {
    try {
      const val = evaluate(expr);
      if (typeof val === 'number') return val;
      return null;
    } catch {
      return null;
    }
  };

  function onSubmit(values: FormData) {
    setError(null);
    setResult(null);
    
    const a = evaluateSafely(values.a);
    const b = evaluateSafely(values.b);
    const c = evaluateSafely(values.c);

    if (a === null || b === null || c === null) {
      setError("Invalid input. Please use numbers or fractions (e.g., 3/4).");
      return;
    }

    const discriminant = b * b - 4 * a * c;
    let x1, x2;

    if (discriminant >= 0) {
      x1 = ((-b + Math.sqrt(discriminant)) / (2 * a)).toLocaleString(undefined, { maximumFractionDigits: 5 });
      x2 = ((-b - Math.sqrt(discriminant)) / (2 * a)).toLocaleString(undefined, { maximumFractionDigits: 5 });
    } else { // Complex roots
      const realPart = (-b / (2 * a)).toFixed(5);
      const imagPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(5);
      x1 = `${realPart} + ${imagPart}i`;
      x2 = `${realPart} - ${imagPart}i`;
    }
    
    setResult({ x1, x2, discriminant, formulaSteps: { a, b, c } });
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-center">ax² + bx + c = 0</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
            <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center gap-4">
              <FormField control={form.control} name="a" render={({ field }) => (<FormItem><FormLabel>a =</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="b" render={({ field }) => (<FormItem><FormLabel>b =</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="c" render={({ field }) => (<FormItem><FormLabel>c =</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            <p className="text-xs text-muted-foreground text-center">You can use fractional values such as 3/4.</p>
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><FunctionSquare className="mr-2 h-4 w-4"/>Calculate</Button>
              <Button onClick={() => {form.reset(); setResult(null); setError(null);}} type="button" variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
            </div>
          </form>
        </Form>
        {result && (
          <div className="p-4 bg-muted rounded-lg text-center mt-6 space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-foreground">Solutions for x</h3>
            
             <div className="p-4 border rounded-lg bg-background text-sm font-mono break-all">
                <p>x = [-b ± √(b² - 4ac)] / 2a</p>
                <p>x = [-({result.formulaSteps.b}) ± √(({result.formulaSteps.b})² - 4({result.formulaSteps.a})({result.formulaSteps.c}))] / 2({result.formulaSteps.a})</p>
                <p>x = [{ -result.formulaSteps.b } ± √({result.discriminant})] / { 2 * result.formulaSteps.a }</p>
            </div>

            <div className="p-2 border rounded-lg bg-background">
                <p className="text-lg font-bold text-primary">x₁ = {result.x1}</p>
                <p className="text-lg font-bold text-primary">x₂ = {result.x2}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
