
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

interface OvulationInfo {
  fertileWindow: { start: Date; end: Date };
  ovulationDate: Date;
  nextPeriod: Date;
}

export default function OvulationCalculator() {
  const [lmp, setLmp] = useState({ day: '', month: '', year: '' });
  const [cycleLength, setCycleLength] = useState('28');
  const [ovulationInfo, setOvulationInfo] = useState<OvulationInfo | null>(null);
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
      setError("Please enter a valid date for your last menstrual period.");
      setOvulationInfo(null);
      return;
    }
     if (lmpDate > new Date()) {
        setError("Last menstrual period cannot be in the future.");
        setOvulationInfo(null);
        return;
    }
    if (isNaN(cycle) || cycle < 20 || cycle > 45) {
      setError("Please enter a valid cycle length (between 20 and 45 days).");
      setOvulationInfo(null);
      return;
    }

    setError(null);
    const ovulationDay = cycle - 14;
    const ovulationDate = addDays(lmpDate, ovulationDay);
    const fertileStart = subDays(ovulationDate, 5);
    const fertileEnd = ovulationDate;
    const nextPeriod = addDays(lmpDate, cycle);

    setOvulationInfo({
      fertileWindow: { start: fertileStart, end: fertileEnd },
      ovulationDate,
      nextPeriod,
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Ovulation Calculator</CardTitle>
        <CardDescription>
          Find your most fertile days to help you plan.
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
            <Label>First Day of Last Period</Label>
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
        <Button onClick={handleCalculate} className="w-full">Calculate Fertile Window</Button>

        {ovulationInfo && (
          <div className="p-6 bg-muted rounded-lg space-y-4 animate-fade-in mt-4 text-center">
            <div>
              <h3 className="text-lg font-medium text-muted-foreground">Estimated Fertile Window:</h3>
              <p className="text-xl font-semibold text-primary">
                {format(ovulationInfo.fertileWindow.start, 'MMM d')} - {format(ovulationInfo.fertileWindow.end, 'MMM d, yyyy')}
              </p>
            </div>
             <div>
              <h3 className="text-lg font-medium text-muted-foreground">Estimated Ovulation Date:</h3>
              <p className="text-xl font-semibold text-primary">{format(ovulationInfo.ovulationDate, 'MMMM d, yyyy')}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-muted-foreground">Next Period Prediction:</h3>
              <p className="text-xl font-semibold text-primary">{format(ovulationInfo.nextPeriod, 'MMMM d, yyyy')}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
