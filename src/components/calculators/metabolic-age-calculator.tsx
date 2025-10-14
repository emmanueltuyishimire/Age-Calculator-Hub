
"use client";

import { useState, useEffect } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RefreshCcw } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { SignUpPrompt } from '../auth/signup-prompt';

const formSchema = z.object({
  age: z.coerce.number().min(15, "Must be 15 or older").max(80, "Must be 80 or younger"),
  gender: z.enum(['male', 'female']),
  height: z.coerce.number().min(100, "Height must be in cm").max(250),
  weight: z.coerce.number().min(30, "Weight must be in kg").max(200),
});

// Metabolic age tables based on average BMRs for different age groups
const metabolicAgeData = {
  male: [
    { age: 15, bmr: 1511 }, { age: 20, bmr: 1526 }, { age: 25, bmr: 1494 },
    { age: 30, bmr: 1462 }, { age: 35, bmr: 1431 }, { age: 40, bmr: 1399 },
    { age: 45, bmr: 1367 }, { age: 50, bmr: 1335 }, { age: 55, bmr: 1304 },
    { age: 60, bmr: 1272 }, { age: 65, bmr: 1240 }, { age: 70, bmr: 1208 },
    { age: 75, bmr: 1177 }, { age: 80, bmr: 1145 }
  ],
  female: [
    { age: 15, bmr: 1222 }, { age: 20, bmr: 1230 }, { age: 25, bmr: 1211 },
    { age: 30, bmr: 1192 }, { age: 35, bmr: 1173 }, { age: 40, bmr: 1154 },
    { age: 45, bmr: 1135 }, { age: 50, bmr: 1116 }, { age: 55, bmr: 1097 },
    { age: 60, bmr: 1078 }, { age: 65, bmr: 1059 }, { age: 70, bmr: 1040 },
    { age: 75, bmr: 1021 }, { age: 80, bmr: 1002 }
  ]
};

const calculateMetabolicAge = (bmr: number, gender: 'male' | 'female'): number => {
    const ageTable = metabolicAgeData[gender];
    // Find the closest age for the calculated BMR
    let closestAge = ageTable[0].age;
    let minDiff = Math.abs(bmr - ageTable[0].bmr);

    for (let i = 1; i < ageTable.length; i++) {
        const diff = Math.abs(bmr - ageTable[i].bmr);
        if (diff < minDiff) {
            minDiff = diff;
            closestAge = ageTable[i].age;
        }
    }
    return closestAge;
};

interface Result {
    metabolicAge: number;
    bmr: number;
}

export default function MetabolicAgeCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 30,
      gender: 'male',
      height: 175,
      weight: 70,
    },
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('metabolicAgeCalculator');
      if (saved) {
        const values = JSON.parse(saved);
        form.reset(values);
      }
    } catch (e) {
      // ignore
    }
  }, [form]);


  function onSubmit(values: z.infer<typeof formSchema>) {
    localStorage.setItem('metabolicAgeCalculator', JSON.stringify(values));
    const { age, gender, height, weight } = values;

    let bmr = 0;
    // Using Mifflin-St Jeor Equation
    if (gender === 'male') {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    const metabolicAge = calculateMetabolicAge(bmr, gender);
    setResult({ metabolicAge, bmr: Math.round(bmr) });
  }

  function handleReset() {
    form.reset({
      age: 30,
      gender: 'male',
      height: 175,
      weight: 70,
    });
    setResult(null);
    localStorage.removeItem('metabolicAgeCalculator');
  }
  
  const getComparisonText = () => {
    if (!result) return "";
    const chronoAge = form.getValues("age");
    const diff = result.metabolicAge - chronoAge;

    if (diff < -1) return `Your metabolism is typical of someone ${Math.abs(diff)} years younger.`;
    if (diff > 1) return `Your metabolism is typical of someone ${diff} years older.`;
    return "Your metabolic age is similar to your chronological age.";
  }

  const chartData = result ? [
    { name: 'Chronological Age', value: form.getValues("age"), fill: 'hsl(var(--secondary))' },
    { name: 'Metabolic Age', value: result.metabolicAge, fill: 'hsl(var(--primary))' },
  ] : [];

  return (
    <Card className="w-full max-w-xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Calculate Your Metabolic Age</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Age</FormLabel>
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
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (cm)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
                <Button type="submit" className="w-full">Calculate Metabolic Age</Button>
                <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto">
                    <RefreshCcw className="mr-2 h-4 w-4" /> Reset
                </Button>
            </div>
          </form>
        </Form>

        {result && (
          <div className="mt-8 pt-6 border-t animate-fade-in">
            <h2 className="text-center text-2xl font-bold mb-4">Your Metabolic Age Results</h2>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="text-center p-6 bg-muted rounded-lg">
                <p className="text-lg font-medium text-muted-foreground">Your Metabolic Age Is</p>
                <p className="text-6xl font-bold text-primary my-2">{result.metabolicAge}</p>
                <p className="text-sm font-semibold">{getComparisonText()}</p>
                <p className="text-xs text-muted-foreground mt-2">Based on a BMR of {result.bmr} calories/day.</p>
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
            <SignUpPrompt />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
