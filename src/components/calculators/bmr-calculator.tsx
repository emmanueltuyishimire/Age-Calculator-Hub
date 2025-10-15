
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ShareButton from "../share-button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";

export default function BmrCalculator() {
  const [bmrData, setBmrData] = useState({ age: '', gender: 'male', height: '', weight: '' });
  const [bmrResult, setBmrResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBmrCalculation = () => {
    const age = parseFloat(bmrData.age);
    const height = parseFloat(bmrData.height);
    const weight = parseFloat(bmrData.weight);

    if (age > 0 && height > 0 && weight > 0) {
      setError(null);
      let bmr = 0;
      if (bmrData.gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      }
      setBmrResult(bmr.toFixed(0));
    } else {
      setError("Please enter a valid age, height, and weight.");
      setBmrResult(null);
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
          <Label htmlFor="bmr-gender">Gender</Label>
          <Select value={bmrData.gender} onValueChange={(value) => setBmrData({...bmrData, gender: value})}>
              <SelectTrigger id="bmr-gender"><SelectValue/></SelectTrigger>
              <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
              </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bmr-age">Your Age</Label>
          <Input
            id="bmr-age" type="number" value={bmrData.age}
            onChange={(e) => setBmrData({...bmrData, age: e.target.value})} placeholder="e.g., 35"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bmr-weight">Weight (kg)</Label>
          <Input
            id="bmr-weight" type="number" value={bmrData.weight}
            onChange={(e) => setBmrData({...bmrData, weight: e.target.value})} placeholder="e.g., 70"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bmr-height">Height (cm)</Label>
          <Input
            id="bmr-height" type="number" value={bmrData.height}
            onChange={(e) => setBmrData({...bmrData, height: e.target.value})} placeholder="e.g., 175"
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleBmrCalculation} className="w-full">
              Calculate BMR
          </Button>
          <ShareButton title="BMR Calculator" text="Find out your Basal Metabolic Rate (BMR) with this health calculator!" url="/bmr-calculator" />
        </div>
        {bmrResult && (
          <div className="p-4 bg-muted rounded-lg text-center mt-4">
            <p className="font-semibold text-muted-foreground">Your Basal Metabolic Rate is</p>
            <p className="text-3xl font-bold text-primary">{bmrResult}</p>
            <p className="font-semibold">calories/day</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
