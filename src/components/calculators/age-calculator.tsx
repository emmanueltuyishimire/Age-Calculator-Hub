
"use client";

import { useState, useEffect } from 'react';
import { intervalToDuration, differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, differenceInWeeks, differenceInMonths, isValid, isFuture } from 'date-fns';
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

interface Age {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
}

export default function AgeCalculator() {
  const [dob, setDob] = useState({ day: '', month: '', year: '' });
  const [ageAt, setAgeAt] = useState({ day: '', month: '', year: '' });
  const [age, setAge] = useState<Age | undefined>();
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const now = new Date();
    setAgeAt({ day: String(now.getDate()), month: String(now.getMonth() + 1), year: String(now.getFullYear())});
    
    try {
        const savedDob = localStorage.getItem('ageCalculatorDob');
        const savedAgeAt = localStorage.getItem('ageCalculatorAgeAt');
        if (savedDob) {
            setDob(JSON.parse(savedDob));
        }
        if (savedAgeAt) {
            setAgeAt(JSON.parse(savedAgeAt));
        }
    } catch(e) {
        // ignore
    }
  }, []);

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

  const calculateAge = () => {
    const dobDate = parseDate(dob.day, dob.month, dob.year);
    const ageAtDateVal = parseDate(ageAt.day, ageAt.month, ageAt.year);

    if (!dobDate || !ageAtDateVal) {
      return;
    }
    
    if (isFuture(dobDate)) {
        setError("Date of birth cannot be in the future.");
        setIsCalculating(false);
        setAge(undefined);
        return;
    }

    if (ageAtDateVal < dobDate) {
      setError("The 'Age at Date of' cannot be before the date of birth.");
      setIsCalculating(false);
      setAge(undefined);
      return;
    }
      
    setError(null);
    const endOfCalculation = isCalculating ? new Date() : ageAtDateVal;

    const duration = intervalToDuration({
      start: dobDate,
      end: endOfCalculation,
    });

    const totalSeconds = differenceInSeconds(endOfCalculation, dobDate);
    const totalMinutes = differenceInMinutes(endOfCalculation, dobDate);
    const totalHours = differenceInHours(endOfCalculation, dobDate);
    const totalDays = differenceInDays(endOfCalculation, dobDate);
    const totalWeeks = differenceInWeeks(endOfCalculation, dobDate);
    const totalMonths = differenceInMonths(endOfCalculation, dobDate);

    setAge({
      years: duration.years || 0,
      months: duration.months || 0,
      days: duration.days || 0,
      hours: duration.hours || 0,
      minutes: duration.minutes || 0,
      seconds: duration.seconds || 0,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
    });
  };

  const handleCalculate = () => {
    const dobDate = parseDate(dob.day, dob.month, dob.year);
    if (!dobDate) {
        setError("Please enter a valid date of birth.");
        return;
    }
    const ageAtDate = parseDate(ageAt.day, ageAt.month, ageAt.year);
    if (!ageAtDate) {
        setError("Please enter a valid 'Age at' date.");
        return;
    }

    localStorage.setItem('ageCalculatorDob', JSON.stringify(dob));
    localStorage.setItem('ageCalculatorAgeAt', JSON.stringify(ageAt));
    setIsCalculating(true);
    calculateAge();
  };
  
  const handleReset = () => {
      setDob({ day: '', month: '', year: '' });
      const now = new Date();
      setAgeAt({ day: String(now.getDate()), month: String(now.getMonth() + 1), year: String(now.getFullYear())});
      setAge(undefined);
      setIsCalculating(false);
      setError(null);
      localStorage.removeItem('ageCalculatorDob');
      localStorage.removeItem('ageCalculatorAgeAt');
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCalculating) {
      interval = setInterval(() => {
        calculateAge();
      }, 1000);
    }
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCalculating, dob, ageAt]);

  useEffect(() => {
    setIsCalculating(false);
    setAge(undefined);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dob.day, dob.month, dob.year, ageAt.day, ageAt.month, ageAt.year])

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle>Age Calculator</CardTitle>
        <CardDescription>
          Calculate the age or interval between two dates, displayed in years, months, days, and updating live to the second.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className='space-y-2'>
            <Label htmlFor="dob-day-main">Date of Birth</Label>
            <div className="flex gap-2">
              <Input id="dob-day-main" placeholder="DD" value={dob.day} onChange={e => setDob({...dob, day: e.target.value})} aria-label="Day of Birth"/>
              <Input id="dob-month-main" placeholder="MM" value={dob.month} onChange={e => setDob({...dob, month: e.target.value})} aria-label="Month of Birth"/>
              <Input id="dob-year-main" placeholder="YYYY" value={dob.year} onChange={e => setDob({...dob, year: e.target.value})} aria-label="Year of Birth"/>
            </div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor="ageAt-day-main">Age at the Date of</Label>
            <div className="flex gap-2">
              <Input id="ageAt-day-main" placeholder="DD" value={ageAt.day} onChange={e => setAgeAt({...ageAt, day: e.target.value})} aria-label="Current Day"/>
              <Input id="ageAt-month-main" placeholder="MM" value={ageAt.month} onChange={e => setAgeAt({...ageAt, month: e.target.value})} aria-label="Current Month"/>
              <Input id="ageAt-year-main" placeholder="YYYY" value={ageAt.year} onChange={e => setAgeAt({...ageAt, year: e.target.value})} aria-label="Current Year"/>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleCalculate} className="w-full">Calculate Your Age Now Online</Button>
            <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto">
                <RefreshCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
        </div>

        {age && (
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
              <div>
                 <h3 className="text-md sm:text-lg font-medium mb-2 mt-4">In Other Units:</h3>
                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
                    <p><span className='font-semibold'>{age.totalMonths.toLocaleString()}</span> months <span className='font-semibold'>{age.days}</span> days</p>
                    <p><span className='font-semibold'>{age.totalWeeks.toLocaleString()}</span> weeks <span className='font-semibold'>{age.days}</span> days</p>
                    <p><span className='font-semibold'>{age.totalDays.toLocaleString()}</span> days</p>
                    <p><span className='font-semibold'>{age.totalHours.toLocaleString()}</span> hours</p>
                    <p><span className='font-semibold'>{age.totalMinutes.toLocaleString()}</span> minutes</p>
                    <p><span className='font-semibold'>{age.totalSeconds.toLocaleString()}</span> seconds</p>
                 </div>
              </div>
            </div>
          )}
      </CardContent>
    </Card>
  );
}
