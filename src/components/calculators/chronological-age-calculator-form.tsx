
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
import { AlertCircle, CalendarIcon, RefreshCcw } from "lucide-react"
import ShareButton from '../share-button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '../ui/calendar';

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
  const [dob, setDob] = useState<Date | undefined>();
  const [ageAt, setAgeAt] = useState<Date | undefined>(new Date());
  const [age, setAge] = useState<Age | undefined>();
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
        const savedDob = localStorage.getItem('ageCalculatorDob');
        const savedAgeAt = localStorage.getItem('ageCalculatorAgeAt');
        if (savedDob) {
            const parsedDob = new Date(JSON.parse(savedDob));
            if(isValid(parsedDob)) setDob(parsedDob);
        }
        if (savedAgeAt) {
            const parsedAgeAt = new Date(JSON.parse(savedAgeAt));
            if(isValid(parsedAgeAt)) setAgeAt(parsedAgeAt);
        }
    } catch(e) {
        // ignore
    }
  }, []);

  const calculateAge = useCallback(() => {
    const dobDate = dob;
    const ageAtDateVal = ageAt;

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
    const totalWeeks = differenceInWeeks(endOfCalculation, dobDate, { roundingMethod: 'floor' });
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
  }, [dob, ageAt, isCalculating]);

  const handleCalculate = () => {
    const dobDate = dob;
    if (!dobDate) {
        setError("Please enter a valid date of birth.");
        return;
    }
    const ageAtDate = ageAt;
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
      setDob(undefined);
      setAgeAt(new Date());
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
          Calculate the age or interval between two dates.
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
            <Label htmlFor="dob-picker">Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="dob-picker"
                  variant={"outline"}
                  aria-label="Pick a date of birth"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dob && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dob ? format(dob, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  captionLayout="dropdown-buttons"
                  fromYear={1900}
                  toYear={new Date().getFullYear()}
                  selected={dob}
                  onSelect={setDob}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className='space-y-2'>
            <Label htmlFor="age-at-picker">Age at the Date of</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="age-at-picker"
                  variant={"outline"}
                  aria-label="Pick an end date for age calculation"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !ageAt && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {ageAt ? format(ageAt, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  captionLayout="dropdown-buttons"
                  fromYear={1900}
                  toYear={new Date().getFullYear() + 100}
                  selected={ageAt}
                  onSelect={setAgeAt}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2">
            <Button onClick={handleCalculate} className="w-full" aria-label="Calculate your precise age">Calculate Age</Button>
            <Button onClick={handleReset} variant="outline" className="w-full md:w-auto" aria-label="Reset">
                <RefreshCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
            <ShareButton title="Online Age Calculator" text="Find out your exact age in real-time with this cool age calculator!" url="/age-calculator" />
        </div>

        {age && (
          
            <div className="p-4 sm:p-6 bg-muted rounded-lg text-center space-y-4 animate-fade-in" role="region" aria-live="polite">
              <div>
                <h3 className="text-md sm:text-lg font-medium mb-2 text-foreground" id="exact-age-heading">Your Exact Age:</h3>
                <div aria-labelledby="exact-age-heading" className="flex justify-center items-baseline flex-wrap gap-x-2 sm:gap-x-4 gap-y-2">
                  <div><span className="text-2xl sm:text-3xl font-bold text-primary">{age.years}</span> <span className="text-md sm:text-lg text-muted-foreground">years</span></div>
                  <div><span className="text-2xl sm:text-3xl font-bold text-primary">{age.months}</span> <span className="text-md sm:text-lg text-muted-foreground">months</span></div>
                  <div><span className="text-2xl sm:text-3xl font-bold text-primary">{age.days}</span> <span className="text-md sm:text-lg text-muted-foreground">days</span></div>
                </div>
                 <div aria-labelledby="exact-age-heading" className="flex justify-center items-baseline flex-wrap gap-x-2 sm:gap-x-4 gap-y-2 mt-2">
                  <div><span className="text-xl sm:text-2xl font-bold text-primary">{age.hours}</span> <span className="text-sm sm:text-base text-muted-foreground">hours</span></div>
                  <div><span className="text-xl sm:text-2xl font-bold text-primary">{age.minutes}</span> <span className="text-sm sm:text-base text-muted-foreground">minutes</span></div>
                  <div><span className="text-xl sm:text-2xl font-bold text-primary">{age.seconds}</span> <span className="text-sm sm:text-base text-muted-foreground">seconds</span></div>
                </div>
              </div>
              <div>
                 <h3 className="text-md sm:text-lg font-medium mb-2 mt-4 text-foreground" id="other-units-heading">In Other Units:</h3>
                 <ul aria-labelledby="other-units-heading" className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs sm:text-sm text-foreground">
                    <li><span className='font-semibold'>{age.totalMonths.toLocaleString()}</span> months, <span className='font-semibold'>{age.days}</span> days</li>
                    <li><span className='font-semibold'>{age.totalWeeks.toLocaleString()}</span> weeks, <span className='font-semibold'>{age.totalDays % 7}</span> days</li>
                    <li><span className='font-semibold'>{age.totalDays.toLocaleString()}</span> days</li>
                    <li><span className='font-semibold'>{age.totalHours.toLocaleString()}</span> hours</li>
                    <li><span className='font-semibold'>{age.totalMinutes.toLocaleString()}</span> minutes</li>
                    <li><span className='font-semibold'>{age.totalSeconds.toLocaleString()}</span> seconds</li>
                 </ul>
              </div>
            </div>
            
          )}
      </CardContent>
    </Card>
  );
}
