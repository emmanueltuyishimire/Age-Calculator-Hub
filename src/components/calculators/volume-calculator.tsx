
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCcw } from 'lucide-react';

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

// Individual Calculator Components
const SphereCalculator = () => {
    const [radius, setRadius] = useState('');
    const [unit, setUnit] = useState('meters');
    const [result, setResult] = useState<string | null>(null);

    const calculate = () => {
        const r = parseFloat(radius);
        if (isNaN(r) || r <= 0) {
            setResult('Invalid input');
            return;
        }
        const volume = (4 / 3) * Math.PI * Math.pow(r, 3);
        setResult(`${volume.toLocaleString(undefined, { maximumFractionDigits: 4 })} cubic ${unit}`);
    };

    return (
        <Card>
            <CardHeader><CardTitle>Sphere Volume</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-2">
                    <div className="flex-1"><Label htmlFor="sphere-r">Radius (r)</Label><Input id="sphere-r" type="number" value={radius} onChange={e => setRadius(e.target.value)} /></div>
                    <div className="w-1/3"><Label>Unit</Label><UnitSelect value={unit} onChange={setUnit} /></div>
                </div>
                <Button onClick={calculate} className="w-full">Calculate</Button>
                {result && <ResultDisplay result={result} />}
            </CardContent>
        </Card>
    );
};

const ConeCalculator = () => {
    const [radius, setRadius] = useState('');
    const [height, setHeight] = useState('');
    const [unit, setUnit] = useState('meters');
    const [result, setResult] = useState<string | null>(null);

    const calculate = () => {
        const r = parseFloat(radius);
        const h = parseFloat(height);
        if (isNaN(r) || isNaN(h) || r <= 0 || h <= 0) {
            setResult('Invalid input');
            return;
        }
        const volume = (1 / 3) * Math.PI * Math.pow(r, 2) * h;
        setResult(`${volume.toLocaleString(undefined, { maximumFractionDigits: 4 })} cubic ${unit}`);
    };

    return (
        <Card>
            <CardHeader><CardTitle>Cone Volume</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex gap-2">
                    <div className="flex-1"><Label htmlFor="cone-r">Radius (r)</Label><Input id="cone-r" type="number" value={radius} onChange={e => setRadius(e.target.value)} /></div>
                    <div className="flex-1"><Label htmlFor="cone-h">Height (h)</Label><Input id="cone-h" type="number" value={height} onChange={e => setHeight(e.target.value)} /></div>
                    <div className="w-1/3"><Label>Unit</Label><UnitSelect value={unit} onChange={setUnit} /></div>
                </div>
                <Button onClick={calculate} className="w-full">Calculate</Button>
                {result && <ResultDisplay result={result} />}
            </CardContent>
        </Card>
    );
};

const CubeCalculator = () => {
    const [edge, setEdge] = useState('');
    const [unit, setUnit] = useState('meters');
    const [result, setResult] = useState<string | null>(null);

    const calculate = () => {
        const a = parseFloat(edge);
        if (isNaN(a) || a <= 0) {
            setResult('Invalid input');
            return;
        }
        const volume = Math.pow(a, 3);
        setResult(`${volume.toLocaleString(undefined, { maximumFractionDigits: 4 })} cubic ${unit}`);
    };

    return (
        <Card>
            <CardHeader><CardTitle>Cube Volume</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex gap-2">
                    <div className="flex-1"><Label htmlFor="cube-a">Edge Length (a)</Label><Input id="cube-a" type="number" value={edge} onChange={e => setEdge(e.target.value)} /></div>
                    <div className="w-1/3"><Label>Unit</Label><UnitSelect value={unit} onChange={setUnit} /></div>
                </div>
                <Button onClick={calculate} className="w-full">Calculate</Button>
                {result && <ResultDisplay result={result} />}
            </CardContent>
        </Card>
    );
};

const CylinderCalculator = () => {
    const [radius, setRadius] = useState('');
    const [height, setHeight] = useState('');
    const [unit, setUnit] = useState('meters');
    const [result, setResult] = useState<string | null>(null);

    const calculate = () => {
        const r = parseFloat(radius);
        const h = parseFloat(height);
        if (isNaN(r) || isNaN(h) || r <= 0 || h <= 0) {
            setResult('Invalid input');
            return;
        }
        const volume = Math.PI * Math.pow(r, 2) * h;
        setResult(`${volume.toLocaleString(undefined, { maximumFractionDigits: 4 })} cubic ${unit}`);
    };

    return (
        <Card>
            <CardHeader><CardTitle>Cylinder Volume</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-2">
                    <div className="flex-1"><Label htmlFor="cylinder-r">Radius (r)</Label><Input id="cylinder-r" type="number" value={radius} onChange={e => setRadius(e.target.value)} /></div>
                    <div className="flex-1"><Label htmlFor="cylinder-h">Height (h)</Label><Input id="cylinder-h" type="number" value={height} onChange={e => setHeight(e.target.value)} /></div>
                    <div className="w-1/3"><Label>Unit</Label><UnitSelect value={unit} onChange={setUnit} /></div>
                </div>
                <Button onClick={calculate} className="w-full">Calculate</Button>
                {result && <ResultDisplay result={result} />}
            </CardContent>
        </Card>
    );
};

const RectangularTankCalculator = () => {
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [unit, setUnit] = useState('meters');
    const [result, setResult] = useState<string | null>(null);

    const calculate = () => {
        const l = parseFloat(length);
        const w = parseFloat(width);
        const h = parseFloat(height);
        if (isNaN(l) || isNaN(w) || isNaN(h) || l <= 0 || w <= 0 || h <= 0) {
            setResult('Invalid input');
            return;
        }
        const volume = l * w * h;
        setResult(`${volume.toLocaleString(undefined, { maximumFractionDigits: 4 })} cubic ${unit}`);
    };

    return (
        <Card>
            <CardHeader><CardTitle>Rectangular Tank Volume</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-2">
                    <div className="flex-1"><Label htmlFor="rect-l">Length (l)</Label><Input id="rect-l" type="number" value={length} onChange={e => setLength(e.target.value)} /></div>
                    <div className="flex-1"><Label htmlFor="rect-w">Width (w)</Label><Input id="rect-w" type="number" value={width} onChange={e => setWidth(e.target.value)} /></div>
                    <div className="flex-1"><Label htmlFor="rect-h">Height (h)</Label><Input id="rect-h" type="number" value={height} onChange={e => setHeight(e.target.value)} /></div>
                    <div className="w-1/3"><Label>Unit</Label><UnitSelect value={unit} onChange={setUnit} /></div>
                </div>
                <Button onClick={calculate} className="w-full">Calculate</Button>
                {result && <ResultDisplay result={result} />}
            </CardContent>
        </Card>
    );
};

const CapsuleCalculator = () => {
    const [radius, setRadius] = useState('');
    const [height, setHeight] = useState('');
    const [unit, setUnit] = useState('meters');
    const [result, setResult] = useState<string | null>(null);

    const calculate = () => {
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
    };

    return (
        <Card>
            <CardHeader><CardTitle>Capsule Volume</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-2">
                    <div className="flex-1"><Label htmlFor="capsule-r">Radius (r)</Label><Input id="capsule-r" type="number" value={radius} onChange={e => setRadius(e.target.value)} /></div>
                    <div className="flex-1"><Label htmlFor="capsule-h">Cylinder Height (a)</Label><Input id="capsule-h" type="number" value={height} onChange={e => setHeight(e.target.value)} /></div>
                    <div className="w-1/3"><Label>Unit</Label><UnitSelect value={unit} onChange={setUnit} /></div>
                </div>
                <Button onClick={calculate} className="w-full">Calculate</Button>
                {result && <ResultDisplay result={result} />}
            </CardContent>
        </Card>
    );
};

const SphericalCapCalculator = () => {
    const [baseRadius, setBaseRadius] = useState('');
    const [ballRadius, setBallRadius] = useState('');
    const [height, setHeight] = useState('');
    const [unit, setUnit] = useState('meters');
    const [result, setResult] = useState<string | null>(null);

    const calculate = () => {
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
        // With R and h
        if (!isNaN(R) && !isNaN(h)) {
            if (h > 2 * R) { setResult('h must be <= 2R'); return; }
            volume = (1 / 3) * Math.PI * h * h * (3 * R - h);
        } 
        // With r and h
        else if (!isNaN(r) && !isNaN(h)) {
            volume = (1 / 6) * Math.PI * h * (3 * r * r + h * h);
        }
        // With r and R
        else if (!isNaN(r) && !isNaN(R)) {
             if (r > R) { setResult('r must be <= R'); return; }
            const hFromRandR = R - Math.sqrt(R*R - r*r);
            volume = (1 / 3) * Math.PI * hFromRandR * hFromRandR * (3 * R - hFromRandR);
        } else {
             setResult('Invalid combination');
             return;
        }
        
        setResult(`${volume.toLocaleString(undefined, { maximumFractionDigits: 4 })} cubic ${unit}`);
    };

    return (
        <Card>
            <CardHeader><CardTitle>Spherical Cap Volume</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground -mt-2">Provide any two values.</p>
                <div className="flex gap-2">
                    <div className="flex-1"><Label htmlFor="sc-r">Base Radius (r)</Label><Input id="sc-r" type="number" value={baseRadius} onChange={e => setBaseRadius(e.target.value)} /></div>
                    <div className="flex-1"><Label htmlFor="sc-R">Ball Radius (R)</Label><Input id="sc-R" type="number" value={ballRadius} onChange={e => setBallRadius(e.target.value)} /></div>
                    <div className="flex-1"><Label htmlFor="sc-h">Height (h)</Label><Input id="sc-h" type="number" value={height} onChange={e => setHeight(e.target.value)} /></div>
                    <div className="w-1/3"><Label>Unit</Label><UnitSelect value={unit} onChange={setUnit} /></div>
                </div>
                <Button onClick={calculate} className="w-full">Calculate</Button>
                {result && <ResultDisplay result={result} />}
            </CardContent>
        </Card>
    );
};

const ConicalFrustumCalculator = () => {
    const [r1, setR1] = useState('');
    const [r2, setR2] = useState('');
    const [height, setHeight] = useState('');
    const [unit, setUnit] = useState('meters');
    const [result, setResult] = useState<string | null>(null);

    const calculate = () => {
        const topR = parseFloat(r1);
        const bottomR = parseFloat(r2);
        const h = parseFloat(height);
        if (isNaN(topR) || isNaN(bottomR) || isNaN(h) || topR < 0 || bottomR < 0 || h <= 0) {
            setResult('Invalid input');
            return;
        }
        const volume = (1 / 3) * Math.PI * h * (topR * topR + bottomR * bottomR + topR * bottomR);
        setResult(`${volume.toLocaleString(undefined, { maximumFractionDigits: 4 })} cubic ${unit}`);
    };

    return (
        <Card>
            <CardHeader><CardTitle>Conical Frustum Volume</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-2">
                    <div className="flex-1"><Label htmlFor="cf-r1">Top Radius (r)</Label><Input id="cf-r1" type="number" value={r1} onChange={e => setR1(e.target.value)} /></div>
                    <div className="flex-1"><Label htmlFor="cf-r2">Bottom Radius (R)</Label><Input id="cf-r2" type="number" value={r2} onChange={e => setR2(e.target.value)} /></div>
                    <div className="flex-1"><Label htmlFor="cf-h">Height (h)</Label><Input id="cf-h" type="number" value={height} onChange={e => setHeight(e.target.value)} /></div>
                    <div className="w-1/3"><Label>Unit</Label><UnitSelect value={unit} onChange={setUnit} /></div>
                </div>
                <Button onClick={calculate} className="w-full">Calculate</Button>
                {result && <ResultDisplay result={result} />}
            </CardContent>
        </Card>
    );
};

const EllipsoidCalculator = () => {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');
    const [unit, setUnit] = useState('meters');
    const [result, setResult] = useState<string | null>(null);

    const calculate = () => {
        const axisA = parseFloat(a);
        const axisB = parseFloat(b);
        const axisC = parseFloat(c);
        if (isNaN(axisA) || isNaN(axisB) || isNaN(axisC) || axisA <= 0 || axisB <= 0 || axisC <= 0) {
            setResult('Invalid input');
            return;
        }
        const volume = (4 / 3) * Math.PI * axisA * axisB * axisC;
        setResult(`${volume.toLocaleString(undefined, { maximumFractionDigits: 4 })} cubic ${unit}`);
    };

    return (
        <Card>
            <CardHeader><CardTitle>Ellipsoid Volume</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-2">
                    <div className="flex-1"><Label htmlFor="el-a">Axis 1 (a)</Label><Input id="el-a" type="number" value={a} onChange={e => setA(e.target.value)} /></div>
                    <div className="flex-1"><Label htmlFor="el-b">Axis 2 (b)</Label><Input id="el-b" type="number" value={b} onChange={e => setB(e.target.value)} /></div>
                    <div className="flex-1"><Label htmlFor="el-c">Axis 3 (c)</Label><Input id="el-c" type="number" value={c} onChange={e => setC(e.target.value)} /></div>
                    <div className="w-1/3"><Label>Unit</Label><UnitSelect value={unit} onChange={setUnit} /></div>
                </div>
                <Button onClick={calculate} className="w-full">Calculate</Button>
                {result && <ResultDisplay result={result} />}
            </CardContent>
        </Card>
    );
};

const SquarePyramidCalculator = () => {
    const [baseEdge, setBaseEdge] = useState('');
    const [height, setHeight] = useState('');
    const [unit, setUnit] = useState('meters');
    const [result, setResult] = useState<string | null>(null);

    const calculate = () => {
        const a = parseFloat(baseEdge);
        const h = parseFloat(height);
        if (isNaN(a) || isNaN(h) || a <= 0 || h <= 0) {
            setResult('Invalid input');
            return;
        }
        const volume = (1 / 3) * a * a * h;
        setResult(`${volume.toLocaleString(undefined, { maximumFractionDigits: 4 })} cubic ${unit}`);
    };

    return (
        <Card>
            <CardHeader><CardTitle>Square Pyramid Volume</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-2">
                    <div className="flex-1"><Label htmlFor="sp-a">Base Edge (a)</Label><Input id="sp-a" type="number" value={baseEdge} onChange={e => setBaseEdge(e.target.value)} /></div>
                    <div className="flex-1"><Label htmlFor="sp-h">Height (h)</Label><Input id="sp-h" type="number" value={height} onChange={e => setHeight(e.target.value)} /></div>
                    <div className="w-1/3"><Label>Unit</Label><UnitSelect value={unit} onChange={setUnit} /></div>
                </div>
                <Button onClick={calculate} className="w-full">Calculate</Button>
                {result && <ResultDisplay result={result} />}
            </CardContent>
        </Card>
    );
};

const TubeCalculator = () => {
    const [d1, setD1] = useState('');
    const [d2, setD2] = useState('');
    const [length, setLength] = useState('');
    const [unit, setUnit] = useState('meters');
    const [result, setResult] = useState<string | null>(null);

    const calculate = () => {
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
    };

    return (
        <Card>
            <CardHeader><CardTitle>Tube Volume</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-2">
                    <div className="flex-1"><Label htmlFor="tube-d1">Outer Diameter (d1)</Label><Input id="tube-d1" type="number" value={d1} onChange={e => setD1(e.target.value)} /></div>
                    <div className="flex-1"><Label htmlFor="tube-d2">Inner Diameter (d2)</Label><Input id="tube-d2" type="number" value={d2} onChange={e => setD2(e.target.value)} /></div>
                    <div className="flex-1"><Label htmlFor="tube-l">Length (l)</Label><Input id="tube-l" type="number" value={length} onChange={e => setLength(e.target.value)} /></div>
                    <div className="w-1/3"><Label>Unit</Label><UnitSelect value={unit} onChange={setUnit} /></div>
                </div>
                <Button onClick={calculate} className="w-full">Calculate</Button>
                {result && <ResultDisplay result={result} />}
            </CardContent>
        </Card>
    );
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
