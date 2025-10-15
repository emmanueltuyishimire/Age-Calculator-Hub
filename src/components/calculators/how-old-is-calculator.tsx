
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
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
import { Label } from '../ui/label';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCcw } from "lucide-react"
import ShareButton from '../share-button';

interface Age {
  years: number;
  months: number;
  days: number;
}

export default function HowOldIsCalculator() {
  const [dob, setDob] = useState({ day: '', month: '', year: '' });
  const [age, setAge] = useState<Age | undefined>();
  const [submittedDob, setSubmittedDob] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const parseDate = (dayStr: string, monthStr: string, yearStr: string): Date | null => {
    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10) - 1;
    const year = parseInt(yearStr, 10);
    if (isNaN(day) || isNaN(month) || isNaN(year) || year < 1000 || year > 9999) return null;
    const date = new Date(year, month, day);
    if (isValid(date) && date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
      return date;
    }
    return null;
  };

  const calculateAge = useCallback(() => {
    const dobDate = parseDate(dob.day, dob.month, dob.year);
    const now = new Date();

    if (!dobDate) return;

    const duration = intervalToDuration({ start: dobDate, end: now });

    setAge({
      years: duration.years || 0,
      months: duration.months || 0,
      days: duration.days || 0,
    });
  }, [dob.day, dob.month, dob.year]);

  const handleCalculate = () => {
    const dobDate = parseDate(dob.day, dob.month, dob.year);
    if (!dobDate) {
        setError("Please enter a valid date of birth.");
        setAge(undefined);
        setSubmittedDob(null);
        return;
    }
    if (isFuture(dobDate)) {
        setError("The date of birth cannot be in the future.");
        setAge(undefined);
        setSubmittedDob(null);
        return;
    }
    
    setError(null);
    setSubmittedDob(dobDate);
    calculateAge();
  };
  
  const handleReset = () => {
      setDob({ day: '', month: '', year: '' });
      setAge(undefined);
      setError(null);
      setSubmittedDob(null);
  }

  const handleDobChange = (field: 'day' | 'month' | 'year', value: string) => {
    setDob(prev => ({...prev, [field]: value}));
    if (field === 'day' && value.length === 2) monthRef.current?.focus();
    if (field === 'month' && value.length === 2) yearRef.current?.focus();
    setAge(undefined);
    setSubmittedDob(null);
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle>Find Out Their Age</CardTitle>
        <CardDescription>
          Enter a date of birth below.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
            <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        <div className='space-y-2'>
            <Label htmlFor="dob-day-howold">Date of Birth</Label>
            <div className="flex gap-2">
              <Input id="dob-day-howold" placeholder="DD" value={dob.day} onChange={e => handleDobChange('day', e.target.value)} maxLength={2} aria-label="Day of Birth"/>
              <Input ref={monthRef} id="dob-month-howold" placeholder="MM" value={dob.month} onChange={e => handleDobChange('month', e.target.value)} maxLength={2} aria-label="Month of Birth"/>
              <Input ref={yearRef} id="dob-year-howold" placeholder="YYYY" value={dob.year} onChange={e => handleDobChange('year', e.target.value)} maxLength={4} aria-label="Year of Birth"/>
            </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2">
            <Button onClick={handleCalculate} className="w-full">Find Out How Old They Are</Button>
            <Button onClick={handleReset} variant="outline" className="w-full md:w-auto" aria-label="Reset">
                <RefreshCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
            <ShareButton title="How Old Is...?" text="A quick tool to find out anyone's age from their birth date!" url="/how-old-is" />
        </div>

        {age && submittedDob && (
            <div className="p-4 sm:p-6 bg-muted rounded-lg text-center space-y-2 animate-fade-in">
              <p className="text-md sm:text-lg text-muted-foreground">
                Someone born on <strong className="text-primary">{format(submittedDob, 'MMMM d, yyyy')}</strong> is currently:
              </p>
              <div className="flex justify-center items-baseline flex-wrap gap-x-2 sm:gap-x-4 gap-y-2">
                <div><span className="text-2xl sm:text-4xl font-bold text-primary">{age.years}</span> <span className="text-lg sm:text-xl text-muted-foreground">years</span></div>
                <div><span className="text-2xl sm:text-4xl font-bold text-primary">{age.months}</span> <span className="text-lg sm:text-xl text-muted-foreground">months</span></div>
                <div><span className="text-2xl sm:text-4xl font-bold text-primary">{age.days}</span> <span className="text-lg sm:text-xl text-muted-foreground">days</span></div>
              </div>
              <p className="text-md sm:text-lg text-muted-foreground">old.</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
