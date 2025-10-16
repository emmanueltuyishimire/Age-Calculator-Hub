
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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Landmark, Equal } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const formSchema = z.object({
  inputInterest: z.coerce.number().min(0),
  inputCompound: z.string(),
  outputCompound: z.string(),
});

type FormData = z.infer<typeof formSchema>;

const compoundingPeriods: { [key: string]: number } = {
  annually: 1,
  semiannually: 2,
  quarterly: 4,
  monthly: 12,
  weekly: 52,
  daily: 365,
};

export default function CompoundInterestCalculator() {
  const [outputInterest, setOutputInterest] = useState<string>('');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { inputInterest: 6, inputCompound: 'monthly', outputCompound: 'annually' },
  });
  
  useEffect(() => {
    // Trigger initial calculation on mount
    form.handleSubmit(onSubmit)();
  }, [form]);


  function onSubmit(values: FormData) {
    const { inputInterest, inputCompound, outputCompound } = values;
    const n1 = compoundingPeriods[inputCompound];
    const n2 = compoundingPeriods[outputCompound];
    const rate = inputInterest / 100;
    
    // Calculate effective annual rate (APY) from the input rate
    const apy = Math.pow(1 + rate / n1, n1) - 1;
    
    // Convert APY to the new compounding frequency
    const newRate = n2 * (Math.pow(1 + apy, 1 / n2) - 1);
    
    setOutputInterest((newRate * 100).toFixed(5));
  }

  function handleReset() {
    form.reset({ inputInterest: 6, inputCompound: 'monthly', outputCompound: 'annually' });
    setOutputInterest('');
  }
  
  function handleSwap() {
    const currentValues = form.getValues();
    const newOutputValue = parseFloat(outputInterest);
    
    if(!isNaN(newOutputValue)) {
        form.setValue('inputInterest', newOutputValue);
        form.setValue('inputCompound', currentValues.outputCompound);
        form.setValue('outputCompound', currentValues.inputCompound);
        
        // Trigger re-calculation
        const swappedValues = form.getValues();
        const n1 = compoundingPeriods[swappedValues.inputCompound];
        const n2 = compoundingPeriods[swappedValues.outputCompound];
        const rate = swappedValues.inputInterest / 100;
        const apy = Math.pow(1 + rate / n1, n1) - 1;
        const newRate = n2 * (Math.pow(1 + apy, 1 / n2) - 1);
        setOutputInterest((newRate * 100).toFixed(5));
    }
  }

  return (
    <Card className="w-full max-w-xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">Interest Rate Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2 p-4 border rounded-md">
                <FormLabel>Input Interest</FormLabel>
                <div className="flex gap-2">
                    <FormField control={form.control} name="inputInterest" render={({ field }) => (<FormItem className="flex-1"><FormControl><Input type="number" step="0.01" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="inputCompound" render={({ field }) => (<FormItem className="w-1/2"><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>{Object.keys(compoundingPeriods).map(p => <SelectItem key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</SelectItem>)}</SelectContent></Select></FormItem>)} />
                </div>
            </div>

            <div className="flex justify-center">
                 <Button type="button" variant="ghost" size="icon" onClick={handleSwap}>
                    <Equal className="h-5 w-5"/>
                </Button>
            </div>
            
            <div className="space-y-2 p-4 border rounded-md">
                <FormLabel>Output Interest</FormLabel>
                 <div className="flex gap-2">
                    <div className="flex-1 h-10 px-3 py-2 text-sm bg-muted rounded-md flex items-center">{outputInterest ? `${outputInterest}%` : ''}</div>
                    <FormField control={form.control} name="outputCompound" render={({ field }) => (<FormItem className="w-1/2"><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>{Object.keys(compoundingPeriods).map(p => <SelectItem key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</SelectItem>)}</SelectContent></Select></FormItem>)} />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><Landmark className="mr-2 h-4 w-4"/>Calculate</Button>
              <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
