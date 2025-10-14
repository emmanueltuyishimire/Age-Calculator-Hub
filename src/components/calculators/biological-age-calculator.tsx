
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const formSchema = z.object({
  chronologicalAge: z.coerce.number().min(18, "Must be 18 or older").max(100, "Must be 100 or younger"),
  gender: z.enum(['male', 'female', 'other'], { required_error: "Please select a gender."}),
  activityLevel: z.enum(['none', 'low', 'moderate', 'high'], { required_error: "Please select an activity level."}),
  isSmoking: z.enum(['no', 'yes'], { required_error: "Please select a smoking status."}),
  alcoholConsumption: z.enum(['none', 'moderate', 'high'], { required_error: "Please select alcohol consumption level."}),
  dietQuality: z.enum(['poor', 'average', 'excellent'], { required_error: "Please select your diet quality."}),
  sleepHours: z.coerce.number().min(0, "Cannot be negative").max(24, "Cannot be more than 24"),
  stressLevel: z.enum(['low', 'medium', 'high'], { required_error: "Please select a stress level."}),
});

type Result = {
  biologicalAge: number;
  insights: string;
}

export default function BiologicalAgeCalculator() {
  const [result, setResult] = useState<Result | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chronologicalAge: 30,
      gender: 'female',
      activityLevel: 'moderate',
      isSmoking: 'no',
      alcoholConsumption: 'moderate',
      dietQuality: 'average',
      sleepHours: 7,
      stressLevel: 'medium',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const biologicalAgeResult = await getBiologicalAge(values as BiologicalAgeInput);
      if (biologicalAgeResult.biologicalAge) {
         setResult({
            biologicalAge: biologicalAgeResult.biologicalAge,
            insights: biologicalAgeResult.insights,
        });
      } else {
         setResult({
            biologicalAge: values.chronologicalAge,
            insights: biologicalAgeResult.insights || "Could not calculate biological age, but here are some general health tips.",
        });
      }
    } catch (error) {
      console.error(error);
      setResult({
        biologicalAge: values.chronologicalAge,
        insights: 'An error occurred while calculating your biological age. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const getComparisonText = () => {
    if (!result) return "";
    const chronoAge = form.getValues("chronologicalAge");
    const diff = result.biologicalAge - chronoAge;

    if (diff < -1) return `You are ${Math.abs(diff)} years younger than your actual age.`;
    if (diff > 1) return `You are ${diff} years older than your actual age.`;
    return "Your biological age is about the same as your chronological age.";
  }

  const chartData = result ? [
    { name: 'Chronological Age', value: form.getValues("chronologicalAge"), fill: 'hsl(var(--secondary))' },
    { name: 'Biological Age', value: result.biologicalAge, fill: 'hsl(var(--primary))' },
  ] : [];

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Calculate Your Biological Age Now</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="chronologicalAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chronological Age</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name="sleepHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avg. Sleep (hours)</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="activityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Physical Activity</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="low">Low (1-2 times/week)</SelectItem>
                        <SelectItem value="moderate">Moderate (3-4 times/week)</SelectItem>
                        <SelectItem value="high">High (5+ times/week)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dietQuality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diet Quality</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="poor">Poor (Mainly processed)</SelectItem>
                        <SelectItem value="average">Average (Mixed)</SelectItem>
                        <SelectItem value="excellent">Excellent (Whole foods)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stressLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stress Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isSmoking"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Smoking</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alcoholConsumption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alcohol Consumption</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="moderate">Moderate (1-2 drinks/day)</SelectItem>
                        <SelectItem value="high">High (3+ drinks/day)</SelectItem>
                      </SelectContent>
                    </Select>
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

        {isLoading && (
            <div className="mt-6 p-6 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="animate-spin h-8 w-8 text-primary" />
                <p className="text-muted-foreground">Analyzing your data...</p>
            </div>
        )}

        {result && !isLoading && (
          <div className="mt-8 pt-6 border-t">
            <h2 className="text-center text-2xl font-bold mb-4">Your Biological Age Results</h2>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="text-center p-6 bg-muted rounded-lg">
                <p className="text-lg font-medium text-muted-foreground">Your Biological Age Is</p>
                <p className="text-6xl font-bold text-primary my-2">{result.biologicalAge}</p>
                <p className="text-lg font-semibold">{getComparisonText()}</p>
              </div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                        <XAxis type="number" hide />
                        <YAxis type="category" dataKey="name" stroke="hsl(var(--foreground))" axisLine={false} tickLine={false} />
                        <Tooltip
                            cursor={{fill: 'transparent'}}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                return (
                                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                                        <p className="text-sm">{`${payload[0].name}: ${payload[0].value}`}</p>
                                    </div>
                                );
                                }
                                return null;
                            }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 4, 4]} />
                    </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-medium">Health Interpretation:</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{result.insights}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
