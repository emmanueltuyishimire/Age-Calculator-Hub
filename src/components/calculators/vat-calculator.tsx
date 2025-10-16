
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
import { RefreshCcw, Percent } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const formSchema = z.object({
  price: z.coerce.number().min(0, "Price must be non-negative."),
  vatRate: z.coerce.number().min(0).max(100, "VAT rate must be between 0 and 100."),
  calculationType: z.enum(['excluded', 'included']),
});

type FormData = z.infer<typeof formSchema>;

interface Result {
  netPrice: number;
  vatAmount: number;
  grossPrice: number;
}

export default function VatCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: 100,
      vatRate: 20,
      calculationType: 'excluded',
    },
  });

  function onSubmit(values: FormData) {
    const { price, vatRate, calculationType } = values;
    const rate = vatRate / 100;
    
    let netPrice = 0;
    let vatAmount = 0;
    let grossPrice = 0;

    if (calculationType === 'excluded') {
      netPrice = price;
      vatAmount = netPrice * rate;
      grossPrice = netPrice + vatAmount;
    } else { // included
      grossPrice = price;
      netPrice = grossPrice / (1 + rate);
      vatAmount = grossPrice - netPrice;
    }

    setResult({
      netPrice,
      vatAmount,
      grossPrice,
    });
  }

  function handleReset() {
    form.reset({
      price: undefined,
      vatRate: 20,
      calculationType: 'excluded',
    });
    setResult(null);
  }

  const currencySymbol = '$';

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle>VAT Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="calculationType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Price is...</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="excluded" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          VAT Excluded
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="included" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          VAT Included
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vatRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>VAT Rate (%)</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><Percent className="mr-2 h-4 w-4"/>Calculate</Button>
              <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
            </div>
          </form>
        </Form>
        
        {result && (
          <div className="p-4 bg-muted rounded-lg mt-6 space-y-3 animate-fade-in text-sm">
            <h3 className="text-lg font-bold text-center text-foreground">Calculation Results</h3>
             <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Net Price:</span>
                <span className="font-semibold text-lg">{currencySymbol}{result.netPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-muted-foreground">VAT Amount:</span>
                <span className="font-semibold text-lg">{currencySymbol}{result.vatAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center border-t pt-3 mt-3">
                <span className="text-lg font-bold text-foreground">Gross Price:</span>
                <span className="text-2xl font-bold text-primary">{currencySymbol}{result.grossPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
