
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle, Trash, Plus, Minus } from 'lucide-react';
import { format as mathFormat, fraction } from 'mathjs';

// --- RREF Algorithm provided by user ---
function rref(matrix: number[][]): number[][] {
  if (!matrix || matrix.length === 0) {
    return [];
  }
  let mat = matrix.map(row => [...row]); // Create a copy to avoid modifying the original state directly
  let rowCount = mat.length;
  let colCount = mat[0].length;
  let lead = 0;

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

    let val = mat[r][lead];
    for (let j = 0; j < colCount; j++) {
      mat[r][j] /= val;
    }

    for (let j = 0; j < rowCount; j++) {
      if (j !== r) {
        let val2 = mat[j][lead];
        for (let k = 0; k < colCount; k++) {
          mat[j][k] -= val2 * mat[r][k];
        }
      }
    }

    lead++;
  }

  return mat;
}


// --- Helper Components ---
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

const MatrixDisplay = ({ matrix, title }: { matrix: string[][], title: string }) => (
    <Card>
        <CardHeader><CardTitle className="text-center">{title}</CardTitle></CardHeader>
        <CardContent className="flex justify-center items-center">
            <div className="p-2 border rounded-md bg-muted overflow-x-auto">
                <div className="space-y-1">
                    {matrix.map((row, rIdx) => (
                        <div key={rIdx} className="flex gap-1">
                            {row.map((cell, cIdx) => (
                                <Input key={cIdx} value={cell} readOnly className="w-16 h-8 text-center bg-background min-w-[4rem]" />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </CardContent>
    </Card>
);

const createMatrix = (rows: number, cols: number): number[][] => {
    return Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));
};

// --- Main Component ---
export default function RrefCalculator() {
    const MAX_DIM = 8;
    const MIN_DIM = 1;
    const [rows, setRows] = useState(3);
    const [cols, setCols] = useState(4);
    const [matrix, setMatrix] = useState<number[][]>([
        [1, 2, -1, -4],
        [2, 3, -1, -11],
        [-2, 0, -3, 22]
    ]);
    const [resultMatrix, setResultMatrix] = useState<string[][] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleResize = (type: 'row' | 'col', delta: number) => {
        let newRows = rows;
        let newCols = cols;
        if (type === 'row') newRows = Math.max(MIN_DIM, Math.min(MAX_DIM, rows + delta));
        else newCols = Math.max(MIN_DIM, Math.min(MAX_DIM, cols + delta));

        const newMatrix = Array.from({ length: newRows }, (_, r) =>
            Array.from({ length: newCols }, (_, c) =>
                matrix[r] && matrix[r][c] !== undefined ? matrix[r][c] : 0
            )
        );
        
        setRows(newRows);
        setCols(newCols);
        setMatrix(newMatrix);
    };

    const performRref = () => {
        setError(null);
        setResultMatrix(null);
        try {
            const res = rref(matrix);
            const formattedResult = res.map(row => 
                row.map(cell => {
                    try {
                        // Attempt to convert to fraction for cleaner display
                        return mathFormat(fraction(cell), { fraction: 'ratio' });
                    } catch {
                        // Fallback for numbers that can't be nicely fractioned
                        return mathFormat(cell, { notation: 'fixed', precision: 4 });
                    }
                })
            );
            setResultMatrix(formattedResult);
        } catch (e: any) {
            setError(e.message || "An error occurred during RREF calculation.");
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Input Matrix</CardTitle>
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
                     <div className="flex gap-2 pt-4">
                        <Button onClick={performRref} className="w-full">Calculate RREF</Button>
                        <Button variant="outline" onClick={() => setMatrix(createMatrix(rows, cols))}><Trash className="h-4 w-4 mr-1"/>Clear</Button>
                    </div>
                </CardContent>
            </Card>

            {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
            {resultMatrix && <MatrixDisplay matrix={resultMatrix} title="Result (RREF)" />}
        </div>
    );
}
