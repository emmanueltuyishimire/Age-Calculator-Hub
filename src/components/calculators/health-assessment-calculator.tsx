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

export default function HealthAssessmentCalculator() {
  const [bpAge, setBpAge] = useState("");
  const [bpResult, setBpResult] = useState("");
  const [menopauseAge, setMenopauseAge] = useState("");
  const [menopauseResult, setMenopauseResult] = useState("");

  const handleBpCalculation = () => {
    if (bpAge) {
      setBpResult(`For age ${bpAge}, regular blood pressure checks are recommended.`);
    }
  };

  const handleMenopauseCalculation = () => {
    if (menopauseAge) {
      setMenopauseResult(`The typical menopause age range is 45-55. Your input: ${menopauseAge}.`);
    }
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Blood Pressure Check Age</CardTitle>
          <CardDescription>
            Enter an age to see recommendations for blood pressure monitoring.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bp-age">Your Age</Label>
            <Input
              id="bp-age"
              type="number"
              value={bpAge}
              onChange={(e) => setBpAge(e.target.value)}
              placeholder="e.g., 40"
            />
          </div>
          <Button onClick={handleBpCalculation} className="w-full">
            Check BP Age
          </Button>
          {bpResult && (
            <div className="p-4 bg-muted rounded-lg text-center">
              <p>{bpResult}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Menopause Age</CardTitle>
          <CardDescription>
            Check against the typical age for menopause.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="menopause-age">Your Age</Label>
            <Input
              id="menopause-age"
              type="number"
              value={menopauseAge}
              onChange={(e) => setMenopauseAge(e.target.value)}
              placeholder="e.g., 51"
            />
          </div>
          <Button onClick={handleMenopauseCalculation} className="w-full">
            Check Menopause Age
          </Button>
          {menopauseResult && (
            <div className="p-4 bg-muted rounded-lg text-center">
              <p>{menopauseResult}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
