"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Sparkles } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getBiologicalAge } from '@/app/biological-age/actions';
import type { BiologicalAgeOutput } from '@/ai/flows/biological-age-calculation';

const emptyStringToUndefined = z.preprocess((val) => {
  if (typeof val === 'string' && val.trim() === '') return undefined;
  return val;
}, z.coerce.number({ invalid_type_error: "Must be a number" }).optional());

const formSchema = z.object({
  bloodPressure: z.string().optional(),
  cholesterolLevels: z.string().optional(),
  restingHeartRate: emptyStringToUndefined,
  fastingBloodSugar: emptyStringToUndefined,
  waistCircumference: emptyStringToUndefined,
  hba1c: emptyStringToUndefined,
  hsCRP: emptyStringToUndefined,
});

export default function BiologicalAgeCalculator() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BiologicalAgeOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bloodPressure: '',
      cholesterolLevels: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    const res = await getBiologicalAge(values);
    setResult(res);
    setLoading(false);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Enter Your Biomarkers</CardTitle>
          <CardDescription>
            Provide your health data to estimate your biological age. The more data you provide, the more accurate the result.
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
                      <FormLabel>Blood Pressure</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 120/80" {...field} />
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
                      <FormLabel>Cholesterol Levels</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., LDL: 100, HDL: 50" {...field} />
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
                        <Input type="number" placeholder="e.g., 65" {...field} />
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
                        <Input type="number" placeholder="e.g., 90" {...field} />
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
                      <FormLabel>Waist Circumference (in)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 32" {...field} />
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
                        <Input type="number" step="0.1" placeholder="e.g., 5.4" {...field} />
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
                        <Input type="number" step="0.1" placeholder="e.g., 1.2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <Sparkles className="mr-2" /> Calculate
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>AI-Powered Insights</CardTitle>
          <CardDescription>
            Your results will appear here after calculation.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          {loading && (
            <div className="text-center space-y-2">
              <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary" />
              <p className="text-muted-foreground">Analyzing your data...</p>
            </div>
          )}
          {result && (
            <div className="space-y-6 text-left">
              {result.biologicalAge && (
                <div className="text-center p-6 bg-muted rounded-lg">
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">Estimated Biological Age</h3>
                  <div className="flex justify-center items-baseline space-x-2">
                    <span className="text-6xl font-bold text-primary">{result.biologicalAge}</span>
                    <span className="text-2xl text-muted-foreground">years</span>
                  </div>
                </div>
              )}
              {result.missingBiomarkers && (
                <div className="p-4 border-l-4 border-amber-500 bg-amber-50 rounded-r-lg">
                    <p className="font-semibold text-amber-800">More Data Needed</p>
                    <p className="text-sm text-amber-700">{result.missingBiomarkers}</p>
                </div>
              )}
              <div>
                <h4 className="font-semibold mb-2 text-lg">Insights:</h4>
                <p className="text-muted-foreground whitespace-pre-wrap">{result.insights}</p>
              </div>
            </div>
          )}
          {!loading && !result && (
             <div className="text-center text-muted-foreground">
                <p>Your results are waiting.</p>
             </div>
          )}
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
            Disclaimer: This is an estimate and not a medical diagnosis. Consult a healthcare professional for medical advice.
        </CardFooter>
      </Card>
    </div>
  );
}
