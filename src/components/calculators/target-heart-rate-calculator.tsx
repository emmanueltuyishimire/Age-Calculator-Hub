
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
import { HeartPulse } from 'lucide-react';
import ShareButton from '../share-button';

const formSchema = z.object({
  age: z.coerce.number().min(10, "Age must be at least 10").max(100, "Age must be 100 or less."),
});

type FormData = z.infer<typeof formSchema>;

interface HeartRateZones {
  maxHeartRate: number;
  fatBurn: { lower: number; upper: number };
  cardio: { lower: number; upper: number };
  peak: { lower: number; upper: number };
}

export default function TargetHeartRateCalculator() {
  const [zones, setZones] = useState<HeartRateZones | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 30,
    },
  });

  function onSubmit(values: FormData) {
    const maxHeartRate = 220 - values.age;
    setZones({
      maxHeartRate: Math.round(maxHeartRate),
      fatBurn: {
        lower: Math.round(maxHeartRate * 0.6),
        upper: Math.round(maxHeartRate * 0.7),
      },
      cardio: {
        lower: Math.round(maxHeartRate * 0.7),
        upper: Math.round(maxHeartRate * 0.8),
      },
      peak: {
        lower: Math.round(maxHeartRate * 0.8),
        upper: Math.round(maxHeartRate * 0.9),
      },
    });
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">Find Your Zones</CardTitle>
        <CardDescription className="text-center">Enter your age to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Age</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 35" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><HeartPulse className="mr-2 h-4 w-4"/>Calculate Zones</Button>
              <ShareButton title="Target Heart Rate Calculator" text="Find your ideal workout heart rate zones with this easy calculator!" url="/target-heart-rate-calculator" />
            </div>
          </form>
        </Form>
        
        {zones && (
          <div className="p-4 bg-muted rounded-lg mt-6 space-y-4 animate-fade-in">
            <div className="text-center border-b pb-4">
                <h3 className="font-semibold text-muted-foreground">Estimated Max Heart Rate</h3>
                <p className="text-3xl font-bold text-primary">{zones.maxHeartRate} BPM</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-2">
                    <h4 className="font-semibold text-foreground">Fat Burn</h4>
                    <p className="text-lg font-bold text-primary">{zones.fatBurn.lower} - {zones.fatBurn.upper} BPM</p>
                    <p className="text-xs text-muted-foreground">(60-70% MHR)</p>
                </div>
                 <div className="p-2">
                    <h4 className="font-semibold text-foreground">Cardio</h4>
                    <p className="text-lg font-bold text-primary">{zones.cardio.lower} - {zones.cardio.upper} BPM</p>
                    <p className="text-xs text-muted-foreground">(70-80% MHR)</p>
                </div>
                 <div className="p-2">
                    <h4 className="font-semibold text-foreground">Peak</h4>
                    <p className="text-lg font-bold text-primary">{zones.peak.lower} - {zones.peak.upper} BPM</p>
                    <p className="text-xs text-muted-foreground">(80-90% MHR)</p>
                </div>
            </div>
            <p className="text-xs text-muted-foreground pt-2 text-center">This is an estimate. Consult a healthcare professional before starting any new exercise program.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
