
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle, Trash, Plus, Minus, ArrowRightLeft, RefreshCcw, Power, Crosshair, IterationCcw } from 'lucide-react';
import { create, all, type Matrix, fraction, format as mathFormat } from 'mathjs';

const math = create(all, { number: 'Fraction' });

// --- RREF Algorithm ---
function rref(matrix: (number | string)[][]): number[][] {
  let A = matrix.map(row => row.map(cell => {
    try {
      const evaluated = math.evaluate(cell.toString());
      if (typeof evaluated === 'object' && 're' in evaluated) {
        return (evaluated as any).im === 0 ? (evaluated as any).re : NaN;
      }
      return Number(evaluated);
    } catch {
      return NaN;
    }
  }));

  if (A.some(row => row.some(isNaN))) {
      throw new Error("Invalid number format in matrix. Use numbers or fractions like '3/4'.");
  }
  
  if (!A || A.length === 0) return [];

  const rows = A.length;
  const cols = A[0].length;
  let lead = 0;

  for (let r = 0; r < rows; r++) {
      if (lead >= cols) break;

      let i = r;
      while (A[i][lead] === 0) {
          i++;
          if (i === rows) {
              i = r;
              lead++;
              if (cols === lead) return A;
          }
      }

      [A[i], A[r]] = [A[r], A[i]]; // Swap rows

      const pivotVal = A[r][lead];
      if (pivotVal !== 0) {
          for (let j = 0; j < cols; j++) {
              A[r][j] /= pivotVal;
          }
      }
      
      for (let i = 0; i < rows; i++) {
          if (i !== r) {
              const factor = A[i][lead];
              for (let j = 0; j < cols; j++) {
                  A[i][j] -= factor * A[r][j];
              }
          }
      }
      lead++;
  }
  return A;
}

// Helper to convert 2D array to Matrix
const toMatrix = (data: (number|string)[][]): Matrix => math.matrix(data.map(row => row.map(cell => {
    try {
        return math.evaluate(cell.toString());
    } catch {
        return 0; // Fallback, though validation should prevent this.
    }
})));


// Helper to convert Matrix or plain array to 2D array of formatted strings
const fromMatrix = (matrix: any): string[][] => {
  const arrayData = typeof matrix.toArray === 'function' ? matrix.toArray() : matrix;
  
  if (!Array.isArray(arrayData) || (arrayData.length > 0 && !Array.isArray(arrayData[0]))) {
    return [['Error']];
  }
  
  return arrayData.map((row: any[]) => row.map(cell => {
      try {
        if (cell && typeof cell === 'object' && cell.re !== undefined && cell.im !== undefined) {
             const realPart = Math.abs(cell.re) < 1e-10 ? 0 : cell.re;
             const imagPart = Math.abs(cell.im) < 1e-10 ? 0 : cell.im;
            if(imagPart === 0) return mathFormat(realPart, { notation: 'fixed', precision: 4 }).replace(/\.?0+$/, "") || "0";
            return `${mathFormat(realPart, { notation: 'fixed', precision: 2 })} ${imagPart > 0 ? '+' : '-'} ${mathFormat(Math.abs(imagPart), {notation: 'fixed', precision: 2})}i`;
        }
        
        const f = fraction(cell);
        if (f.d !== 1 && Math.abs(f.n) < 10000 && f.d < 10000) {
            return mathFormat(f, { fraction: 'ratio' });
        }
        
        const num = Number(mathFormat(cell));
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
           math.evaluate(value);
           newMatrix[rowIndex][colIndex] = value;
       } catch {
           newMatrix[rowIndex][colIndex] = "0"; 
       }
       setMatrix(newMatrix);
    }
    
    return (
        <div className="space-y-1 overflow-x-auto p-1 bg-muted rounded-md">
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

const MatrixDisplay = ({ matrix, title, onCopyToA, onCopyToB }: { matrix: string[][], title: string, onCopyToA: () => void, onCopyToB: () => void }) => (
    <Card>
        <CardHeader><CardTitle className="text-center">{title}</CardTitle></CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
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
            <div className="flex gap-2">
                <Button onClick={onCopyToA} variant="outline" size="sm">Copy to A</Button>
                <Button onClick={onCopyToB} variant="outline" size="sm">Copy to B</Button>
            </div>
        </CardContent>
    </Card>
);

const ScalarDisplay = ({ scalar, title }: { scalar: any, title: string }) => {
    let displayValue;
    try {
        if (typeof scalar === 'object' && scalar && 'n' in scalar && 'd' in scalar) {
            displayValue = mathFormat(scalar, { fraction: 'ratio' });
        } else {
            const num = Number(scalar);
             if (Math.abs(num) < 1e-10) {
                 displayValue = "0";
             } else {
                displayValue = num.toLocaleString(undefined, { maximumFractionDigits: 5 });
             }
        }
    } catch {
        displayValue = "Error";
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
    
    const [resultMatrix, setResultMatrix] = useState<string[][] | null>(null);
    const [resultTitle, setResultTitle] = useState("");
    const [resultScalar, setResultScalar] = useState<number | string | Object | null>(null);
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
        setResultTitle("");

        try {
            const matA = toMatrix(matrixA);
            const matB = toMatrix(matrixB);
            let res: any;
            let title = "";

            switch(op) {
                case 'add': res = math.add(matA, matB); title = "A + B ="; break;
                case 'subtract': res = math.subtract(matA, matB); title = "A - B ="; break;
                case 'multiply': res = math.multiply(matA, matB); title = "A × B ="; break;
                
                case 'transposeA': res = math.transpose(matA); title = "Transpose(A) ="; break;
                case 'powerA': res = math.pow(matA, parseInt(powerA)); title = `A^${powerA} =`; break;
                case 'detA': setResultScalar(math.det(matA)); setResultTitle("det(A) ="); return;
                case 'invA': res = math.inv(matA); title = "inv(A) ="; break;
                case 'scalarA': res = math.multiply(matA, parseFloat(scalarA)); title = `${scalarA} × A =`; break;
                case 'rrefA': res = rref(matrixA); title = "RREF(A) ="; break;
                
                case 'transposeB': res = math.transpose(matB); title = "Transpose(B) ="; break;
                case 'powerB': res = math.pow(matB, parseInt(powerA)); title = `B^${powerA} =`; // Re-using powerA for B as well
                case 'detB': setResultScalar(math.det(matB)); setResultTitle("det(B) ="); return;
                case 'invB': res = math.inv(matB); title = "inv(B) ="; break;
                case 'scalarB': res = math.multiply(matB, parseFloat(scalarA)); title = `${scalarA} × B =`; break;
                case 'rrefB': res = rref(matrixB); title = "RREF(B) ="; break;

                case 'swap': 
                    const tempMatrixA = JSON.parse(JSON.stringify(matrixA)); 
                    const tempRowsA = rowsA; const tempColsA = colsA;
                    setMatrixA(JSON.parse(JSON.stringify(matrixB))); setRowsA(rowsB); setColsA(colsB);
                    setMatrixB(tempMatrixA); setRowsB(tempRowsA); setColsB(tempColsA);
                    return;
                default: return;
            }
            if(res) {
                setResultMatrix(fromMatrix(res));
                setResultTitle(title);
            }
        } catch (e: any) {
            setError(e.message || "An error occurred. Check matrix dimensions and values.");
        }
    };
    
    const handleCopyTo = (target: 'A' | 'B') => {
        if (!resultMatrix) return;
        const newMatrix = resultMatrix.map(row => row.map(cell => cell.toString()));
        const newRows = newMatrix.length;
        const newCols = newMatrix[0]?.length || 0;

        if (target === 'A') {
            setMatrixA(newMatrix);
            setRowsA(newRows);
            setColsA(newCols);
        } else {
            setMatrixB(newMatrix);
            setRowsB(newRows);
            setColsB(newCols);
        }
    };
    
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
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
                    powerValue={powerA} setPowerValue={setPowerA} // Re-using powerA for B for simplicity
                    scalarValue={scalarA} setScalarValue={setScalarA} // Re-using scalarA for B
                />
            </div>
            
            <Card>
                <CardHeader><CardTitle className="text-center">Binary Operations</CardTitle></CardHeader>
                <CardContent className="flex justify-center gap-2 flex-wrap">
                    <Button onClick={() => performOperation('add')}>A + B</Button>
                    <Button onClick={() => performOperation('subtract')}>A – B</Button>
                    <Button onClick={() => performOperation('multiply')}>A × B</Button>
                    <Button onClick={() => performOperation('swap')} variant="secondary"><ArrowRightLeft className="h-4 w-4 mr-2"/> A ↔ B</Button>
                </CardContent>
            </Card>

            {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

            {resultMatrix && <MatrixDisplay matrix={resultMatrix} title={resultTitle || "Result"} onCopyToA={() => handleCopyTo('A')} onCopyToB={() => handleCopyTo('B')} />}
            {resultScalar !== null && <ScalarDisplay scalar={resultScalar} title={resultTitle || "Result"} />}
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
                         <div className="flex items-center gap-1">
                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleResize('row', -1)}><Minus className="h-3 w-3" /></Button>
                            <span>{rows}</span>
                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleResize('row', 1)}><Plus className="h-3 w-3" /></Button>
                         </div>
                         <span>×</span>
                         <div className="flex items-center gap-1">
                             <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleResize('col', -1)}><Minus className="h-3 w-3" /></Button>
                             <span>{cols}</span>
                             <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleResize('col', 1)}><Plus className="h-3 w-3" /></Button>
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <MatrixInput matrix={matrix} setMatrix={setMatrix} />
                 <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" onClick={() => setMatrix(createMatrix(rows, cols, 'zero'))}>Clear</Button>
                    <Button variant="outline" size="sm" onClick={() => setMatrix(createMatrix(rows, cols, 'one'))}>All 1</Button>
                    <Button variant="outline" size="sm" onClick={() => setMatrix(createMatrix(rows, cols, 'random'))}>Random</Button>
                    <Button variant="outline" size="sm" onClick={() => performOp(`transpose${prefix}`)}>Transpose</Button>
                    <Button variant="outline" size="sm" onClick={() => performOp(`det${prefix}`)} disabled={!isSquare}>Determinant</Button>
                    <Button variant="outline" size="sm" onClick={() => performOp(`inv${prefix}`)} disabled={!isSquare}>Inverse</Button>
                    <div className="flex items-center gap-2">
                         <Button variant="outline" size="sm" className="flex-1" onClick={() => performOp(`power${prefix}`)} disabled={!isSquare}>Power</Button>
                         <Input type="number" value={powerValue} onChange={e => setPowerValue(e.target.value)} className="w-16 h-9" disabled={!isSquare}/>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => performOp(`scalar${prefix}`)}>Scalar ×</Button>
                        <Input type="number" value={scalarValue} onChange={e => setScalarValue(e.target.value)} className="w-16 h-9" />
                    </div>
                    <Button variant="outline" size="sm" className="w-full lg:col-span-1" onClick={() => performOp(`rref${prefix}`)}>RREF</Button>
                </div>
            </CardContent>
        </Card>
    );
};
