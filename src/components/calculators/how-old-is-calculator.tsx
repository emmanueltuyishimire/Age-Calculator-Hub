
"use client";

import { useState, useRef } from 'react';
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
import { AlertCircle, RefreshCcw } from "lucide-react"
import ShareButton from '../share-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type InputMode = "year" | "monthYear" | "full";

interface AgeResult {
  years?: number;
  months?: number;
  days?: number;
  text: string;
}

export default function HowOldIsCalculator() {
  const [dob, setDob] = useState({ day: '', month: '', year: '' });
  const [ageResult, setAgeResult] = useState<AgeResult | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<InputMode>("year");

  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleCalculate = () => {
    setError(null);
    setAgeResult(undefined);

    const now = new Date();
    const currentYear = now.getFullYear();
    const yearNum = parseInt(dob.year, 10);
    const monthNum = parseInt(dob.month, 10);
    const dayNum = parseInt(dob.day, 10);

    if (mode === "full") {
      const dobDate = new Date(yearNum, monthNum - 1, dayNum);
       if (!isValid(dobDate) || dobDate.getFullYear() !== yearNum || dobDate.getMonth() !== monthNum - 1 || dobDate.getDate() !== dayNum) {
        setError("Please enter a valid date of birth.");
        return;
      }
      if (isFuture(dobDate)) {
        setError("The date of birth cannot be in the future.");
        return;
      }
      const duration = intervalToDuration({ start: dobDate, end: now });
      setAgeResult({
        years: duration.years,
        months: duration.months,
        days: duration.days,
        text: `Someone born on ${format(dobDate, 'MMMM d, yyyy')} is currently:`
      });
    } else if (mode === "monthYear") {
        if (isNaN(yearNum) || yearNum < 1000 || yearNum > currentYear || isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
            setError("Please enter a valid month and year.");
            return;
        }
        const dobDate = new Date(yearNum, monthNum - 1, 1);
        if (isFuture(dobDate)) {
            setError("The month and year cannot be in the future.");
            return;
        }
        const totalMonths = differenceInMonths(now, dobDate);
        setAgeResult({
            years: Math.floor(totalMonths / 12),
            months: totalMonths % 12,
            text: `Someone born in ${format(dobDate, 'MMMM yyyy')} is approximately:`
        });
    } else if (mode === "year") {
        if (isNaN(yearNum) || yearNum < 1000 || yearNum > currentYear) {
            setError(`Please enter a valid year between 1000 and ${currentYear}.`);
            return;
        }
        const age = differenceInYears(now, new Date(yearNum, 0, 1));
        setAgeResult({
            years: age,
            text: `Someone born in ${yearNum} is or will be this year:`
        });
    }
  };
  
  const handleReset = () => {
      setDob({ day: '', month: '', year: '' });
      setAgeResult(undefined);
      setError(null);
  }

  const handleDobChange = (field: 'day' | 'month' | 'year', value: string) => {
    setDob(prev => ({...prev, [field]: value}));
    if (field === 'day' && value.length === 2 && mode === 'full') monthRef.current?.focus();
    if (field === 'month' && value.length === 2 && mode === 'full') yearRef.current?.focus();
    setAgeResult(undefined);
  };
  
  const renderInputs = () => {
    switch(mode) {
      case 'year':
        return (
          <div className="flex gap-2">
            <Input id="dob-year-year" placeholder="YYYY" value={dob.year} onChange={e => handleDobChange('year', e.target.value)} maxLength={4} aria-label="Year of Birth"/>
          </div>
        );
      case 'monthYear':
        return (
           <div className="flex gap-2">
            <Input ref={monthRef} id="dob-month-monthyear" placeholder="MM" value={dob.month} onChange={e => handleDobChange('month', e.target.value)} maxLength={2} aria-label="Month of Birth"/>
            <Input ref={yearRef} id="dob-year-monthyear" placeholder="YYYY" value={dob.year} onChange={e => handleDobChange('year', e.target.value)} maxLength={4} aria-label="Year of Birth"/>
          </div>
        );
      case 'full':
      default:
        return (
          <div className="flex gap-2">
            <Input id="dob-day-full" placeholder="DD" value={dob.day} onChange={e => handleDobChange('day', e.target.value)} maxLength={2} aria-label="Day of Birth"/>
            <Input ref={monthRef} id="dob-month-full" placeholder="MM" value={dob.month} onChange={e => handleDobChange('month', e.target.value)} maxLength={2} aria-label="Month of Birth"/>
            <Input ref={yearRef} id="dob-year-full" placeholder="YYYY" value={dob.year} onChange={e => handleDobChange('year', e.target.value)} maxLength={4} aria-label="Year of Birth"/>
          </div>
        );
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle>Find Out Their Age</CardTitle>
        <CardDescription>
          Enter a date of birth below using the tabs for different levels of precision.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={mode} onValueChange={(value) => setMode(value as InputMode)} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="year">Year Only</TabsTrigger>
                <TabsTrigger value="monthYear">Month & Year</TabsTrigger>
                <TabsTrigger value="full">Full Date</TabsTrigger>
            </TabsList>
            <TabsContent value="full" className="mt-4">
                {renderInputs()}
            </TabsContent>
            <TabsContent value="monthYear" className="mt-4">
                 {renderInputs()}
            </TabsContent>
            <TabsContent value="year" className="mt-4">
                 {renderInputs()}
            </TabsContent>
        </Tabs>
        
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
