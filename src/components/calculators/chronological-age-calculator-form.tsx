
"use client";

import { useState, useEffect, useCallback } from 'react';
import { intervalToDuration, differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, differenceInWeeks, differenceInMonths, isValid, isFuture, format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '../ui/label';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCcw } from "lucide-react"
import ShareButton from '../share-button';
import { Input } from '../ui/input';

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

export default function ChronologicalAgeCalculatorForm() {
  const [dob, setDob] = useState({ day: '', month: '', year: ''});
  const [ageAt, setAgeAt] = useState({ day: '', month: '', year: ''});
  const [age, setAge] = useState<Age | undefined>();
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
        const savedDob = localStorage.getItem('ageCalculatorDob');
        const savedAgeAt = localStorage.getItem('ageCalculatorAgeAt');
        if (savedDob) {
            const parsedDob = JSON.parse(savedDob);
            setDob(parsedDob)
        }
        if (savedAgeAt) {
            const parsedAgeAt = JSON.parse(savedAgeAt);
            setAgeAt(parsedAgeAt);
        } else {
             const today = new Date();
             setAgeAt({
                day: String(today.getDate()),
                month: String(today.getMonth() + 1),
                year: String(today.getFullYear()),
            });
        }
    } catch(e) {
        // ignore
    }
  }, []);

  const getDobDate = useCallback(() => {
    const { year, month, day } = dob;
    if (!year || !month || !day) return null;
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    if (date.getFullYear() !== parseInt(year) || date.getMonth() !== parseInt(month) - 1 || date.getDate() !== parseInt(day)) return null;
    return date;
  }, [dob]);

  const getAgeAtDate = useCallback(() => {
    const { year, month, day } = ageAt;
    if (!year || !month || !day) return null;
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    if (date.getFullYear() !== parseInt(year) || date.getMonth() !== parseInt(month) - 1 || date.getDate() !== parseInt(day)) return null;
    return date;
  }, [ageAt]);

  const calculateAge = useCallback(() => {
    const dobDate = getDobDate();
    const ageAtDateVal = getAgeAtDate();

    if (!dobDate || !ageAtDateVal) {
      return;
    }
    
    if (!isValid(dobDate)) {
        setError("Please enter a valid date of birth.");
        setIsCalculating(false);
        setAge(undefined);
        return;
    }
    if (!isValid(ageAtDateVal)) {
        setError("Please enter a valid 'Age at' date.");
        setIsCalculating(false);
        setAge(undefined);
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
  }, [getDobDate, getAgeAtDate, isCalculating]);

  const handleCalculate = () => {
    const dobDate = getDobDate();
    if (!dobDate || !isValid(dobDate)) {
        setError("Please enter a valid date of birth.");
        return;
    }
    const ageAtDate = getAgeAtDate();
    if (!ageAtDate || !isValid(ageAtDate)) {
        setError("Please enter a valid 'Age at' date.");
        return;
    }

    localStorage.setItem('ageCalculatorDob', JSON.stringify(dob));
    localStorage.setItem('ageCalculatorAgeAt', JSON.stringify(ageAt));
    setIsCalculating(true);
    calculateAge();
  };
  
  const handleReset = () => {
      setDob({day: '', month: '', year: ''});
      const today = new Date();
      setAgeAt({
        day: String(today.getDate()),
        month: String(today.getMonth() + 1),
        year: String(today.getFullYear()),
      });
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
  }, [isCalculating, calculateAge]);

  useEffect(() => {
    setIsCalculating(false);
    setAge(undefined);
  }, [dob, ageAt])

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg animate-fade-in">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className='space-y-2'>
            <Label htmlFor="dob-day-form">Date of Birth</Label>
            <div className="flex gap-2">
                <Input id="dob-day-form" placeholder="DD" value={dob.day} onChange={e => setDob(d => ({...d, day: e.target.value}))} aria-label="Day of Birth" />
                <Input placeholder="MM" value={dob.month} onChange={e => setDob(d => ({...d, month: e.target.value}))} aria-label="Month of Birth" />
                <Input placeholder="YYYY" value={dob.year} onChange={e => setDob(d => ({...d, year: e.target.value}))} aria-label="Year of Birth" />
            </div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor="age-at-day-form">Age at the Date of</Label>
            <div className="flex gap-2">
              <Input id="age-at-day-form" placeholder="DD" value={ageAt.day} onChange={e => setAgeAt(d => ({...d, day: e.target.value}))} aria-label="Day for age calculation" />
              <Input placeholder="MM" value={ageAt.month} onChange={e => setAgeAt(d => ({...d, month: e.target.value}))} aria-label="Month for age calculation" />
              <Input placeholder="YYYY" value={ageAt.year} onChange={e => setAgeAt(d => ({...d, year: e.target.value}))} aria-label="Year for age calculation" />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2">
            <Button onClick={handleCalculate} className="w-full" aria-label="Calculate Age">Calculate Age</Button>
            <Button onClick={handleReset} variant="outline" className="w-full md:w-auto" aria-label="Reset">
                <RefreshCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
            <ShareButton title="Online Age Calculator" text="Find out your exact age in real-time with this cool age calculator!" url="/age-calculator" />
        </div>

        {age && (
          
            <div className="p-4 sm:p-6 bg-muted rounded-lg text-center space-y-4 animate-fade-in">
              <div>
                <h3 className="text-md sm:text-lg font-medium mb-2 text-muted-foreground">Your Exact Age:</h3>
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
                 <h3 className="text-md sm:text-lg font-medium mb-2 mt-4 text-muted-foreground">In Other Units:</h3>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs sm:text-sm text-foreground">
                    <p><span className='font-semibold'>{age.totalMonths.toLocaleString()}</span> months, <span className='font-semibold'>{age.days}</span> days</p>
                    <p><span className='font-semibold'>{age.totalWeeks.toLocaleString()}</span> weeks, <span className='font-semibold'>{age.totalDays % 7}</span> days</p>
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
