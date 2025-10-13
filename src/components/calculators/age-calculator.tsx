
"use client";

import { useState } from 'react';
import { format, intervalToDuration, differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, differenceInWeeks, differenceInMonths } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
  const [ageAtDate, setAgeAtDate] = useState<Date | undefined>(new Date());
  const [age, setAge] = useState<Age | undefined>();

  const handleCalculate = () => {
    if (dateOfBirth && ageAtDate) {
      const duration = intervalToDuration({
        start: dateOfBirth,
        end: ageAtDate,
      });

      const totalSeconds = differenceInSeconds(ageAtDate, dateOfBirth);
      const totalMinutes = differenceInMinutes(ageAtDate, dateOfBirth);
      const totalHours = differenceInHours(ageAtDate, dateOfBirth);
      const totalDays = differenceInDays(ageAtDate, dateOfBirth);
      const totalWeeks = differenceInWeeks(ageAtDate, dateOfBirth);
      const totalMonths = differenceInMonths(ageAtDate, dateOfBirth);

      const remainingDays = duration.days ? duration.days % 7 : 0;

      setAge({
        years: duration.years || 0,
        months: duration.months || 0,
        weeks: Math.floor(duration.days ? duration.days / 7 : 0),
        days: remainingDays,
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
    }
  };

  return (
    <div className="space-y-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Age Calculator</CardTitle>
          <CardDescription>
            The Age Calculator can determine the age or interval between two dates. The calculated age will be displayed in years, months, weeks, days, hours, minutes, and seconds.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className='space-y-2'>
              <Label>Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
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
              <Label>Age at the Date of</Label>
              <Popover>
                <PopoverTrigger asChild>
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

          <Button onClick={handleCalculate} className="w-full">Calculate</Button>

          {age && (
            <div className="p-6 bg-muted rounded-lg text-center space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Age:</h3>
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

      <div className="prose prose-sm dark:prose-invert max-w-2xl mx-auto text-muted-foreground space-y-4">
        <p>The age of a person can be counted differently in different cultures. This calculator is based on the most common age system. In this system, age increases on a person's birthday. For example, the age of a person who has lived for 3 years and 11 months is 3, and their age will increase to 4 on their next birthday one month later. Most western countries use this age system.</p>
        <p>In some cultures, age is expressed by counting years with or without including the current year. For example, a person who is twenty years old is the same age as another person who is in their twenty-first year of life. In one of the traditional Chinese age systems, people are born at age 1 and their age increases up at the Traditional Chinese New Year rather than their birthday. For example, if one baby is born just one day before the Traditional Chinese New Year, 2 days later, the baby will be 2 even though he/she is only 2 days old.</p>
        <p>In some situations, the months and day result of this age calculator may be confusing, especially when the starting date is the end of a month. For example, we count Feb. 20 to Mar. 20 to be one month. However, there are two ways to calculate the age from Feb. 28, 2022 to Mar. 31, 2022. If we consider Feb. 28 to Mar. 28 to be one month, then the result is one month and 3 days. If we consider both Feb. 28 and Mar. 31 as the end of the month, then the result is one month. Both calculation results are reasonable. Similar situations exist for dates like Apr. 30 to May 31, May 30 to June 30, etc. The confusion comes from the uneven number of days in different months. In our calculations, we use the former method.</p>
      </div>
    </div>
  );
}

    