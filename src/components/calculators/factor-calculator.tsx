
"use client";

import { useState, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCcw } from "lucide-react";
import ShareButton from '../share-button';

interface Result {
  factors: number[];
  primeFactors: number[];
}

const findFactors = (n: number): number[] => {
  if (n === 0) return [];
  const num = Math.abs(n);
  const factors = new Set<number>();
  for (let i = 1; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      factors.add(i);
      factors.add(num / i);
    }
  }
  return Array.from(factors).sort((a, b) => a - b);
};

const findPrimeFactors = (n: number): number[] => {
  if (n < 2) return [];
  const factors: number[] = [];
  let num = n;
  
  while (num % 2 === 0) {
    factors.push(2);
    num /= 2;
  }
  
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    while (num % i === 0) {
      factors.push(i);
      num /= i;
    }
  }
  
  if (num > 2) {
    factors.push(num);
  }
  
  return factors;
};

export default function FactorCalculator() {
  const [input, setInput] = useState('120');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = useCallback(() => {
    const num = parseInt(input, 10);

    if (isNaN(num)) {
      setError("Please enter a valid integer.");
      setResult(null);
      return;
    }

    if (Math.abs(num) > 1000000000000000) {
      setError("Number is too large for prime factorization. Please enter a smaller number.");
      setResult(null);
      return;
    }
    
    setError(null);
    setResult({
      factors: findFactors(num),
      primeFactors: findPrimeFactors(Math.abs(num)),
    });
  }, [input]);

  const handleReset = useCallback(() => {
    setInput('');
    setResult(null);
    setError(null);
  }, []);

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">Factor Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        <div className="space-y-2">
            <Label htmlFor='factor-input'>Integer to Factor</Label>
            <Input 
                id="factor-input"
                type="number"
                value={input} 
                onChange={e => setInput(e.target.value)} 
                aria-label="Integer for factorization"
            />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
            <Button onClick={handleCalculate} className="w-full">Calculate Factors</Button>
            <Button onClick={handleReset} variant="outline" className="w-full md:w-auto" aria-label="Reset">
                <RefreshCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
            <ShareButton title="Factor Calculator" text="Find the factors and prime factors of any number with this calculator!" url="/factor-calculator" />
        </div>

        {result !== null && (
            <div className="p-6 bg-muted rounded-lg text-center space-y-4 animate-fade-in mt-4">
                <div>
                    <h3 className="text-lg font-medium text-muted-foreground">Factors:</h3>
                    <p className="text-md font-mono text-primary break-words">{result.factors.join(', ')}</p>
                </div>
                 <div>
                    <h3 className="text-lg font-medium text-muted-foreground">Prime Factorization:</h3>
                    <p className="text-md font-mono text-primary break-words">{result.primeFactors.join(' × ')}</p>
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
