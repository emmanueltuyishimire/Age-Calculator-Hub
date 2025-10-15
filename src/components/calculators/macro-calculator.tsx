
"use client";

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { RefreshCcw, CookingPot } from 'lucide-react';
import ShareButton from '../share-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const formSchema = z.object({
  age: z.coerce.number().min(15, "Must be at least 15").max(80),
  gender: z.enum(['male', 'female']),
  height: z.coerce.number().min(100, "Height (in cm) must be over 100."),
  weight: z.coerce.number().min(30, "Weight (in kg) must be over 30."),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'veryActive']),
  goal: z.enum(['lose', 'maintain', 'gain']),
});

type FormData = z.infer<typeof formSchema>;

interface Result {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const activityMultipliers = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

const goalAdjustments = {
  lose: -500,
  maintain: 0,
  gain: 500,
};

// Protein in g/kg, Carb/Fat as % of remaining calories
const macroRatios = {
  lose: { protein: 1.8, carb: 0.5, fat: 0.5 },
  maintain: { protein: 1.6, carb: 0.5, fat: 0.5 },
  gain: { protein: 2.0, carb: 0.6, fat: 0.4 },
};

export default function MacroCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 30,
      gender: 'male',
      height: 175,
      weight: 70,
      activityLevel: 'moderate',
      goal: 'maintain',
    },
  });

  function onSubmit(values: FormData) {
    const { age, gender, height, weight, activityLevel, goal } = values;

    // 1. Calculate BMR (Mifflin-St Jeor)
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    bmr += (gender === 'male' ? 5 : -161);

    // 2. Calculate TDEE
    const tdee = bmr * activityMultipliers[activityLevel];

    // 3. Adjust for goal
    const targetCalories = tdee + goalAdjustments[goal];

    // 4. Calculate macros
    const ratio = macroRatios[goal];
    const proteinGrams = Math.round(ratio.protein * weight);
    const proteinCalories = proteinGrams * 4;

    const remainingCalories = targetCalories - proteinCalories;
    const carbCalories = remainingCalories * ratio.carb;
    const fatCalories = remainingCalories * ratio.fat;

    const carbGrams = Math.round(carbCalories / 4);
    const fatGrams = Math.round(fatCalories / 9);

    setResult({
      calories: Math.round(targetCalories),
      protein: proteinGrams,
      carbs: carbGrams,
      fats: fatGrams,
    });
  }

  function handleReset() {
    form.reset();
    setResult(null);
  }

  const chartData = result ? [
    { name: 'Protein', value: result.protein * 4, fill: 'hsl(var(--chart-1))' },
    { name: 'Carbs', value: result.carbs * 4, fill: 'hsl(var(--chart-2))' },
    { name: 'Fats', value: result.fats * 9, fill: 'hsl(var(--chart-3))' },
  ] : [];

  const chartConfig = result ? {
    calories: { label: "Calories" },
    protein: { label: "Protein", color: "hsl(var(--chart-1))" },
    carbs: { label: "Carbs", color: "hsl(var(--chart-2))" },
    fats: { label: "Fats", color: "hsl(var(--chart-3))" },
  } : {};

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">Your Daily Macro Goals</CardTitle>
        <CardDescription className="text-center">Enter your details to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField control={form.control} name="age" render={({ field }) => (<FormItem><FormLabel>Age</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="gender" render={({ field }) => (<FormItem><FormLabel>Gender</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="height" render={({ field }) => (<FormItem><FormLabel>Height (cm)</FormLabel><FormControl><Input type="number" placeholder="e.g., 175" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="weight" render={({ field }) => (<FormItem><FormLabel>Weight (kg)</FormLabel><FormControl><Input type="number" placeholder="e.g., 70" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="activityLevel" render={({ field }) => (<FormItem><FormLabel>Activity Level</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="sedentary">Sedentary (office job)</SelectItem><SelectItem value="light">Light (1-2 workouts/week)</SelectItem><SelectItem value="moderate">Moderate (3-5 workouts/week)</SelectItem><SelectItem value="active">Active (6-7 workouts/week)</SelectItem><SelectItem value="veryActive">Very Active (physical job/athlete)</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="goal" render={({ field }) => (<FormItem><FormLabel>Fitness Goal</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="lose">Weight Loss</SelectItem><SelectItem value="maintain">Maintenance</SelectItem><SelectItem value="gain">Muscle Gain</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><CookingPot className="mr-2 h-4 w-4"/>Calculate Macros</Button>
              <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
              <ShareButton title="Macro Calculator" text="Find out your daily macros with this easy calculator!" url="/macro-calculator" />
            </div>
          </form>
        </Form>
        
        {result && (
          <div className="p-4 bg-muted rounded-lg mt-6 space-y-4 animate-fade-in">
            <div className="text-center">
                <h3 className="text-xl font-bold text-foreground">Your Daily Goal</h3>
                <p className="text-3xl font-bold text-primary">{result.calories.toLocaleString()} Calories</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                            <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80} strokeWidth={5}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                 <div className="flex flex-col justify-center space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg bg-background">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-1))]"></div>
                            <span className="font-semibold">Protein</span>
                        </div>
                        <span className="font-bold text-primary">{result.protein}g</span>
                    </div>
                     <div className="flex items-center justify-between p-3 border rounded-lg bg-background">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-2))]"></div>
                            <span className="font-semibold">Carbs</span>
                        </div>
                        <span className="font-bold text-primary">{result.carbs}g</span>
                    </div>
                     <div className="flex items-center justify-between p-3 border rounded-lg bg-background">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-3))]"></div>
                            <span className="font-semibold">Fats</span>
                        </div>
                        <span className="font-bold text-primary">{result.fats}g</span>
                    </div>
                </div>
            </div>
            <p className="text-xs text-muted-foreground pt-2 text-center">This is an estimate. Consult a registered dietitian or healthcare professional for personalized advice.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
