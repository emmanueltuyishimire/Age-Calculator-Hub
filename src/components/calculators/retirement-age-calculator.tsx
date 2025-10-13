
"use client";

import { useState } from 'react';
import { format, addYears, addMonths, isValid } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RetirementInfo {
  age: { years: number; months: number };
  date: Date;
}

// Based on SSA.gov data
const getRetirementInfo = (birthYear: number): RetirementInfo['age'] => {
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
  const [dob, setDob] = useState({ day: '', month: '', year: '' });
  const [date, setDate] = useState<Date | undefined>();
  const [retirementInfo, setRetirementInfo] = useState<RetirementInfo | null>(null);

  const parseDate = (dayStr: string, monthStr: string, yearStr: string): Date | null => {
    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10) - 1;
    const year = parseInt(yearStr, 10);
    if (isNaN(day) || isNaN(month) || isNaN(year) || year < 1900 || year > new Date().getFullYear()) return null;
    const date = new Date(year, month, day);
    if (isValid(date) && date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
      return date;
    }
    return null;
  };

  const handleCalculate = () => {
    const selectedDate = parseDate(dob.day, dob.month, dob.year);
    setDate(selectedDate || undefined);

    if (selectedDate) {
      const birthYear = selectedDate.getFullYear();
      const retirementAge = getRetirementInfo(birthYear);
      const retirementDate = addMonths(addYears(selectedDate, retirementAge.years), retirementAge.months);
      setRetirementInfo({
        age: retirementAge,
        date: retirementDate,
      });
    } else {
      setRetirementInfo(null);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Full Retirement Age</CardTitle>
        <CardDescription>
          Enter your date of birth to find your full retirement age for social security benefits.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <Label>Date of Birth</Label>
            <div className="flex gap-2">
                <Input placeholder="DD" value={dob.day} onChange={e => setDob({...dob, day: e.target.value})} aria-label="Day of Birth"/>
                <Input placeholder="MM" value={dob.month} onChange={e => setDob({...dob, month: e.target.value})} aria-label="Month of Birth"/>
                <Input placeholder="YYYY" value={dob.year} onChange={e => setDob({...dob, year: e.target.value})} aria-label="Year of Birth"/>
            </div>
        </div>
        <Button onClick={handleCalculate} className="w-full">Calculate Retirement Age</Button>

        {retirementInfo && (
          <div className="p-6 bg-muted rounded-lg text-center">
            <h3 className="text-lg font-medium mb-2">Your full retirement age is:</h3>
            <div className="flex justify-center items-baseline space-x-2">
              <span className="text-4xl font-bold text-primary">{retirementInfo.age.years}</span>
              <span className="text-xl text-muted-foreground">years</span>
              {retirementInfo.age.months > 0 && (
                <>
                  <span className="text-4xl font-bold text-primary">{retirementInfo.age.months}</span>
                  <span className="text-xl text-muted-foreground">months</span>
                </>
              )}
            </div>
            <p className="mt-4 text-muted-foreground">
              You can receive full benefits starting in <strong className="text-foreground">{format(retirementInfo.date, 'MMMM yyyy')}</strong>.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

    