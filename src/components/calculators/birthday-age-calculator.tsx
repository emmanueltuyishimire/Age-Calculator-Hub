
"use client";

import { useState, useEffect } from 'react';
import { format, intervalToDuration, differenceInSeconds, isFuture, isValid, addYears } from 'date-fns';
import { Calendar as CalendarIcon, RefreshCcw, Gift } from 'lucide-react';
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
}

interface BirthdayCountdown {
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function BirthdayAgeCalculator() {
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
  const [age, setAge] = useState<Age | undefined>();
  const [countdown, setCountdown] = useState<BirthdayCountdown | undefined>();
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateAgeAndCountdown = () => {
    if (!dateOfBirth) return;

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
      
      setError(null);
      const now = new Date();

      // Calculate age
      const ageDuration = intervalToDuration({
        start: dateOfBirth,
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
      let nextBirthday = new Date(now.getFullYear(), dateOfBirth.getMonth(), dateOfBirth.getDate());
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
  };

  const handleCalculate = () => {
    if (!dateOfBirth) {
        setError("Please enter your date of birth to calculate your age.");
        return;
    }
    setIsCalculating(true);
    calculateAgeAndCountdown();
  };

  const handleReset = () => {
      setDateOfBirth(undefined);
      setAge(undefined);
      setCountdown(undefined);
      setIsCalculating(false);
      setError(null);
  }
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCalculating) {
      interval = setInterval(() => {
        calculateAgeAndCountdown();
      }, 1000);
    }
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCalculating, dateOfBirth]);

  useEffect(() => {
    setIsCalculating(false);
    setAge(undefined);
    setCountdown(undefined);
  }, [dateOfBirth])


  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Birthday Age Calculator</CardTitle>
          <CardDescription>
            Enter your date of birth to find out your exact age and count down to your next birthday.
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

          <div className="grid grid-cols-1 gap-4">
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
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleCalculate} className="w-full">Calculate Age & Birthday</Button>
            <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto">
                <RefreshCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>

          {age && (
            <div className="p-4 sm:p-6 bg-muted rounded-lg text-center space-y-4">
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
                  <div><span className="text-xl smtext-2xl font-bold text-primary">{age.seconds}</span> <span className="text-sm sm:text-base text-muted-foreground">seconds</span></div>
                </div>
              </div>
            </div>
          )}

          {countdown && (
                <div className="p-4 sm:p-6 bg-muted rounded-lg text-center space-y-4 mt-4">
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
                        <div><span className="text-xl sm:text-2xl font-bold text-primary">{countdown.minutes}</span> <span className="text-sm sm:text-base text-muted-foreground">minutes</span></div>
                        <div><span className="text-xl sm:text-2xl font-bold text-primary">{countdown.seconds}</span> <span className="text-sm sm:text-base text-muted-foreground">seconds</span></div>
                    </div>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
