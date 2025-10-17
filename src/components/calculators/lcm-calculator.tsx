
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

const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

export default function LcmCalculator() {
  const [input, setInput] = useState('330, 75, 450, 225');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = useCallback(() => {
    const numbers = input.split(',')
      .map(s => s.trim())
      .filter(s => s !== '')
      .map(s => parseInt(s, 10));

    if (numbers.some(isNaN) || numbers.length < 2) {
      setError("Please enter at least two valid numbers, separated by commas.");
      setResult(null);
      return;
    }
    
    setError(null);
    const absNumbers = numbers.map(Math.abs);
    const calculatedLcm = absNumbers.reduce((acc, val) => lcm(acc, val));
    setResult(calculatedLcm);
  }, [input]);

  const handleReset = useCallback(() => {
    setInput('');
    setResult(null);
    setError(null);
  }, []);

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">LCM Calculator</CardTitle>
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
            <Label htmlFor='lcm-input'>Numbers (comma-separated)</Label>
            <Input 
                id="lcm-input"
                value={input} 
                onChange={e => setInput(e.target.value)} 
                aria-label="Numbers for LCM calculation"
            />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
            <Button onClick={handleCalculate} className="w-full">Calculate LCM</Button>
            <Button onClick={handleReset} variant="outline" className="w-full md:w-auto" aria-label="Reset">
                <RefreshCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
            <ShareButton title="LCM Calculator" text="Find the Least Common Multiple with this easy calculator!" url="/lcm-calculator" />
        </div>

        {result !== null && (
            <div className="p-6 bg-muted rounded-lg text-center space-y-2 animate-fade-in mt-4">
                <div>
                    <h3 className="text-lg font-medium text-muted-foreground">Least Common Multiple (LCM):</h3>
                    <p className="text-3xl font-bold text-primary">{result.toLocaleString()}</p>
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
