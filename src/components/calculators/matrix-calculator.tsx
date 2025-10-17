
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
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle, Trash, RefreshCcw, Power, Shuffle, RotateCcw, Plus, Minus, ArrowRightLeft } from 'lucide-react';

const math = create(all, { number: 'Fraction' });

// Helper to convert 2D array to Matrix
const toMatrix = (data: number[][]): Matrix => math.matrix(data);

// Helper to convert Matrix or plain array to 2D array
const fromMatrix = (matrix: any): (string | number)[][] => {
    if (matrix && typeof matrix.toArray === 'function') {
      const arrayData = matrix.toArray();
      return arrayData.map((row: any[]) => row.map(cell => math.format(cell, { fraction: 'ratio', precision: 4 })));
    }
    return [];
};

const MatrixInput = ({ matrix, setMatrix }: { matrix: number[][], setMatrix: (m: number[][]) => void }) => {
    const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
        const newValue = parseFloat(value);
        const newMatrix = matrix.map((row, rIdx) => 
            row.map((cell, cIdx) => {
                if (rIdx === rowIndex && cIdx === colIndex) {
                    return isNaN(newValue) ? 0 : newValue;
                }
                return cell;
            })
        );
        setMatrix(newMatrix);
    };
    
    return (
        <div className="space-y-1 overflow-x-auto">
            {matrix.map((row, rIdx) => (
                <div key={rIdx} className="flex gap-1">
                    {row.map((cell, cIdx) => (
                        <Input
                            key={cIdx}
                            type="number"
                            value={cell}
                            onChange={e => handleCellChange(rIdx, cIdx, e.target.value)}
                            className="w-16 h-8 text-center min-w-[4rem]"
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

const MatrixDisplay = ({ matrix, title }: { matrix: (string | number)[][], title: string }) => (
    <Card>
        <CardHeader><CardTitle className="text-center">{title}</CardTitle></CardHeader>
        <CardContent className="flex justify-center items-center">
             <div className="p-2 border rounded-md bg-muted overflow-x-auto">
                 <div className="space-y-1">
                    {matrix.map((row, rIdx) => (
                        <div key={rIdx} className="flex gap-1">
                            {row.map((cell, cIdx) => (
                                <Input key={cIdx} value={typeof cell === 'number' ? math.format(cell, { fraction: 'ratio', precision: 4 }) : cell} readOnly className="w-16 h-8 text-center bg-background min-w-[4rem]"/>
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
    const MAX_DIM = 10;
    const MIN_DIM = 1;
    const [rowsA, setRowsA] = useState(4);
    const [colsA, setColsA] = useState(4);
    const [matrixA, setMatrixA] = useState<number[][]>(createMatrix(4, 4, 'random'));

    const [rowsB, setRowsB] = useState(4);
    const [colsB, setColsB] = useState(4);
    const [matrixB, setMatrixB] = useState<number[][]>(createMatrix(4, 4, 'random'));

    const [scalarA, setScalarA] = useState(3);
    const [scalarB, setScalarB] = useState(3);
    
    const [resultMatrix, setResultMatrix] = useState<(string | number)[][] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleResize = (
        type: 'row' | 'col',
        matrix: number[][],
        matrixSetter: React.Dispatch<React.SetStateAction<number[][]>>,
        currentRows: number,
        setCurrentRows: React.Dispatch<React.SetStateAction<number>>,
        currentCols: number,
        setCurrentCols: React.Dispatch<React.SetStateAction<number>>,
        delta: number
    ) => {
        let newRows = currentRows;
        let newCols = currentCols;
        if (type === 'row') newRows = Math.max(MIN_DIM, Math.min(MAX_DIM, currentRows + delta));
        else newCols = Math.max(MIN_DIM, Math.min(MAX_DIM, currentCols + delta));

        const newMatrix = Array.from({ length: newRows }, (_, r) => 
            Array.from({ length: newCols }, (_, c) => 
                matrix[r] && matrix[r][c] !== undefined ? matrix[r][c] : 0
            )
        );
        
        setCurrentRows(newRows);
        setCurrentCols(newCols);
        matrixSetter(newMatrix);
    };

    const performOperation = (op: string) => {
        setError(null);
        setResultMatrix(null);
        try {
            const matA = toMatrix(matrixA);
            const matB = toMatrix(matrixB);
            let res: any;

            switch(op) {
                case 'scalarA': res = math.multiply(matA, scalarA); setResultMatrix(fromMatrix(res)); break;
                case 'scalarB': res = math.multiply(matB, scalarB); setResultMatrix(fromMatrix(res)); break;
                case 'add': res = math.add(matA, matB); setResultMatrix(fromMatrix(res)); break;
                case 'subtract': res = math.subtract(matA, matB); setResultMatrix(fromMatrix(res)); break;
                case 'multiply': res = math.multiply(matA, matB); setResultMatrix(fromMatrix(res)); break;
                case 'swap': 
                    const tempMatrixA = [...matrixA]; const tempMatrixB = [...matrixB];
                    const tempRowsA = rowsA; const tempColsA = colsA;
                    setMatrixA(tempMatrixB); setRowsA(rowsB); setColsA(colsB);
                    setMatrixB(tempMatrixA); setRowsB(tempRowsA); setColsB(tempColsA);
                    break;
            }
        } catch (e: any) {
            setError(e.message || "An error occurred. Check matrix dimensions and values.");
        }
    };
    
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MatrixCard title="Matrix A" 
                    rows={rowsA} cols={colsA} 
                    setMatrix={setMatrixA} matrix={matrixA}
                    handleResize={(type: 'row' | 'col', delta: number) => handleResize(type, matrixA, setMatrixA, rowsA, setRowsA, colsA, setColsA, delta)}
                    performOp={performOperation} prefix="A" scalar={scalarA} setScalar={setScalarA} />
                <MatrixCard title="Matrix B" 
                    rows={rowsB} cols={colsB} 
                    setMatrix={setMatrixB} matrix={matrixB}
                    handleResize={(type: 'row' | 'col', delta: number) => handleResize(type, matrixB, setMatrixB, rowsB, setRowsB, colsB, setColsB, delta)}
                    performOp={performOperation} prefix="B" scalar={scalarB} setScalar={setScalarB} />
            </div>
            
            <Card>
                <CardHeader><CardTitle className="text-center">Operations</CardTitle></CardHeader>
                <CardContent className="flex justify-center gap-2 flex-wrap">
                    <Button onClick={() => performOperation('add')}>A + B</Button>
                    <Button onClick={() => performOperation('subtract')}>A – B</Button>
                    <Button onClick={() => performOperation('multiply')}>AB</Button>
                    <Button onClick={() => performOperation('swap')} variant="secondary"><ArrowRightLeft className="h-4 w-4 mr-2"/> A ↔ B</Button>
                    <Button onClick={() => { setMatrixA(createMatrix(rowsA, colsA)); setMatrixB(createMatrix(rowsB, colsB)); setResultMatrix(null); setError(null); }} variant="destructive"><RefreshCcw className="h-4 w-4 mr-2" />Clear All</Button>
                </CardContent>
            </Card>

            {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

            {resultMatrix && <MatrixDisplay matrix={resultMatrix} title="Result" />}
        </div>
    );
}

const MatrixCard = ({ title, rows, cols, handleResize, setMatrix, matrix, performOp, prefix, scalar, setScalar }: any) => (
     <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{title}</CardTitle>
            <div className="flex gap-4 items-center text-sm">
                <div className="flex items-center gap-1">
                    <Label>Rows:</Label>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleResize('row', -1)}><Minus className="h-4 w-4" /></Button>
                    <Input type="number" readOnly value={rows} className="w-12 h-8 text-center" />
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleResize('row', 1)}><Plus className="h-4 w-4" /></Button>
                </div>
                 <div className="flex items-center gap-1">
                    <Label>Cols:</Label>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleResize('col', -1)}><Minus className="h-4 w-4" /></Button>
                    <Input type="number" readOnly value={cols} className="w-12 h-8 text-center" />
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleResize('col', 1)}><Plus className="h-4 w-4" /></Button>
                </div>
            </div>
        </CardHeader>
        <CardContent className="space-y-4">
            <MatrixInput matrix={matrix} setMatrix={setMatrix} />
            <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" onClick={() => setMatrix(createMatrix(rows, cols, 'zero'))}><Trash className="h-4 w-4 mr-1"/>Clear</Button>
                <Button variant="outline" size="sm" onClick={() => setMatrix(createMatrix(rows, cols, 'one'))}>All 1</Button>
                <Button variant="outline" size="sm" onClick={() => setMatrix(createMatrix(rows, cols, 'random'))}><Shuffle className="h-4 w-4 mr-1"/>Random</Button>
                 <div className="flex gap-1 items-center">
                  <Button size="sm" onClick={() => performOp(`scalar${prefix}`)}>× Scalar</Button>
                  <Input type="number" value={scalar} onChange={e => setScalar(parseInt(e.target.value) || 0)} className="w-16 h-9" />
                </div>
            </div>
        </CardContent>
    </Card>
);
