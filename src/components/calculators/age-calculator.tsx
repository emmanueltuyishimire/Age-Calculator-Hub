
"use client";

import { useState, useEffect } from 'react';
import { format, intervalToDuration, differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, differenceInWeeks, differenceInMonths, isValid } from 'date-fns';
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

interface Age {
  years: number;
  months: number;
  weeks: number;
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
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
  const [ageAtDate, setAgeAtDate] = useState<Date | undefined>();
  const [age, setAge] = useState<Age | undefined>();
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    const now = new Date();
    setAgeAt({ day: String(now.getDate()), month: String(now.getMonth() + 1), year: String(now.getFullYear())});
    setAgeAtDate(now);
  }, []);

  const parseDate = (dayStr: string, monthStr: string, yearStr: string): Date | null => {
    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10) - 1;
    const year = parseInt(yearStr, 10);
    if (isNaN(day) || isNaN(month) || isNaN(year) || year < 1000 || year > 3000) return null;
    const date = new Date(year, month, day);
    if (isValid(date) && date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
      return date;
    }
    return null;
  };

  const calculateAge = () => {
    const dobDate = parseDate(dob.day, dob.month, dob.year);
    const ageAtDateVal = parseDate(ageAt.day, ageAt.month, ageAt.year);

    setDateOfBirth(dobDate || undefined);
    setAgeAtDate(ageAtDateVal || undefined);

    if (dobDate && ageAtDateVal) {
      if (ageAtDateVal < dobDate) {
        setAge(undefined);
        setIsCalculating(false);
        return;
      }
      
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
        weeks: Math.floor((duration.days || 0) / 7),
        days: (duration.days || 0) % 7,
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
    } else {
      setAge(undefined);
      setIsCalculating(false);
    }
  };

  const handleCalculate = () => {
    if (!dob.year || !dob.month || !dob.day) {
        alert("Please enter your date of birth.");
        return;
    }
    setIsCalculating(true);
    calculateAge();
  };
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCalculating) {
      interval = setInterval(() => {
        calculateAge();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCalculating, dob, ageAt]);

  useEffect(() => {
    setIsCalculating(false);
  }, [dob, ageAt])


  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Birthday Age Calculator</CardTitle>
          <CardDescription>
            The Age Calculator can determine the age or interval between two dates. The calculated age will be displayed in years, months, weeks, days, hours, minutes, and seconds.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-4">
            <div className='space-y-2'>
              <Label>Date of Birth</Label>
              <div className="flex gap-2">
                <Input placeholder="DD" value={dob.day} onChange={e => setDob({...dob, day: e.target.value})} aria-label="Day of Birth"/>
                <Input placeholder="MM" value={dob.month} onChange={e => setDob({...dob, month: e.target.value})} aria-label="Month of Birth"/>
                <Input placeholder="YYYY" value={dob.year} onChange={e => setDob({...dob, year: e.target.value})} aria-label="Year of Birth"/>
              </div>
            </div>
            <div className='space-y-2'>
              <Label>Age at the Date of</Label>
              <div className="flex gap-2">
                <Input placeholder="DD" value={ageAt.day} onChange={e => setAgeAt({...ageAt, day: e.target.value})} aria-label="Current Day"/>
                <Input placeholder="MM" value={ageAt.month} onChange={e => setAgeAt({...ageAt, month: e.target.value})} aria-label="Current Month"/>
                <Input placeholder="YYYY" value={ageAt.year} onChange={e => setAgeAt({...ageAt, year: e.target.value})} aria-label="Current Year"/>
              </div>
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full">Calculate Your Age Now Online</Button>

          {age && (
            <div className="p-4 sm:p-6 bg-muted rounded-lg text-center space-y-4">
              <div>
                <h3 className="text-md sm:text-lg font-medium mb-2">Instant Age Calculation Online:</h3>
                <div className="flex justify-center items-baseline flex-wrap gap-x-2 sm:gap-x-4 gap-y-2">
                  <div><span className="text-2xl sm:text-3xl font-bold text-primary">{age.years}</span> <span className="text-md sm:text-lg text-muted-foreground">years</span></div>
                  <div><span className="text-2xl sm:text-3xl font-bold text-primary">{age.months}</span> <span className="text-md sm:text-lg text-muted-foreground">months</span></div>
                  <div><span className="text-2xl sm:text-3xl font-bold text-primary">{age.days}</span> <span className="text-md sm:text-lg text-muted-foreground">days</span></div>
                </div>
              </div>
              <div>
                 <h3 className="text-md sm:text-lg font-medium mb-2">Or alternatively:</h3>
                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
                    <p><span className='font-semibold'>{age.totalMonths}</span> months <span className='font-semibold'>{age.days}</span> days</p>
                    <p><span className='font-semibold'>{age.totalWeeks}</span> weeks <span className='font-semibold'>{age.days}</span> days</p>
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

    