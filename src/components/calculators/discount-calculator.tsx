
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
import { RefreshCcw, Tag } from 'lucide-react';
import ShareButton from '../share-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const formSchema = z.object({
  originalPrice: z.coerce.number().min(0, "Price must be non-negative."),
  discountValue: z.coerce.number().min(0, "Discount must be non-negative."),
  discountType: z.enum(['percent', 'fixed']).default('percent'),
}).refine(data => {
    if (data.discountType === 'percent' && data.discountValue > 100) {
        return false;
    }
    return true;
}, {
    message: "Percentage discount cannot exceed 100.",
    path: ["discountValue"],
}).refine(data => {
    if (data.discountType === 'fixed' && data.discountValue > data.originalPrice) {
        return false;
    }
    return true;
}, {
    message: "Fixed discount cannot exceed the original price.",
    path: ["discountValue"],
});

type FormData = z.infer<typeof formSchema>;

interface Result {
  finalPrice: number;
  savedAmount: number;
}

const currencySymbol = '$';

export default function DiscountCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originalPrice: undefined,
      discountValue: undefined,
      discountType: 'percent',
    },
  });

  function onSubmit(values: FormData) {
    const { originalPrice, discountValue, discountType } = values;
    
    let savedAmount = 0;
    if (discountType === 'percent') {
      savedAmount = originalPrice * (discountValue / 100);
    } else { // fixed
      savedAmount = discountValue;
    }

    const finalPrice = originalPrice - savedAmount;
    
    setResult({
      finalPrice: finalPrice < 0 ? 0 : finalPrice,
      savedAmount,
    });
  }

  function handleReset() {
    form.reset({
      originalPrice: undefined,
      discountValue: undefined,
      discountType: 'percent',
    });
    setResult(null);
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">Sale Price Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="originalPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original Price</FormLabel>
                  <FormControl><Input type="number" placeholder="e.g., 59.99" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex items-end gap-2">
              <FormField
                control={form.control}
                name="discountValue"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Discount</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="discountType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="w-[100px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percent">% Off</SelectItem>
                            <SelectItem value="fixed">$ Off</SelectItem>
                          </SelectContent>
                        </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><Tag className="mr-2 h-4 w-4"/>Calculate</Button>
              <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
              <ShareButton title="Discount Calculator" text="Check how much you can save with this easy discount calculator!" url="/discount-calculator" />
            </div>
          </form>
        </Form>
        
        {result && (
          <div className="p-4 bg-muted rounded-lg text-center mt-6 space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-foreground">Your Discounted Price</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg bg-background">
                    <h4 className="font-semibold text-muted-foreground">You Saved</h4>
                    <p className="text-2xl font-bold text-destructive">
                        {currencySymbol}{result.savedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                </div>
                 <div className="p-3 border rounded-lg bg-background">
                    <h4 className="font-semibold text-muted-foreground">Final Price</h4>
                    <p className="text-2xl font-bold text-primary">
                        {currencySymbol}{result.finalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
