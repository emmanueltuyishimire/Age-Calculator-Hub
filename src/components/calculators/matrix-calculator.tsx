
"use client";

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { create, all, type Matrix } from 'mathjs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle, Trash, RefreshCcw, Power, Shuffle, RotateCcw } from 'lucide-react';

const math = create(all, { number: 'Fraction' });

// Helper to convert 2D array to Matrix
const toMatrix = (data: number[][]): Matrix => math.matrix(data);

// Helper to convert Matrix to 2D array
const fromMatrix = (matrix: Matrix): number[][] => matrix.toArray() as number[][];

const MatrixInput = ({ matrix, setMatrix }: { matrix: number[][], setMatrix: (m: number[][]) => void }) => {
    const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
        const newValue = parseFloat(value);
        if (!isNaN(newValue)) {
            const newMatrix = matrix.map((row, rIdx) => 
                row.map((cell, cIdx) => 
                    rIdx === rowIndex && cIdx === colIndex ? newValue : cell
                )
            );
            setMatrix(newMatrix);
        }
    };
    
    return (
        <div className="space-y-1">
            {matrix.map((row, rIdx) => (
                <div key={rIdx} className="flex gap-1">
                    {row.map((cell, cIdx) => (
                        <Input
                            key={cIdx}
                            type="number"
                            value={cell}
                            onChange={e => handleCellChange(rIdx, cIdx, e.target.value)}
                            className="w-16 h-8 text-center"
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

const MatrixDisplay = ({ matrix, title }: { matrix: number[][], title: string }) => (
    <Card>
        <CardHeader><CardTitle className="text-center">{title}</CardTitle></CardHeader>
        <CardContent className="flex justify-center items-center">
             <div className="p-2 border rounded-md bg-muted">
                 <div className="space-y-1">
                    {matrix.map((row, rIdx) => (
                        <div key={rIdx} className="flex gap-1">
                            {row.map((cell, cIdx) => (
                                <Input key={cIdx} value={math.format(cell, { fraction: 'ratio', precision: 4 })} readOnly className="w-16 h-8 text-center bg-background"/>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </CardContent>
    </Card>
);

const createMatrix = (rows: number, cols: number, fill: 'zero' | 'one' | 'random' = 'zero'): number[][] => {
    return Array.from({ length: rows }, () => 
        Array.from({ length: cols }, () => {
            if (fill === 'one') return 1;
            if (fill === 'random') return Math.floor(Math.random() * 10);
            return 0;
        })
    );
};


export default function MatrixCalculator() {
    const [rowsA, setRowsA] = useState(4);
    const [colsA, setColsA] = useState(4);
    const [matrixA, setMatrixA] = useState<number[][]>(createMatrix(4, 4));

    const [rowsB, setRowsB] = useState(4);
    const [colsB, setColsB] = useState(4);
    const [matrixB, setMatrixB] = useState<number[][]>(createMatrix(4, 4));

    const [scalarA, setScalarA] = useState(3);
    const [powerA, setPowerA] = useState(2);
    const [scalarB, setScalarB] = useState(3);
    const [powerB, setPowerB] = useState(2);
    
    const [resultMatrix, setResultMatrix] = useState<number[][] | null>(null);
    const [resultScalar, setResultScalar] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleResizeA = (r: number, c: number) => {
        setRowsA(r); setColsA(c); setMatrixA(createMatrix(r, c));
    };
    const handleResizeB = (r: number, c: number) => {
        setRowsB(r); setColsB(c); setMatrixB(createMatrix(r, c));
    };

    const performOperation = (op: string) => {
        setError(null);
        setResultMatrix(null);
        setResultScalar(null);
        try {
            const matA = toMatrix(matrixA);
            const matB = toMatrix(matrixB);
            let res: Matrix | number;

            switch(op) {
                case 'transposeA': res = math.transpose(matA); setResultMatrix(fromMatrix(res as Matrix)); break;
                case 'powerA': res = math.pow(matA, powerA); setResultMatrix(fromMatrix(res as Matrix)); break;
                case 'determinantA': res = math.det(matA); setResultScalar(res as number); break;
                case 'inverseA': res = math.inv(matA); setResultMatrix(fromMatrix(res as Matrix)); break;
                case 'scalarA': res = math.multiply(matA, scalarA); setResultMatrix(fromMatrix(res as Matrix)); break;
                
                case 'transposeB': res = math.transpose(matB); setResultMatrix(fromMatrix(res as Matrix)); break;
                case 'powerB': res = math.pow(matB, powerB); setResultMatrix(fromMatrix(res as Matrix)); break;
                case 'determinantB': res = math.det(matB); setResultScalar(res as number); break;
                case 'inverseB': res = math.inv(matB); setResultMatrix(fromMatrix(res as Matrix)); break;
                case 'scalarB': res = math.multiply(matB, scalarB); setResultMatrix(fromMatrix(res as Matrix)); break;

                case 'add': res = math.add(matA, matB); setResultMatrix(fromMatrix(res as Matrix)); break;
                case 'subtract': res = math.subtract(matA, matB); setResultMatrix(fromMatrix(res as Matrix)); break;
                case 'multiply': res = math.multiply(matA, matB); setResultMatrix(fromMatrix(res as Matrix)); break;
                case 'swap': 
                    const tempMatrixA = [...matrixA];
                    const tempMatrixB = [...matrixB];
                    const tempRowsA = rowsA, tempColsA = colsA;
                    setMatrixA(tempMatrixB); handleResizeA(rowsB, colsB);
                    setMatrixB(tempMatrixA); handleResizeB(tempRowsA, tempColsA);
                    break;
            }
        } catch (e: any) {
            setError(e.message);
        }
    };
    
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MatrixCard title="Matrix A" rows={rowsA} cols={colsA} setRows={(r) => handleResizeA(r, colsA)} setCols={(c) => handleResizeA(rowsA, c)} matrix={matrixA} setMatrix={setMatrixA} performOp={performOperation} prefix="A" scalar={scalarA} setScalar={setScalarA} power={powerA} setPower={setPowerA} />
                <MatrixCard title="Matrix B" rows={rowsB} cols={colsB} setRows={(r) => handleResizeB(r, colsB)} setCols={(c) => handleResizeB(rowsB, c)} matrix={matrixB} setMatrix={setMatrixB} performOp={performOperation} prefix="B" scalar={scalarB} setScalar={setScalarB} power={powerB} setPower={setPowerB} />
            </div>
            
            <Card>
                <CardHeader><CardTitle className="text-center">Operations</CardTitle></CardHeader>
                <CardContent className="flex justify-center gap-2 flex-wrap">
                    <Button onClick={() => performOperation('add')}>A + B</Button>
                    <Button onClick={() => performOperation('subtract')}>A – B</Button>
                    <Button onClick={() => performOperation('multiply')}>AB</Button>
                    <Button onClick={() => performOperation('swap')} variant="secondary">A ↔ B</Button>
                </CardContent>
            </Card>

            {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

            {resultMatrix && <MatrixDisplay matrix={resultMatrix} title="Result" />}
            {resultScalar !== null && (
                <Card>
                    <CardHeader><CardTitle className="text-center">Scalar Result</CardTitle></CardHeader>
                    <CardContent className="text-center text-2xl font-bold text-primary">{math.format(resultScalar, { fraction: 'ratio', precision: 4 })}</CardContent>
                </Card>
            )}
        </div>
    );
}

const MatrixCard = ({ title, rows, cols, setRows, setCols, matrix, setMatrix, performOp, prefix, scalar, setScalar, power, setPower }: any) => (
     <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <div className="flex gap-2 items-center text-sm pt-2">
                <Label>Size:</Label>
                <Select value={rows.toString()} onValueChange={v => setRows(parseInt(v))}><SelectTrigger className="w-20 h-8"><SelectValue /></SelectTrigger><SelectContent>{[1,2,3,4,5].map(i=><SelectItem key={i} value={i.toString()}>{i}</SelectItem>)}</SelectContent></Select>
                <span>×</span>
                <Select value={cols.toString()} onValueChange={v => setCols(parseInt(v))}><SelectTrigger className="w-20 h-8"><SelectValue /></SelectTrigger><SelectContent>{[1,2,3,4,5].map(i=><SelectItem key={i} value={i.toString()}>{i}</SelectItem>)}</SelectContent></Select>
            </div>
        </CardHeader>
        <CardContent className="space-y-4">
            <MatrixInput matrix={matrix} setMatrix={setMatrix} />
            <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" onClick={() => setMatrix(createMatrix(rows, cols, 'zero'))}>Clear</Button>
                <Button variant="outline" size="sm" onClick={() => setMatrix(createMatrix(rows, cols, 'one'))}>All 1</Button>
                <Button variant="outline" size="sm" onClick={() => setMatrix(createMatrix(rows, cols, 'random'))}><Shuffle className="h-4 w-4 mr-1"/>Random</Button>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
                <Button size="sm" onClick={() => performOp(`transpose${prefix}`)}><RotateCcw className="h-4 w-4 mr-1"/>Transpose</Button>
                <Button size="sm" onClick={() => performOp(`power${prefix}`)}><Power className="h-4 w-4 mr-1"/>Power of</Button>
                <Input type="number" value={power} onChange={e => setPower(parseInt(e.target.value))} className="w-16 h-9" />
                 <Button size="sm" onClick={() => performOp(`determinant${prefix}`)}>Determinant</Button>
                <Button size="sm" onClick={() => performOp(`inverse${prefix}`)}>Inverse</Button>
                <Button size="sm" onClick={() => performOp(`scalar${prefix}`)}>× Scalar</Button>
                <Input type="number" value={scalar} onChange={e => setScalar(parseInt(e.target.value))} className="w-16 h-9" />
            </div>
        </CardContent>
    </Card>
);
