
"use client";

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '../ui/separator';
import { format as mathFormat, fraction as createFraction, add, subtract, multiply, divide, bignumber, type Fraction } from 'mathjs';

// --- Helper Functions ---
const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

const simplify = (n: number, d: number) => {
    if (d === 0) return { n, d };
    const common = gcd(Math.abs(n), Math.abs(d));
    return { n: n / common, d: d / common };
};

const toMixed = (n: number, d: number) => {
    if (d === 0 || Math.abs(n) < Math.abs(d)) return { whole: 0, n, d };
    const whole = Math.trunc(n / d);
    const newN = n % d;
    return { whole, n: Math.abs(newN), d: Math.abs(d) };
};

// --- Standard Fraction Calculator ---
function StandardFractionCalculator() {
    const [n1, setN1] = useState('2');
    const [d1, setD1] = useState('7');
    const [op, setOp] = useState('+');
    const [n2, setN2] = useState('3');
    const [d2, setD2] = useState('8');
    const [resultN, setResultN] = useState('?');
    const [resultD, setResultD] = useState('?');

    const calculate = useCallback(() => {
        try {
            const f1 = createFraction(parseInt(n1), parseInt(d1));
            const f2 = createFraction(parseInt(n2), parseInt(d2));
            let result: Fraction;
            switch(op) {
                case '+': result = add(f1, f2) as Fraction; break;
                case '-': result = subtract(f1, f2) as Fraction; break;
                case '×': result = multiply(f1, f2) as Fraction; break;
                case '÷': result = divide(f1, f2) as Fraction; break;
                default: return;
            }
            setResultN(result.n.toString());
            setResultD(result.d.toString());
        } catch {
            setResultN('Err');
            setResultD('Err');
        }
    }, [n1, d1, op, n2, d2]);

    return (
        <Card>
            <CardHeader><CardTitle>Fraction Calculator</CardTitle></CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <FractionInput n={n1} d={d1} onNChange={setN1} onDChange={setD1} />
                    <Select value={op} onValueChange={setOp}>
                        <SelectTrigger className="w-[60px]"><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="+">+</SelectItem><SelectItem value="-">-</SelectItem><SelectItem value="×">×</SelectItem><SelectItem value="÷">÷</SelectItem></SelectContent>
                    </Select>
                    <FractionInput n={n2} d={d2} onNChange={setN2} onDChange={setD2} />
                    <Button onClick={calculate}>=</Button>
                    <FractionInput n={resultN} d={resultD} readOnly />
                </div>
            </CardContent>
        </Card>
    );
}

// --- Mixed Numbers Calculator ---
const parseMixed = (w: string, n: string, d: string) => {
    const whole = parseInt(w) || 0;
    const num = parseInt(n) || 0;
    const den = parseInt(d) || 1;
    const sign = whole < 0 ? -1 : 1;
    return createFraction(sign * (Math.abs(whole) * den + num), den);
};

function MixedNumbersCalculator() {
    const [w1, setW1] = useState('-2'); const [n1, setN1] = useState('3'); const [d1, setD1] = useState('4');
    const [op, setOp] = useState('+');
    const [w2, setW2] = useState('3'); const [n2, setN2] = useState('5'); const [d2, setD2] = useState('7');
    const [result, setResult] = useState('?');

    const calculate = useCallback(() => {
        try {
            const f1 = parseMixed(w1, n1, d1);
            const f2 = parseMixed(w2, n2, d2);
             let res: Fraction;
            switch(op) {
                case '+': res = add(f1, f2) as Fraction; break;
                case '-': res = subtract(f1, f2) as Fraction; break;
                case '×': res = multiply(f1, f2) as Fraction; break;
                case '÷': res = divide(f1, f2) as Fraction; break;
                default: return;
            }
            setResult(mathFormat(res, { fraction: 'mixed' }));
        } catch {
            setResult('Error');
        }
    }, [w1, n1, d1, op, w2, n2, d2]);
    
    return (
        <Card>
            <CardHeader><CardTitle>Mixed Numbers Calculator</CardTitle></CardHeader>
            <CardContent>
                 <div className="flex items-center gap-2">
                    <MixedFractionInput w={w1} n={n1} d={d1} onWChange={setW1} onNChange={setN1} onDChange={setD1} />
                    <Select value={op} onValueChange={setOp}>
                        <SelectTrigger className="w-[60px]"><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="+">+</SelectItem><SelectItem value="-">-</SelectItem><SelectItem value="×">×</SelectItem><SelectItem value="÷">÷</SelectItem></SelectContent>
                    </Select>
                    <MixedFractionInput w={w2} n={n2} d={d2} onWChange={setW2} onNChange={setN2} onDChange={setD2} />
                    <Button onClick={calculate}>=</Button>
                    <Input value={result} readOnly className="w-24 text-center font-bold text-primary" />
                </div>
            </CardContent>
        </Card>
    );
}


// --- Simplify Fractions Calculator ---
function SimplifyFractionsCalculator() {
    const [n, setN] = useState('21'); const [d, setD] = useState('98');
    const [result, setResult] = useState('?');

    const calculate = useCallback(() => {
        const num = parseInt(n);
        const den = parseInt(d);
        if(isNaN(num) || isNaN(den)) { setResult('Error'); return; }
        const { n: simpleN, d: simpleD } = simplify(num, den);
        setResult(`${simpleN} / ${simpleD}`);
    }, [n,d]);

    return (
        <Card>
             <CardHeader><CardTitle>Simplify Fractions Calculator</CardTitle></CardHeader>
             <CardContent>
                 <div className="flex items-center gap-2">
                    <FractionInput n={n} d={d} onNChange={setN} onDChange={setD} />
                    <Button onClick={calculate}>=</Button>
                    <Input value={result} readOnly className="w-24 text-center font-bold text-primary" />
                 </div>
            </CardContent>
        </Card>
    );
}

// --- Conversion Calculators ---
function DecimalToFractionCalculator() {
    const [dec, setDec] = useState('1.375');
    const [result, setResult] = useState('?');
    
    const calculate = useCallback(() => {
        try {
            const f = createFraction(parseFloat(dec));
            setResult(`${f.n}/${f.d}`);
        } catch {
            setResult('Error');
        }
    }, [dec]);
    
    return (
        <Card>
            <CardHeader><CardTitle>Decimal to Fraction</CardTitle></CardHeader>
            <CardContent>
                 <div className="flex items-center gap-2">
                    <Input value={dec} onChange={e => setDec(e.target.value)} type="number" step="any" className="w-32" />
                    <Button onClick={calculate}>=</Button>
                    <Input value={result} readOnly className="w-24 text-center font-bold text-primary" />
                </div>
            </CardContent>
        </Card>
    );
}

function FractionToDecimalCalculator() {
    const [n, setN] = useState('2'); const [d, setD] = useState('7');
    const [result, setResult] = useState('?');

    const calculate = useCallback(() => {
        const num = parseInt(n); const den = parseInt(d);
        if(isNaN(num) || isNaN(den) || den === 0) { setResult('Error'); return; }
        setResult((num / den).toPrecision(10));
    }, [n, d]);

    return (
        <Card>
            <CardHeader><CardTitle>Fraction to Decimal</CardTitle></CardHeader>
            <CardContent>
                 <div className="flex items-center gap-2">
                    <FractionInput n={n} d={d} onNChange={setN} onDChange={setD} />
                    <Button onClick={calculate}>=</Button>
                    <Input value={result} readOnly className="w-32 text-center font-bold text-primary" />
                </div>
            </CardContent>
        </Card>
    );
}

// --- Big Number Calculator ---
function BigNumberFractionCalculator() {
    const [n1, setN1] = useState('1234');
    const [d1, setD1] = useState('748892928829');
    const [op, setOp] = useState('+');
    const [n2, setN2] = useState('33434421132232234333');
    const [d2, setD2] = useState('8877277388288288288');
    const [result, setResult] = useState('?');

    const calculate = useCallback(() => {
        try {
            const f1 = createFraction(bignumber(n1), bignumber(d1));
            const f2 = createFraction(bignumber(n2), bignumber(d2));
            let res: Fraction;
            switch(op) {
                case '+': res = add(f1, f2) as Fraction; break;
                case '-': res = subtract(f1, f2) as Fraction; break;
                case '×': res = multiply(f1, f2) as Fraction; break;
                case '÷': res = divide(f1, f2) as Fraction; break;
                default: return;
            }
            setResult(`${res.s * res.n}/${res.d}`);
        } catch {
            setResult('Error');
        }
    }, [n1, d1, op, n2, d2]);

    return (
        <Card>
            <CardHeader><CardTitle>Big Number Fraction Calculator</CardTitle></CardHeader>
            <CardContent>
                 <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex-1 min-w-[150px]"><Input value={n1} onChange={e => setN1(e.target.value)} /><Separator/><Input value={d1} onChange={e => setD1(e.target.value)} /></div>
                    <Select value={op} onValueChange={setOp}><SelectTrigger className="w-[60px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="+">+</SelectItem><SelectItem value="-">-</SelectItem><SelectItem value="×">×</SelectItem><SelectItem value="÷">÷</SelectItem></SelectContent></Select>
                    <div className="flex-1 min-w-[150px]"><Input value={n2} onChange={e => setN2(e.target.value)} /><Separator/><Input value={d2} onChange={e => setD2(e.target.value)} /></div>
                    <Button onClick={calculate}>=</Button>
                    <div className="p-2 border rounded-md text-center flex-1 font-bold text-primary bg-muted min-w-[200px] break-all">{result}</div>
                 </div>
            </CardContent>
        </Card>
    );
}

// UI Pieces
const FractionInput = ({ n, d, onNChange, onDChange, readOnly=false }: {n: string, d: string, onNChange?:(v:string)=>void, onDChange?:(v:string)=>void, readOnly?:boolean}) => (
    <div className="w-20">
        <Input value={n} onChange={onNChange ? e => onNChange(e.target.value) : undefined} readOnly={readOnly} className="text-center" aria-label="Numerator" />
        <Separator />
        <Input value={d} onChange={onDChange ? e => onDChange(e.target.value) : undefined} readOnly={readOnly} className="text-center" aria-label="Denominator" />
    </div>
);

const MixedFractionInput = ({ w, n, d, onWChange, onNChange, onDChange }: {w:string, n: string, d: string, onWChange:(v:string)=>void, onNChange:(v:string)=>void, onDChange:(v:string)=>void}) => (
    <div className="flex items-center gap-1">
        <Input value={w} onChange={e => onWChange(e.target.value)} className="w-16" aria-label="Whole number"/>
        <FractionInput n={n} d={d} onNChange={onNChange} onDChange={onDChange} />
    </div>
);

// Main Exported Component
export default function FractionCalculator() {
    return (
        <div className="space-y-6">
            <StandardFractionCalculator />
            <MixedNumbersCalculator />
            <SimplifyFractionsCalculator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DecimalToFractionCalculator />
              <FractionToDecimalCalculator />
            </div>
            <BigNumberFractionCalculator />
        </div>
    );
}
