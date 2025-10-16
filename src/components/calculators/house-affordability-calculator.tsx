
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
import { RefreshCcw, Home } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '../ui/separator';

const currencySymbol = '$';

// --- By Income Calculator ---

const incomeSchema = z.object({
  annualIncome: z.coerce.number().min(1000, "Income must be at least 1,000."),
  loanTerm: z.coerce.number().min(10).max(40),
  interestRate: z.coerce.number().min(0).max(30),
  monthlyDebt: z.coerce.number().min(0).optional(),
  downPayment: z.coerce.number().min(0).max(100).optional(),
  propertyTax: z.coerce.number().min(0).max(20).optional(),
  insurance: z.coerce.number().min(0).max(20).optional(),
  hoa: z.coerce.number().min(0).optional(),
  dtiRatio: z.string().default('28/36'),
});
type IncomeFormData = z.infer<typeof incomeSchema>;

interface IncomeResult {
    affordableHousePrice: number;
    monthlyPayment: number;
    loanAmount: number;
}

const dtiRatios: { [key: string]: { front: number, back: number } } = {
    '28/36': { front: 0.28, back: 0.36 },
    '31/43': { front: 0.31, back: 0.43 }, // FHA
    'custom': { front: 0.35, back: 0.45 }, // Example custom
};

function AffordabilityByIncome() {
    const [result, setResult] = useState<IncomeResult | null>(null);
    const form = useForm<IncomeFormData>({
        resolver: zodResolver(incomeSchema),
        defaultValues: { annualIncome: 120000, loanTerm: 30, interestRate: 6.279, monthlyDebt: 0, downPayment: 20, propertyTax: 1.5, insurance: 0.5, hoa: 0, dtiRatio: '28/36' },
    });

    function onSubmit(values: IncomeFormData) {
        const { annualIncome, loanTerm, interestRate, monthlyDebt = 0, downPayment = 0, propertyTax = 0, insurance = 0, hoa = 0, dtiRatio } = values;
        
        const monthlyIncome = annualIncome / 12;
        const dti = dtiRatios[dtiRatio];
        
        const maxTotalMonthlyPayment = monthlyIncome * dti.back;
        const maxHousingPayment = Math.min(monthlyIncome * dti.front, maxTotalMonthlyPayment - monthlyDebt);
        
        const monthlyTaxes = (propertyTax / 100) / 12; // as fraction of home price
        const monthlyInsurance = (insurance / 100) / 12; // as fraction of home price
        
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm * 12;

        const pAndI = (price: number) => {
            const loan = price * (1 - (downPayment / 100));
            return loan * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        };
        
        // Iteratively find the price
        let affordableHousePrice = 100000;
        for (let i = 0; i < 30; i++) {
            const currentPAndI = pAndI(affordableHousePrice);
            const currentOtherCosts = affordableHousePrice * (monthlyTaxes + monthlyInsurance) + hoa;
            const currentTotalPayment = currentPAndI + currentOtherCosts;
            if (Math.abs(currentTotalPayment - maxHousingPayment) < 1) break;
            affordableHousePrice = affordableHousePrice * (maxHousingPayment / currentTotalPayment);
        }

        const finalLoanAmount = affordableHousePrice * (1 - (downPayment / 100));
        setResult({
            affordableHousePrice: Math.round(affordableHousePrice),
            monthlyPayment: Math.round(maxHousingPayment),
            loanAmount: Math.round(finalLoanAmount),
        });
    }

    return (
        <Card className="w-full">
            <CardHeader><CardTitle>Affordability by Income</CardTitle></CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="annualIncome" render={({ field }) => (<FormItem><FormLabel>Annual Household Income</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="monthlyDebt" render={({ field }) => (<FormItem><FormLabel>Monthly Debt Payments</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="downPayment" render={({ field }) => (<FormItem><FormLabel>Down Payment (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="loanTerm" render={({ field }) => (<FormItem><FormLabel>Loan Term (Years)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Interest Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyTax" render={({ field }) => (<FormItem><FormLabel>Property Tax (%/year)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="insurance" render={({ field }) => (<FormItem><FormLabel>Home Insurance (%/year)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="hoa" render={({ field }) => (<FormItem><FormLabel>HOA Fees ($/month)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="dtiRatio" render={({ field }) => (<FormItem><FormLabel>Debt-to-Income (DTI) Ratio</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl><SelectContent><SelectItem value="28/36">Conventional (28/36)</SelectItem><SelectItem value="31/43">FHA (31/43)</SelectItem></SelectContent></Select></FormItem>)} />
                        <Button type="submit" className="w-full">Calculate</Button>
                    </form>
                </Form>
                 {result && (
                    <div className="p-4 bg-muted rounded-lg text-center mt-6 space-y-2 animate-fade-in">
                        <div className="p-2 border rounded-lg bg-background">
                            <h4 className="font-semibold text-muted-foreground">Affordable House Price</h4>
                            <p className="text-3xl font-bold text-primary">{currencySymbol}{result.affordableHousePrice.toLocaleString()}</p>
                        </div>
                        <div className="p-2 border rounded-lg bg-background">
                            <h4 className="font-semibold text-muted-foreground">Max Monthly Payment (PITI)</h4>
                            <p className="text-xl font-bold text-primary">{currencySymbol}{result.monthlyPayment.toLocaleString()}</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

// --- By Budget Calculator ---

const budgetSchema = z.object({
  monthlyBudget: z.coerce.number().min(100, "Budget must be at least 100."),
  loanTerm: z.coerce.number().min(10).max(40),
  interestRate: z.coerce.number().min(0).max(30),
  downPayment: z.coerce.number().min(0).max(100).optional(),
  propertyTax: z.coerce.number().min(0).max(20).optional(),
  insurance: z.coerce.number().min(0).max(20).optional(),
  hoa: z.coerce.number().min(0).optional(),
});
type BudgetFormData = z.infer<typeof budgetSchema>;

interface BudgetResult {
    affordableHousePrice: number;
    loanAmount: number;
    principalAndInterest: number;
}

function AffordabilityByBudget() {
    const [result, setResult] = useState<BudgetResult | null>(null);
    const form = useForm<BudgetFormData>({
        resolver: zodResolver(budgetSchema),
        defaultValues: { monthlyBudget: 3500, loanTerm: 30, interestRate: 6.279, downPayment: 20, propertyTax: 1.5, insurance: 0.5, hoa: 0 },
    });
    
    function onSubmit(values: BudgetFormData) {
        const { monthlyBudget, loanTerm, interestRate, downPayment = 0, propertyTax = 0, insurance = 0, hoa = 0 } = values;

        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm * 12;

        // Iteratively find the price
        let affordableHousePrice = 100000;
        for (let i = 0; i < 30; i++) {
            const loanAmount = affordableHousePrice * (1 - (downPayment / 100));
            const pAndI = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
            const otherCosts = affordableHousePrice * ((propertyTax / 100)/12 + (insurance / 100)/12) + hoa;
            const totalMonthly = pAndI + otherCosts;
            if(Math.abs(totalMonthly - monthlyBudget) < 1) break;
            affordableHousePrice = affordableHousePrice * (monthlyBudget / totalMonthly);
        }
        
        const finalLoanAmount = affordableHousePrice * (1 - (downPayment / 100));
        const finalPAndI = finalLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        
        setResult({
            affordableHousePrice: Math.round(affordableHousePrice),
            loanAmount: Math.round(finalLoanAmount),
            principalAndInterest: Math.round(finalPAndI),
        });
    }

    return (
        <Card className="w-full">
            <CardHeader><CardTitle>Affordability by Budget</CardTitle></CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="monthlyBudget" render={({ field }) => (<FormItem><FormLabel>Budget for House (per month)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="downPayment" render={({ field }) => (<FormItem><FormLabel>Down Payment (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="loanTerm" render={({ field }) => (<FormItem><FormLabel>Loan Term (Years)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="interestRate" render={({ field }) => (<FormItem><FormLabel>Interest Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="propertyTax" render={({ field }) => (<FormItem><FormLabel>Property Tax (%/year)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="insurance" render={({ field }) => (<FormItem><FormLabel>Home Insurance (%/year)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="hoa" render={({ field }) => (<FormItem><FormLabel>HOA Fees ($/month)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <Button type="submit" className="w-full">Calculate</Button>
                    </form>
                </Form>
                 {result && (
                    <div className="p-4 bg-muted rounded-lg text-center mt-6 space-y-2 animate-fade-in">
                        <div className="p-2 border rounded-lg bg-background">
                            <h4 className="font-semibold text-muted-foreground">Affordable House Price</h4>
                            <p className="text-3xl font-bold text-primary">{currencySymbol}{result.affordableHousePrice.toLocaleString()}</p>
                        </div>
                         <div className="p-2 border rounded-lg bg-background">
                            <h4 className="font-semibold text-muted-foreground">Loan Amount</h4>
                            <p className="text-xl font-bold text-primary">{currencySymbol}{result.loanAmount.toLocaleString()}</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

// Main component to render both calculators
export default function HouseAffordabilityCalculator() {
    return (
        <div className="space-y-8">
            <AffordabilityByIncome />
            <Separator />
            <AffordabilityByBudget />
        </div>
    );
}
