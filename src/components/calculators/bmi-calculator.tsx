
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ShareButton from "../share-button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";

function getBmiCategory(bmi: number) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obesity';
}

export default function BmiCalculator() {
  const [bmiData, setBmiData] = useState({ height: '', weight: '' });
  const [bmiResult, setBmiResult] = useState<{ bmi: string, category: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBmiCalculation = () => {
    const height = parseFloat(bmiData.height);
    const weight = parseFloat(bmiData.weight);

    if (height > 0 && weight > 0) {
        setError(null);
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        setBmiResult({
            bmi: bmi.toFixed(1),
            category: getBmiCategory(bmi),
        });
    } else {
        setError("Please enter a valid height and weight.");
        setBmiResult(null);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle>Enter Your Details</CardTitle>
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
          <Label htmlFor="bmi-weight">Weight (kg)</Label>
          <Input
            id="bmi-weight" type="number" value={bmiData.weight}
            onChange={(e) => setBmiData({...bmiData, weight: e.target.value})} placeholder="e.g., 70"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bmi-height">Height (cm)</Label>
          <Input
            id="bmi-height" type="number" value={bmiData.height}
            onChange={(e) => setBmiData({...bmiData, height: e.target.value})} placeholder="e.g., 175"
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleBmiCalculation} className="w-full">
              Calculate BMI
          </Button>
          <ShareButton title="BMI Calculator" text="Check your Body Mass Index (BMI) with this simple health calculator!" url="/bmi-calculator" />
        </div>
        {bmiResult && (
          <div className="p-4 bg-muted rounded-lg text-center mt-4">
              <p className="font-semibold text-muted-foreground">Your BMI is</p>
              <p className="text-3xl font-bold text-primary">{bmiResult.bmi}</p>
              <p className="font-semibold">{bmiResult.category}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
