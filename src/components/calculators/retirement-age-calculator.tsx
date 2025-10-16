
"use client";

import { useState, useEffect, useCallback } from 'react';
import { format, addYears, addMonths, isValid } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CalendarIcon } from "lucide-react"
import ShareButton from '../share-button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';

interface RetirementInfo {
  fullRetirement: {
    age: { years: number; months: number };
    date: Date;
  };
  earlyRetirement: {
    age: number;
    date: Date;
  };
  delayedRetirement: {
    age: number;
    date: Date;
  };
}

const getRetirementAge = (birthYear: number): { years: number; months: number } => {
  if (birthYear <= 1937) return { years: 65, months: 0 };
  if (birthYear === 1938) return { years: 65, months: 2 };
  if (birthYear === 1939) return { years: 65, months: 4 };
  if (birthYear === 1940) return { years: 65, months: 6 };
  if (birthYear === 1941) return { years: 65, months: 8 };
  if (birthYear === 1942) return { years: 65, months: 10 };
  if (birthYear >= 1943 && birthYear <= 1954) return { years: 66, months: 0 };
  if (birthYear === 1955) return { years: 66, months: 2 };
  if (birthYear === 1956) return { years: 66, months: 4 };
  if (birthYear === 1957) return { years: 66, months: 6 };
  if (birthYear === 1958) return { years: 66, months: 8 };
  if (birthYear === 1959) return { years: 66, months: 10 };
  return { years: 67, months: 0 }; // 1960 or later
};

export default function RetirementAgeCalculator() {
  const [dob, setDob] = useState<Date | undefined>();
  const [retirementInfo, setRetirementInfo] = useState<RetirementInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
        const savedDob = localStorage.getItem('retirementAgeCalculatorDob');
        if (savedDob) {
            const parsedDate = new Date(JSON.parse(savedDob));
            if(isValid(parsedDate)) setDob(parsedDate);
        }
    } catch(e) {
        // ignore
    }
  }, []);

  const handleCalculate = () => {
    const selectedDate = dob;

    if (!selectedDate || !isValid(selectedDate)) {
      setError("Please enter a valid date of birth.");
      setRetirementInfo(null);
      return;
    }
    setError(null);
    localStorage.setItem('retirementAgeCalculatorDob', JSON.stringify(dob));

    const birthYear = selectedDate.getFullYear();
    const fullRetirementAge = getRetirementAge(birthYear);
    
    const fullRetirementDate = addMonths(addYears(selectedDate, fullRetirementAge.years), fullRetirementAge.months);
    const earlyRetirementDate = addYears(selectedDate, 62);
    const delayedRetirementDate = addYears(selectedDate, 70);

    setRetirementInfo({
      fullRetirement: {
        age: fullRetirementAge,
        date: fullRetirementDate,
      },
      earlyRetirement: {
        age: 62,
        date: earlyRetirementDate,
      },
      delayedRetirement: {
        age: 70,
        date: delayedRetirementDate,
      },
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle>Calculate Your Retirement Age</CardTitle>
        <CardDescription>
          Enter your date of birth to find your full retirement age for social security benefits.
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
        <div className="space-y-2">
            <Label htmlFor="dob-day-ret">Date of Birth</Label>
             <Popover>
              <PopoverTrigger asChild>
                <Button id="dob-day-ret" variant={"outline"} className={cn("w-full justify-start text-left font-normal", !dob && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dob ? format(dob, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  captionLayout="dropdown-buttons"
                  fromYear={1920}
                  toYear={new Date().getFullYear()}
                  selected={dob}
                  onSelect={setDob}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
        </div>
        <div className="flex gap-2">
            <Button onClick={handleCalculate} className="w-full" aria-label="Calculate Retirement Age">Calculate Retirement Age</Button>
            <ShareButton title="Retirement Age Calculator" text="Find out your full retirement age with this Social Security calculator!" url="/retirement" />
        </div>

        {retirementInfo && (
          
            <div className="p-6 bg-muted rounded-lg space-y-6 animate-fade-in mt-4">
              <div className="text-center">
                <h3 className="text-lg font-medium text-muted-foreground">Your Full Retirement Age is:</h3>
                <div className="flex justify-center items-baseline space-x-2">
                  <span className="text-4xl font-bold text-primary">{retirementInfo.fullRetirement.age.years}</span>
                  <span className="text-xl text-muted-foreground">years</span>
                  {retirementInfo.fullRetirement.age.months > 0 && (
                    <>
                      <span className="text-4xl font-bold text-primary">{retirementInfo.fullRetirement.age.months}</span>
                      <span className="text-xl text-muted-foreground">months</span>
                    </>
                  )}
                </div>
                <p className="mt-2 text-muted-foreground">
                  You can receive full benefits starting in <strong className="text-foreground">{format(retirementInfo.fullRetirement.date, 'MMMM yyyy')}</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                  <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold">Early Retirement</h4>
                      <p className="text-sm text-muted-foreground">You can start receiving benefits at age 62, in <strong className="text-foreground">{format(retirementInfo.earlyRetirement.date, 'MMMM yyyy')}</strong>. Benefits may be reduced.</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold">Delayed Retirement</h4>
                      <p className="text-sm text-muted-foreground">If you delay until age 70, your benefits will increase. You can receive this maximum benefit starting in <strong className="text-foreground">{format(retirementInfo.delayedRetirement.date, 'MMMM yyyy')}</strong>.</p>
                  </div>
              </div>
            </div>
            
        )}
      </CardContent>
    </Card>
  );
}
