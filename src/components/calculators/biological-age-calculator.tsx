
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { getBiologicalAge } from '@/app/biological-age/actions';
import type { BiologicalAgeInput, BiologicalAgeOutput } from '@/ai/flows/biological-age-calculation';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  bloodPressure: z.string().optional(),
  cholesterolLevels: z.string().optional(),
  restingHeartRate: z.coerce.number().optional(),
  fastingBloodSugar: z.coerce.number().optional(),
  waistCircumference: z.coerce.number().optional(),
  hba1c: z.coerce.number().optional(),
  hsCRP: z.coerce.number().optional(),
});

export default function BiologicalAgeCalculator() {
  const [result, setResult] = useState<BiologicalAgeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const biologicalAgeResult = await getBiologicalAge(values as BiologicalAgeInput);
      setResult(biologicalAgeResult);
    } catch (error) {
      console.error(error);
      setResult({
        insights: 'An error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Biological Age Calculator</CardTitle>
        <CardDescription>
          Enter your biomarker data to estimate your biological age and get health insights. The more data you provide, the more accurate the result.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bloodPressure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blood Pressure (e.g., 120/80)</FormLabel>
                    <FormControl>
                      <Input placeholder="120/80" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cholesterolLevels"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cholesterol (e.g., LDL: 100, HDL: 50)</FormLabel>
                    <FormControl>
                      <Input placeholder="LDL: 100, HDL: 50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="restingHeartRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resting Heart Rate (bpm)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="60" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fastingBloodSugar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fasting Blood Sugar (mg/dL)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="90" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="waistCircumference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Waist Circumference (inches)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="32" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="hba1c"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>HbA1c (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" placeholder="5.7" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="hsCRP"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>hs-CRP (mg/L)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" placeholder="1.0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : 'Calculate Biological Age'}
            </Button>
          </form>
        </Form>

        {result && (
          <div className="mt-6 p-6 bg-muted rounded-lg space-y-4">
            {result.biologicalAge && (
                <div className="text-center">
                    <h3 className="text-lg font-medium text-muted-foreground">Estimated Biological Age</h3>
                    <p className="text-4xl font-bold text-primary">{result.biologicalAge}</p>
                </div>
            )}
            <div>
              <h3 className="text-lg font-medium">Insights:</h3>
              <p className="text-muted-foreground">{result.insights}</p>
            </div>
            {result.missingBiomarkers && (
                 <div>
                    <h3 className="text-lg font-medium">For a More Accurate Result:</h3>
                    <p className="text-muted-foreground">{result.missingBiomarkers}</p>
                </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
