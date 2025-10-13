
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
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  chronologicalAge: z.coerce.number().min(18, "Must be 18 or older").max(100, "Must be 100 or younger"),
  gender: z.enum(['male', 'female', 'other']),
  exerciseFrequency: z.string().min(1, "Please describe your exercise frequency."),
  dietQuality: z.string().min(1, "Please describe your diet quality."),
  sleepHours: z.coerce.number().min(0).max(24),
  stressLevels: z.string().min(1, "Please describe your stress levels."),
});

export default function BiologicalAgeCalculator() {
  const [result, setResult] = useState<BiologicalAgeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chronologicalAge: 30,
      gender: 'female',
      sleepHours: 7,
    },
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
          Enter your lifestyle details to estimate your biological age and get health insights.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="chronologicalAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Current Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 35" {...field} />
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
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                      </FormControl>
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
                    <FormLabel>Average Hours of Sleep</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 8" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="exerciseFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exercise Frequency</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., 3-4 times a week, cardio and weights" {...field} />
                    </FormControl>
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
                    <FormControl>
                      <Textarea placeholder="e.g., Balanced diet with fruits and vegetables, occasional processed foods" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="stressLevels"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Daily Stress Levels</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Moderate stress from work, manage with meditation" {...field} />
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
          </div>
        )}
      </CardContent>
    </Card>
  );
}
