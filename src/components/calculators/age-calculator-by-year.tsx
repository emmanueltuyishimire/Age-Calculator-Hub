
"use client";

import { useState } from 'react';
import { RefreshCcw } from 'lucide-react';
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
import { AlertCircle } from "lucide-react";

export default function AgeCalculatorByYear() {
  const [birthYear, setBirthYear] = useState('');
  const [age, setAge] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const year = parseInt(birthYear, 10);
    const currentYear = new Date().getFullYear();

    if (isNaN(year) || year < 1000 || year > currentYear) {
        setError(`Please enter a valid birth year between 1000 and ${currentYear}.`);
        setAge(null);
        return;
    }
      
    setError(null);
    const calculatedAge = currentYear - year;
    setAge(calculatedAge);
  };

  const handleReset = () => {
      setBirthYear('');
      setAge(null);
      setError(null);
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg animate-fade-in">
    <CardHeader>
        <CardTitle className="text-center">Calculate Age From Year</CardTitle>
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
            <Label htmlFor='birth-year'>Year of Birth</Label>
            <div className="flex gap-2">
                <Input 
                    id="birth-year"
                    placeholder="e.g., 1990" 
                    value={birthYear} 
                    onChange={e => setBirthYear(e.target.value)} 
                    aria-label="Year of Birth"
                />
            </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={handleCalculate} className="w-full">Calculate Age</Button>
        <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset">
            <RefreshCcw className="mr-2 h-4 w-4" /> Reset
        </Button>
        </div>

        {age !== null && (
          
            <div className="p-6 bg-muted rounded-lg text-center space-y-2 animate-fade-in mt-4">
                <div>
                <h3 className="text-lg font-medium text-muted-foreground">Estimated Age in {new Date().getFullYear()}:</h3>
                <div className="flex justify-center items-baseline space-x-2">
                    <span className="text-4xl font-bold text-primary">{age}</span>
                    <span className="text-xl text-muted-foreground">years old</span>
                </div>
                </div>
            </div>
            
        )}
    </CardContent>
    </Card>
  );
}
