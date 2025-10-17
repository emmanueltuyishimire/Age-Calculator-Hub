
"use client";

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle } from 'lucide-react';
import { evaluate, format as mathFormat } from 'mathjs';

function ProportionCalculator() {
    const [a, setA] = useState('3');
    const [b, setB] = useState('4');
    const [c, setC] = useState('600');
    const [d, setD] = useState('');
    const [error, setError] = useState<string | null>(null);

    const calculate = useCallback(() => {
        setError(null);
        const values = [a, b, c, d];
        const emptyIndex = values.findIndex(val => val === '');
        if (values.filter(v => v === '').length !== 1) {
            setError("Please provide exactly three values.");
            return;
        }

        try {
            const nums = values.map(v => v === '' ? null : evaluate(v));
            
            switch (emptyIndex) {
                case 0: // Solve for A
                    if (nums[1] !== 0) {
                        const val = (nums[2]! * nums[1]!) / nums[3]!;
                        setA(mathFormat(val, { notation: 'fixed', precision: 4 }));
                    } break;
                case 1: // Solve for B
                    if (nums[2] !== 0) {
                        const val = (nums[0]! * nums[3]!) / nums[2]!;
                        setB(mathFormat(val, { notation: 'fixed', precision: 4 }));
                    } break;
                case 2: // Solve for C
                     if (nums[3] !== 0) {
                        const val = (nums[0]! * nums[3]!) / nums[1]!;
                        setC(mathFormat(val, { notation: 'fixed', precision: 4 }));
                    } break;
                case 3: // Solve for D
                     if (nums[1] !== 0) {
                        const val = (nums[2]! * nums[1]!) / nums[0]!;
                        setD(mathFormat(val, { notation: 'fixed', precision: 4 }));
                    } break;
            }
        } catch {
            setError("Invalid input. Please use numbers or fractions.");
        }
    }, [a, b, c, d]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Ratio Proportion Calculator (A:B = C:D)</CardTitle>
                <CardDescription>Enter any three values to solve for the fourth.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                    <Input value={a} onChange={e => setA(e.target.value)} className="flex-1 min-w-[60px]" aria-label="Value A" />
                    <span className="font-bold">:</span>
                    <Input value={b} onChange={e => setB(e.target.value)} className="flex-1 min-w-[60px]" aria-label="Value B" />
                    <span className="font-bold">=</span>
                    <Input value={c} onChange={e => setC(e.target.value)} className="flex-1 min-w-[60px]" aria-label="Value C" />
                    <span className="font-bold">:</span>
                    <Input value={d} onChange={e => setD(e.target.value)} className="flex-1 min-w-[60px]" aria-label="Value D" />
                </div>
                 {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>}
                <Button onClick={calculate} className="w-full">Calculate</Button>
            </CardContent>
        </Card>
    );
}

function ScalingCalculator() {
    const [v1, setV1] = useState('250');
    const [v2, setV2] = useState('280');
    const [op, setOp] = useState<'enlarge' | 'shrink'>('shrink');
    const [factor, setFactor] = useState('2.5');
    const [result, setResult] = useState('?');

    const calculate = useCallback(() => {
        try {
            const num1 = evaluate(v1);
            const num2 = evaluate(v2);
            const scaleFactor = evaluate(factor);
            
            let res1, res2;
            if (op === 'shrink') {
                res1 = num1 / scaleFactor;
                res2 = num2 / scaleFactor;
            } else { // enlarge
                res1 = num1 * scaleFactor;
                res2 = num2 * scaleFactor;
            }
            
            setResult(`${mathFormat(res1, { precision: 4 })} : ${mathFormat(res2, { precision: 4 })}`);
        } catch {
            setResult('Error');
        }
    }, [v1, v2, op, factor]);

    return (
        <Card>
            <CardHeader><CardTitle>Ratio Scaling Calculator</CardTitle></CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 flex-wrap">
                    <Input value={v1} onChange={e => setV1(e.target.value)} className="flex-1 min-w-[60px]" aria-label="Ratio value 1"/>
                    <span className="font-bold">:</span>
                    <Input value={v2} onChange={e => setV2(e.target.value)} className="flex-1 min-w-[60px]" aria-label="Ratio value 2"/>
                    <Select value={op} onValueChange={(v) => setOp(v as any)}>
                        <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="shrink">Shrink</SelectItem>
                            <SelectItem value="enlarge">Enlarge</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input value={factor} onChange={e => setFactor(e.target.value)} className="w-20" aria-label="Scaling factor"/>
                    <span>times =</span>
                    <Button onClick={calculate}>?</Button>
                    <div className="p-2 border rounded-md text-center flex-1 h-10 font-bold text-primary bg-muted min-w-[100px]">
                        {result}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function RatioCalculator() {
    return (
        <div className="space-y-6">
            <ProportionCalculator />
            <ScalingCalculator />
        </div>
    );
}
