
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

function getBmiCategory(bmi: number) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obesity';
}

export default function HealthAssessmentCalculator() {
  const [bmrData, setBmrData] = useState({ age: '', gender: 'male', height: '', weight: '' });
  const [bmrResult, setBmrResult] = useState("");

  const [bodyFatData, setBodyFatData] = useState({ gender: 'male', neck: '', waist: '', height: '', hip: '' });
  const [bodyFatResult, setBodyFatResult] = useState("");
  
  const [bmiData, setBmiData] = useState({ height: '', weight: '' });
  const [bmiResult, setBmiResult] = useState<{ bmi: string, category: string } | null>(null);

  const handleBmrCalculation = () => {
    const age = parseFloat(bmrData.age);
    const height = parseFloat(bmrData.height);
    const weight = parseFloat(bmrData.weight);

    if (age > 0 && height > 0 && weight > 0) {
      let bmr = 0;
      if (bmrData.gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      }
      setBmrResult(`Your estimated Basal Metabolic Rate (BMR) is ${bmr.toFixed(2)} calories/day.`);
    } else {
      setBmrResult("Please enter valid age, height, and weight.");
    }
  };

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
              setBodyFatResult("Please enter hip measurement for females.");
              return;
            }
        }
        setBodyFatResult(`Your estimated Body Fat Percentage is ${bfp.toFixed(2)}%.`);
    } else {
        setBodyFatResult("Please enter valid height, neck, and waist measurements.");
    }
  };

  const handleBmiCalculation = () => {
    const height = parseFloat(bmiData.height);
    const weight = parseFloat(bmiData.weight);

    if (height > 0 && weight > 0) {
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        setBmiResult({
            bmi: bmi.toFixed(1),
            category: getBmiCategory(bmi),
        });
    } else {
        setBmiResult(null);
    }
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle>BMI Calculator</CardTitle>
          <CardDescription>
            Calculate your Body Mass Index.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
            <ShareButton title="BMI Calculator" text="Check your Body Mass Index (BMI) with this simple health calculator!" url="/health-assessments" />
          </div>
          {bmiResult && (
            <div className="p-4 bg-muted rounded-lg text-center">
                <p className="font-semibold text-muted-foreground">Your BMI is</p>
                <p className="text-3xl font-bold text-primary">{bmiResult.bmi}</p>
                <p className="font-semibold">{bmiResult.category}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle>Basal Metabolic Rate (BMR)</CardTitle>
          <CardDescription>
            Estimate the calories your body needs at rest.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
            <ShareButton title="BMR Calculator" text="Find out your Basal Metabolic Rate (BMR) with this health calculator!" url="/health-assessments" />
          </div>
          {bmrResult && (
            <div className="p-4 bg-muted rounded-lg text-center">
              <p>{bmrResult}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle>Body Fat Percentage</CardTitle>
          <CardDescription>
            Estimate your body fat based on measurements.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
            <ShareButton title="Body Fat Calculator" text="Estimate your body fat percentage with this health assessment tool!" url="/health-assessments" />
          </div>
          {bodyFatResult && (
            <div className="p-4 bg-muted rounded-lg text-center">
              <p>{bodyFatResult}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

    