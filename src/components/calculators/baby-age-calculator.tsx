
"use client";

import { useState, useEffect, useCallback } from 'react';
import { format, intervalToDuration, isValid, isFuture, differenceInWeeks, differenceInDays, differenceInMonths } from 'date-fns';
import { RefreshCcw, Baby, CalendarIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '../ui/label';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import ShareButton from '../share-button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '../ui/calendar';

interface BabyAge {
  years: number;
  months: number;
  days: number;
  totalWeeks: number;
  totalMonths: number;
  totalDays: number;
  weekPart: number;
}

export default function BabyAgeCalculator() {
  const [dob, setDob] = useState<Date | undefined>();
  const [age, setAge] = useState<BabyAge | undefined>();
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateAge = useCallback(() => {
    const dobDate = dob;
    if (!dobDate) return;
    
    const now = new Date();
    
    if (isFuture(dobDate)) {
        setError("Baby's date of birth cannot be in the future.");
        setIsCalculating(false);
        return;
    }
    
    setError(null);

    const ageDuration = intervalToDuration({ start: dobDate, end: now });
    const totalDays = differenceInDays(now, dobDate);
    const totalWeeks = Math.floor(totalDays / 7);
    const weekPart = totalDays % 7;
    const totalMonths = differenceInMonths(now, dobDate);

    setAge({
      years: ageDuration.years || 0,
      months: ageDuration.months || 0,
      days: ageDuration.days || 0,
      totalWeeks,
      totalMonths,
      totalDays,
      weekPart,
    });
  }, [dob]);

  const handleCalculate = () => {
    const dobDate = dob;
    if (!dobDate || !isValid(dobDate)) {
        setError("Please enter a valid date of birth for your baby.");
        setIsCalculating(false);
        return;
    }
    setIsCalculating(true);
    calculateAge();
  };

  const handleReset = () => {
      setDob(undefined);
      setAge(undefined);
      setIsCalculating(false);
      setError(null);
  }
  
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isCalculating) {
      calculateAge(); // Initial calculation
      interval = setInterval(calculateAge, 60000); // Update every minute is enough for this
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCalculating, calculateAge]);

  useEffect(() => {
    setIsCalculating(false);
    setAge(undefined);
  }, [dob]);

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle>Baby's Age Calculator</CardTitle>
        <CardDescription>Enter your baby's birthday to see their age in weeks, months, and days.</CardDescription>
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
            <Label htmlFor='dob-baby-day'>Baby's Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button id="dob-baby-day" variant={"outline"} className={cn("w-full justify-start text-left font-normal", !dob && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dob ? format(dob, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  captionLayout="dropdown-buttons"
                  fromYear={new Date().getFullYear() - 5}
                  toYear={new Date().getFullYear()}
                  selected={dob}
                  onSelect={setDob}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
        </div>

        <div className="flex flex-col md:flex-row gap-2">
            <Button onClick={handleCalculate} className="w-full" aria-label="Calculate Baby's Age"><Baby className="mr-2 h-4 w-4" />Calculate Baby's Age</Button>
            <Button onClick={handleReset} variant="outline" className="w-full md:w-auto" aria-label="Reset">
                <RefreshCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
            <ShareButton title="Baby Age Calculator" text="Calculate baby's age in weeks and months with this handy tool!" url="/baby-age-calculator" />
        </div>

        {age && (
            <div className="p-6 bg-muted rounded-lg text-center space-y-6 animate-fade-in mt-4">
                <div>
                    <h3 className="text-lg font-medium text-muted-foreground">Your baby is:</h3>
                    <div className="flex justify-center items-baseline flex-wrap gap-x-3 sm:gap-x-4 gap-y-2">
                        {age.years > 0 && <div><span className="text-2xl sm:text-4xl font-bold text-primary">{age.years}</span> <span className="text-md sm:text-lg text-muted-foreground">year{age.years > 1 ? 's' : ''}</span></div>}
                        <div><span className="text-2xl sm:text-4xl font-bold text-primary">{age.months}</span> <span className="text-md sm:text-lg text-muted-foreground">month{age.months !== 1 ? 's' : ''}</span></div>
                        <div><span className="text-2xl sm:text-4xl font-bold text-primary">{age.days}</span> <span className="text-md sm:text-lg text-muted-foreground">day{age.days !== 1 ? 's' : ''}</span></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                    <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold text-muted-foreground">Or in Weeks:</h4>
                        <p className="text-xl font-bold text-primary">{age.totalWeeks} weeks & {age.weekPart} days</p>
                    </div>
                     <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold text-muted-foreground">Or in Months:</h4>
                        <p className="text-xl font-bold text-primary">{age.totalMonths} months & {age.days} days</p>
                    </div>
                </div>

                 <div className="p-4 border-t border-dashed">
                     <h4 className="font-semibold text-muted-foreground">Total time since birth:</h4>
                     <p className="text-lg font-bold text-primary">{age.totalDays.toLocaleString()} days old</p>
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
