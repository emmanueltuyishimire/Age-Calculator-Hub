
"use client";

import React, { useState, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '../ui/label';
import { RefreshCcw, SquareRoot } from 'lucide-react';
import { evaluate } from 'mathjs';

const SquareRootCalculator = () => {
    const [value, setValue] = useState('64');
    const [result, setResult] = useState<string | null>(null);

    const calculate = useCallback(() => {
        try {
            const num = evaluate(value);
            if (num < 0) {
                setResult('Invalid (Imaginary)');
                return;
            }
            setResult(Math.sqrt(num).toLocaleString(undefined, { maximumFractionDigits: 10 }));
        } catch {
            setResult('Error');
        }
    }, [value]);

    return (
        <Card>
            <CardHeader><CardTitle>Square Root Calculator</CardTitle></CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <Label htmlFor="sqrt-val" className="text-2xl font-bold">√</Label>
                    <Input id="sqrt-val" value={value} onChange={e => setValue(e.target.value)} className="flex-1" />
                    <Button onClick={calculate}>=</Button>
                    <Input value={result ?? '?'} readOnly className="w-24 text-center font-bold text-primary" />
                </div>
            </CardContent>
        </Card>
    );
};

const CubeRootCalculator = () => {
    const [value, setValue] = useState('27');
    const [result, setResult] = useState<string | null>(null);

    const calculate = useCallback(() => {
        try {
            const num = evaluate(value);
            setResult(Math.cbrt(num).toLocaleString(undefined, { maximumFractionDigits: 10 }));
        } catch {
            setResult('Error');
        }
    }, [value]);

    return (
        <Card>
            <CardHeader><CardTitle>Cube Root Calculator</CardTitle></CardHeader>
            <CardContent>
                 <div className="flex items-center gap-2">
                    <Label htmlFor="cbrt-val" className="text-2xl font-bold">∛</Label>
                    <Input id="cbrt-val" value={value} onChange={e => setValue(e.target.value)} className="flex-1" />
                    <Button onClick={calculate}>=</Button>
                    <Input value={result ?? '?'} readOnly className="w-24 text-center font-bold text-primary" />
                </div>
            </CardContent>
        </Card>
    );
};

const GeneralRootCalculator = () => {
    const [degree, setDegree] = useState('5');
    const [radicand, setRadicand] = useState('32');
    const [result, setResult] = useState<string | null>(null);

    const calculate = useCallback(() => {
        try {
            const n = evaluate(degree);
            const x = evaluate(radicand);
            if(x < 0 && n % 2 === 0) {
                 setResult('Invalid (Imaginary)');
                return;
            }
            setResult(Math.pow(x, 1/n).toLocaleString(undefined, { maximumFractionDigits: 10 }));
        } catch {
             setResult('Error');
        }
    }, [degree, radicand]);

    return (
        <Card>
            <CardHeader><CardTitle>General Root Calculator</CardTitle></CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <Input value={degree} onChange={e => setDegree(e.target.value)} className="w-16 text-center" aria-label="Root degree"/>
                    <Label htmlFor="gen-root-val" className="text-2xl font-bold">√</Label>
                    <Input id="gen-root-val" value={radicand} onChange={e => setRadicand(e.target.value)} className="flex-1" aria-label="Radicand"/>
                    <Button onClick={calculate}>=</Button>
                    <Input value={result ?? '?'} readOnly className="w-24 text-center font-bold text-primary" />
                </div>
            </CardContent>
        </Card>
    );
};


export default function RootCalculator() {
    return (
        <div className="space-y-6">
            <SquareRootCalculator />
            <CubeRootCalculator />
            <GeneralRootCalculator />
        </div>
    );
}
