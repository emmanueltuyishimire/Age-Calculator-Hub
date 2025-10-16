
"use client";

import { useState } from 'react';
import { format, addDays, isValid } from 'date-fns';
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
import ShareButton from '../share-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const months = Array.from({ length: 12 }, (_, i) => ({ value: (i + 1).toString(), label: format(new Date(0, i), 'MMMM') }));
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 2 }, (_, i) => currentYear - i);

interface PregnancyInfo {
  gestationalAge: string;
  dueDate: Date;
  conceptionDate: Date;
  trimester: number;
}

export default function PregnancyCalculator() {
  const [lmpDay, setLmpDay] = useState('');
  const [lmpMonth, setLmpMonth] = useState('');
  const [lmpYear, setLmpYear] = useState('');
  const [cycleLength, setCycleLength] = useState('28');
  const [pregnancyInfo, setPregnancyInfo] = useState<PregnancyInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    if (!lmpYear || !lmpMonth || !lmpDay) {
        setError("Please enter a full, valid date for the last menstrual period.");
        setPregnancyInfo(null);
        return;
    }
    const lmpDate = new Date(parseInt(lmpYear), parseInt(lmpMonth) - 1, parseInt(lmpDay));
    const cycle = parseInt(cycleLength, 10);

    if (!isValid(lmpDate)) {
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
    const daysPregnant = Math.floor((today.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24));
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
                <Select value={lmpMonth} onValueChange={setLmpMonth}>
                    <SelectTrigger aria-label="LMP Month"><SelectValue placeholder="Month" /></SelectTrigger>
                    <SelectContent>{months.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}</SelectContent>
                </Select>
                <Input type="number" placeholder="Day" value={lmpDay} onChange={e => setLmpDay(e.target.value)} aria-label="LMP Day" />
                <Select value={lmpYear} onValueChange={setLmpYear}>
                    <SelectTrigger aria-label="LMP Year"><SelectValue placeholder="Year" /></SelectTrigger>
                    <SelectContent>{years.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}</SelectContent>
                </Select>
            </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="cycle-length-preg">Average Cycle Length (days)</Label>
            <Input id="cycle-length-preg" type="number" value={cycleLength} onChange={(e) => setCycleLength(e.target.value)} />
        </div>
        <div className="flex gap-2">
            <Button onClick={handleCalculate} className="w-full">Calculate</Button>
            <ShareButton title="Pregnancy Calculator" text="Find out your estimated due date with this pregnancy calculator!" />
        </div>

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
