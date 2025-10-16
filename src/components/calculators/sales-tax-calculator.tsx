
"use client";

import { useState, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '../ui/label';
import { RefreshCcw } from 'lucide-react';

export default function SalesTaxCalculator() {
    const [beforeTax, setBeforeTax] = useState('100');
    const [taxRate, setTaxRate] = useState('6.5');
    const [afterTax, setAfterTax] = useState('');

    const calculate = useCallback(() => {
        const numBefore = parseFloat(beforeTax);
        const numRate = parseFloat(taxRate);
        const numAfter = parseFloat(afterTax);

        if (!beforeTax) {
            if (!isNaN(numRate) && !isNaN(numAfter)) {
                setBeforeTax((numAfter / (1 + numRate / 100)).toFixed(2));
            }
        } else if (!taxRate) {
            if (!isNaN(numBefore) && !isNaN(numAfter) && numBefore !== 0) {
                setTaxRate((((numAfter / numBefore) - 1) * 100).toFixed(2));
            }
        } else {
            if (!isNaN(numBefore) && !isNaN(numRate)) {
                setAfterTax((numBefore * (1 + numRate / 100)).toFixed(2));
            }
        }
    }, [beforeTax, taxRate, afterTax]);

    const reset = useCallback(() => {
        setBeforeTax('');
        setTaxRate('');
        setAfterTax('');
    }, []);

    return (
        <Card className="w-full max-w-lg mx-auto shadow-lg">
            <CardHeader>
                <CardTitle className="text-center">Sales Tax Calculator</CardTitle>
                <CardDescription className="text-center">Enter any two values to calculate the third.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="before-tax">Before Tax Price</Label>
                    <Input id="before-tax" type="number" value={beforeTax} onChange={(e) => setBeforeTax(e.target.value)} placeholder="e.g., 100"/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="tax-rate">Sales Tax Rate (%)</Label>
                    <Input id="tax-rate" type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} placeholder="e.g., 8.25" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="after-tax">After Tax Price</Label>
                    <Input id="after-tax" type="number" value={afterTax} onChange={(e) => setAfterTax(e.target.value)} placeholder="Leave blank to calculate"/>
                </div>
                 <div className="flex gap-2">
                    <Button onClick={calculate} className="w-full">Calculate</Button>
                    <Button onClick={reset} variant="outline" aria-label="Reset">
                        <RefreshCcw className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
