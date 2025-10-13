"use client";

import { useState } from 'react';
import { format, intervalToDuration } from 'date-fns';
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

interface Age {
  years: number;
  months: number;
  days: number;
}

export default function AgeCalculator() {
  const [date, setDate] = useState<Date | undefined>();
  const [age, setAge] = useState<Age | undefined>();

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const { years, months, days } = intervalToDuration({
        start: selectedDate,
        end: new Date(),
      });
      setAge({
        years: years || 0,
        months: months || 0,
        days: days || 0,
      });
    } else {
      setAge(undefined);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Your Age</CardTitle>
        <CardDescription>Enter your date of birth to see your age.</CardDescription>
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
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              captionLayout="dropdown-buttons"
              fromYear={1900}
              toYear={new Date().getFullYear()}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {age && (
          <div className="p-6 bg-muted rounded-lg text-center">
            <h3 className="text-lg font-medium mb-2">You are:</h3>
            <div className="flex justify-center items-baseline space-x-2">
              <span className="text-4xl font-bold text-primary">{age.years}</span>
              <span className="text-xl text-muted-foreground">years</span>
            </div>
            <div className="flex justify-center items-baseline space-x-2 mt-2">
              <span className="text-2xl font-semibold">{age.months}</span>
              <span className="text-md text-muted-foreground">months, and</span>
              <span className="text-2xl font-semibold">{age.days}</span>
              <span className="text-md text-muted-foreground">days old</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
