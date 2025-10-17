
"use client";

import React, { useState, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// --- Helper Functions ---
const binAdd = (a: string, b: string) => (parseInt(a, 2) + parseInt(b, 2)).toString(2);
const binSub = (a: string, b: string) => (parseInt(a, 2) - parseInt(b, 2)).toString(2);
const binMul = (a: string, b: string) => (parseInt(a, 2) * parseInt(b, 2)).toString(2);
const binDiv = (a: string, b: string) => (Math.floor(parseInt(a, 2) / parseInt(b, 2))).toString(2);

// --- Binary Calculation Component ---
function BinaryCalculation() {
    const [val1, setVal1] = useState('10101010');
    const [op, setOp] = useState('+');
    const [val2, setVal2] = useState('11001100');
    const [result, setResult] = useState('?');

    const calculate = useCallback(() => {
        if (!/^[01]+$/.test(val1) || !/^[01]+$/.test(val2)) {
            setResult('Invalid Binary');
            return;
        }
        try {
            let res;
            switch(op) {
                case '+': res = binAdd(val1, val2); break;
                case '-': res = binSub(val1, val2); break;
                case '×': res = binMul(val1, val2); break;
                case '÷': 
                    if (parseInt(val2, 2) === 0) {
                        setResult('Div by zero');
                        return;
                    }
                    res = binDiv(val1, val2); 
                    break;
                default: res = '';
            }
            setResult(res);
        } catch {
            setResult('Error');
        }
    }, [val1, op, val2]);

    return (
        <Card>
            <CardHeader><CardTitle>Binary Calculation</CardTitle><CardDescription>Add, Subtract, Multiply, or Divide two binary values.</CardDescription></CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 flex-wrap">
                    <Input value={val1} onChange={e => setVal1(e.target.value)} placeholder="Binary Value 1" className="flex-1 min-w-[120px]" />
                    <Select value={op} onValueChange={setOp}>
                        <SelectTrigger className="w-[60px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="+">+</SelectItem>
                            <SelectItem value="-">-</SelectItem>
                            <SelectItem value="×">×</SelectItem>
                            <SelectItem value="÷">÷</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input value={val2} onChange={e => setVal2(e.target.value)} placeholder="Binary Value 2" className="flex-1 min-w-[120px]" />
                    <Button onClick={calculate}>=</Button>
                    <Input value={result} readOnly className="flex-1 min-w-[120px] text-center font-bold text-primary" />
                </div>
            </CardContent>
        </Card>
    );
}

// --- Binary to Decimal Conversion ---
function BinToDec() {
    const [binary, setBinary] = useState('10101010');
    const [decimal, setDecimal] = useState('?');

    const convert = useCallback(() => {
        if (!/^[01]+$/.test(binary)) {
            setDecimal('Invalid Binary');
            return;
        }
        setDecimal(parseInt(binary, 2).toString());
    }, [binary]);

    return (
        <Card>
            <CardHeader><CardTitle>Binary to Decimal</CardTitle></CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <Input value={binary} onChange={e => setBinary(e.target.value)} placeholder="Enter Binary Value" />
                    <Button onClick={convert}>=</Button>
                    <Input value={decimal} readOnly className="w-24 text-center font-bold text-primary" />
                </div>
            </CardContent>
        </Card>
    );
}

// --- Decimal to Binary Conversion ---
function DecToBin() {
    const [decimal, setDecimal] = useState('170');
    const [binary, setBinary] = useState('?');

    const convert = useCallback(() => {
        const num = parseInt(decimal);
        if (isNaN(num)) {
            setBinary('Invalid Decimal');
            return;
        }
        setBinary(num.toString(2));
    }, [decimal]);
    
    return (
        <Card>
            <CardHeader><CardTitle>Decimal to Binary</CardTitle></CardHeader>
            <CardContent>
                 <div className="flex items-center gap-2">
                    <Input value={decimal} onChange={e => setDecimal(e.target.value)} placeholder="Enter Decimal Value" />
                    <Button onClick={convert}>=</Button>
                    <Input value={binary} readOnly className="w-32 text-center font-bold text-primary" />
                </div>
            </CardContent>
        </Card>
    );
}


// --- Main Exported Component ---
export default function BinaryCalculator() {
    return (
        <div className="space-y-6">
            <BinaryCalculation />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BinToDec />
                <DecToBin />
            </div>
        </div>
    );
}
