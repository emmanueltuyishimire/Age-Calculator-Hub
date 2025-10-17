
"use client";

import { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RefreshCcw } from 'lucide-react';
import ShareButton from '../share-button';

const formSchema = z.object({
  dogAgeYears: z.coerce.number().min(0, "Years must be 0 or more").max(30, "Age seems too high!"),
  dogAgeMonths: z.coerce.number().min(0).max(11).optional(),
  dogSize: z.enum(['small', 'medium', 'large', 'giant']),
});

type DogSize = 'small' | 'medium' | 'large' | 'giant';
type DogLifeStage = "Puppy" | "Young Adult" | "Mature" | "Senior" | "Geriatric";

interface Result {
    humanAge: number;
    lifeStage: DogLifeStage;
    tip: string;
}

const calculateDogAge = (years: number, months: number = 0, size: DogSize): number => {
    const totalMonths = years * 12 + months;
    if (totalMonths <= 0) return 0;

    // First 2 years have a faster, more size-dependent progression
    if (totalMonths <= 24) {
        if (size === 'giant') {
            if (totalMonths <= 12) return Math.round((totalMonths / 12) * 12);
            return 12 + Math.round(((totalMonths - 12) / 12) * 8);
        }
        if (size === 'large') {
             if (totalMonths <= 12) return Math.round((totalMonths / 12) * 14);
            return 14 + Math.round(((totalMonths - 12) / 12) * 8);
        }
        // Small and Medium are similar for first 2 years
        if (totalMonths <= 12) return Math.round((totalMonths / 12) * 15);
        return 15 + Math.round(((totalMonths - 12) / 12) * 9);
    }
    
    // After 2 years, use a linear approximation per size
    const ageAtTwoYears = calculateDogAge(2, 0, size);
    const yearsAfterTwo = (totalMonths - 24) / 12;

    let multiplier = 4; // Small
    if (size === 'medium') multiplier = 5;
    if (size === 'large') multiplier = 7;
    if (size === 'giant') multiplier = 9;

    return Math.round(ageAtTwoYears + (yearsAfterTwo * multiplier));
};

const getLifeStageAndTip = (humanAge: number): { lifeStage: DogLifeStage, tip: string } => {
    if (humanAge <= 15) return { lifeStage: "Puppy", tip: "Your puppy is in a rapid growth phase. Focus on socialization and basic training." };
    if (humanAge <= 40) return { lifeStage: "Young Adult", tip: "Your dog is in its prime! Regular exercise and continued training are important." };
    if (humanAge <= 60) return { lifeStage: "Mature", tip: "Your mature dog may slow down a bit. Watch their weight and dental health." };
    if (humanAge <= 80) return { lifeStage: "Senior", tip: "Time for semi-annual vet visits. Consider joint supplements to help with mobility." };
    return { lifeStage: "Geriatric", tip: "Your geriatric dog needs extra comfort. Ensure they have a warm place to rest and easy access to food and water." };
};

export default function DogAgeCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dogAgeYears: 1,
      dogAgeMonths: 0,
      dogSize: 'medium',
    },
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dogAgeCalculator');
      if (saved) {
        const values = JSON.parse(saved);
        form.reset(values);
      }
    } catch (e) {
      // ignore
    }
  }, [form]);


  const onSubmit = useCallback((values: z.infer<typeof formSchema>) => {
    localStorage.setItem('dogAgeCalculator', JSON.stringify(values));
    const humanAge = calculateDogAge(values.dogAgeYears, values.dogAgeMonths, values.dogSize as DogSize);
    const { lifeStage, tip } = getLifeStageAndTip(humanAge);
    setResult({ humanAge, lifeStage, tip });
  }, [form]);

  const handleReset = useCallback(() => {
      form.reset({ dogAgeYears: 0, dogAgeMonths: 0, dogSize: 'medium' });
      setResult(null);
      localStorage.removeItem('dogAgeCalculator');
  }, [form]);


  return (
      <Card className="w-full max-w-lg mx-auto shadow-lg animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle>Dog's Age in Human Years</CardTitle>
          <CardDescription>Enter your dog's age and size to see how their age compares to yours.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
               <div className="flex gap-4">
                <FormField
                    control={form.control}
                    name="dogAgeYears"
                    render={({ field }) => (
                    <FormItem className="w-1/2">
                        <FormLabel>Years</FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="e.g., 5" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dogAgeMonths"
                    render={({ field }) => (
                    <FormItem className="w-1/2">
                        <FormLabel>Months</FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="e.g., 6" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              </div>
               <FormField
                  control={form.control}
                  name="dogSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dog Size (best estimate by weight)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your dog's size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="small">Small (up to 20 lbs / 9 kg)</SelectItem>
                          <SelectItem value="medium">Medium (21-50 lbs / 9.5-23 kg)</SelectItem>
                          <SelectItem value="large">Large (51-100 lbs / 23-45 kg)</SelectItem>
                          <SelectItem value="giant">Giant (100+ lbs / 45+ kg)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <div className="flex flex-col md:flex-row gap-2">
                <Button type="submit" className="w-full">
                  Calculate
                </Button>
                 <Button onClick={handleReset} variant="outline" className="w-full md:w-auto" aria-label="Reset">
                    <RefreshCcw className="mr-2 h-4 w-4" /> Reset
                </Button>
                <ShareButton title="Dog Age Calculator" text="Find out your dog's age in human years with this cool calculator!" url="/dog-age"/>
              </div>
            </form>
          </Form>
          {result !== null && (
            
              <div className="p-6 bg-muted rounded-lg text-center mt-4 space-y-4 animate-fade-in">
                <div>
                  <h3 className="text-lg font-medium text-muted-foreground">Equivalent Human Age:</h3>
                  <div className="flex justify-center items-baseline space-x-2">
                    <span className="text-4xl font-bold text-primary">{result.humanAge}</span>
                    <span className="text-xl text-muted-foreground">years</span>
                  </div>
                </div>
                <div>
                    <h3 className="text-lg font-medium text-muted-foreground">Life Stage:</h3>
                    <p className="text-xl font-semibold text-primary">{result.lifeStage}</p>
                </div>
                <div>
                    <h3 className="text-lg font-medium text-muted-foreground">Health Tip:</h3>
                    <p className="text-sm text-foreground">{result.tip}</p>
                </div>
              </div>
              
          )}
        </CardContent>
      </Card>
  );
}
