"use client";

import { useState } from 'react';
import { format, addYears, addMonths } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
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
  const [date, setDate] = useState<Date | undefined>();
  const [retirementInfo, setRetirementInfo] = useState<RetirementInfo | null>(null);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
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
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Pick your date of birth</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              captionLayout="dropdown-buttons"
              fromYear={1920}
              toYear={new Date().getFullYear()}
              initialFocus
            />
          </PopoverContent>
        </Popover>

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
