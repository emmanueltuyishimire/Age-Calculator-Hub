
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
import { RefreshCcw, DollarSign, AlertCircle } from 'lucide-react';
import ShareButton from '../share-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const formSchema = z.object({
  parent1Name: z.string().default('Parent 1'),
  parent2Name: z.string().default('Parent 2'),
  parent1Income: z.coerce.number().min(0, "Income cannot be negative."),
  parent2Income: z.coerce.number().min(0, "Income cannot be negative."),
  numChildren: z.coerce.number().min(1, "Must be at least 1 child.").max(10),
  custody: z.enum(['parent1', 'parent2']),
});

type FormData = z.infer<typeof formSchema>;

interface Result {
  estimatedSupport: number;
  payingParent: string;
  receivingParent: string;
}

// Basic obligation percentages based on the number of children (simplified model)
const obligationPercentages: { [key: number]: number } = {
  1: 0.17, // 17% of combined income for one child
  2: 0.25, // 25% for two
  3: 0.29, // 29% for three
  4: 0.31, // 31% for four
  5: 0.34, // 34% for five or more
};

export default function ChildSupportEstimator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parent1Name: 'Parent 1',
      parent2Name: 'Parent 2',
      parent1Income: undefined,
      parent2Income: undefined,
      numChildren: 1,
      custody: 'parent2',
    },
  });

  function onSubmit(values: FormData) {
    const { parent1Income, parent2Income, numChildren, custody, parent1Name, parent2Name } = values;

    const combinedIncome = parent1Income + parent2Income;
    if (combinedIncome === 0) {
      setResult({ estimatedSupport: 0, payingParent: 'N/A', receivingParent: 'N/A' });
      return;
    }

    const percentage = obligationPercentages[Math.min(numChildren, 5)];
    const basicObligation = combinedIncome * percentage;

    const parent1Proportion = parent1Income / combinedIncome;
    const parent2Proportion = parent2Income / combinedIncome;

    const p1Name = parent1Name || 'Parent 1';
    const p2Name = parent2Name || 'Parent 2';

    let payingParent, receivingParent, estimatedSupport;
    if (custody === 'parent2') { // Parent 2 is custodial, Parent 1 pays
      payingParent = p1Name;
      receivingParent = p2Name;
      estimatedSupport = basicObligation * parent1Proportion;
    } else { // Parent 1 is custodial, Parent 2 pays
      payingParent = p2Name;
      receivingParent = p1Name;
      estimatedSupport = basicObligation * parent2Proportion;
    }

    setResult({
      estimatedSupport: Math.round(estimatedSupport),
      payingParent,
      receivingParent,
    });
  }

  function handleReset() {
    form.reset({
      parent1Name: 'Parent 1',
      parent2Name: 'Parent 2',
      parent1Income: undefined,
      parent2Income: undefined,
      numChildren: 1,
      custody: 'parent2',
    });
    setResult(null);
  }

  const parent1NameValue = form.watch('parent1Name') || 'Parent 1';
  const parent2NameValue = form.watch('parent2Name') || 'Parent 2';

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">Child Support Estimator</CardTitle>
        <CardDescription className="text-center">Enter the details below for a basic estimate.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <FormField control={form.control} name="parent1Name" render={({ field }) => (<FormItem><FormLabel>Parent 1 Name</FormLabel><FormControl><Input placeholder="e.g., Alex" {...field} /></FormControl><FormMessage /></FormItem>)} />
               <FormField control={form.control} name="parent2Name" render={({ field }) => (<FormItem><FormLabel>Parent 2 Name</FormLabel><FormControl><Input placeholder="e.g., Jordan" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="parent1Income" render={({ field }) => (<FormItem><FormLabel>{parent1NameValue}'s Gross Monthly Income</FormLabel><FormControl><Input type="number" placeholder="e.g., 5000" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="parent2Income" render={({ field }) => (<FormItem><FormLabel>{parent2NameValue}'s Gross Monthly Income</FormLabel><FormControl><Input type="number" placeholder="e.g., 3000" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="numChildren" render={({ field }) => (<FormItem><FormLabel>Number of Children</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="custody" render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Custodial Parent</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="parent1">{parent1NameValue}</SelectItem>
                        <SelectItem value="parent2">{parent2NameValue}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><DollarSign className="mr-2 h-4 w-4"/>Estimate Support</Button>
              <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
              <ShareButton title="Child Support Calculator" text="Get a simple estimate for child support payments with this calculator." url="/child-support-calculator" />
            </div>
          </form>
        </Form>
        
        {result && (
          <div className="p-4 bg-muted rounded-lg text-center mt-6 space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-foreground">Your Estimated Result</h3>
            <div className="p-4 border rounded-lg bg-background">
                <h4 className="font-semibold text-muted-foreground">Estimated Monthly Payment</h4>
                <p className="text-3xl font-bold text-primary">${result.estimatedSupport.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Paid by {result.payingParent} to {result.receivingParent}</p>
            </div>
            <Alert variant="destructive" className="text-left">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>This is an estimate only.</AlertTitle>
                <AlertDescription>
                    This is a simplified calculation and does not include factors like healthcare, childcare, or specific state guidelines. It is not legal advice.
                </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
