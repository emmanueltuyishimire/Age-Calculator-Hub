
"use client";

import { useState, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '../ui/label';
import { RefreshCcw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

// 1. Main Percentage Calculator
function MainPercentageCalculator() {
    const [val1, setVal1] = useState('');
    const [val2, setVal2] = useState('');
    const [result, setResult] = useState('');

    const calculate = useCallback(() => {
        const num1 = parseFloat(val1);
        const num2 = parseFloat(val2);
        const num3 = parseFloat(result);

        if (!val1) {
            if (num2 !== 0) {
              setVal1(((num3 / num2) * 100).toLocaleString());
            }
        } else if (!val2) {
             if (num1 !== 0) {
              setVal2((num3 / (num1 / 100)).toLocaleString());
            }
        } else {
            setResult(((num1 / 100) * num2).toLocaleString());
        }
    }, [val1, val2, result]);
    
    const reset = useCallback(() => {
        setVal1('');
        setVal2('');
        setResult('');
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Standard Percentage Calculator</CardTitle>
                <CardDescription>Provide any two values below and click "Calculate" to get the third value.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                    <Input value={val1} onChange={(e) => setVal1(e.target.value)} placeholder="Percentage" className="flex-1 min-w-[100px]" aria-label="Percentage value" />
                    <span className="font-semibold">% of</span>
                    <Input value={val2} onChange={(e) => setVal2(e.target.value)} placeholder="Value" className="flex-1 min-w-[100px]" aria-label="Base value"/>
                    <span className="font-semibold">=</span>
                    <Input value={result} onChange={(e) => setResult(e.target.value)} placeholder="Result" className="flex-1 min-w-[100px]" aria-label="Result value"/>
                </div>
                <div className="flex gap-2">
                    <Button onClick={calculate} className="w-full">Calculate</Button>
                    <Button onClick={reset} variant="outline" aria-label="Reset">
                        <RefreshCcw className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}


// 2. Common Phrases Calculator
function CommonPhrasesCalculator() {
    const [p1, setP1] = useState(''); const [p2, setP2] = useState(''); const [pResult1, setPResult1] = useState('');
    const [q1, setQ1] = useState(''); const [q2, setQ2] = useState(''); const [qResult, setQResult] = useState('');
    const [r1, setR1] = useState(''); const [r2, setR2] = useState(''); const [rResult, setRResult] = useState('');

    return (
        <Card>
            <CardHeader>
                <CardTitle>Percentage in Common Phrases</CardTitle>
                 <CardDescription>Solve common percentage problems framed as everyday questions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex items-center gap-2 flex-wrap p-2 border rounded-md">
                    <Label htmlFor="p1" className="min-w-fit">What is</Label>
                    <Input id="p1" value={p1} onChange={e => setP1(e.target.value)} placeholder="e.g., 10" className="w-20" aria-label="Percentage for 'what is' calculation"/>
                    <Label htmlFor="p2">% of</Label>
                    <Input id="p2" value={p2} onChange={e => setP2(e.target.value)} placeholder="e.g., 50" className="w-20" aria-label="Base value for 'what is' calculation"/>
                    <Button onClick={() => setPResult1(String(parseFloat(p1) * parseFloat(p2) / 100))} aria-label="Calculate 'what is' phrase">?</Button>
                    {pResult1 && <span className="font-bold text-primary">{pResult1}</span>}
                </div>
                <div className="flex items-center gap-2 flex-wrap p-2 border rounded-md">
                    <Input id="q1" value={q1} onChange={e => setQ1(e.target.value)} placeholder="e.g., 5" className="w-20" aria-label="Part value for 'is what % of' calculation"/>
                    <Label htmlFor="q2">is what % of</Label>
                    <Input id="q2" value={q2} onChange={e => setQ2(e.target.value)} placeholder="e.g., 50" className="w-20" aria-label="Total value for 'is what % of' calculation"/>
                    <Button onClick={() => setQResult(String(parseFloat(q1) / parseFloat(q2) * 100))} aria-label="Calculate 'is what % of' phrase">?</Button>
                    {qResult && <span className="font-bold text-primary">{qResult}%</span>}
                </div>
                 <div className="flex items-center gap-2 flex-wrap p-2 border rounded-md">
                    <Input id="r1" value={r1} onChange={e => setR1(e.target.value)} placeholder="e.g., 5" className="w-20" aria-label="Part value for 'is % of what' calculation"/>
                    <Label htmlFor="r2">is</Label>
                    <Input id="r2" value={r2} onChange={e => setR2(e.target.value)} placeholder="e.g., 10" className="w-20" aria-label="Percentage for 'is % of what' calculation"/>
                    <Label>% of what?</Label>
                    <Button onClick={() => setRResult(String(parseFloat(r1) / (parseFloat(r2)/100)))} aria-label="Calculate 'is % of what' phrase">?</Button>
                    {rResult && <span className="font-bold text-primary">{rResult}</span>}
                </div>
            </CardContent>
        </Card>
    );
}

// 3. Percentage Difference Calculator
function PercentageDifferenceCalculator() {
    const [v1, setV1] = useState('');
    const [v2, setV2] = useState('');
    const [result, setResult] = useState('');

    const calculate = useCallback(() => {
        const num1 = parseFloat(v1);
        const num2 = parseFloat(v2);
        if (isNaN(num1) || isNaN(num2)) return;
        const diff = Math.abs(num1 - num2);
        const avg = (num1 + num2) / 2;
        if (avg === 0) {
            setResult('0');
            return;
        }
        setResult(((diff / avg) * 100).toFixed(2));
    }, [v1, v2]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Percentage Difference</CardTitle>
                 <CardDescription>Find the percentage difference between two numbers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="flex-1"><Label htmlFor="diff-v1">Value 1</Label><Input id="diff-v1" value={v1} onChange={e => setV1(e.target.value)}/></div>
                    <div className="flex-1"><Label htmlFor="diff-v2">Value 2</Label><Input id="diff-v2" value={v2} onChange={e => setV2(e.target.value)}/></div>
                </div>
                <Button onClick={calculate} className="w-full">Calculate Difference</Button>
                {result && <p className="text-center font-bold">Percentage Difference: <span className="text-primary">{result}%</span></p>}
            </CardContent>
        </Card>
    );
}


// 4. Percentage Change Calculator
function PercentageChangeCalculator() {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [result, setResult] = useState('');
    const [changeType, setChangeType] = useState('increase');

    const calculate = useCallback(() => {
        const startVal = parseFloat(start);
        const endVal = parseFloat(end);
        if (isNaN(startVal) || isNaN(endVal) || startVal === 0) return;
        const change = ((endVal - startVal) / startVal) * 100;
        setResult(change.toFixed(2));
        setChangeType(change >= 0 ? 'increase' : 'decrease');
    }, [start, end]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Percentage Change</CardTitle>
                <CardDescription>Calculate the percentage increase or decrease from a start value to an end value.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="flex-1"><Label htmlFor="change-start">From</Label><Input id="change-start" value={start} onChange={e => setStart(e.target.value)}/></div>
                    <div className="flex-1"><Label htmlFor="change-end">To</Label><Input id="change-end" value={end} onChange={e => setEnd(e.target.value)}/></div>
                </div>
                <Button onClick={calculate} className="w-full">Calculate Change</Button>
                {result && <p className="text-center font-bold">Result: <span className={changeType === 'increase' ? 'text-green-600' : 'text-destructive'}>{Math.abs(parseFloat(result))}% {changeType}</span></p>}
            </CardContent>
        </Card>
    );
}

// Main component to render all calculators
export default function PercentageCalculator() {
    return (
        <div className="space-y-8">
            <MainPercentageCalculator />
            <CommonPhrasesCalculator />
            <PercentageDifferenceCalculator />
            <PercentageChangeCalculator />
        </div>
    );
}
