"use client";

import { useState } from 'react';
import { format, intervalToDuration } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';

interface AgeResult {
  chronoAge: number;
  bioAge: number;
  metabolicAge: number;
}

export default function BiologicalAgeCalculator() {
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
  const [result, setResult] = useState<AgeResult | null>(null);

  const calculateAges = () => {
    if (!dateOfBirth) return;

    const duration = intervalToDuration({ start: dateOfBirth, end: new Date() });
    const chronoAge = duration.years || 0;
    
    // Placeholder formulas as in the example
    const bioAge = chronoAge > 2 ? chronoAge - 2 : 0; 
    const metabolicAge = chronoAge > 1 ? chronoAge - 1 : 0;

    setResult({
      chronoAge,
      bioAge,
      metabolicAge,
    });
  };

  return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Calculate Your Chronological & Biological Age</CardTitle>
          <CardDescription>
            Enter your date of birth to see your chronological, biological, and metabolic age estimates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className='space-y-2'>
              <Label htmlFor='dob-popover'>Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild id="dob-popover">
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !dateOfBirth && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateOfBirth ? format(dateOfBirth, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateOfBirth}
                    onSelect={setDateOfBirth}
                    captionLayout="dropdown-buttons"
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          
          <Button onClick={calculateAges} className="w-full">Calculate Age</Button>

          {result && (
            <div className="p-6 bg-muted rounded-lg text-center space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                      <h3 className="text-lg font-medium text-muted-foreground mb-2">Chronological Age</h3>
                      <p className="text-3xl font-bold text-primary">{result.chronoAge}</p>
                  </div>
                  <div>
                      <h3 className="text-lg font-medium text-muted-foreground mb-2">Biological Age</h3>
                      <p className="text-3xl font-bold text-primary">{result.bioAge}</p>
                  </div>
                   <div>
                      <h3 className="text-lg font-medium text-muted-foreground mb-2">Metabolic Age</h3>
                      <p className="text-3xl font-bold text-primary">{result.metabolicAge}</p>
                  </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
  );
}