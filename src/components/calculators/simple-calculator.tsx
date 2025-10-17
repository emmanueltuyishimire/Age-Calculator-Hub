
"use client";

import * as React from "react";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { evaluate } from 'mathjs';
import { Trash2 } from "lucide-react";

const SimpleCalculator = () => {
    const [display, setDisplay] = useState('0');
    const [expression, setExpression] = useState('');
    const [isError, setIsError] = useState(false);
    const [isResult, setIsResult] = useState(false);

    const calculate = React.useCallback(() => {
        if (!expression) return;
        try {
            const finalExpression = expression.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
            const result = evaluate(finalExpression);
            const resultString = parseFloat(result.toFixed(10)).toString();
            setDisplay(resultString);
            setExpression(resultString);
            setIsResult(true);
            setIsError(false);
        } catch (error) {
            setDisplay('Error');
            setIsError(true);
            setExpression('');
        }
    }, [expression]);

    const handleButtonClick = (value: string) => {
        if (isError && value !== 'AC') return;
        
        const isOperator = ['+', '−', '×', '÷'].includes(value);

        if (isResult && !isOperator && value !== '=') {
            setExpression('');
            setIsResult(false);
        }

        switch (value) {
            case 'AC':
                setExpression('');
                setDisplay('0');
                setIsError(false);
                setIsResult(false);
                break;
            case 'Back':
                setExpression(prev => prev.slice(0, -1));
                break;
            case '=':
                calculate();
                break;
            case '+':
            case '−':
            case '×':
            case '÷':
                if (expression === '' || expression.endsWith('(')) return;
                const lastCharIsOperator = ['+', '−', '×', '÷'].includes(expression.slice(-1));
                if (lastCharIsOperator) {
                    setExpression(prev => prev.slice(0, -1) + value);
                } else {
                    setExpression(prev => prev + value);
                }
                setIsResult(false);
                break;
            default: // Numbers and dot
                if (isResult) {
                    setExpression(value);
                    setIsResult(false);
                } else {
                     setExpression(prev => (prev === '0' && value !== '.') ? value : prev + value);
                }
                break;
        }
    };
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
             if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
             event.preventDefault();

            const keyMap: { [key: string]: string | (()=>void) } = {
                '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', '.': '.',
                '+': '+', '-': '−', '*': '×', '/': '÷',
                'Enter': () => calculate(), '=': () => calculate(),
                'Backspace': 'Back', 'Escape': 'AC', 'c': 'AC',
            };
            const action = keyMap[event.key];
            if (action) {
                if (typeof action === 'function') action();
                else handleButtonClick(action);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [calculate, expression]);

    useEffect(() => {
        if(isError) return;
        setDisplay(expression === '' ? '0' : expression);
    }, [expression, isError]);

    const buttons = [
        'AC', 'Back', '%', '÷',
        '7', '8', '9', '×',
        '4', '5', '6', '−',
        '1', '2', '3', '+',
        '0', '.', '=',
    ];
    
     const getVariant = (btn: string) => {
        if (['÷', '×', '−', '+', '='].includes(btn)) return "default";
        if (btn === 'AC') return 'destructive';
        return 'secondary';
     };

    return (
        <div className="bg-slate-700 dark:bg-slate-800 border-4 border-slate-600 dark:border-slate-700 rounded-xl p-2 w-full mx-auto shadow-2xl max-w-[320px]">
            <Input
                type="text"
                value={display}
                readOnly
                className="w-full h-16 text-3xl text-right mb-2 bg-slate-800/50 pr-4 text-emerald-300 border-2 border-slate-800 dark:border-black font-mono tracking-wider shadow-inner"
                aria-label="Calculator display"
            />
            <div className="grid grid-cols-4 gap-1.5">
                {buttons.map(btn => (
                    <Button
                        key={btn}
                        variant={getVariant(btn)}
                        className={cn("h-14 text-xl shadow-md", {
                            'col-span-2': btn === '0',
                        })}
                        onClick={() => handleButtonClick(btn)}
                    >
                        {btn === 'Back' ? <Trash2 className="h-6 w-6"/> : btn}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default SimpleCalculator;
