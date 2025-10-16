
"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { intervalToDuration, isValid, isFuture, format, differenceInYears, differenceInMonths } from 'date-fns';
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
import { AlertCircle, RefreshCcw, CalendarIcon } from "lucide-react"
import ShareButton from '../share-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';

type InputMode = "full" | "monthYear" | "year";

interface AgeResult {
  years?: number;
  months?: number;
  days?: number;
  text: string;
}

export default function HowOldIsCalculator() {
  const [dob, setDob] = useState<Date | undefined>();
  const [ageResult, setAgeResult] = useState<AgeResult | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<InputMode>("full");

  const handleCalculate = useCallback(() => {
    setError(null);
    setAgeResult(undefined);

    if (mode === "full") {
      const dobDate = dob;
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
    }
  }, [dob, mode]);
  
  const handleReset = useCallback(() => {
      setDob(undefined);
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
            <Label htmlFor='dob-howoldis'>Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="dob-howoldis"
                  variant={"outline"}
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
        
        {error && (
            <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        <div className="flex flex-col md:flex-row gap-2">
            <Button onClick={handleCalculate} className="w-full">Find Out How Old They Are</Button>
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
