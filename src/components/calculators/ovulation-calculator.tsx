
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CalendarIcon } from "lucide-react"
import { RefreshCcw } from 'lucide-react';
import ShareButton from '../share-button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '../ui/calendar';

interface OvulationInfo {
  fertileWindow: { start: Date; end: Date };
  ovulationDate: Date;
  nextPeriod: Date;
  daysUntilOvulation: number;
  currentCycleDay: number;
}

export default function OvulationCalculator() {
  const [lmp, setLmp] = useState<Date | undefined>();
  const [cycleLength, setCycleLength] = useState('28');
  const [ovulationInfo, setOvulationInfo] = useState<OvulationInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const lmpDate = lmp;
    const cycle = parseInt(cycleLength, 10);

    if (!lmpDate || !isValid(lmpDate)) {
      setError("Please enter a valid date for your last menstrual period.");
      setOvulationInfo(null);
      return;
    }
     if (lmpDate > new Date()) {
        setError("Last menstrual period cannot be in the future.");
        setOvulationInfo(null);
        return;
    }
    if (isNaN(cycle) || cycle < 21 || cycle > 45) {
      setError("Please enter a valid cycle length (between 21 and 45 days).");
      setOvulationInfo(null);
      return;
    }

    setError(null);
    const ovulationDay = cycle - 14;
    const ovulationDate = addDays(lmpDate, ovulationDay);
    const fertileStart = subDays(ovulationDate, 5);
    const fertileEnd = ovulationDate;
    const nextPeriod = addDays(lmpDate, cycle);

    const today = new Date();
    const daysUntilOvulation = differenceInDays(ovulationDate, today);
    const currentCycleDay = differenceInDays(today, lmpDate) + 1;

    setOvulationInfo({
      fertileWindow: { start: fertileStart, end: fertileEnd },
      ovulationDate,
      nextPeriod,
      daysUntilOvulation: daysUntilOvulation > 0 ? daysUntilOvulation : 0,
      currentCycleDay: currentCycleDay > 0 ? currentCycleDay : 1,
    });
  };

  const handleReset = () => {
    setLmp(undefined);
    setCycleLength('28');
    setOvulationInfo(null);
    setError(null);
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg animate-fade-in">
      <CardHeader className="text-center">
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
            <Label htmlFor='lmp-picker'>First Day of Last Period</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button id="lmp-picker" variant={"outline"} className={cn("w-full justify-start text-left font-normal", !lmp && "text-muted-foreground")}>
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
          <Label htmlFor="cycle-length">Average Cycle Length (days)</Label>
          <Input id="cycle-length" type="number" value={cycleLength} onChange={(e) => setCycleLength(e.target.value)} />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <Button onClick={handleCalculate} className="w-full">Calculate Fertile Window</Button>
          <Button onClick={handleReset} variant="outline" className="w-full md:w-auto" aria-label="Reset">
              <RefreshCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
          <ShareButton title="Ovulation Calculator" text="Find your most fertile days with this Ovulation Calculator!" />
        </div>

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
                <h3 className="text-lg font-medium text-muted-foreground">Days Until Ovulation:</h3>
                <p className="text-xl font-semibold text-primary">{ovulationInfo.daysUntilOvulation} days</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-muted-foreground">Next Period Prediction:</h3>
                <p className="text-xl font-semibold text-primary">{format(ovulationInfo.nextPeriod, 'MMMM d, yyyy')}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-muted-foreground">Current Cycle Day:</h3>
                <p className="text-xl font-semibold text-primary">{ovulationInfo.currentCycleDay}</p>
              </div>
            </div>
            
        )}
      </CardContent>
    </Card>
  );
}
