
"use client";

import { useState } from 'react';
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

interface RetirementInfo {
  fullRetirementAge: { years: number; months: number };
  earlyBenefitReduction: number;
  delayedBenefitIncrease: number;
}

const getFullRetirementAge = (birthYear: number): { years: number; months: number } => {
  if (birthYear <= 1937) return { years: 65, months: 0 };
  if (birthYear === 1938) return { years: 65, months: 2 };
  if (birthYear === 1939) return { years: 65, months: 4 };
  if (birthYear === 1940) return { years: 65, months: 6 };
  if (birthYear === 1941) return { years: 65, months: 8 };
  if (birthYear === 1942) return { years: 65, months: 10 };
  if (birthYear >= 1943 && birthYear <= 1954) return { years: 66, months: 0 };
  if (birthYear === 1955) return { years: 66, months: 2 };
  if (birthYear === 1956) return { years: 66, months: 4 };
  if (birthYear === 1957) return { years: 66, months: 6 };
  if (birthYear === 1958) return { years: 66, months: 8 };
  if (birthYear === 1959) return { years: 66, months: 10 };
  return { years: 67, months: 0 }; // 1960 or later
};

const getBenefitAdjustments = (fra: {years: number, months: number}): { reduction: number, increase: number } => {
    const fraInMonths = fra.years * 12 + fra.months;
    const monthsEarly = fraInMonths - (62 * 12);
    
    let reduction = 0;
    if (monthsEarly <= 36) {
        reduction = monthsEarly * (5/9);
    } else {
        reduction = 36 * (5/9) + (monthsEarly - 36) * (5/12);
    }

    const monthsDelayed = (70*12) - fraInMonths;
    const increase = (monthsDelayed / 12) * 8;

    return { reduction, increase };
}


export default function SocialSecurityRetirementAgeCalculator() {
  const [birthYear, setBirthYear] = useState('');
  const [retirementInfo, setRetirementInfo] = useState<RetirementInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const year = parseInt(birthYear, 10);

    if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
      setError("Please enter a valid birth year.");
      setRetirementInfo(null);
      return;
    }
    setError(null);

    const fullRetirementAge = getFullRetirementAge(year);
    const adjustments = getBenefitAdjustments(fullRetirementAge);
    
    setRetirementInfo({
      fullRetirementAge,
      earlyBenefitReduction: Math.round(adjustments.reduction),
      delayedBenefitIncrease: Math.round(adjustments.increase),
    });
  };

  return (
    <Card className="w-full max-w-xl mx-auto shadow-lg animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle>Calculate Your Full Retirement Age</CardTitle>
        <CardDescription>
          Enter your birth year to find your Social Security retirement details.
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
            <Label htmlFor="birth-year-ss">Your Birth Year</Label>
            <div className="flex gap-2">
                <Input 
                    id="birth-year-ss"
                    placeholder="YYYY" 
                    value={birthYear} 
                    onChange={e => setBirthYear(e.target.value)} 
                    aria-label="Year of Birth"
                />
                <Button onClick={handleCalculate} className="w-full sm:w-auto">Calculate</Button>
                 <ShareButton title="Social Security Retirement Calculator" text="Find out your full retirement age for Social Security!" url="/social-security-retirement-age-calculator" />
            </div>
        </div>

        {retirementInfo && (
          
            <div className="p-6 bg-muted rounded-lg space-y-6 animate-fade-in mt-4">
              <div className="text-center">
                <h3 className="text-lg font-medium text-muted-foreground">Your Full Retirement Age is:</h3>
                <div className="flex justify-center items-baseline space-x-2">
                  <span className="text-4xl font-bold text-primary">{retirementInfo.fullRetirementAge.years}</span>
                  <span className="text-xl text-muted-foreground">years</span>
                  {retirementInfo.fullRetirementAge.months > 0 && (
                    <>
                      <span className="text-4xl font-bold text-primary">{retirementInfo.fullRetirementAge.months}</span>
                      <span className="text-xl text-muted-foreground">months</span>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                  <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold">Early Retirement (Age 62)</h4>
                      <p className="text-sm text-muted-foreground">You can start benefits at age 62, but they will be reduced by approximately <strong className="text-foreground">{retirementInfo.earlyBenefitReduction}%</strong>.</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold">Delayed Retirement (Age 70)</h4>
                      <p className="text-sm text-muted-foreground">If you wait until age 70, your benefits will increase by about <strong className="text-foreground">{retirementInfo.delayedBenefitIncrease}%</strong> over your full retirement amount.</p>
                  </div>
              </div>
            </div>
            
        )}
      </CardContent>
    </Card>
  );
}
