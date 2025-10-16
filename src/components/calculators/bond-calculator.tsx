
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
import { RefreshCcw, Landmark, Scale, CalendarIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '../ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';
import { format, differenceInDays, addMonths, getDaysInMonth, setMonth } from 'date-fns';

const currencySymbol = '$';

// --- Bond Value Calculator ---
const bondValueSchema = z.object({
  faceValue: z.coerce.number().optional(),
  price: z.coerce.number().optional(),
  yield: z.coerce.number().optional(),
  maturity: z.coerce.number().optional(),
  coupon: z.coerce.number().optional(),
  frequency: z.enum(['annually', 'semiannually', 'quarterly', 'monthly']).default('annually'),
});

type BondValueFormData = z.infer<typeof bondValueSchema>;

function BondValueCalculator() {
    const [solveFor, setSolveFor] = useState<'price' | 'yield' | 'maturity' | 'coupon'>('price');
    const [result, setResult] = useState<Partial<BondValueFormData> | null>(null);

    const form = useForm<BondValueFormData>({
        resolver: zodResolver(bondValueSchema),
        defaultValues: { faceValue: 100, yield: 6, maturity: 3, coupon: 5, frequency: 'annually' },
    });

    const onSubmit = (values: BondValueFormData) => {
        const { faceValue = 0, price = 0, yield: ytm = 0, maturity = 0, coupon = 0, frequency } = values;
        
        const freqVal = { annually: 1, semiannually: 2, quarterly: 4, monthly: 12 }[frequency];
        const n = maturity * freqVal;
        const r = ytm / 100 / freqVal;
        const cpnPayment = (faceValue * (coupon/100)) / freqVal;

        let calculatedValue: Partial<BondValueFormData> = {};

        try {
            switch(solveFor) {
                case 'price':
                    const priceResult = cpnPayment * (1 - Math.pow(1 + r, -n)) / r + faceValue / Math.pow(1 + r, n);
                    calculatedValue = { price: priceResult };
                    break;
                // Note: Solving for yield, maturity, or coupon is complex and often requires iterative methods (like Newton-Raphson),
                // which is beyond a simple implementation. This calculator will focus on solving for price.
                // In a real scenario, you'd implement those iterative solvers here.
            }
            setResult(calculatedValue);
        } catch (e) {
            console.error("Bond calculation error", e);
        }
    };
    
    return (
        <Card>
            <CardHeader><CardTitle>Bond Value Calculator</CardTitle><CardDescription>Enter values to calculate the price of a bond.</CardDescription></CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="faceValue" render={({ field }) => (<FormItem><FormLabel>Face Value</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                            <FormField control={form.control} name="yield" render={({ field }) => (<FormItem><FormLabel>Yield to Maturity (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl></FormItem>)} />
                            <FormField control={form.control} name="maturity" render={({ field }) => (<FormItem><FormLabel>Time to Maturity (years)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                            <FormField control={form.control} name="coupon" render={({ field }) => (<FormItem><FormLabel>Annual Coupon Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl></FormItem>)} />
                            <FormField control={form.control} name="frequency" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Coupon Frequency</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="annually">Annually</SelectItem><SelectItem value="semiannually">Semiannually</SelectItem><SelectItem value="quarterly">Quarterly</SelectItem><SelectItem value="monthly">Monthly</SelectItem></SelectContent></Select></FormItem>)} />
                        </div>
                        <Button type="submit" className="w-full">Calculate Price</Button>
                    </form>
                </Form>
                 {result?.price && (
                    <div className="mt-4 p-4 bg-muted rounded-lg text-center">
                        <h3 className="font-semibold text-muted-foreground">Calculated Bond Price</h3>
                        <p className="text-2xl text-primary font-bold">{currencySymbol}{result.price.toFixed(4)}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

// --- Bond Pricing Calculator ---
const bondPricingSchema = z.object({
  faceValue: z.coerce.number().min(1),
  yield: z.coerce.number().min(0),
  coupon: z.coerce.number().min(0),
  frequency: z.enum(['annually', 'semiannually']),
  maturityDate: z.date(),
  settlementDate: z.date(),
  dayCount: z.enum(['30/360', 'Actual/360', 'Actual/365', 'Actual/Actual']).default('Actual/Actual'),
});
type BondPricingFormData = z.infer<typeof bondPricingSchema>;
interface BondPricingResult { dirtyPrice: number; cleanPrice: number; accruedInterest: number; accruedDays: number; }

function BondPricingCalculator() {
    const [result, setResult] = useState<BondPricingResult | null>(null);
    const form = useForm<BondPricingFormData>({
        resolver: zodResolver(bondPricingSchema),
        defaultValues: { faceValue: 100, yield: 6, coupon: 5, frequency: 'semiannually', maturityDate: undefined, settlementDate: undefined, dayCount: 'Actual/Actual' },
    });

    const onSubmit = (values: BondPricingFormData) => {
        const { faceValue, yield: ytm, coupon, frequency, maturityDate, settlementDate, dayCount } = values;

        const freqVal = frequency === 'annually' ? 1 : 2;
        const monthsBetweenCoupons = 12 / freqVal;
        const couponPayment = (faceValue * (coupon/100)) / freqVal;
        
        let lastCouponDate = new Date(maturityDate);
        while (lastCouponDate > settlementDate) {
            lastCouponDate = addMonths(lastCouponDate, -monthsBetweenCoupons);
        }
        
        const nextCouponDate = addMonths(lastCouponDate, monthsBetweenCoupons);

        let daysInPeriod;
        if(dayCount === '30/360') {
            daysInPeriod = 180;
        } else if (dayCount === 'Actual/360') {
            daysInPeriod = differenceInDays(nextCouponDate, lastCouponDate); // Simplified for this logic
        } else if (dayCount === 'Actual/365') {
             daysInPeriod = differenceInDays(nextCouponDate, lastCouponDate);
        } else { // Actual/Actual
            daysInPeriod = differenceInDays(nextCouponDate, lastCouponDate);
        }
        
        const accruedDays = differenceInDays(settlementDate, lastCouponDate);
        const accruedInterest = (accruedDays / daysInPeriod) * couponPayment;
        
        // This is a simplified implementation for price. A real one is very complex.
        const r = ytm / 100 / freqVal;
        const n = differenceInDays(maturityDate, settlementDate) / (365.25 / freqVal);
        const dirtyPrice = couponPayment * (1 - Math.pow(1 + r, -n)) / r + faceValue / Math.pow(1 + r, n);
        
        const cleanPrice = dirtyPrice - accruedInterest;
        
        setResult({ dirtyPrice, cleanPrice, accruedInterest, accruedDays });
    };

    return (
        <Card>
            <CardHeader><CardTitle>Bond Pricing Calculator</CardTitle><CardDescription>Calculate dirty price, clean price, and accrued interest.</CardDescription></CardHeader>
            <CardContent>
                <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="faceValue" render={({ field }) => (<FormItem><FormLabel>Face Value</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                             <FormField control={form.control} name="yield" render={({ field }) => (<FormItem><FormLabel>Yield to Maturity (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl></FormItem>)} />
                            <FormField control={form.control} name="coupon" render={({ field }) => (<FormItem><FormLabel>Annual Coupon Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl></FormItem>)} />
                            <FormField control={form.control} name="frequency" render={({ field }) => (<FormItem><FormLabel>Coupon Frequency</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="annually">Annually</SelectItem><SelectItem value="semiannually">Semiannually</SelectItem></SelectContent></Select></FormItem>)} />
                            <FormField control={form.control} name="maturityDate" render={({ field }) => (<FormItem><FormLabel>Maturity Date</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant="outline" className={cn("w-full text-left font-normal", !field.value && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}</Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus/></PopoverContent></Popover></FormItem>)} />
                            <FormField control={form.control} name="settlementDate" render={({ field }) => (<FormItem><FormLabel>Settlement Date</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant="outline" className={cn("w-full text-left font-normal", !field.value && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}</Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus/></PopoverContent></Popover></FormItem>)} />
                             <FormField control={form.control} name="dayCount" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Day-Count Convention</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="30/360">30/360</SelectItem><SelectItem value="Actual/360">Actual/360</SelectItem><SelectItem value="Actual/365">Actual/365</SelectItem><SelectItem value="Actual/Actual">Actual/Actual</SelectItem></SelectContent></Select></FormItem>)} />
                        </div>
                        <Button type="submit" className="w-full">Calculate</Button>
                    </form>
                </Form>
                {result && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                        <h3 className="text-lg font-bold text-center mb-2">Pricing Results</h3>
                         <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-2 border rounded-lg bg-background"><span className="text-muted-foreground block">Dirty Price</span><span className="font-semibold text-primary">{currencySymbol}{result.dirtyPrice.toFixed(4)}</span></div>
                            <div className="p-2 border rounded-lg bg-background"><span className="text-muted-foreground block">Clean Price</span><span className="font-semibold text-primary">{currencySymbol}{result.cleanPrice.toFixed(4)}</span></div>
                            <div className="p-2 border rounded-lg bg-background"><span className="text-muted-foreground block">Accrued Interest</span><span className="font-semibold text-primary">{currencySymbol}{result.accruedInterest.toFixed(4)}</span></div>
                            <div className="p-2 border rounded-lg bg-background"><span className="text-muted-foreground block">Accrued Days</span><span className="font-semibold text-primary">{result.accruedDays}</span></div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default function BondCalculator() {
    return (
        <div className="space-y-8">
            <BondValueCalculator />
            <Separator />
            <BondPricingCalculator />
        </div>
    );
}
