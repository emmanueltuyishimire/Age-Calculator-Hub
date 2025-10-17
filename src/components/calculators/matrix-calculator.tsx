
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
    // Handle mathjs matrix objects
    if (matrix && typeof matrix.toArray === 'function') {
      const arrayData = matrix.toArray();
      if (Array.isArray(arrayData)) {
        if (arrayData.length === 0) return [];
        // Check if it's a matrix (2D array) or vector (1D array)
        if (Array.isArray(arrayData[0])) {
          return arrayData.map((row: any[]) => row.map(cell => (cell && typeof cell.toNumber === 'function') ? cell.toNumber() : cell));
        }
        // It's a 1D array, wrap it in a 2D array
        return [arrayData.map(cell => (cell && typeof cell.toNumber === 'function') ? cell.toNumber() : cell)];
      }
    }
    
    // Handle plain JS arrays passed from eigs.vectors
    if (Array.isArray(matrix)) {
        if (matrix.length > 0 && Array.isArray(matrix[0])) {
             return matrix.map(row => row.map(cell => (cell && typeof cell.toNumber === 'function') ? cell.toNumber() : cell));
        }
        return [matrix.map(cell => (cell && typeof cell.toNumber === 'function') ? cell.toNumber() : cell)];
    }
    
    // Handle scalar numbers
    if (typeof matrix === 'number' || (matrix && typeof matrix.toNumber === 'function')) {
        return [[(matrix && typeof matrix.toNumber === 'function') ? matrix.toNumber() : matrix]];
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

const formatEigenvalue = (v: any) => {
    if (typeof v === 'number') {
        return math.format(v, { precision: 4 });
    }
    if (v && typeof v === 'object' && 're' in v && 'im' in v) {
        if (Math.abs(v.im) < 1e-9) return math.format(v.re, { precision: 4 });
        return `${math.format(v.re, { precision: 4 })} ${v.im > 0 ? '+' : '-'} ${math.format(Math.abs(v.im), { precision: 4 })}i`;
    }
    return String(v);
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
    const [powerA, setPowerA] = useState(2);
    const [scalarB, setScalarB] = useState(3);
    const [powerB, setPowerB] = useState(2);
    
    const [resultMatrix, setResultMatrix] = useState<(string | number)[][] | null>(null);
    const [resultScalar, setResultScalar] = useState<string | null>(null);
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
        setResultScalar(null);
        try {
            const matA = toMatrix(matrixA);
            const matB = toMatrix(matrixB);
            let res: any;

            switch(op) {
                case 'transposeA': res = math.transpose(matA); setResultMatrix(fromMatrix(res)); break;
                case 'powerA':
                    if (powerA === 0) { res = math.identity(rowsA); } 
                    else { res = math.pow(matA, powerA); }
                    setResultMatrix(fromMatrix(res));
                    break;
                case 'determinantA': res = math.det(matA); setResultScalar(math.format(res, { fraction: 'ratio', precision: 4 })); break;
                case 'inverseA': res = math.inv(matA); setResultMatrix(fromMatrix(res)); break;
                case 'rrefA': res = math.algebra.rref(matA); setResultMatrix(fromMatrix(res)); break;
                case 'eigsA':
                    res = math.eigs(matA);
                    const eigenvalues = res.values.map(formatEigenvalue);
                    const eigenvectors = res.eigenvectors.map((vec: any) => fromMatrix(vec.vector)[0].map(formatEigenvalue));
                    const eigResult: (string | number)[][] = [['Eigenvalues:'], eigenvalues];
                    eigenvectors.forEach((vec, i) => {
                        eigResult.push([`Vector ${i+1}:` , ...vec]);
                    });
                    setResultMatrix(eigResult);
                    break;
                case 'scalarA': res = math.multiply(matA, scalarA); setResultMatrix(fromMatrix(res)); break;
                
                case 'transposeB': res = math.transpose(matB); setResultMatrix(fromMatrix(res)); break;
                case 'powerB':
                    if (powerB === 0) { res = math.identity(rowsB); } 
                    else { res = math.pow(matB, powerB); }
                    setResultMatrix(fromMatrix(res));
                    break;
                case 'determinantB': res = math.det(matB); setResultScalar(math.format(res, { fraction: 'ratio', precision: 4 })); break;
                case 'inverseB': res = math.inv(matB); setResultMatrix(fromMatrix(res)); break;
                case 'rrefB': res = math.algebra.rref(matB); setResultMatrix(fromMatrix(res)); break;
                case 'eigsB':
                    res = math.eigs(matB);
                    const eigenvaluesB = res.values.map(formatEigenvalue);
                    const eigenvectorsB = res.eigenvectors.map((vec: any) => fromMatrix(vec.vector)[0].map(formatEigenvalue));
                    const eigResultB: (string | number)[][] = [['Eigenvalues:'], eigenvaluesB];
                    eigenvectorsB.forEach((vec, i) => {
                        eigResultB.push([`Vector ${i+1}:` , ...vec]);
                    });
                    setResultMatrix(eigResultB);
                    break;
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
                    performOp={performOperation} prefix="A" scalar={scalarA} setScalar={setScalarA} power={powerA} setPower={setPowerA} />
                <MatrixCard title="Matrix B" 
                    rows={rowsB} cols={colsB} 
                    setMatrix={setMatrixB} matrix={matrixB}
                    handleResize={(type: 'row' | 'col', delta: number) => handleResize(type, matrixB, setMatrixB, rowsB, setRowsB, colsB, setColsB, delta)}
                    performOp={performOperation} prefix="B" scalar={scalarB} setScalar={setScalarB} power={powerB} setPower={setPowerB} />
            </div>
            
            <Card>
                <CardHeader><CardTitle className="text-center">Operations</CardTitle></CardHeader>
                <CardContent className="flex justify-center gap-2 flex-wrap">
                    <Button onClick={() => performOperation('add')}>A + B</Button>
                    <Button onClick={() => performOperation('subtract')}>A – B</Button>
                    <Button onClick={() => performOperation('multiply')}>AB</Button>
                    <Button onClick={() => performOperation('swap')} variant="secondary"><ArrowRightLeft className="h-4 w-4 mr-2"/> A ↔ B</Button>
                    <Button onClick={() => { setMatrixA(createMatrix(rowsA, colsA)); setMatrixB(createMatrix(rowsB, colsB)); setResultMatrix(null); setResultScalar(null); setError(null); }} variant="destructive"><RefreshCcw className="h-4 w-4 mr-2" />Clear All</Button>
                </CardContent>
            </Card>

            {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

            {resultMatrix && <MatrixDisplay matrix={resultMatrix} title="Result" />}
            {resultScalar !== null && (
                <Card>
                    <CardHeader><CardTitle className="text-center">Scalar Result</CardTitle></CardHeader>
                    <CardContent className="text-center text-2xl font-bold text-primary">{resultScalar}</CardContent>
                </Card>
            )}
        </div>
    );
}

const MatrixCard = ({ title, rows, cols, handleResize, setMatrix, matrix, performOp, prefix, scalar, setScalar, power, setPower }: any) => (
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
            </div>
            <div className="flex gap-2 flex-wrap items-center">
                <Button size="sm" onClick={() => performOp(`transpose${prefix}`)}><RotateCcw className="h-4 w-4 mr-1"/>Transpose</Button>
                <Button size="sm" onClick={() => performOp(`power${prefix}`)}><Power className="h-4 w-4 mr-1"/>Power of</Button>
                <Input type="number" value={power} onChange={e => setPower(parseInt(e.target.value) || 0)} className="w-16 h-9" />
                 <Button size="sm" onClick={() => performOp(`determinant${prefix}`)}>Determinant</Button>
                <Button size="sm" onClick={() => performOp(`inverse${prefix}`)}>Inverse</Button>
            </div>
             <div className="flex gap-2 flex-wrap items-center">
                <Button size="sm" onClick={() => performOp(`scalar${prefix}`)}>× Scalar</Button>
                <Input type="number" value={scalar} onChange={e => setScalar(parseInt(e.target.value) || 0)} className="w-16 h-9" />
                <Button size="sm" onClick={() => performOp(`rref${prefix}`)}>RREF</Button>
                <Button size="sm" onClick={() => performOp(`eigs${prefix}`)}>Eigenvalues</Button>
            </div>
        </CardContent>
    </Card>
);

    