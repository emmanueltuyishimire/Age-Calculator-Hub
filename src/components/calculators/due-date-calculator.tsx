
"use client";

import { useState } from 'react';
import { format, addDays, subDays, isValid, differenceInDays } from 'date-fns';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface DueDateInfo {
  dueDate: Date;
  gestationalAge: string;
  trimester: number;
}

export default function DueDateCalculator() {
  const [calculationMethod, setCalculationMethod] = useState('lmp');
  const [inputDate, setInputDate] = useState({ day: '', month: '', year: '' });
  const [dueDateInfo, setDueDateInfo] = useState<DueDateInfo | null>(null);
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
    const date = parseDate(inputDate.day, inputDate.month, inputDate.year);
    if (!date) {
      setError("Please enter a valid date.");
      setDueDateInfo(null);
      return;
    }
     if (date > new Date() && calculationMethod !== 'ivf') {
        setError("The selected date cannot be in the future.");
        setDueDateInfo(null);
        return;
    }

    setError(null);
    let dueDate: Date;
    let startDate: Date;

    switch (calculationMethod) {
      case 'conception':
        dueDate = addDays(date, 266);
        startDate = subDays(date, 14);
        break;
      case 'ivf':
        // Assuming a Day 5 transfer (blastocyst)
        dueDate = addDays(date, 261);
        startDate = subDays(date, 19);
        break;
      case 'lmp':
      default:
        dueDate = addDays(date, 280);
        startDate = date;
        break;
    }

    const today = new Date();
    const daysPregnant = differenceInDays(today, startDate);
    const weeks = Math.floor(daysPregnant / 7);
    const days = daysPregnant % 7;

    let trimester = 0;
    if (weeks <= 13) trimester = 1;
    else if (weeks <= 27) trimester = 2;
    else trimester = 3;

    setDueDateInfo({
      dueDate,
      gestationalAge: `${weeks} weeks, ${days} days`,
      trimester,
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Due Date Calculator</CardTitle>
        <CardDescription>
          Select your calculation method and enter the date.
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
          <Label>Calculate from</Label>
          <Select value={calculationMethod} onValueChange={setCalculationMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lmp">Last Menstrual Period</SelectItem>
              <SelectItem value="conception">Conception Date</SelectItem>
              <SelectItem value="ivf">IVF Transfer Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Date</Label>
           <div className="flex gap-2">
                <Input placeholder="DD" value={inputDate.day} onChange={e => setInputDate({...inputDate, day: e.target.value})} aria-label="Day"/>
                <Input placeholder="MM" value={inputDate.month} onChange={e => setInputDate({...inputDate, month: e.target.value})} aria-label="Month"/>
                <Input placeholder="YYYY" value={inputDate.year} onChange={e => setInputDate({...inputDate, year: e.target.value})} aria-label="Year"/>
            </div>
        </div>
        <Button onClick={handleCalculate} className="w-full">Calculate Due Date</Button>

        {dueDateInfo && (
          <div className="p-6 bg-muted rounded-lg space-y-4 animate-fade-in mt-4 text-center">
            <div>
              <h3 className="text-lg font-medium text-muted-foreground">Estimated Due Date:</h3>
              <p className="text-2xl font-bold text-primary">{format(dueDateInfo.dueDate, 'MMMM d, yyyy')}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-muted-foreground">Gestational Age:</h3>
              <p className="text-xl font-semibold text-primary">{dueDateInfo.gestationalAge}</p>
            </div>
             <div>
              <h3 className="text-lg font-medium text-muted-foreground">Current Trimester:</h3>
              <p className="text-xl font-semibold text-primary">{dueDateInfo.trimester}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
