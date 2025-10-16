
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
import { Label } from '../ui/label';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import ShareButton from '../share-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';

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

const months = Array.from({ length: 12 }, (_, i) => ({ value: (i + 1).toString(), label: format(new Date(0, i), 'MMMM') }));
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 125 }, (_, i) => currentYear - i);

export default function BirthdayAgeCalculator() {
  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');

  const [age, setAge] = useState<Age | undefined>();
  const [countdown, setCountdown] = useState<BirthdayCountdown | undefined>();
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const animationFrameId = useRef<number>();

  const getDob = useCallback((): Date | null => {
    if (dobYear && dobMonth && dobDay) {
        const date = new Date(parseInt(dobYear), parseInt(dobMonth) - 1, parseInt(dobDay));
        if (isValid(date)) return date;
    }
    return null;
  }, [dobDay, dobMonth, dobYear]);

  useEffect(() => {
    try {
        const savedDob = localStorage.getItem('birthdayAgeCalculatorDob');
        if (savedDob) {
            const parsedDob = new Date(JSON.parse(savedDob));
            if(isValid(parsedDob)) {
                setDobDay(parsedDob.getDate().toString());
                setDobMonth((parsedDob.getMonth() + 1).toString());
                setDobYear(parsedDob.getFullYear().toString());
            }
        }
    } catch(e) {
        // ignore
    }
  }, []);

  const calculateAgeAndCountdown = useCallback(() => {
    const dobDate = getDob();
    if (!dobDate) return;
    
    const now = new Date();

    const ageDuration = intervalToDuration({ start: dobDate, end: now });
    setAge({
      years: ageDuration.years || 0,
      months: ageDuration.months || 0,
      days: ageDuration.days || 0,
      hours: ageDuration.hours || 0,
      minutes: ageDuration.minutes || 0,
      seconds: ageDuration.seconds || 0,
    });

    let nextBirthday = new Date(now.getFullYear(), dobDate.getMonth(), dobDate.getDate());
    if (now > nextBirthday) {
        nextBirthday = addYears(nextBirthday, 1);
    }

    const countdownDuration = intervalToDuration({ start: now, end: nextBirthday });
    setCountdown({
      months: countdownDuration.months || 0,
      days: countdownDuration.days || 0,
      hours: countdownDuration.hours || 0,
      minutes: countdownDuration.minutes || 0,
      seconds: countdownDuration.seconds || 0,
    });
    
    animationFrameId.current = requestAnimationFrame(calculateAgeAndCountdown);
  }, [getDob]);

  const handleCalculate = useCallback(() => {
    const dobDate = getDob();
    if (!dobDate) {
        setError("Please enter a valid date of birth.");
        return;
    }
     if (isFuture(dobDate)) {
      setError("Date of birth cannot be in the future.");
      return;
    }
    setError(null);
    localStorage.setItem('birthdayAgeCalculatorDob', JSON.stringify(dobDate));
    setIsCalculating(true);
  }, [getDob]);

  const handleReset = useCallback(() => {
      setDobDay(''); setDobMonth(''); setDobYear('');
      setAge(undefined);
      setCountdown(undefined);
      setIsCalculating(false);
      setError(null);
      localStorage.removeItem('birthdayAgeCalculatorDob');
  }, []);
  
  useEffect(() => {
    if (isCalculating) {
      animationFrameId.current = requestAnimationFrame(calculateAgeAndCountdown);
    } else {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isCalculating, calculateAgeAndCountdown]);

  useEffect(() => {
    setIsCalculating(false);
    setAge(undefined);
    setCountdown(undefined);
  }, [dobDay, dobMonth, dobYear]);

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

          <div className="space-y-2">
            <Label>Date of Birth</Label>
            <div className="flex gap-2">
                <Select value={dobMonth} onValueChange={setDobMonth}>
                    <SelectTrigger aria-label="Birth Month"><SelectValue placeholder="Month" /></SelectTrigger>
                    <SelectContent>{months.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}</SelectContent>
                </Select>
                <Input type="number" placeholder="Day" value={dobDay} onChange={e => setDobDay(e.target.value)} aria-label="Birth Day" />
                <Select value={dobYear} onValueChange={setDobYear}>
                    <SelectTrigger aria-label="Birth Year"><SelectValue placeholder="Year" /></SelectTrigger>
                    <SelectContent>{years.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}</SelectContent>
                </Select>
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
                        <Gift className="h-6 w-6 text-primary" aria-hidden="true" />
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
            
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
