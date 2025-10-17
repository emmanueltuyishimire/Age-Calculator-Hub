
"use client";

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle } from 'lucide-react';

const isValidHex = (hex: string) => /^[0-9a-fA-F]+$/.test(hex);

const hexArithmetic = (a: string, b: string, op: string): string => {
    const numA = BigInt(`0x${a}`);
    const numB = BigInt(`0x${b}`);
    let result: BigInt;
    switch(op) {
        case '+': result = numA + numB; break;
        case '-': result = numA - numB; break;
        case '×': result = numA * numB; break;
        case '÷': 
            if (numB === 0n) throw new Error("Division by zero");
            result = numA / numB; 
            break;
        default: throw new Error("Invalid operation");
    }
    return result.toString(16).toUpperCase();
};

function HexCalculation() {
    const [val1, setVal1] = useState('8AB');
    const [op, setOp] = useState('+');
    const [val2, setVal2] = useState('B78');
    const [result, setResult] = useState('?');
    const [error, setError] = useState<string | null>(null);

    const calculate = useCallback(() => {
        setError(null);
        if (!isValidHex(val1) || !isValidHex(val2)) {
            setError('Invalid Hexadecimal input.');
            setResult('?');
            return;
        }
        try {
            const res = hexArithmetic(val1, val2, op);
            setResult(res);
        } catch (e: any) {
            setError(e.message);
            setResult('?');
        }
    }, [val1, op, val2]);

    return (
        <Card>
            <CardHeader><CardTitle>Hexadecimal Calculation</CardTitle><CardDescription>Add, Subtract, Multiply, or Divide two hex values.</CardDescription></CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 flex-wrap">
                    <Input value={val1} onChange={e => setVal1(e.target.value.toUpperCase())} placeholder="Hex Value 1" className="flex-1 min-w-[120px]" />
                    <Select value={op} onValueChange={setOp}>
                        <SelectTrigger className="w-[60px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="+">+</SelectItem><SelectItem value="-">-</SelectItem><SelectItem value="×">×</SelectItem><SelectItem value="÷">÷</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input value={val2} onChange={e => setVal2(e.target.value.toUpperCase())} placeholder="Hex Value 2" className="flex-1 min-w-[120px]" />
                    <Button onClick={calculate}>=</Button>
                    <Input value={result} readOnly className="flex-1 min-w-[120px] text-center font-bold text-primary" />
                </div>
                {error && <Alert variant="destructive" className="mt-4"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>}
            </CardContent>
        </Card>
    );
}

function HexToDec() {
    const [hex, setHex] = useState('DAD');
    const [decimal, setDecimal] = useState('?');
    const [error, setError] = useState<string | null>(null);

    const convert = useCallback(() => {
        setError(null);
        if (!isValidHex(hex)) {
            setError('Invalid Hexadecimal input.');
            setDecimal('?');
            return;
        }
        setDecimal(BigInt(`0x${hex}`).toString());
    }, [hex]);

    return (
        <Card>
            <CardHeader><CardTitle>Hexadecimal to Decimal</CardTitle></CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <Input value={hex} onChange={e => setHex(e.target.value.toUpperCase())} placeholder="Enter Hex Value" />
                    <Button onClick={convert}>=</Button>
                    <Input value={decimal} readOnly className="w-32 text-center font-bold text-primary" />
                </div>
                {error && <Alert variant="destructive" className="mt-4"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>}
            </CardContent>
        </Card>
    );
}

function DecToHex() {
    const [decimal, setDecimal] = useState('170');
    const [hex, setHex] = useState('?');
    const [error, setError] = useState<string | null>(null);

    const convert = useCallback(() => {
        setError(null);
        try {
            const num = BigInt(decimal);
            setHex(num.toString(16).toUpperCase());
        } catch {
            setError('Invalid Decimal input.');
            setHex('?');
        }
    }, [decimal]);

    return (
        <Card>
            <CardHeader><CardTitle>Decimal to Hexadecimal</CardTitle></CardHeader>
            <CardContent>
                 <div className="flex items-center gap-2">
                    <Input value={decimal} onChange={e => setDecimal(e.target.value)} placeholder="Enter Decimal Value" />
                    <Button onClick={convert}>=</Button>
                    <Input value={hex} readOnly className="w-32 text-center font-bold text-primary" />
                </div>
                 {error && <Alert variant="destructive" className="mt-4"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>}
            </CardContent>
        </Card>
    );
}

export default function HexCalculator() {
    return (
        <div className="space-y-6">
            <HexCalculation />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <HexToDec />
                <DecToHex />
            </div>
        </div>
    );
}
