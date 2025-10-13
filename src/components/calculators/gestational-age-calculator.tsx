"use client";

import { useState } from 'react';
import { format, addDays, differenceInWeeks, differenceInDays } from 'date-fns';
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

interface GestationalInfo {
  weeks: number;
  days: number;
  dueDate: Date;
}

export default function GestationalAgeCalculator() {
  const [lmpDate, setLmpDate] = useState<Date | undefined>();
  const [gestationalInfo, setGestationalInfo] = useState<GestationalInfo | null>(null);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setLmpDate(selectedDate);
    if (selectedDate) {
      const today = new Date();
      const dueDate = addDays(selectedDate, 280);
      const weeks = differenceInWeeks(today, selectedDate);
      const days = differenceInDays(today, selectedDate) % 7;
      setGestationalInfo({ weeks, days, dueDate });
    } else {
      setGestationalInfo(null);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Gestational Age</CardTitle>
        <CardDescription>
          Select the first day of the last menstrual period (LMP) to calculate.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full justify-start text-left font-normal',
                !lmpDate && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {lmpDate ? format(lmpDate, 'PPP') : <span>Pick LMP date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={lmpDate}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {gestationalInfo && (
          <div className="p-6 bg-muted rounded-lg text-center space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Current Gestational Age:</h3>
              <div className="flex justify-center items-baseline space-x-2">
                <span className="text-4xl font-bold text-primary">{gestationalInfo.weeks}</span>
                <span className="text-xl text-muted-foreground">weeks</span>
                <span className="text-4xl font-bold text-primary">{gestationalInfo.days}</span>
                <span className="text-xl text-muted-foreground">days</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Estimated Due Date:</h3>
              <p className="text-2xl font-semibold text-primary">
                {format(gestationalInfo.dueDate, 'MMMM d, yyyy')}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
