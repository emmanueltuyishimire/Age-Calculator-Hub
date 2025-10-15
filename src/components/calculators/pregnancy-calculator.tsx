
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
import { AlertCircle, CalendarIcon } from "lucide-react"
import ShareButton from '../share-button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '../ui/calendar';

interface PregnancyInfo {
  gestationalAge: string;
  dueDate: Date;
  conceptionDate: Date;
  trimester: number;
}

export default function PregnancyCalculator() {
  const [lmp, setLmp] = useState<Date | undefined>();
  const [cycleLength, setCycleLength] = useState('28');
  const [pregnancyInfo, setPregnancyInfo] = useState<PregnancyInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const lmpDate = lmp;
    const cycle = parseInt(cycleLength, 10);

    if (!lmpDate || !isValid(lmpDate)) {
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
            <Label htmlFor="lmp-picker-preg">Last Menstrual Period (LMP)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button id="lmp-picker-preg" variant={"outline"} className={cn("w-full justify-start text-left font-normal", !lmp && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {lmp ? format(lmp, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  captionLayout="dropdown-buttons"
                  fromYear={new Date().getFullYear() - 1}
                  toYear={new Date().getFullYear()}
                  selected={lmp}
                  onSelect={setLmp}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
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

function differenceInDays(dateLeft: Date, dateRight: Date): number {
    const diff = dateLeft.getTime() - dateRight.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}
