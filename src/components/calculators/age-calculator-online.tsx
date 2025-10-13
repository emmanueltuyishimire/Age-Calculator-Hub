
"use client";

import { useState, useEffect } from 'react';
import { format, intervalToDuration, differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, differenceInWeeks, differenceInMonths, isFuture, isValid } from 'date-fns';
import { Calendar as CalendarIcon, RefreshCcw } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

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

export default function AgeCalculatorOnline() {
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
  const [currentDate, setCurrentDate] = useState<Date | undefined>();
  const [age, setAge] = useState<Age | undefined>();
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);
  
  const calculateAge = () => {
    if (!dateOfBirth || !currentDate) return;

    if (!isValid(dateOfBirth)) {
      setError("The date of birth is not a valid date.");
      setIsCalculating(false);
      return;
    }
     if (isFuture(dateOfBirth)) {
      setError("Date of birth cannot be in the future.");
      setIsCalculating(false);
      setAge(undefined);
      return;
    }
    if (currentDate < dateOfBirth) {
        setError("The 'Current Date' cannot be before the date of birth.");
        setIsCalculating(false);
        setAge(undefined);
        return;
    }
      
      setError(null);
      const endOfCalculation = isCalculating ? new Date() : currentDate;

      const duration = intervalToDuration({
        start: dateOfBirth,
        end: endOfCalculation,
      });

      const totalSeconds = differenceInSeconds(endOfCalculation, dateOfBirth);
      const totalMinutes = differenceInMinutes(endOfCalculation, dateOfBirth);
      const totalHours = differenceInHours(endOfCalculation, dateOfBirth);
      const totalDays = differenceInDays(endOfCalculation, dateOfBirth);
      const totalWeeks = differenceInWeeks(endOfCalculation, dateOfBirth);
      const totalMonths = differenceInMonths(endOfCalculation, dateOfBirth);

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
    if (!dateOfBirth) {
        setError("Please enter your date of birth to calculate your age.");
        return;
    }
    setIsCalculating(true);
    calculateAge();
  };

  const handleReset = () => {
      setDateOfBirth(undefined);
      setCurrentDate(new Date());
      setAge(undefined);
      setIsCalculating(false);
      setError(null);
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
  }, [isCalculating, dateOfBirth, currentDate]);

  useEffect(() => {
    setIsCalculating(false);
    setAge(undefined);
  }, [dateOfBirth, currentDate])


  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Calculate Your Age</CardTitle>
          <CardDescription>
            Enter your date of birth to find out your exact age, updating in real-time.
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
              <Label htmlFor='dob-popover'>Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild id="dob-popover">
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !dateOfBirth && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateOfBirth ? format(dateOfBirth, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateOfBirth}
                    onSelect={setDateOfBirth}
                    captionLayout="dropdown-buttons"
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='age-at-popover'>Current Date</Label>
              <Popover>
                <PopoverTrigger asChild id="age-at-popover">
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !currentDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {currentDate ? format(currentDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={currentDate}
                    onSelect={setCurrentDate}
                    captionLayout="dropdown-buttons"
                    fromYear={1900}
                    toYear={new Date().getFullYear() + 100}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleCalculate} className="w-full">Calculate Age</Button>
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
    </div>
  );
}

