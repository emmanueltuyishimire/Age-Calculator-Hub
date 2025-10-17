
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle, Trash, Plus, Minus, ArrowRightLeft, RefreshCcw, Power, Crosshair, IterationCcw } from 'lucide-react';
import { create, all, type Matrix } from 'mathjs';

const math = create(all, { number: 'Fraction' });

// --- RREF Algorithm ---
function rref(matrix: (number | string)[][]): number[][] {
  let mat = matrix.map(row => row.map(cell => {
      try {
        return evaluate(cell.toString());
      } catch {
        return 0;
      }
  }));
  if (!mat || mat.length === 0) {
    return [];
  }
  let rowCount = mat.length;
  let colCount = mat[0].length;
  let lead = 0;

  for (let r = 0; r < rowCount; r++) {
    if (lead >= colCount) return mat;

    let i = r;
    while (mat[i][lead] === 0) {
      i++;
      if (i === rowCount) {
        i = r;
        lead++;
        if (lead === colCount) return mat;
      }
    }

    [mat[i], mat[r]] = [mat[r], mat[i]];

    let val = mat[r][lead];
    if (val !== 0) {
        mat[r] = mat[r].map(x => x / val);
    }
    
    for (let j = 0; j < rowCount; j++) {
      if (j !== r) {
        let val2 = mat[j][lead];
        mat[j] = mat[j].map((x, k) => x - val2 * mat[r][k]);
      }
    }
    lead++;
  }
  return mat;
}

// Helper to convert 2D array to Matrix
const toMatrix = (data: (number|string)[][]): Matrix => math.matrix(data.map(row => row.map(cell => {
    try {
        const evaluated = evaluate(cell.toString());
        // mathjs might return objects for complex numbers, ensure it's a number
        if (typeof evaluated === 'object' && evaluated.re !== undefined) {
          return evaluated; // keep as complex object
        }
        return Number(evaluated);
    } catch {
        return 0;
    }
})));


// Helper to convert Matrix or plain array to 2D array of formatted strings
const fromMatrix = (matrix: any): string[][] => {
  const arrayData = typeof matrix.toArray === 'function' ? matrix.toArray() : matrix;
  
  if (!Array.isArray(arrayData) || (arrayData.length > 0 && !Array.isArray(arrayData[0]))) {
    return [];
  }
  
  return arrayData.map((row: any[]) => row.map(cell => {
      try {
        if (cell && typeof cell === 'object' && cell.re !== undefined) {
             const realPart = Math.abs(cell.re) < 1e-10 ? 0 : cell.re;
             const imagPart = Math.abs(cell.im) < 1e-10 ? 0 : cell.im;
            if(imagPart === 0) return mathFormat(realPart, { notation: 'fixed', precision: 4 });
            return `${mathFormat(realPart, { notation: 'fixed', precision: 2 })} ${imagPart > 0 ? '+' : '-'} ${mathFormat(Math.abs(imagPart), {notation: 'fixed', precision: 2})}i`;
        }
        
        const f = math.fraction(cell);
        if (f.d !== 1 && Math.abs(f.n) < 10000 && f.d < 10000) {
            return math.format(f, { fraction: 'ratio' });
        }
        
        const num = Number(math.format(cell));
        if (Math.abs(num) < 1e-10) return "0";
        return num.toLocaleString(undefined, { maximumFractionDigits: 4 });
      } catch {
        const num = Number(cell);
        return isNaN(num) ? 'Error' : num.toLocaleString(undefined, { maximumFractionDigits: 4 });
      }
  }));
};

const MatrixInput = ({ matrix, setMatrix }: { matrix: (number | string)[][], setMatrix: (m: (number | string)[][]) => void }) => {
    const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
        const newMatrix = matrix.map((row, rIdx) => 
            row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex) ? value : cell)
        );
        setMatrix(newMatrix);
    };

    const handleBlur = (rowIndex: number, colIndex: number, value: string) => {
       const newMatrix = [...matrix];
       try {
           evaluate(value); // test if it's a valid math expression
           newMatrix[rowIndex][colIndex] = value;
       } catch {
           newMatrix[rowIndex][colIndex] = 0; // default to 0 if invalid
       }
       setMatrix(newMatrix);
    }
    
    return (
        <div className="space-y-1 overflow-x-auto">
            {matrix.map((row, rIdx) => (
                <div key={rIdx} className="flex gap-1">
                    {row.map((cell, cIdx) => (
                        <Input
                            key={cIdx}
                            type="text"
                            value={matrix[rIdx][cIdx]}
                            onChange={e => handleCellChange(rIdx, cIdx, e.target.value)}
                            onBlur={e => handleBlur(rIdx, cIdx, e.target.value)}
                            className="w-16 h-8 text-center min-w-[4rem]"
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

const MatrixDisplay = ({ matrix, title }: { matrix: string[][], title: string }) => (
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

const ScalarDisplay = ({ scalar, title }: { scalar: number | string, title: string }) => {
    let displayValue = scalar;
    if (typeof scalar === 'number') {
        displayValue = scalar.toLocaleString(undefined, {maximumFractionDigits: 5});
    }
    return (
        <Card>
            <CardHeader><CardTitle className="text-center">{title}</CardTitle></CardHeader>
            <CardContent className="text-center">
                <p className="text-2xl font-mono p-4 bg-muted rounded-md">{displayValue}</p>
            </CardContent>
        </Card>
    );
};

const createMatrix = (rows: number, cols: number, fill: 'zero' | 'one' | 'random' = 'zero'): (number|string)[][] => {
    return Array.from({ length: rows }, () => 
        Array.from({ length: cols }, () => {
            if (fill === 'random') return Math.floor(Math.random() * 10);
            if (fill === 'one') return 1;
            return 0;
        })
    );
};

export default function MatrixCalculator() {
    const MAX_DIM = 8;
    const MIN_DIM = 1;
    const [rowsA, setRowsA] = useState(4);
    const [colsA, setColsA] = useState(4);
    const [matrixA, setMatrixA] = useState<(number|string)[][]>(createMatrix(4, 4, 'random'));
    const [powerA, setPowerA] = useState('2');
    const [scalarA, setScalarA] = useState('3');

    const [rowsB, setRowsB] = useState(4);
    const [colsB, setColsB] = useState(4);
    const [matrixB, setMatrixB] = useState<(number|string)[][]>(createMatrix(4, 4, 'random'));
    const [powerB, setPowerB] = useState('2');
    const [scalarB, setScalarB] = useState('3');
    
    const [resultMatrix, setResultMatrix] = useState<string[][] | null>(null);
    const [resultScalar, setResultScalar] = useState<number | string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleResize = (
        matrixSetter: React.Dispatch<React.SetStateAction<(number|string)[][]>>,
        currentRows: number, setCurrentRows: React.Dispatch<React.SetStateAction<number>>,
        currentCols: number, setCurrentCols: React.Dispatch<React.SetStateAction<number>>,
        type: 'row' | 'col',
        delta: number
    ) => {
        const newRows = type === 'row' ? Math.max(MIN_DIM, Math.min(MAX_DIM, currentRows + delta)) : currentRows;
        const newCols = type === 'col' ? Math.max(MIN_DIM, Math.min(MAX_DIM, currentCols + delta)) : currentCols;

        matrixSetter(prevMatrix => {
            return Array.from({ length: newRows }, (_, r) => 
                Array.from({ length: newCols }, (_, c) => 
                    prevMatrix[r]?.[c] ?? 0
                )
            );
        });
        
        setCurrentRows(newRows);
        setCurrentCols(newCols);
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
                case 'add': res = math.add(matA, matB); break;
                case 'subtract': res = math.subtract(matA, matB); break;
                case 'multiply': res = math.multiply(matA, matB); break;
                
                case 'transposeA': res = math.transpose(matA); break;
                case 'powerA': res = math.pow(matA, parseInt(powerA)); break;
                case 'detA': setResultScalar(math.det(matA)); return;
                case 'invA': res = math.inv(matA); break;
                case 'scalarA': res = math.multiply(matA, parseFloat(scalarA)); break;
                case 'rrefA': res = rref(matrixA); break;

                case 'transposeB': res = math.transpose(matB); break;
                case 'powerB': res = math.pow(matB, parseInt(powerB)); break;
                case 'detB': setResultScalar(math.det(matB)); return;
                case 'invB': res = math.inv(matB); break;
                case 'scalarB': res = math.multiply(matB, parseFloat(scalarB)); break;
                case 'rrefB': res = rref(matrixB); break;

                case 'swap': 
                    const tempMatrixA = [...matrixA]; const tempRowsA = rowsA; const tempColsA = colsA;
                    setMatrixA([...matrixB]); setRowsA(rowsB); setColsA(colsB);
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
                    performOp={performOperation} prefix="A" 
                    powerValue={powerA} setPowerValue={setPowerA}
                    scalarValue={scalarA} setScalarValue={setScalarA}
                />
                <MatrixCard title="Matrix B" 
                    rows={rowsB} cols={colsB} 
                    setMatrix={setMatrixB} matrix={matrixB}
                    handleResize={(type: 'row' | 'col', delta: number) => handleResize(setMatrixB, rowsB, setRowsB, colsB, setColsB, type, delta)}
                    performOp={performOperation} prefix="B" 
                    powerValue={powerB} setPowerValue={setPowerB}
                    scalarValue={scalarB} setScalarValue={setScalarB}
                />
            </div>
            
            <Card>
                <CardHeader><CardTitle className="text-center">Operations</CardTitle></CardHeader>
                <CardContent className="flex justify-center gap-2 flex-wrap">
                    <Button onClick={() => performOperation('add')}>A + B</Button>
                    <Button onClick={() => performOperation('subtract')}>A – B</Button>
                    <Button onClick={() => performOperation('multiply')}>AB</Button>
                    <Button onClick={() => performOperation('swap')} variant="secondary"><ArrowRightLeft className="h-4 w-4 mr-2"/> A ↔ B</Button>
                </CardContent>
            </Card>

            {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

            {resultMatrix && <MatrixDisplay matrix={resultMatrix} title="Result" />}
            {resultScalar !== null && <ScalarDisplay scalar={resultScalar} title="Scalar Result" />}
        </div>
    );
}

const MatrixCard = ({ title, rows, cols, handleResize, setMatrix, matrix, performOp, prefix, powerValue, setPowerValue, scalarValue, setScalarValue }: any) => {
    const isSquare = rows === cols;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>{title}</span>
                    <div className="flex items-center gap-2 text-sm">
                        <span>{rows} × {cols}</span>
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleResize('row', -1)}><Minus className="h-3 w-3" /></Button>
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleResize('row', 1)}><Plus className="h-3 w-3" /></Button>
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleResize('col', -1)}><Minus className="h-3 w-3" /></Button>
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleResize('col', 1)}><Plus className="h-3 w-3" /></Button>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <MatrixInput matrix={matrix} setMatrix={setMatrix} />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    <Button variant="outline" size="sm" onClick={() => setMatrix(createMatrix(rows, cols, 'zero'))}>Clear</Button>
                    <Button variant="outline" size="sm" onClick={() => setMatrix(createMatrix(rows, cols, 'one'))}>All 1</Button>
                    <Button variant="outline" size="sm" onClick={() => setMatrix(createMatrix(rows, cols, 'random'))}>Random</Button>
                    <Button variant="outline" size="sm" onClick={() => performOp(`transpose${prefix}`)}>Transpose</Button>
                </div>
                 <div className="grid grid-cols-2 gap-2 items-center">
                    <Button variant="outline" size="sm" onClick={() => performOp(`power${prefix}`)} disabled={!isSquare}>Power of</Button>
                    <Input type="number" value={powerValue} onChange={e => setPowerValue(e.target.value)} className="h-9" disabled={!isSquare}/>
                </div>
                 <div className="grid grid-cols-2 gap-2">
                     <Button variant="outline" size="sm" onClick={() => performOp(`det${prefix}`)} disabled={!isSquare}>Determinant</Button>
                     <Button variant="outline" size="sm" onClick={() => performOp(`inv${prefix}`)} disabled={!isSquare}>Inverse</Button>
                </div>
                 <div className="grid grid-cols-2 gap-2 items-center">
                    <Button variant="outline" size="sm" onClick={() => performOp(`scalar${prefix}`)}>× (Scalar)</Button>
                    <Input type="number" value={scalarValue} onChange={e => setScalarValue(e.target.value)} className="h-9" />
                </div>
                <div>
                     <Button variant="outline" size="sm" className="w-full" onClick={() => performOp(`rref${prefix}`)}>RREF</Button>
                </div>
            </CardContent>
        </Card>
    );
};
