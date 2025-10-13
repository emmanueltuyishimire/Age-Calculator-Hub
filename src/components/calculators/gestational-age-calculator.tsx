
"use client";

import { useState } from 'react';
import { format, addDays, differenceInWeeks, differenceInDays, isValid } from 'date-fns';
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


interface GestationalInfo {
  weeks: number;
  days: number;
  dueDate: Date;
}

export default function GestationalAgeCalculator() {
  const [lmp, setLmp] = useState({ day: '', month: '', year: '' });
  const [lmpDate, setLmpDate] = useState<Date | undefined>();
  const [gestationalInfo, setGestationalInfo] = useState<GestationalInfo | null>(null);

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

  const handleCalculate = () => {
    const selectedDate = parseDate(lmp.day, lmp.month, lmp.year);
    setLmpDate(selectedDate || undefined);

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
          Enter the first day of the last menstrual period (LMP) to calculate.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <Label>LMP Date</Label>
            <div className="flex gap-2">
                <Input placeholder="DD" value={lmp.day} onChange={e => setLmp({...lmp, day: e.target.value})} aria-label="LMP Day"/>
                <Input placeholder="MM" value={lmp.month} onChange={e => setLmp({...lmp, month: e.target.value})} aria-label="LMP Month"/>
                <Input placeholder="YYYY" value={lmp.year} onChange={e => setLmp({...lmp, year: e.target.value})} aria-label="LMP Year"/>
            </div>
        </div>
        <Button onClick={handleCalculate} className="w-full">Calculate</Button>

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

    