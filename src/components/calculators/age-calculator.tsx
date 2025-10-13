
"use client";

import { useState, useEffect } from 'react';
import { format, intervalToDuration, differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, differenceInWeeks, differenceInMonths } from 'date-fns';
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
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
  const [ageAtDate, setAgeAtDate] = useState<Date | undefined>();
  const [age, setAge] = useState<Age | undefined>();
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    setAgeAtDate(new Date());
  }, []);

  const calculateAge = () => {
    if (dateOfBirth && ageAtDate) {
      if (ageAtDate < dateOfBirth) {
        setAge(undefined);
        setIsCalculating(false);
        return;
      }
      
      // We use a dynamically updating "now" if the user has selected today's date for 'ageAtDate'
      const endOfCalculation = isCalculating ? new Date() : ageAtDate;

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
  }, [isCalculating, dateOfBirth, ageAtDate]);

  useEffect(() => {
    setIsCalculating(false);
  }, [dateOfBirth, ageAtDate])


  return (
    <div className="space-y-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Birthday Age Calculator</CardTitle>
          <CardDescription>
            The Age Calculator can determine the age or interval between two dates. The calculated age will be displayed in years, months, weeks, days, hours, minutes, and seconds.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-4">
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
              <Label htmlFor='age-at-popover'>Age at the Date of</Label>
              <Popover>
                <PopoverTrigger asChild id="age-at-popover">
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !ageAtDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {ageAtDate ? format(ageAtDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={ageAtDate}
                    onSelect={setAgeAtDate}
                    captionLayout="dropdown-buttons"
                    fromYear={1900}
                    toYear={new Date().getFullYear() + 100}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full">Calculate Your Age Now Online</Button>

          {age && (
            <div className="p-6 bg-muted rounded-lg text-center space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Instant Age Calculation Online:</h3>
                <div className="flex justify-center items-baseline flex-wrap gap-x-4 gap-y-2">
                  <div><span className="text-3xl font-bold text-primary">{age.years}</span> <span className="text-lg text-muted-foreground">years</span></div>
                  <div><span className="text-3xl font-bold text-primary">{age.months}</span> <span className="text-lg text-muted-foreground">months</span></div>
                  <div><span className="text-3xl font-bold text-primary">{age.days}</span> <span className="text-lg text-muted-foreground">days</span></div>
                </div>
              </div>
              <div>
                 <h3 className="text-lg font-medium mb-2">Or alternatively:</h3>
                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
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
