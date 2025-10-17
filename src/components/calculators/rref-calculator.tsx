
"use client";

import React, { useState } from 'react';
import { create, all, type Matrix } from 'mathjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle, Trash, RefreshCcw, Plus, Minus } from 'lucide-react';

const math = create(all, { number: 'Fraction' });

// Helper to convert 2D array to Matrix
const toMatrix = (data: number[][]): Matrix => math.matrix(data);

// Helper to convert Matrix to formatted 2D array of strings
const fromMatrix = (matrix: any): string[][] => {
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

export default function RrefCalculator() {
    const MAX_DIM = 8;
    const MIN_DIM = 1;
    const [rows, setRows] = useState(3);
    const [cols, setCols] = useState(4);
    const [matrix, setMatrix] = useState<number[][]>(createMatrix(3, 4));
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
            const mat = toMatrix(matrix);
            // Corrected function call
            const res = math.rref(mat); 
            setResultMatrix(fromMatrix(res));
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
