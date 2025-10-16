
"use client";

import { useState, useCallback } from 'react';
import { intervalToDuration, isValid, isFuture, format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCcw } from "lucide-react"
import ShareButton from '../share-button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';


interface AgeResult {
  years?: number;
  months?: number;
  days?: number;
  text: string;
}

const months = Array.from({ length: 12 }, (_, i) => ({ value: (i + 1).toString(), label: format(new Date(0, i), 'MMMM') }));
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 125 }, (_, i) => currentYear - i);

export default function HowOldIsCalculator() {
  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');

  const [ageResult, setAgeResult] = useState<AgeResult | undefined>();
  const [error, setError] = useState<string | null>(null);

  const getDob = useCallback((): Date | null => {
    if (dobYear && dobMonth && dobDay) {
        const date = new Date(parseInt(dobYear), parseInt(dobMonth) - 1, parseInt(dobDay));
        if (isValid(date)) return date;
    }
    return null;
  }, [dobDay, dobMonth, dobYear]);

  const handleCalculate = useCallback(() => {
    setError(null);
    setAgeResult(undefined);

    const dobDate = getDob();
    if (!dobDate || !isValid(dobDate)) {
      setError("Please enter a valid date of birth.");
      return;
    }
    if (isFuture(dobDate)) {
      setError("The date of birth cannot be in the future.");
      return;
    }
    const duration = intervalToDuration({ start: dobDate, end: new Date() });
    setAgeResult({
      years: duration.years,
      months: duration.months,
      days: duration.days,
      text: `Someone born on ${format(dobDate, 'MMMM d, yyyy')} is currently:`
    });
  }, [getDob]);
  
  const handleReset = useCallback(() => {
      setDobDay(''); setDobMonth(''); setDobYear('');
      setAgeResult(undefined);
      setError(null);
  }, []);

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle>Find Out Their Age</CardTitle>
        <CardDescription>
          Enter a date of birth to find out how old someone is.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className='space-y-2'>
            <Label>Date of Birth</Label>
            <div className="flex gap-2">
                <Select value={dobMonth} onValueChange={setDobMonth}>
                    <SelectTrigger aria-label="Birth Month"><SelectValue placeholder="Month" /></SelectTrigger>
                    <SelectContent>{months.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}</SelectContent>
                </Select>
                <Input type="number" placeholder="Day" value={dobDay} onChange={e => setDobDay(e.target.value)} aria-label="Birth Day" />
                <Select value={dobYear} onValueChange={setDobYear}>
                    <SelectTrigger aria-label="Birth Year"><SelectValue placeholder="Year" /></SelectTrigger>
                    <SelectContent>{years.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}</SelectContent>
                </Select>
            </div>
        </div>
        
        {error && (
            <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        <div className="flex flex-col md:flex-row gap-2">
            <Button onClick={handleCalculate} className="w-full" aria-label="Calculate Age">Find Out How Old They Are</Button>
            <Button onClick={handleReset} variant="outline" className="w-full md:w-auto" aria-label="Reset">
                <RefreshCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
            <ShareButton title="How Old Is...?" text="A quick tool to find out anyone's age from their birth date!" url="/how-old-is" />
        </div>

        {ageResult && (
            <div className="p-4 sm:p-6 bg-muted rounded-lg text-center space-y-2 animate-fade-in">
              <p className="text-md sm:text-lg text-muted-foreground">
                {ageResult.text}
              </p>
              <div className="flex justify-center items-baseline flex-wrap gap-x-2 sm:gap-x-4 gap-y-2">
                {ageResult.years !== undefined && <div><span className="text-2xl sm:text-4xl font-bold text-primary">{ageResult.years}</span> <span className="text-lg sm:text-xl text-muted-foreground">years</span></div>}
                {ageResult.months !== undefined && <div><span className="text-2xl sm:text-4xl font-bold text-primary">{ageResult.months}</span> <span className="text-lg sm:text-xl text-muted-foreground">months</span></div>}
                {ageResult.days !== undefined && <div><span className="text-2xl sm:text-4xl font-bold text-primary">{ageResult.days}</span> <span className="text-lg sm:text-xl text-muted-foreground">days</span></div>}
              </div>
              <p className="text-md sm:text-lg text-muted-foreground">old.</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
