
"use client";

import { useState, useEffect, useCallback } from 'react';
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
import { RefreshCcw } from 'lucide-react';
import ShareButton from '../share-button';

const formSchema = z.object({
  catAgeYears: z.coerce.number().min(0, "Years must be 0 or more").max(30, "Age seems too high!"),
  catAgeMonths: z.coerce.number().min(0).max(11).optional(),
});

type CatLifeStage = "Kitten" | "Junior" | "Prime" | "Mature" | "Senior" | "Geriatric";

interface Result {
    humanAge: number;
    lifeStage: CatLifeStage;
    tip: string;
}

const getLifeStageAndTip = (humanAge: number): { lifeStage: CatLifeStage, tip: string } => {
    if (humanAge <= 15) return { lifeStage: "Kitten", tip: "Your kitten is growing rapidly. Ensure they have kitten-specific food and all their initial vaccinations." };
    if (humanAge <= 24) return { lifeStage: "Junior", tip: "Your cat is developing their adult personality. This is an ideal time for spaying or neutering." };
    if (humanAge <= 40) return { lifeStage: "Prime", tip: "Your cat is in its prime. Maintain a balanced diet and schedule annual vet checkups." };
    if (humanAge <= 56) return { lifeStage: "Mature", tip: "Your cat may start to slow down. Monitor their diet and weight, and pay attention to dental health." };
    if (humanAge <= 72) return { lifeStage: "Senior", tip: "Monitor for signs of arthritis or kidney issues. Softer food may be easier for them to eat." };
    return { lifeStage: "Geriatric", tip: "Your geriatric cat needs extra comfort and care. Ensure a cozy environment and consider more frequent vet visits." };
};

const calculateCatAge = (years: number, months: number = 0): number => {
    const totalMonths = years * 12 + months;
    if (totalMonths <= 12) { // First year
        return Math.round((totalMonths / 12) * 15);
    }
    if (totalMonths <= 24) { // Second year
        return 15 + Math.round(((totalMonths - 12) / 12) * 9);
    }
    // After two years
    return 24 + (years - 2) * 4 + Math.round((months / 12) * 4);
};

export default function CatAgeCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      catAgeYears: 1,
      catAgeMonths: 0,
    },
  });
  
  useEffect(() => {
    try {
      const saved = localStorage.getItem('catAgeCalculator');
      if (saved) {
        const values = JSON.parse(saved);
        form.reset(values);
      }
    } catch (e) {
      // ignore
    }
  }, [form]);


  const onSubmit = useCallback((values: z.infer<typeof formSchema>) => {
    localStorage.setItem('catAgeCalculator', JSON.stringify(values));
    const humanAge = calculateCatAge(values.catAgeYears, values.catAgeMonths);
    const { lifeStage, tip } = getLifeStageAndTip(humanAge);
    setResult({ humanAge, lifeStage, tip });
  }, [form]);

  const handleReset = useCallback(() => {
      form.reset({ catAgeYears: 0, catAgeMonths: 0});
      setResult(null);
      localStorage.removeItem('catAgeCalculator');
  }, [form]);

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg animate-fade-in">
    <CardHeader className="text-center">
        <CardTitle>Enter Your Cat's Age</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-4">
                <FormField
                control={form.control}
                name="catAgeYears"
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
                name="catAgeMonths"
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
            <div className="flex flex-col md:flex-row gap-2">
                <Button type="submit" className="w-full">
                Calculate
                </Button>
                    <Button onClick={handleReset} variant="outline" className="w-full md:w-auto" aria-label="Reset">
                    <RefreshCcw className="mr-2 h-4 w-4" /> Reset
                </Button>
                <ShareButton title="Cat Age Calculator" text="Find out how old your cat is in human years!" url="/cat-age-in-human-years"/>
            </div>

        </form>
        </Form>
        {result && (
        
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
