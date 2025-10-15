
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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CalendarIcon } from "lucide-react"
import ShareButton from '../share-button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '../ui/calendar';

interface DueDateInfo {
  dueDate: Date;
  gestationalAge: string;
  trimester: number;
}

export default function DueDateCalculator() {
  const [calculationMethod, setCalculationMethod] = useState('lmp');
  const [inputDate, setInputDate] = useState<Date | undefined>();
  const [dueDateInfo, setDueDateInfo] = useState<DueDateInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const date = inputDate;
    if (!date || !isValid(date)) {
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
    <Card className="w-full max-w-lg mx-auto shadow-lg animate-fade-in">
      <CardHeader className="text-center">
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
          <Label htmlFor="calc-method">Calculate from</Label>
          <Select value={calculationMethod} onValueChange={setCalculationMethod}>
            <SelectTrigger id="calc-method">
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
          <Label htmlFor="date-picker-due-date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date-picker-due-date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !inputDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {inputDate ? format(inputDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  captionLayout="dropdown-buttons"
                  fromYear={new Date().getFullYear() - 2}
                  toYear={new Date().getFullYear() + 1}
                  selected={inputDate}
                  onSelect={setInputDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
        </div>
        <div className="flex gap-2">
            <Button onClick={handleCalculate} className="w-full">Calculate Due Date</Button>
            <ShareButton title="Pregnancy Due Date Calculator" text="Estimate your baby's due date with this easy calculator!" />
        </div>

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
