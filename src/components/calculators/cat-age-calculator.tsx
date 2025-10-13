"use client";

import { useState } from 'react';
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

const formSchema = z.object({
  catAge: z.coerce.number().min(1, "Age must be at least 1").max(30, "Age seems too high!"),
});

// Simplified calculation logic for cats
const calculateCatAge = (age: number) => {
  if (age === 1) return 15;
  if (age === 2) return 24;
  return 24 + (age - 2) * 4;
};

export default function CatAgeCalculator() {
  const [humanAge, setHumanAge] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      catAge: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const calculatedAge = calculateCatAge(values.catAge);
    setHumanAge(calculatedAge);
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-md mx-auto">
        <CardHeader>
            <CardTitle>Cat's Age in Human Years</CardTitle>
            <CardDescription>See how your cat's age compares to yours.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                control={form.control}
                name="catAge"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Your Cat's Age (years)</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="e.g., 5" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" className="w-full">
                Calculate
                </Button>
            </form>
            </Form>
            {humanAge !== null && (
            <div className="p-6 bg-muted rounded-lg text-center mt-4">
                <h3 className="text-lg font-medium text-muted-foreground">Your cat is about</h3>
                <div className="flex justify-center items-baseline space-x-2">
                <span className="text-4xl font-bold text-primary">{humanAge}</span>
                <span className="text-xl text-muted-foreground">human years old</span>
                </div>
            </div>
            )}
        </CardContent>
        </Card>
    </div>
  );
}
