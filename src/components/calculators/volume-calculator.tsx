
"use client";

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const unitOptions = [
    { value: 'meters', label: 'meters' },
    { value: 'kilometers', label: 'kilometers' },
    { value: 'centimeters', label: 'centimeters' },
    { value: 'millimeters', label: 'millimeters' },
    { value: 'miles', label: 'miles' },
    { value: 'yards', label: 'yards' },
    { value: 'feet', label: 'feet' },
    { value: 'inches', label: 'inches' },
];

const ShapeCalculatorCard = ({ title, formula, children }: { title: string, formula: React.ReactNode, children: React.ReactNode }) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <p className="text-sm text-muted-foreground font-mono bg-muted p-2 rounded-md mt-2">
                Formula: {formula}
            </p>
        </CardHeader>
        <CardContent>{children}</CardContent>
    </Card>
);

const CalculatorLayout = ({ inputs, svg, onCalculate, result }: { inputs: React.ReactNode, svg: React.ReactNode, onCalculate: () => void, result: string | null }) => (
    <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">{inputs}</div>
            <div className="flex justify-center items-center h-full p-4 bg-muted/50 rounded-lg min-h-[140px]">{svg}</div>
        </div>
        <Button onClick={onCalculate} className="w-full">Calculate</Button>
        {result && <ResultDisplay result={result} />}
    </div>
);


// Individual Calculator Components
const SphereCalculator = () => {
    const [radius, setRadius] = useState('');
    const [unit, setUnit] = useState('meters');
    const [result, setResult] = useState<string | null>(null);

    const calculate = useCallback(() => {
        const r = parseFloat(radius);
        if (isNaN(r) || r <= 0) {
            setResult('Invalid input');
            return;
        }
        const volume = (4 / 3) * Math.PI * Math.pow(r, 3);
        setResult(`${volume.toLocaleString(undefined, { maximumFractionDigits: 4 })} cubic ${unit}`);
    }, [radius, unit]);

    const inputs = (
        <div className="flex gap-2">
            <div className="flex-1"><Label htmlFor="sphere-r">Radius (r)</Label><Input id="sphere-r" type="number" value={radius} onChange={e => setRadius(e.target.value)} /></div>
            <div className="w-1/3"><Label>Unit</Label><UnitSelect value={unit} onChange={setUnit} /></div>
        </div>
    );

    const svg = (
        <svg viewBox="0 0 100 100" width="120" height="120" className="stroke-foreground fill-transparent">
            <circle cx="50" cy="50" r="40" strokeWidth="2" className="fill-primary/20"/>
            <line x1="50" y1="50" x2="90" y2="50" strokeWidth="1" strokeDasharray="2,2" />
            <text x="68" y="45" fontSize="10" className="fill-foreground stroke-none">r</text>
        </svg>
    );

    return <ShapeCalculatorCard title="Sphere Volume" formula={<>V = (4/3)πr<sup>3</sup></>}><CalculatorLayout inputs={inputs} svg={svg} onCalculate={calculate} result={result} /></ShapeCalculatorCard>;
};

const ConeCalculator = () => {
    const [radius, setRadius] = useState('');
    const [height, setHeight] = useState('');
    const [unit, setUnit] = useState('meters');
    const [result, setResult] = useState<string | null>(null);

    const calculate = useCallback(() => {
        const r = parseFloat(radius);
        const h = parseFloat(height);
        if (isNaN(r) || isNaN(h) || r <= 0 || h <= 0) {
            setResult('Invalid input');
            return;
        }
        const volume = (1 / 3) * Math.PI * Math.pow(r, 2) * h;
        setResult(`${volume.toLocaleString(undefined, { maximumFractionDigits: 4 })} cubic ${unit}`);
    }, [radius, height, unit]);
    
    const inputs = (
        <>
            <div className="flex gap-2">
                <div className="flex-1"><Label htmlFor="cone-r">Radius (r)</Label><Input id="cone-r" type="number" value={radius} onChange={e => setRadius(e.target.value)} /></div>
                <div className="flex-1"><Label htmlFor="cone-h">Height (h)</Label><Input id="cone-h" type="number" value={height} onChange={e => setHeight(e.target.value)} /></div>
            </div>
            <div><Label>Unit</Label><UnitSelect value={unit} onChange={setUnit} /></div>
        </>
    );
    
    const svg = (
        <svg viewBox="0 0 100 100" width="120" height="120" className="stroke-foreground fill-transparent">
            <path d="M 20 80 L 50 10 L 80 80 Z" strokeWidth="2" className="fill-primary/20"/>
            <ellipse cx="50" cy="80" rx="30" ry="8" strokeWidth="2"/>
            <line x1="50" y1="10" x2="50" y2="80" strokeWidth="1" strokeDasharray="2,2"/>
            <line x1="50" y1="80" x2="80" y2="80" strokeWidth="1" strokeDasharray="2,2"/>
            <text x="52" y="50" fontSize="10" className="fill-foreground stroke-none">h</text>
            <text x="65" y="75" fontSize="10" className="fill-foreground stroke-none">r</text>
        </svg>
    );

    return <ShapeCalculatorCard title="Cone Volume" formula={<>V = (1/3)πr<sup>2</sup>h</>}><CalculatorLayout inputs={inputs} svg={svg} onCalculate={calculate} result={result} /></ShapeCalculatorCard>;
};

const CubeCalculator = () => {
    const [edge, setEdge] = useState('');
    const [unit, setUnit] = useState('meters');
    const [result, setResult] = useState<string | null>(null);

    const calculate = useCallback(() => {
        const a = parseFloat(edge);
        if (isNaN(a) || a <= 0) {
            setResult('Invalid input');
            return;
        }
        const volume = Math.pow(a, 3);
        setResult(`${volume.toLocaleString(undefined, { maximumFractionDigits: 4 })} cubic ${unit}`);
    }, [edge, unit]);

    const inputs = (
        <div className="flex gap-2">
            <div className="flex-1"><Label htmlFor="cube-a">Edge Length (a)</Label><Input id="cube-a" type="number" value={edge} onChange={e => setEdge(e.target.value)} /></div>
            <div className="w-1/3"><Label>Unit</Label><UnitSelect value={unit} onChange={setUnit} /></div>
        </div>
    );
    
    const svg = (
        <svg viewBox="0 0 100 100" width="120" height="120" className="stroke-foreground fill-transparent">
            <rect x="20" y="30" width="50" height="50" strokeWidth="2" className="fill-primary/20"/>
            <path d="M 20 30 L 40 10 L 90 10 L 70 30" strokeWidth="2" className="fill-primary/20"/>
            <path d="M 90 10 L 90 60 L 70 80" strokeWidth="2"/>
            <text x="40" y="85" fontSize="10" className="fill-foreground stroke-none">a</text>
        </svg>
    );

    return <ShapeCalculatorCard title="Cube Volume" formula={<>V = a<sup>3</sup></>}><CalculatorLayout inputs={inputs} svg={svg} onCalculate={calculate} result={result} /></ShapeCalculatorCard>;
};

const CylinderCalculator = () => {
    const [radius, setRadius] = useState('');
    const [height, setHeight] = useState('');
    const [unit, setUnit] = useState('meters');
    const [result, setResult] = useState<string | null>(null);

    const calculate = useCallback(() => {
        const r = parseFloat(radius);
        const h = parseFloat(height);
        if (isNaN(r) || isNaN(h) || r <= 0 || h <= 0) {
            setResult('Invalid input');
            return;
        }
        const volume = Math.PI * Math.pow(r, 2) * h;
        setResult(`${volume.toLocaleString(undefined, { maximumFractionDigits: 4 })} cubic ${unit}`);
    }, [radius, height, unit]);

    const inputs = (
        <>
            <div className="flex gap-2">
                <div className="flex-1"><Label htmlFor="cylinder-r">Radius (r)</Label><Input id="cylinder-r" type="number" value={radius} onChange={e => setRadius(e.target.value)} /></div>
                <div className="flex-1"><Label htmlFor="cylinder-h">Height (h)</Label><Input id="cylinder-h" type="number" value={height} onChange={e => setHeight(e.target.value)} /></div>
            </div>
            <div><Label>Unit</Label><UnitSelect value={unit} onChange={setUnit} /></div>
        </>
    );
    
    const svg = (
         <svg viewBox="0 0 100 100" width="120" height="120" className="stroke-foreground fill-transparent">
            <ellipse cx="50" cy="20" rx="30" ry="8" strokeWidth="2" className="fill-primary/20"/>
            <line x1="20" y1="20" x2="20" y2="80" strokeWidth="2"/>
            <line x1="80" y1="20" x2="80" y2="80" strokeWidth="2"/>
            <ellipse cx="50" cy="80" rx="30" ry="8" strokeWidth="2" className="fill-primary/20"/>
            <line x1="50" y1="20" x2="50" y2="80" strokeWidth="1" strokeDasharray="2,2"/>
            <line x1="50" y1="80" x2="80" y2="80" strokeWidth="1" strokeDasharray="2,2"/>
            <text x="52" y="50" fontSize="10" className="fill-foreground stroke-none">h</text>
            <text x="65" y="75" fontSize="10" className="fill-foreground stroke-none">r</text>
        </svg>
    );
    
    return <ShapeCalculatorCard title="Cylinder Volume" formula={<>V = πr<sup>2</sup>h</>}><CalculatorLayout inputs={inputs} svg={svg} onCalculate={calculate} result={result} /></ShapeCalculatorCard>;
};

const RectangularTankCalculator = () => {
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [unit, setUnit] = useState('meters');
    const [result, setResult] = useState<string | null>(null);

    const calculate = useCallback(() => {
        const l = parseFloat(length);
        const w = parseFloat(width);
        const h = parseFloat(height);
        if (isNaN(l) || isNaN(w) || isNaN(h) || l <= 0 || w <= 0 || h <= 0) {
            setResult('Invalid input');
            return;
        }
        const volume = l * w * h;
        setResult(`${volume.toLocaleString(undefined, { maximumFractionDigits: 4 })} cubic ${unit}`);
    }, [length, width, height, unit]);

    const inputs = (
         <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div><Label htmlFor="rect-l">Length (l)</Label><Input id="rect-l" type="number" value={length} onChange={e => setLength(e.target.value)} /></div>
                <div><Label htmlFor="rect-w">Width (w)</Label><Input id="rect-w" type="number" value={width} onChange={e => setWidth(e.target.value)} /></div>
                <div><Label htmlFor="rect-h">Height (h)</Label><Input id="rect-h" type="number" value={height} onChange={e => setHeight(e.target.value)} /></div>
            </div>
            <div><Label>Unit</Label><UnitSelect value={unit} onChange={setUnit} /></div>
        </>
    );

    const svg = (
        <svg viewBox="0 0 100 100" width="120" height="120" className="stroke-foreground fill-transparent">
            <rect x="10" y="40" width="70" height="40" strokeWidth="2" className="fill-primary/20" />
            <path d="M 10 40 L 30 20 L 100 20 L 80 40" strokeWidth="2" className="fill-primary/20" />
            <path d="M 100 20 L 100 60 L 80 80" strokeWidth="2" />
            <text x="40" y="85" fontSize="10" className="fill-foreground stroke-none">l</text>
            <text x="85" y="65" fontSize="10" className="fill-foreground stroke-none">w</text>
            <text x="2" y="65" fontSize="10" className="fill-foreground stroke-none">h</text>
        </svg>
    );
    
    return <ShapeCalculatorCard title="Rectangular Tank Volume" formula="V = lwh"><CalculatorLayout inputs={inputs} svg={svg} onCalculate={calculate} result={result} /></ShapeCalculatorCard>;
};

const CapsuleCalculator = () => {
    const [radius, setRadius] = useState('');
    const [height, setHeight] = useState('');
    const [unit, setUnit] = useState('meters');
    const [result, setResult] = useState<string | null>(null);

    const calculate = useCallback(() => {
        const r = parseFloat(radius);
        const a = parseFloat(height); // height of cylinder part
        if (isNaN(r) || isNaN(a) || r <= 0 || a <= 0) {
            setResult('Invalid input');
            return;
        }
        const sphereVolume = (4/3) * Math.PI * Math.pow(r, 3);
        const cylinderVolume = Math.PI * Math.pow(r, 2) * a;
        const volume = sphereVolume + cylinderVolume;
        setResult(`${volume.toLocaleString(undefined, { maximumFractionDigits: 4 })} cubic ${unit}`);
    }, [radius, height, unit]);

    const inputs = (
        <>
            <div className="flex gap-2">
                <div className="flex-1"><Label htmlFor="capsule-r">Radius (r)</Label><Input id="capsule-r" type="number" value={radius} onChange={e => setRadius(e.target.value)} /></div>
                <div className="flex-1"><Label htmlFor="capsule-h">Cylinder Height (a)</Label><Input id="capsule-h" type="number" value={height} onChange={e => setHeight(e.target.value)} /></div>
            </div>
            <div><Label>Unit</Label><UnitSelect value={unit} onChange={setUnit} /></div>
        </>
    );

    const svg = (
        <svg viewBox="0 0 100 100" width="140" height="120" className="stroke-foreground fill-transparent">
            <path d="M 30 20 A 20 20 0 0 0 30 80" strokeWidth="2" className="fill-primary/20"/>
            <path d="M 70 20 A 20 20 0 0 1 70 80" strokeWidth="2" className="fill-primary/20"/>
            <line x1="30" y1="20" x2="70" y2="20" strokeWidth="2" />
            <line x1="30" y1="80" x2="70" y2="80" strokeWidth="2" />
            <line x1="10" y1="50" x2="30" y2="50" strokeWidth="1" strokeDasharray="2,2"/>
            <line x1="30" y1="20" x2="70" y2="20" strokeWidth="1" strokeDasharray="2,2" transform="translate(0, 30)"/>
            <text x="15" y="45" fontSize="10" className="fill-foreground stroke-none">r</text>
            <text x="48" y="45" fontSize="10" className="fill-foreground stroke-none">a</text>
        </svg>
    );
    
    return <ShapeCalculatorCard title="Capsule Volume" formula={<>V = πr<sup>2</sup>a + (4/3)πr<sup>3</sup></>}><CalculatorLayout inputs={inputs} svg={svg} onCalculate={calculate} result={result} /></ShapeCalculatorCard>;
};

const SphericalCapCalculator = () => {
    const [baseRadius, setBaseRadius] = useState('');
    const [ballRadius, setBallRadius] = useState('');
    const [height, setHeight] = useState('');
    const [unit, setUnit] = useState('meters');
    const [result, setResult] = useState<string | null>(null);

    const calculate = useCallback(() => {
        const r = parseFloat(baseRadius);
        const R = parseFloat(ballRadius);
        const h = parseFloat(height);
        
        let filledCount = 0;
        if (!isNaN(r) && r > 0) filledCount++;
        if (!isNaN(R) && R > 0) filledCount++;
        if (!isNaN(h) && h > 0) filledCount++;
        
        if (filledCount !== 2) {
            setResult('Provide exactly two values');
            return;
        }

        let volume = 0;
        if (!isNaN(R) && !isNaN(h)) {
            if (h > 2 * R) { setResult('h must be <= 2R'); return; }
            volume = (1 / 3) * Math.PI * h * h * (3 * R - h);
        } 
        else if (!isNaN(r) && !isNaN(h)) {
            volume = (1 / 6) * Math.PI * h * (3 * r * r + h * h);
        }
        else if (!isNaN(r) && !isNaN(R)) {
             if (r > R) { setResult('r must be <= R'); return; }
            const hFromRandR = R - Math.sqrt(R*R - r*r);
            volume = (1 / 3) * Math.PI * hFromRandR * hFromRandR * (3 * R - hFromRandR);
        } else {
             setResult('Invalid combination');
             return;
        }
        
        setResult(`${volume.toLocaleString(undefined, { maximumFractionDigits: 4 })} cubic ${unit}`);
    }, [baseRadius, ballRadius, height, unit]);

    const inputs = (
        <>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div><Label htmlFor="sc-r">Base Radius (r)</Label><Input id="sc-r" type="number" value={baseRadius} onChange={e => setBaseRadius(e.target.value)} /></div>
                <div><Label htmlFor="sc-R">Ball Radius (R)</Label><Input id="sc-R" type="number" value={ballRadius} onChange={e => setBallRadius(e.target.value)} /></div>
                <div><Label htmlFor="sc-h">Height (h)</Label><Input id="sc-h" type="number" value={height} onChange={e => setHeight(e.target.value)} /></div>
            </div>
            <div><Label>Unit</Label><UnitSelect value={unit} onChange={setUnit} /></div>
        </>
    );
    
    const svg = (
         <svg viewBox="0 0 100 100" width="120" height="120" className="stroke-foreground fill-transparent">
            <path d="M 50 10 A 40 40 0 0 1 50 90" strokeWidth="2" strokeDasharray="3,3" />
            <path d="M 25 30 A 40 40 0 0 1 75 30" strokeWidth="2" className="fill-primary/20" />
            <line x1="25" y1="30" x2="75" y2="30" strokeWidth="2" />
            <line x1="50" y1="10" x2="50" y2="30" strokeWidth="1" strokeDasharray="2,2"/>
            <text x="52" y="22" fontSize="10" className="fill-foreground stroke-none">h</text>
            <line x1="50" y1="30" x2="75" y2="30" strokeWidth="1" strokeDasharray="2,2"/>
            <text x="60" y="27" fontSize="10" className="fill-foreground stroke-none">r</text>
             <line x1="50" y1="10" x2="50" y2="50" strokeWidth="1" strokeDasharray="2,2" transform="rotate(45 50 50)"/>
            <text x="60" y="45" fontSize="10" className="fill-foreground stroke-none" transform="rotate(45 50 50)">R</text>
        </svg>
    );

    return <ShapeCalculatorCard title="Spherical Cap Volume (Provide 2 of 3 values)" formula={<>V = (1/3)πh<sup>2</sup>(3R-h)</>}><CalculatorLayout inputs={inputs} svg={svg} onCalculate={calculate} result={result} /></ShapeCalculatorCard>;
};

const ConicalFrustumCalculator = () => {
    const [r1, setR1] = useState('');
    const [r2, setR2] = useState('');
    const [height, setHeight] = useState('');
    const [unit, setUnit] = useState('meters');
    const [result, setResult] = useState<string | null>(null);

    const calculate = useCallback(() => {
        const topR = parseFloat(r1);
        const bottomR = parseFloat(r2);
        const h = parseFloat(height);
        if (isNaN(topR) || isNaN(bottomR) || isNaN(h) || topR < 0 || bottomR < 0 || h <= 0) {
            setResult('Invalid input');
            return;
        }
        const volume = (1 / 3) * Math.PI * h * (topR * topR + bottomR * bottomR + topR * bottomR);
        setResult(`${volume.toLocaleString(undefined, { maximumFractionDigits: 4 })} cubic ${unit}`);
    }, [r1, r2, height, unit]);
    
     const inputs = (
         <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div><Label htmlFor="cf-r1">Top Radius (r)</Label><Input id="cf-r1" type="number" value={r1} onChange={e => setR1(e.target.value)} /></div>
                <div><Label htmlFor="cf-r2">Bottom Radius (R)</Label><Input id="cf-r2" type="number" value={r2} onChange={e => setR2(e.target.value)} /></div>
                <div><Label htmlFor="cf-h">Height (h)</Label><Input id="cf-h" type="number" value={height} onChange={e => setHeight(e.target.value)} /></div>
            </div>
            <div><Label>Unit</Label><UnitSelect value={unit} onChange={setUnit} /></div>
        </>
    );

    const svg = (
        <svg viewBox="0 0 100 100" width="120" height="120" className="stroke-foreground fill-transparent">
            <path d="M 30 30 L 10 80 L 90 80 L 70 30 Z" strokeWidth="2" className="fill-primary/20"/>
            <ellipse cx="50" cy="30" rx="20" ry="5" strokeWidth="2"/>
            <ellipse cx="50" cy="80" rx="40" ry="8" strokeWidth="2"/>
            <line x1="50" y1="30" x2="50" y2="80" strokeWidth="1" strokeDasharray="2,2"/>
            <line x1="50" y1="30" x2="70" y2="30" strokeWidth="1" strokeDasharray="2,2"/>
            <line x1="50" y1="80" x2="90" y2="80" strokeWidth="1" strokeDasharray="2,2"/>
            <text x="52" y="55" fontSize="10" className="fill-foreground stroke-none">h</text>
            <text x="60" y="27" fontSize="10" className="fill-foreground stroke-none">r</text>
            <text x="70" y="77" fontSize="10" className="fill-foreground stroke-none">R</text>
        </svg>
    );

    return <ShapeCalculatorCard title="Conical Frustum Volume" formula={<>V = (1/3)πh(r<sup>2</sup> + R<sup>2</sup> + rR)</>}><CalculatorLayout inputs={inputs} svg={svg} onCalculate={calculate} result={result} /></ShapeCalculatorCard>;
};

const EllipsoidCalculator = () => {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');
    const [unit, setUnit] = useState('meters');
    const [result, setResult] = useState<string | null>(null);

    const calculate = useCallback(() => {
        const axisA = parseFloat(a);
        const axisB = parseFloat(b);
        const axisC = parseFloat(c);
        if (isNaN(axisA) || isNaN(axisB) || isNaN(axisC) || axisA <= 0 || axisB <= 0 || axisC <= 0) {
            setResult('Invalid input');
            return;
        }
        const volume = (4 / 3) * Math.PI * axisA * axisB * axisC;
        setResult(`${volume.toLocaleString(undefined, { maximumFractionDigits: 4 })} cubic ${unit}`);
    }, [a, b, c, unit]);

    const inputs = (
         <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div><Label htmlFor="el-a">Axis 1 (a)</Label><Input id="el-a" type="number" value={a} onChange={e => setA(e.target.value)} /></div>
                <div><Label htmlFor="el-b">Axis 2 (b)</Label><Input id="el-b" type="number" value={b} onChange={e => setB(e.target.value)} /></div>
                <div><Label htmlFor="el-c">Axis 3 (c)</Label><Input id="el-c" type="number" value={c} onChange={e => setC(e.target.value)} /></div>
            </div>
            <div><Label>Unit</Label><UnitSelect value={unit} onChange={setUnit} /></div>
        </>
    );
    
    const svg = (
        <svg viewBox="0 0 100 100" width="120" height="120" className="stroke-foreground fill-transparent">
            <ellipse cx="50" cy="50" rx="45" ry="30" strokeWidth="2" className="fill-primary/20"/>
            <line x1="50" y1="50" x2="95" y2="50" strokeWidth="1" strokeDasharray="2,2"/>
            <line x1="50" y1="50" x2="50" y2="20" strokeWidth="1" strokeDasharray="2,2"/>
            <text x="70" y="45" fontSize="10" className="fill-foreground stroke-none">a</text>
            <text x="52" y="35" fontSize="10" className="fill-foreground stroke-none">b</text>
             <text x="35" y="65" fontSize="10" className="fill-foreground stroke-none">(c)</text>
        </svg>
    );

    return <ShapeCalculatorCard title="Ellipsoid Volume" formula="V = (4/3)πabc"><CalculatorLayout inputs={inputs} svg={svg} onCalculate={calculate} result={result} /></ShapeCalculatorCard>;
};

const SquarePyramidCalculator = () => {
    const [baseEdge, setBaseEdge] = useState('');
    const [height, setHeight] = useState('');
    const [unit, setUnit] = useState('meters');
    const [result, setResult] = useState<string | null>(null);

    const calculate = useCallback(() => {
        const a = parseFloat(baseEdge);
        const h = parseFloat(height);
        if (isNaN(a) || isNaN(h) || a <= 0 || h <= 0) {
            setResult('Invalid input');
            return;
        }
        const volume = (1 / 3) * a * a * h;
        setResult(`${volume.toLocaleString(undefined, { maximumFractionDigits: 4 })} cubic ${unit}`);
    }, [baseEdge, height, unit]);
    
    const inputs = (
         <>
            <div className="flex gap-2">
                <div className="flex-1"><Label htmlFor="sp-a">Base Edge (a)</Label><Input id="sp-a" type="number" value={baseEdge} onChange={e => setBaseEdge(e.target.value)} /></div>
                <div className="flex-1"><Label htmlFor="sp-h">Height (h)</Label><Input id="sp-h" type="number" value={height} onChange={e => setHeight(e.target.value)} /></div>
            </div>
            <div><Label>Unit</Label><UnitSelect value={unit} onChange={setUnit} /></div>
        </>
    );
    
    const svg = (
         <svg viewBox="0 0 100 100" width="120" height="120" className="stroke-foreground fill-transparent">
            <path d="M 15 80 L 45 70 L 95 70 L 65 80 Z" strokeWidth="2" className="fill-primary/20"/>
            <path d="M 15 80 L 55 10 L 95 70" strokeWidth="2"/>
            <path d="M 55 10 L 45 70" strokeWidth="2" strokeDasharray="2,2"/>
            <line x1="55" y1="10" x2="55" y2="75" strokeWidth="1" strokeDasharray="2,2"/>
            <text x="57" y="45" fontSize="10" className="fill-foreground stroke-none">h</text>
            <text x="25" y="78" fontSize="10" className="fill-foreground stroke-none">a</text>
        </svg>
    );

    return <ShapeCalculatorCard title="Square Pyramid Volume" formula={<>V = (1/3)a<sup>2</sup>h</>}><CalculatorLayout inputs={inputs} svg={svg} onCalculate={calculate} result={result} /></ShapeCalculatorCard>;
};

const TubeCalculator = () => {
    const [d1, setD1] = useState('');
    const [d2, setD2] = useState('');
    const [length, setLength] = useState('');
    const [unit, setUnit] = useState('meters');
    const [result, setResult] = useState<string | null>(null);

    const calculate = useCallback(() => {
        const outerD = parseFloat(d1);
        const innerD = parseFloat(d2);
        const l = parseFloat(length);
        if (isNaN(outerD) || isNaN(innerD) || isNaN(l) || outerD <= 0 || innerD < 0 || l <= 0) {
            setResult('Invalid input');
            return;
        }
        if (innerD >= outerD) {
            setResult('Inner diameter must be less than outer diameter');
            return;
        }
        const outerR = outerD / 2;
        const innerR = innerD / 2;
        const volume = Math.PI * (outerR * outerR - innerR * innerR) * l;
        setResult(`${volume.toLocaleString(undefined, { maximumFractionDigits: 4 })} cubic ${unit}`);
    }, [d1, d2, length, unit]);

    const inputs = (
         <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div><Label htmlFor="tube-d1">Outer Diameter (d1)</Label><Input id="tube-d1" type="number" value={d1} onChange={e => setD1(e.target.value)} /></div>
                <div><Label htmlFor="tube-d2">Inner Diameter (d2)</Label><Input id="tube-d2" type="number" value={d2} onChange={e => setD2(e.target.value)} /></div>
                <div><Label htmlFor="tube-l">Length (l)</Label><Input id="tube-l" type="number" value={length} onChange={e => setLength(e.target.value)} /></div>
            </div>
            <div><Label>Unit</Label><UnitSelect value={unit} onChange={setUnit} /></div>
        </>
    );
    
    const svg = (
        <svg viewBox="0 0 100 100" width="120" height="120" className="stroke-foreground fill-transparent">
            <ellipse cx="50" cy="50" rx="40" ry="15" strokeWidth="2" className="fill-primary/20"/>
            <ellipse cx="50" cy="50" rx="25" ry="10" strokeWidth="2" className="fill-background"/>
             <line x1="50" y1="50" x2="90" y2="50" strokeWidth="1" strokeDasharray="2,2"/>
             <line x1="50" y1="50" x2="75" y2="50" strokeWidth="1" strokeDasharray="2,2"/>
            <text x="50" y="45" fontSize="8" className="fill-foreground stroke-none">d2</text>
            <text x="80" y="45" fontSize="8" className="fill-foreground stroke-none">d1</text>
            <text x="5" y="80" fontSize="8" className="fill-foreground stroke-none">Length (l)</text>
        </svg>
    );

    return <ShapeCalculatorCard title="Tube Volume" formula={<>V = π(r₁<sup>2</sup> - r₂<sup>2</sup>)l</>}><CalculatorLayout inputs={inputs} svg={svg} onCalculate={calculate} result={result} /></ShapeCalculatorCard>;
};


// Helper Components
const UnitSelect = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => (
    <Select value={value} onValueChange={onChange}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>
            {unitOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
        </SelectContent>
    </Select>
);

const ResultDisplay = ({ result }: { result: string }) => (
    <div className="p-4 bg-muted rounded-lg text-center mt-4">
        <p className="font-semibold text-muted-foreground">Volume:</p>
        <p className="text-xl font-bold text-primary">{result}</p>
    </div>
);


// Main component
export default function VolumeCalculator() {
    return (
        <div className="space-y-6">
            <SphereCalculator />
            <ConeCalculator />
            <CubeCalculator />
            <CylinderCalculator />
            <RectangularTankCalculator />
            <CapsuleCalculator />
            <SphericalCapCalculator />
            <ConicalFrustumCalculator />
            <EllipsoidCalculator />
            <SquarePyramidCalculator />
            <TubeCalculator />
        </div>
    );
}
