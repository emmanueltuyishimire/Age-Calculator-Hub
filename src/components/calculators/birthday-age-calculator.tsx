
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { format, intervalToDuration, isFuture, isValid, addYears } from 'date-fns';
import { RefreshCcw, Gift } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import ShareButton from '../share-button';

interface Age {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface BirthdayCountdown {
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function BirthdayAgeCalculator() {
  const [dob, setDob] = useState({ day: '', month: '', year: '' });
  const [age, setAge] = useState<Age | undefined>();
  const [countdown, setCountdown] = useState<BirthdayCountdown | undefined>();
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
        const savedDob = localStorage.getItem('birthdayAgeCalculatorDob');
        if (savedDob) {
            setDob(JSON.parse(savedDob));
        }
    } catch(e) {
        // ignore
    }
  }, []);

  const parseDate = (dayStr: string, monthStr: string, yearStr: string): Date | null => {
    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10) - 1;
    const year = parseInt(yearStr, 10);
    if (isNaN(day) || isNaN(month) || isNaN(year) || year < 1000 || year > 3000) return null;
    const date = new Date(year, month, day);
    if (isValid(date) && date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
      return date;
    }
    return null;
  };

  const calculateAgeAndCountdown = useCallback(() => {
    const dobDate = parseDate(dob.day, dob.month, dob.year);

    if (!dobDate) return;
    
    const now = new Date();

    // Calculate age
    const ageDuration = intervalToDuration({
      start: dobDate,
      end: now,
    });
    setAge({
      years: ageDuration.years || 0,
      months: ageDuration.months || 0,
      days: ageDuration.days || 0,
      hours: ageDuration.hours || 0,
      minutes: ageDuration.minutes || 0,
      seconds: ageDuration.seconds || 0,
    });

    // Calculate next birthday
    let nextBirthday = new Date(now.getFullYear(), dobDate.getMonth(), dobDate.getDate());
    if (now > nextBirthday) {
        nextBirthday = addYears(nextBirthday, 1);
    }

    const countdownDuration = intervalToDuration({
        start: now,
        end: nextBirthday
    });
    setCountdown({
      months: countdownDuration.months || 0,
      days: countdownDuration.days || 0,
      hours: countdownDuration.hours || 0,
      minutes: countdownDuration.minutes || 0,
      seconds: countdownDuration.seconds || 0,
    });
  }, [dob.day, dob.month, dob.year]);

  const handleCalculate = () => {
    const dobDate = parseDate(dob.day, dob.month, dob.year);
    if (!dobDate) {
        setError("Please enter a valid date of birth.");
        setIsCalculating(false);
        setAge(undefined);
        setCountdown(undefined);
        return;
    }
     if (isFuture(dobDate)) {
      setError("Date of birth cannot be in the future.");
      setIsCalculating(false);
      setAge(undefined);
      setCountdown(undefined);
      return;
    }
    setError(null);
    localStorage.setItem('birthdayAgeCalculatorDob', JSON.stringify(dob));
    setIsCalculating(true);
    calculateAgeAndCountdown();
  };

  const handleReset = () => {
      setDob({ day: '', month: '', year: '' });
      setAge(undefined);
      setCountdown(undefined);
      setIsCalculating(false);
      setError(null);
      localStorage.removeItem('birthdayAgeCalculatorDob');
  }
  
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isCalculating) {
      calculateAgeAndCountdown(); // Initial calculation
      interval = setInterval(calculateAgeAndCountdown, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCalculating, calculateAgeAndCountdown]);

  // Reset calculation when input changes
  useEffect(() => {
    setIsCalculating(false);
    setAge(undefined);
    setCountdown(undefined);
  }, [dob]);

  const handleDobChange = (field: 'day' | 'month' | 'year', value: string) => {
    setDob(prev => ({...prev, [field]: value}));
    if (field === 'day' && value.length === 2) monthRef.current?.focus();
    if (field === 'month' && value.length === 2) yearRef.current?.focus();
  };

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-lg mx-auto shadow-lg animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle>Enter Your Birthday</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
             <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 gap-4">
            <div className='space-y-2'>
              <Label htmlFor='dob-day'>Date of Birth</Label>
              <div className="flex gap-2">
                <Input id="dob-day" placeholder="DD" value={dob.day} onChange={e => handleDobChange('day', e.target.value)} maxLength={2} aria-label="Day of Birth"/>
                <Input ref={monthRef} id="dob-month" placeholder="MM" value={dob.month} onChange={e => handleDobChange('month', e.target.value)} maxLength={2} aria-label="Month of Birth"/>
                <Input ref={yearRef} id="dob-year" placeholder="YYYY" value={dob.year} onChange={e => handleDobChange('year', e.target.value)} maxLength={4} aria-label="Year of Birth"/>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2">
            <Button onClick={handleCalculate} className="w-full">Calculate Age & Birthday</Button>
            <Button onClick={handleReset} variant="outline" className="w-full md:w-auto" aria-label="Reset">
                <RefreshCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
            <ShareButton title="Birthday Age Calculator" text="Check out this fun birthday and age calculator!" url="/birthday-age-calculator" />
          </div>

          {isCalculating && age && (
            <>
            <div className="p-4 sm:p-6 bg-muted rounded-lg text-center space-y-4 animate-fade-in">
              <div>
                <h3 className="text-md sm:text-lg font-medium mb-2">Your Exact Age:</h3>
                <div className="flex justify-center items-baseline flex-wrap gap-x-2 sm:gap-x-4 gap-y-2">
                  <div><span className="text-2xl sm:text-3xl font-bold text-primary">{age.years}</span> <span className="text-md sm:text-lg text-muted-foreground">years</span></div>
                  <div><span className="text-2xl sm:text-3xl font-bold text-primary">{age.months}</span> <span className="text-md sm:text-lg text-muted-foreground">months</span></div>
                  <div><span className="text-2xl sm:text-3xl font-bold text-primary">{age.days}</span> <span className="text-md sm:text-lg text-muted-foreground">days</span></div>
                </div>
                 <div className="flex justify-center items-baseline flex-wrap gap-x-2 sm:gap-x-4 gap-y-2 mt-2">
                  <div><span className="text-xl sm:text-2xl font-bold text-primary">{age.hours}</span> <span className="text-sm sm:text-base text-muted-foreground">hours</span></div>
                  <div><span className="text-xl sm:text-2xl font-bold text-primary">{age.minutes}</span> <span className="text-sm sm:text-base text-muted-foreground">minutes</span></div>
                  <div><span className="text-xl sm:text-2xl font-bold text-primary">{age.seconds}</span> <span className="text-sm sm:text-base text-muted-foreground">seconds</span></div>
                </div>
              </div>
            </div>

            {countdown && (
                <div className="p-4 sm:p-6 bg-muted rounded-lg text-center space-y-4 mt-4 animate-fade-in">
                    <div className="flex justify-center items-center gap-2">
                        <Gift className="h-6 w-6 text-primary" />
                        <h3 className="text-md sm:text-lg font-medium">Countdown to Your Next Birthday:</h3>
                    </div>
                    <div className="flex justify-center items-baseline flex-wrap gap-x-2 sm:gap-x-4 gap-y-2">
                        <div><span className="text-2xl sm:text-3xl font-bold text-primary">{countdown.months}</span> <span className="text-md sm:text-lg text-muted-foreground">months</span></div>
                        <div><span className="text-2xl sm:text-3xl font-bold text-primary">{countdown.days}</span> <span className="text-md sm:text-lg text-muted-foreground">days</span></div>
                    </div>
                    <div className="flex justify-center items-baseline flex-wrap gap-x-2 sm:gap-x-4 gap-y-2 mt-2">
                        <div><span className="text-xl sm:text-2xl font-bold text-primary">{countdown.hours}</span> <span className="text-sm sm:text-base text-muted-foreground">hours</span></div>
                        <div><span className="xl sm:text-2xl font-bold text-primary">{countdown.minutes}</span> <span className="text-sm sm:text-base text-muted-foreground">minutes</span></div>
                        <div><span className="xl sm:text-2xl font-bold text-primary">{countdown.seconds}</span> <span className="text-sm sm:text-base text-muted-foreground">seconds</span></div>
                    </div>
                </div>
            )}
            
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

    
