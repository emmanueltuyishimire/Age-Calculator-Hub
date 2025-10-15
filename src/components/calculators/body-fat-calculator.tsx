
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

export default function BodyFatCalculator() {
  const [bodyFatData, setBodyFatData] = useState({ gender: 'male', neck: '', waist: '', height: '', hip: '' });
  const [bodyFatResult, setBodyFatResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBodyFatCalculation = () => {
    const neck = parseFloat(bodyFatData.neck);
    const waist = parseFloat(bodyFatData.waist);
    const height = parseFloat(bodyFatData.height);
    const hip = parseFloat(bodyFatData.hip);

    if (height > 0 && neck > 0 && waist > 0) {
        let bfp = 0;
        if (bodyFatData.gender === 'male') {
            bfp = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
        } else {
            if (hip > 0) {
              bfp = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
            } else {
              setError("Please enter hip measurement for females.");
              setBodyFatResult(null);
              return;
            }
        }
        if(bfp > 0 && bfp < 100) {
            setError(null);
            setBodyFatResult(bfp.toFixed(1));
        } else {
             setError("Measurements seem incorrect. Please double-check your numbers.");
             setBodyFatResult(null);
        }
    } else {
        setError("Please enter valid height, neck, and waist measurements.");
        setBodyFatResult(null);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle>Enter Your Measurements</CardTitle>
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
            <Label htmlFor="bf-gender">Gender</Label>
            <Select value={bodyFatData.gender} onValueChange={(value) => setBodyFatData({...bodyFatData, gender: value})}>
                <SelectTrigger id="bf-gender"><SelectValue/></SelectTrigger>
                <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-2">
            <Label htmlFor="bf-height">Height (cm)</Label>
            <Input id="bf-height" type="number" value={bodyFatData.height} onChange={(e) => setBodyFatData({...bodyFatData, height: e.target.value})} placeholder="e.g., 175"/>
        </div>
        <div className="space-y-2">
            <Label htmlFor="bf-neck">Neck (cm)</Label>
            <Input id="bf-neck" type="number" value={bodyFatData.neck} onChange={(e) => setBodyFatData({...bodyFatData, neck: e.target.value})} placeholder="e.g., 38"/>
        </div>
        <div className="space-y-2">
            <Label htmlFor="bf-waist">Waist (cm)</Label>
            <Input id="bf-waist" type="number" value={bodyFatData.waist} onChange={(e) => setBodyFatData({...bodyFatData, waist: e.target.value})} placeholder="e.g., 90"/>
        </div>
        {bodyFatData.gender === 'female' && (
             <div className="space-y-2">
                <Label htmlFor="bf-hip">Hip (cm)</Label>
                <Input id="bf-hip" type="number" value={bodyFatData.hip} onChange={(e) => setBodyFatData({...bodyFatData, hip: e.target.value})} placeholder="e.g., 100"/>
            </div>
        )}
        <div className="flex gap-2">
          <Button onClick={handleBodyFatCalculation} className="w-full">
              Calculate Body Fat
          </Button>
          <ShareButton title="Body Fat Calculator" text="Estimate your body fat percentage with this health assessment tool!" url="/body-fat-calculator" />
        </div>
        {bodyFatResult && (
          <div className="p-4 bg-muted rounded-lg text-center mt-4">
            <p className="font-semibold text-muted-foreground">Your Estimated Body Fat is</p>
            <p className="text-3xl font-bold text-primary">{bodyFatResult}%</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
