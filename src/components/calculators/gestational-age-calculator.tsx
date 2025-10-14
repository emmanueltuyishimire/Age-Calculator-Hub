
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import ShareButton from '../share-button';

interface GestationalInfo {
  weeks: number;
  days: number;
  dueDate: Date;
  trimester: number;
  developmentStage: string;
}

// Fetal development highlights by week
const developmentStages: { [key: number]: string } = {
    4: "Embryo implants in the uterus.",
    5: "Heart begins to beat.",
    8: "All major organs begin to form.",
    12: "Fetus can make a fist.",
    16: "You may start to feel the first flutters of movement.",
    20: "Baby can hear sounds.",
    24: "Lungs are developing.",
    28: "Baby can open and close their eyes.",
    32: "Bones are fully formed.",
    36: "Baby is getting into position for birth.",
    40: "Baby is full-term and ready for birth."
};

const getDevelopmentStage = (weeks: number) => {
    const stageKeys = Object.keys(developmentStages).map(Number).sort((a,b) => a - b);
    let stage = "Conception has occurred.";
    for (const weekKey of stageKeys) {
        if (weeks >= weekKey) {
            stage = developmentStages[weekKey];
        } else {
            break;
        }
    }
    return stage;
}


export default function GestationalAgeCalculator() {
  const [lmp, setLmp] = useState({ day: '', month: '', year: '' });
  const [gestationalInfo, setGestationalInfo] = useState<GestationalInfo | null>(null);
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
    const selectedDate = parseDate(lmp.day, lmp.month, lmp.year);
    
    if (!selectedDate) {
        setError("Please enter a valid date for the last menstrual period.");
        setGestationalInfo(null);
        return;
    }

    const today = new Date();
    if (selectedDate > today) {
        setError("Last menstrual period cannot be in the future.");
        setGestationalInfo(null);
        return;
    }
    
    setError(null);
    
    const dueDate = addDays(selectedDate, 280);
    const totalDays = differenceInDays(today, selectedDate);
    const weeks = Math.floor(totalDays / 7);
    const days = totalDays % 7;
    
    let trimester = 0;
    if (weeks <= 13) trimester = 1;
    else if (weeks <= 27) trimester = 2;
    else trimester = 3;

    const developmentStage = getDevelopmentStage(weeks);
    
    setGestationalInfo({ weeks, days, dueDate, trimester, developmentStage });
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle>Enter Pregnancy Details</CardTitle>
        <CardDescription>
          Provide the first day of your last menstrual period (LMP) to get an estimate.
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
            <Label htmlFor="lmp-day-gestational">Last Menstrual Period (LMP) Date</Label>
            <div className="flex gap-2">
                <Input id="lmp-day-gestational" placeholder="DD" value={lmp.day} onChange={e => setLmp({...lmp, day: e.target.value})} aria-label="LMP Day"/>
                <Input id="lmp-month-gestational" placeholder="MM" value={lmp.month} onChange={e => setLmp({...lmp, month: e.target.value})} aria-label="LMP Month"/>
                <Input id="lmp-year-gestational" placeholder="YYYY" value={lmp.year} onChange={e => setLmp({...lmp, year: e.target.value})} aria-label="LMP Year"/>
            </div>
        </div>
        <div className="flex gap-2">
            <Button onClick={handleCalculate} className="w-full">Calculate Gestational Age</Button>
            <ShareButton title="Gestational Age Calculator" text="Find out how many weeks pregnant you are!" />
        </div>

        {gestationalInfo && (
          
            <div className="p-6 bg-muted rounded-lg text-center space-y-6 animate-fade-in mt-4">
              <div>
                <h3 className="text-lg font-medium text-muted-foreground">Current Gestational Age:</h3>
                <div className="flex justify-center items-baseline space-x-2">
                  <span className="text-4xl font-bold text-primary">{gestationalInfo.weeks}</span>
                  <span className="text-xl text-muted-foreground">weeks</span>
                  <span className="text-4xl font-bold text-primary">{gestationalInfo.days}</span>
                  <span className="text-xl text-muted-foreground">days</span>
                </div>
              </div>
              <div>
                  <h3 className="text-lg font-medium text-muted-foreground">You are in:</h3>
                  <p className="text-2xl font-semibold text-primary">Trimester {gestationalInfo.trimester}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-muted-foreground">Estimated Due Date:</h3>
                <p className="text-2xl font-semibold text-primary">
                  {format(gestationalInfo.dueDate, 'MMMM d, yyyy')}
                </p>
              </div>
              <div>
                  <h3 className="text-lg font-medium text-muted-foreground">Fetal Development Highlight:</h3>
                  <p className="text-md text-foreground">{gestationalInfo.developmentStage}</p>
              </div>
            </div>
            
        )}
      </CardContent>
    </Card>
  );
}
