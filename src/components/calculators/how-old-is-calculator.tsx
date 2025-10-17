
"use client";

import { useState, useCallback } from 'react';
import { intervalToDuration, isValid, isFuture, format, differenceInYears } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCcw } from "lucide-react"
import ShareButton from '../share-button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


interface AgeResult {
  years?: number;
  months?: number;
  days?: number;
  text: string;
}

const months = Array.from({ length: 12 }, (_, i) => ({ value: (i + 1).toString(), label: format(new Date(0, i), 'MMMM') }));
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 125 }, (_, i) => currentYear - i);

const FullDateTab = ({ onResult, onError }: { onResult: (res: AgeResult) => void, onError: (err: string | null) => void }) => {
  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');

  const handleCalculate = useCallback(() => {
    onError(null);
    onResult({} as AgeResult);
    if (!dobYear || !dobMonth || !dobDay) {
        onError("Please enter a full, valid date.");
        return;
    }
    const dobDate = new Date(parseInt(dobYear), parseInt(dobMonth) - 1, parseInt(dobDay));
    if (!isValid(dobDate)) {
      onError("Please enter a valid date of birth.");
      return;
    }
    if (isFuture(dobDate)) {
      onError("The date of birth cannot be in the future.");
      return;
    }
    const duration = intervalToDuration({ start: dobDate, end: new Date() });
    onResult({
      years: duration.years,
      months: duration.months,
      days: duration.days,
      text: `Someone born on ${format(dobDate, 'MMMM d, yyyy')} is currently:`
    });
  }, [dobDay, dobMonth, dobYear, onError, onResult]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Date of Birth</Label>
        <div className="flex gap-2">
            <Select value={dobMonth} onValueChange={setDobMonth}>
                <SelectTrigger aria-label="Birth Month"><SelectValue placeholder="Month" /></SelectTrigger>
                <SelectContent>{months.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}</SelectContent>
            </Select>
            <Input type="number" placeholder="Day" value={dobDay} onChange={e => setDobDay(e.target.value)} aria-label="Birth Day" />
            <Select value={dobYear} onValueChange={setDobYear}>
                <SelectTrigger aria-label="Birth Year"><SelectValue placeholder="Year" /></SelectTrigger>
                <SelectContent>{years.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}</SelectContent>
            </Select>
        </div>
      </div>
      <Button onClick={handleCalculate} className="w-full">Find Out How Old They Are</Button>
    </div>
  );
};

const MonthYearTab = ({ onResult, onError }: { onResult: (res: AgeResult) => void, onError: (err: string | null) => void }) => {
    const [dobMonth, setDobMonth] = useState('');
    const [dobYear, setDobYear] = useState('');

    const handleCalculate = useCallback(() => {
        onError(null);
        onResult({} as AgeResult);
        if (!dobYear || !dobMonth) {
            onError("Please select a month and year.");
            return;
        }
        const today = new Date();
        const birthDateThisYear = new Date(today.getFullYear(), parseInt(dobMonth) - 1, 15); // Use 15th to avoid timezone issues
        let age = today.getFullYear() - parseInt(dobYear);
        if (today < birthDateThisYear) {
            age--;
        }
        onResult({
            text: `Someone born in ${months.find(m => m.value === dobMonth)?.label} ${dobYear} is currently:`,
            years: age,
        });
    }, [dobMonth, dobYear, onError, onResult]);

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Month and Year of Birth</Label>
                <div className="flex gap-2">
                     <Select value={dobMonth} onValueChange={setDobMonth}>
                        <SelectTrigger aria-label="Birth Month"><SelectValue placeholder="Month" /></SelectTrigger>
                        <SelectContent>{months.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}</SelectContent>
                    </Select>
                    <Select value={dobYear} onValueChange={setDobYear}>
                        <SelectTrigger aria-label="Birth Year"><SelectValue placeholder="Year" /></SelectTrigger>
                        <SelectContent>{years.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}</SelectContent>
                    </Select>
                </div>
            </div>
            <Button onClick={handleCalculate} className="w-full">Find Out How Old They Are</Button>
        </div>
    );
}

const YearOnlyTab = ({ onResult, onError }: { onResult: (res: AgeResult) => void, onError: (err: string | null) => void }) => {
    const [dobYear, setDobYear] = useState('');

    const handleCalculate = useCallback(() => {
        onError(null);
        onResult({} as AgeResult);
        if (!dobYear) {
            onError("Please select a year.");
            return;
        }
        const ageThisYear = new Date().getFullYear() - parseInt(dobYear);
        onResult({
            text: `Someone born in ${dobYear} is or will be:`,
            years: ageThisYear,
        });
    }, [dobYear, onError, onResult]);

     return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Year of Birth</Label>
                <Select value={dobYear} onValueChange={setDobYear}>
                    <SelectTrigger aria-label="Birth Year"><SelectValue placeholder="Year" /></SelectTrigger>
                    <SelectContent>{years.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}</SelectContent>
                </Select>
            </div>
            <Button onClick={handleCalculate} className="w-full">Find Out How Old They Are</Button>
        </div>
    );
}


export default function HowOldIsCalculator() {
  const [ageResult, setAgeResult] = useState<AgeResult | undefined>();
  const [error, setError] = useState<string | null>(null);

  const handleReset = useCallback(() => {
      setAgeResult(undefined);
      setError(null);
      // Resetting forms would need more complex state management or context, so we just clear results
  }, []);

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle>How Old Is...? A Quick Age Finder</CardTitle>
        <CardDescription>
          Enter the birth details to find out how old someone is.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="full" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="full">Full Date</TabsTrigger>
                <TabsTrigger value="monthYear">Month & Year</TabsTrigger>
                <TabsTrigger value="year">Year Only</TabsTrigger>
            </TabsList>
            <TabsContent value="full" className="pt-4">
                <FullDateTab onResult={setAgeResult} onError={setError} />
            </TabsContent>
            <TabsContent value="monthYear" className="pt-4">
                <MonthYearTab onResult={setAgeResult} onError={setError} />
            </TabsContent>
            <TabsContent value="year" className="pt-4">
                <YearOnlyTab onResult={setAgeResult} onError={setError} />
            </TabsContent>
        </Tabs>
        
        {error && (
            <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        <div className="flex justify-end gap-2">
            <Button onClick={handleReset} variant="outline" aria-label="Reset">
                <RefreshCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
            <ShareButton title="How Old Is...?" text="A quick tool to find out anyone's age from their birth date!" url="/how-old-is" />
        </div>

        {ageResult && ageResult.text && (
            <div className="p-4 sm:p-6 bg-muted rounded-lg text-center space-y-2 animate-fade-in">
              <p className="text-md sm:text-lg text-muted-foreground">
                {ageResult.text}
              </p>
              <div className="flex justify-center items-baseline flex-wrap gap-x-2 sm:gap-x-4 gap-y-2">
                {ageResult.years !== undefined && <div><span className="text-2xl sm:text-4xl font-bold text-primary">{ageResult.years}</span> <span className="text-lg sm:text-xl text-muted-foreground">years</span></div>}
                {ageResult.months !== undefined && <div><span className="text-2xl sm:text-4xl font-bold text-primary">{ageResult.months}</span> <span className="text-lg sm:text-xl text-muted-foreground">months</span></div>}
                {ageResult.days !== undefined && <div><span className="text-2xl sm:text-4xl font-bold text-primary">{ageResult.days}</span> <span className="text-lg sm:text-xl text-muted-foreground">days</span></div>}
              </div>
              <p className="text-md sm:text-lg text-muted-foreground">old.</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
