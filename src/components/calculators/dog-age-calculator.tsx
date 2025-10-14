
"use client";

import { useState, useEffect } from 'react';
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

const formSchema = z.object({
  dogAge: z.coerce.number().min(0, "Age must be 0 or more").max(30, "Age seems too high!"),
  dogSize: z.enum(['small', 'medium', 'large', 'giant']),
});

type DogSize = 'small' | 'medium' | 'large' | 'giant';
type DogLifeStage = "Puppy" | "Young Adult" | "Mature" | "Senior" | "Geriatric";

interface Result {
    humanAge: number;
    lifeStage: DogLifeStage;
    tip: string;
}

const calculateDogAge = (age: number, size: DogSize): number => {
    if (age <= 0) return 0;
    // Using the 16 * ln(dogAge) + 31 formula for more nuanced calculation after year 1
    if (age === 1) return 15;
    
    // Simplified table-based approach for consistency with the chart
    const ageMap: Record<DogSize, number[]> = {
        small: [0, 15, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76],
        medium: [0, 15, 24, 28, 32, 42, 49, 56, 63, 70, 77, 84, 91, 98, 105, 112],
        large: [0, 14, 22, 31, 40, 49, 58, 67, 76, 85, 94, 103, 112, 121, 130, 139],
        giant: [0, 14, 20, 28, 37, 49, 61, 73, 85, 97, 109, 121, 133, 145, 157, 169],
    };

    if (age < ageMap[size].length) {
        return ageMap[size][Math.floor(age)];
    }

    // Fallback for older dogs
    const lastKnownAge = ageMap[size][ageMap[size].length -1];
    const yearsAfter = age - (ageMap[size].length - 1);
    
    let multiplier = 5;
    if (size === 'medium') multiplier = 6;
    if (size === 'large') multiplier = 7;
    if (size === 'giant') multiplier = 8;
    
    return lastKnownAge + (yearsAfter * multiplier);
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
      dogAge: 1,
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


  function onSubmit(values: z.infer<typeof formSchema>) {
    localStorage.setItem('dogAgeCalculator', JSON.stringify(values));
    const humanAge = calculateDogAge(values.dogAge, values.dogSize as DogSize);
    const { lifeStage, tip } = getLifeStageAndTip(humanAge);
    setResult({ humanAge, lifeStage, tip });
  }

  function handleReset() {
      form.reset({ dogAge: 0, dogSize: 'medium' });
      setResult(null);
      localStorage.removeItem('dogAgeCalculator');
  }


  return (
      <Card className="w-full max-w-lg mx-auto shadow-lg animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle>Dog's Age in Human Years</CardTitle>
          <CardDescription>Enter your dog's age and size to see how their age compares to yours.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="dogAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Dog's Age (years)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                  control={form.control}
                  name="dogSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dog Size</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your dog's size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="small">Small (up to 20 lbs)</SelectItem>
                          <SelectItem value="medium">Medium (21-50 lbs)</SelectItem>
                          <SelectItem value="large">Large (51-100 lbs)</SelectItem>
                          <SelectItem value="giant">Giant (100+ lbs)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <div className="flex flex-col sm:flex-row gap-2">
                <Button type="submit" className="w-full">
                  Calculate
                </Button>
                 <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto">
                    <RefreshCcw className="mr-2 h-4 w-4" /> Reset
                </Button>
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
