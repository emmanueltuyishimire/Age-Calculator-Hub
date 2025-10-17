
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle, Trash, Plus, Minus, ArrowRightLeft, RefreshCcw } from 'lucide-react';
import { create, all, type Matrix } from 'mathjs';

const math = create(all, { number: 'Fraction' });

// --- RREF Algorithm ---
function rref(matrix: number[][]): number[][] {
  let mat = matrix.map(row => [...row]);
  let lead = 0;
  const rowCount = mat.length;
  const colCount = mat[0].length;

  for (let r = 0; r < rowCount; r++) {
    if (lead >= colCount) {
      return mat;
    }

    let i = r;
    while (mat[i][lead] === 0) {
      i++;
      if (i === rowCount) {
        i = r;
        lead++;
        if (lead === colCount) {
          return mat;
        }
      }
    }

    [mat[i], mat[r]] = [mat[r], mat[i]];

    const val = mat[r][lead];
    for (let j = 0; j < colCount; j++) {
      mat[r][j] /= val;
    }

    for (let j = 0; j < rowCount; j++) {
      if (j !== r) {
        const val2 = mat[j][lead];
        for (let k = 0; k < colCount; k++) {
          mat[j][k] -= val2 * mat[r][k];
        }
      }
    }
    lead++;
  }
  return mat;
}


// Helper to convert 2D array to Matrix
const toMatrix = (data: number[][]): Matrix => math.matrix(data);

// Helper to convert Matrix or plain array to 2D array of formatted strings
const fromMatrix = (matrix: any): string[][] => {
  if (!matrix) return [];
  const arrayData = typeof matrix.toArray === 'function' ? matrix.toArray() : matrix;
  
  if (!Array.isArray(arrayData) || (arrayData.length > 0 && !Array.isArray(arrayData[0]))) {
    return [];
  }
  
  return arrayData.map((row: any[]) => row.map(cell => {
      try {
        const f = math.fraction(cell);
        // Only show as fraction if it's not a whole number.
        if (f.d !== 1) {
            return math.format(f, { fraction: 'ratio' });
        }
        return math.format(f.n, { notation: 'fixed', precision: 4 });
      } catch {
        // Fallback for non-fractional numbers or formatting errors
        return math.format(cell, { notation: 'fixed', precision: 4 });
      }
  }));
};

const MatrixInput = ({ matrix, setMatrix }: { matrix: number[][], setMatrix: (m: number[][]) => void }) => {
    const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
        // Allow empty string for easy editing, treat as 0 for calculation
        const isNumeric = /^-?\d*\.?\d*$/.test(value);
        if (!isNumeric && value !== '' && value !== '-') return;

        const newMatrix = matrix.map((row, rIdx) => 
            row.map((cell, cIdx) => {
                if (rIdx === rowIndex && cIdx === colIndex) {
                    // Store as number, but handle empty string input
                    const numValue = parseFloat(value);
                    return isNaN(numValue) ? 0 : numValue;
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
                            type="text" // Use text to allow for intermediate states like "-"
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

const MatrixDisplay = ({ matrix, title }: { matrix: (string)[][], title: string }) => (
    <Card>
        <CardHeader><CardTitle className="text-center">{title}</CardTitle></CardHeader>
        <CardContent className="flex justify-center items-center">
             <div className="p-2 border rounded-md bg-muted overflow-x-auto">
                 <div className="space-y-1">
                    {matrix.map((row, rIdx) => (
                        <div key={rIdx} className="flex gap-1">
                            {row.map((cell, cIdx) => (
                                <Input key={cIdx} value={cell} readOnly className="w-16 h-8 text-center bg-background min-w-[4rem]"/>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </CardContent>
    </Card>
);

const createMatrix = (rows: number, cols: number, fill: 'zero' | 'random' = 'zero'): number[][] => {
    return Array.from({ length: rows }, () => 
        Array.from({ length: cols }, () => {
            if (fill === 'random') return Math.floor(Math.random() * 10);
            return 0;
        })
    );
};

export default function MatrixCalculator() {
    const MAX_DIM = 8;
    const MIN_DIM = 1;
    const [rowsA, setRowsA] = useState(3);
    const [colsA, setColsA] = useState(4);
    const [matrixA, setMatrixA] = useState<number[][]>(createMatrix(3, 4, 'random'));

    const [rowsB, setRowsB] = useState(4);
    const [colsB, setColsB] = useState(3);
    const [matrixB, setMatrixB] = useState<number[][]>(createMatrix(4, 3, 'random'));
    
    const [resultMatrix, setResultMatrix] = useState<string[][] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleResize = (
        matrixSetter: React.Dispatch<React.SetStateAction<number[][]>>,
        currentRows: number, setCurrentRows: React.Dispatch<React.SetStateAction<number>>,
        currentCols: number, setCurrentCols: React.Dispatch<React.SetStateAction<number>>,
        type: 'row' | 'col',
        delta: number
    ) => {
        const newRows = type === 'row' ? Math.max(MIN_DIM, Math.min(MAX_DIM, currentRows + delta)) : currentRows;
        const newCols = type === 'col' ? Math.max(MIN_DIM, Math.min(MAX_DIM, currentCols + delta)) : currentCols;

        matrixSetter(prevMatrix => {
            const newMatrix = Array.from({ length: newRows }, (_, r) => 
                Array.from({ length: newCols }, (_, c) => 
                    prevMatrix[r] && prevMatrix[r][c] !== undefined ? prevMatrix[r][c] : 0
                )
            );
            return newMatrix;
        });
        
        setCurrentRows(newRows);
        setCurrentCols(newCols);
    };
    
    const performOperation = (op: string) => {
        setError(null);
        setResultMatrix(null);
        try {
            const matA = toMatrix(matrixA);
            const matB = toMatrix(matrixB);
            let res: any;

            switch(op) {
                case 'add': res = math.add(matA, matB); break;
                case 'subtract': res = math.subtract(matA, matB); break;
                case 'multiply': res = math.multiply(matA, matB); break;
                case 'rrefA': res = rref(matrixA); break;
                case 'rrefB': res = rref(matrixB); break;
                case 'swap': 
                    const tempMatrixA = [...matrixA]; const tempMatrixB = [...matrixB];
                    const tempRowsA = rowsA; const tempColsA = colsA;
                    setMatrixA(tempMatrixB); setRowsA(rowsB); setColsA(colsB);
                    setMatrixB(tempMatrixA); setRowsB(tempRowsA); setColsB(tempColsA);
                    return;
                default: return;
            }
            if(res) setResultMatrix(fromMatrix(res));
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
                    handleResize={(type: 'row' | 'col', delta: number) => handleResize(setMatrixA, rowsA, setRowsA, colsA, setColsA, type, delta)}
                    performOp={performOperation} prefix="A" />
                <MatrixCard title="Matrix B" 
                    rows={rowsB} cols={colsB} 
                    setMatrix={setMatrixB} matrix={matrixB}
                    handleResize={(type: 'row' | 'col', delta: number) => handleResize(setMatrixB, rowsB, setRowsB, colsB, setColsB, type, delta)}
                    performOp={performOperation} prefix="B" />
            </div>
            
            <Card>
                <CardHeader><CardTitle className="text-center">Operations</CardTitle></CardHeader>
                <CardContent className="flex justify-center gap-2 flex-wrap">
                    <Button onClick={() => performOperation('add')}>A + B</Button>
                    <Button onClick={() => performOperation('subtract')}>A – B</Button>
                    <Button onClick={() => performOperation('multiply')}>AB</Button>
                    <Button onClick={() => performOperation('swap')} variant="secondary"><ArrowRightLeft className="h-4 w-4 mr-2"/> A ↔ B</Button>
                    <Button onClick={() => { setMatrixA(createMatrix(rowsA, colsA, 'random')); setMatrixB(createMatrix(rowsB, colsB, 'random')); setResultMatrix(null); setError(null); }} variant="destructive"><RefreshCcw className="h-4 w-4 mr-2" />Clear All</Button>
                </CardContent>
            </Card>

            {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

            {resultMatrix && <MatrixDisplay matrix={resultMatrix} title="Result" />}
        </div>
    );
}

const MatrixCard = ({ title, rows, cols, handleResize, setMatrix, matrix, performOp, prefix }: any) => {
    return (
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
                <div className="flex gap-2 flex-wrap justify-between">
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="outline" size="sm" onClick={() => setMatrix(createMatrix(rows, cols, 'zero'))}><Trash className="h-4 w-4 mr-1"/>Clear</Button>
                    <Button variant="outline" size="sm" onClick={() => setMatrix(createMatrix(rows, cols, 'random'))}><RefreshCcw className="h-4 w-4 mr-1"/>Random</Button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                     <Button variant="outline" size="sm" onClick={() => performOp(`rref${prefix}`)}>RREF</Button>
                  </div>
                </div>
            </CardContent>
        </Card>
    );
};
