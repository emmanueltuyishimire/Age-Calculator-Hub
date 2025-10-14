
"use client";

import { useState } from 'react';
import { format, addDays, subDays, isValid } from 'date-fns';
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface PregnancyInfo {
  gestationalAge: string;
  dueDate: Date;
  conceptionDate: Date;
  trimester: number;
}

export default function PregnancyCalculator() {
  const [lmp, setLmp] = useState({ day: '', month: '', year: '' });
  const [cycleLength, setCycleLength] = useState('28');
  const [pregnancyInfo, setPregnancyInfo] = useState<PregnancyInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parseDate = (dayStr: string, monthStr: string, yearStr: string): Date | null => {
    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10) - 1;
    const year = parseInt(yearStr, 10);
    if (isNaN(day) || isNaN(month) || isNaN(year) || year < 1900 || year > new Date().getFullYear() + 1) return null;
    const date = new Date(year, month, day);
    if (isValid(date) && date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
      return date;
    }
    return null;
  };

  const handleCalculate = () => {
    const lmpDate = parseDate(lmp.day, lmp.month, lmp.year);
    const cycle = parseInt(cycleLength, 10);

    if (!lmpDate) {
      setError("Please enter a valid date for the last menstrual period.");
      setPregnancyInfo(null);
      return;
    }
    if (lmpDate > new Date()) {
        setError("Last menstrual period cannot be in the future.");
        setPregnancyInfo(null);
        return;
    }
    if (isNaN(cycle) || cycle < 20 || cycle > 45) {
        setError("Please enter a valid cycle length (between 20 and 45 days).");
        setPregnancyInfo(null);
        return;
    }

    setError(null);

    const cycleAdjustment = cycle - 28;
    const dueDate = addDays(lmpDate, 280 + cycleAdjustment);
    const conceptionDate = addDays(lmpDate, 14 + cycleAdjustment);
    const today = new Date();
    const daysPregnant = differenceInDays(today, lmpDate);
    const weeks = Math.floor(daysPregnant / 7);
    const days = daysPregnant % 7;

    let trimester = 0;
    if (weeks <= 13) trimester = 1;
    else if (weeks <= 27) trimester = 2;
    else trimester = 3;

    setPregnancyInfo({
      gestationalAge: `${weeks} weeks, ${days} days`,
      dueDate,
      conceptionDate,
      trimester,
    });
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle>Pregnancy Calculator</CardTitle>
        <CardDescription>
          Estimate your pregnancy timeline based on your LMP.
        </CardDescription>
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
            <Label>Last Menstrual Period (LMP)</Label>
            <div className="flex gap-2">
                <Input placeholder="DD" value={lmp.day} onChange={e => setLmp({...lmp, day: e.target.value})} aria-label="LMP Day"/>
                <Input placeholder="MM" value={lmp.month} onChange={e => setLmp({...lmp, month: e.target.value})} aria-label="LMP Month"/>
                <Input placeholder="YYYY" value={lmp.year} onChange={e => setLmp({...lmp, year: e.target.value})} aria-label="LMP Year"/>
            </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="cycle-length">Average Cycle Length (days)</Label>
            <Input id="cycle-length" type="number" value={cycleLength} onChange={(e) => setCycleLength(e.target.value)} />
        </div>
        <Button onClick={handleCalculate} className="w-full">Calculate</Button>

        {pregnancyInfo && (
          
            <div className="p-6 bg-muted rounded-lg space-y-4 animate-fade-in mt-4 text-center">
              <div>
                <h3 className="text-lg font-medium text-muted-foreground">You are approximately:</h3>
                <p className="text-2xl font-bold text-primary">{pregnancyInfo.gestationalAge}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-muted-foreground">Estimated Due Date:</h3>
                <p className="text-xl font-semibold text-primary">{format(pregnancyInfo.dueDate, 'MMMM d, yyyy')}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-muted-foreground">Estimated Conception Date:</h3>
                <p className="text-xl font-semibold text-primary">{format(pregnancyInfo.conceptionDate, 'MMMM d, yyyy')}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-muted-foreground">Current Trimester:</h3>
                <p className="text-xl font-semibold text-primary">{pregnancyInfo.trimester}</p>
              </div>
            </div>
            
        )}
      </CardContent>
    </Card>
  );
}

function differenceInDays(dateLeft: Date, dateRight: Date): number {
    const diff = dateLeft.getTime() - dateRight.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}
