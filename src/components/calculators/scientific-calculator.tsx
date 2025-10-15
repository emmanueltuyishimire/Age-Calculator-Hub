
"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import { evaluate } from 'mathjs';

const scientificButtons: (string | React.ReactNode)[][] = [
    ['sin', 'cos', 'tan'],
    [<span key="asin">sin<sup>-1</sup></span>, <span key="acos">cos<sup>-1</sup></span>, <span key="atan">tan<sup>-1</sup></span>],
    ['ln', 'log', 'n!'],
    ['π', 'e', 'EXP'],
    ['√', '³√', 'y√x'],
    [<span key="pow2">x<sup>2</sup></span>, <span key="pow3">x<sup>3</sup></span>, <span key="powy">x<sup>y</sup></span>],
    ['(', ')', '1/x'],
];

const basicButtons: (string | React.ReactNode)[][] = [
    ['AC', <Trash2 key="backspace" />, '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '−'],
    ['1', '2', '3', '+'],
    ['0', '.', '±', '='],
];

const memoryButtons = ['Ans', 'M+', 'M-', 'MR'];


const factorial = (n: number): number => {
    if (n < 0 || n !== Math.floor(n)) return NaN;
    if (n > 170) return Infinity;
    if (n === 0) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

const nthRoot = (base: number, root: number) => Math.pow(base, 1 / root);

const ScientificCalculator = () => {
    const [display, setDisplay] = useState('0');
    const [isDeg, setIsDeg] = useState(true);
    const [memory, setMemory] = useState(0);
    const [ans, setAns] = useState(0);
    const [expression, setExpression] = useState('');
    const [isResult, setIsResult] = useState(false);

    const calculate = useCallback(() => {
        try {
            let finalExpression = expression
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/−/g, '-')
                .replace(/√\(/g, 'sqrt(')
                .replace(/(\d+)!/g, 'factorial($1)')
                .replace(/π/g, 'pi');
            
            finalExpression = finalExpression.replace(/(\d)\(/g, '$1*(');
            finalExpression = finalExpression.replace(/\)(\d)/g, ')*$1');
            finalExpression = finalExpression.replace(/\)\(/g, ')*(');
            
            const scope = {
                sin: (x:number) => isDeg ? Math.sin(x * Math.PI / 180) : Math.sin(x),
                cos: (x:number) => isDeg ? Math.cos(x * Math.PI / 180) : Math.cos(x),
                tan: (x:number) => isDeg ? Math.tan(x * Math.PI / 180) : Math.tan(x),
                asin: (x:number) => isDeg ? Math.asin(x) * 180 / Math.PI : Math.asin(x),
                acos: (x:number) => isDeg ? Math.acos(x) * 180 / Math.PI : Math.acos(x),
                atan: (x:number) => isDeg ? Math.atan(x) * 180 / Math.PI : Math.atan(x),
                log: (x:number) => Math.log10(x),
                ln: (x:number) => Math.log(x),
                nthRoot: nthRoot,
                factorial: factorial,
                RND: Math.random()
            };

            const result = evaluate(finalExpression, scope);
            const resultString = Number(result.toFixed(10)).toString();
            setAns(result);
            setExpression(resultString);
            setIsResult(true);

        } catch (error) {
            setExpression('');
            setDisplay('Error');
        }
    }, [expression, isDeg]);

     const handleButtonClick = useCallback((btn: string | React.ReactNode) => {
        let value = '';
        if (typeof btn === 'string') {
            value = btn;
        } else if (React.isValidElement(btn)) {
            if (btn.type === Trash2 || btn.key === 'backspace') {
                value = 'backspace';
             } else if (btn.props?.children) {
                 value = React.Children.toArray(btn.props.children).join('');
             } else {
                 value = String(btn.key);
             }
        }
        
        if (display === 'Error') {
          setExpression('');
        }

        if (isResult && !['+', '−', '×', '÷', '^', '%', '=', 'M+', 'M-'].includes(value)) {
            setExpression('');
            setIsResult(false);
        } else {
            setIsResult(false);
        }
        
        switch (value) {
            case 'AC': setExpression(''); setMemory(0); break;
            case 'backspace': setExpression(prev => prev.slice(0, -1)); break;
            case '=': calculate(); break;
            case 'sin': case 'cos': case 'tan': case 'log': case 'ln':
                setExpression(prev => prev + value + '(');
                break;
            case '√': setExpression(prev => prev + 'sqrt('); break;
            case '³√': setExpression(prev => prev + 'cbrt('); break;
            case 'sin-1': setExpression(prev => prev + 'asin('); break;
            case 'cos-1': setExpression(prev => prev + 'acos('); break;
            case 'tan-1': setExpression(prev => prev + 'atan('); break;
            case '1/x': setExpression(prev => `1/(${prev || '0'})`); break;
            case 'n!': setExpression(prev => `(${prev || '0'})!`); break;
            case 'π': setExpression(prev => prev + 'pi'); break;
            case 'e': setExpression(prev => prev + 'e'); break;
            case 'x^y': setExpression(prev => prev + '^'); break;
            case 'x^2': setExpression(prev => `(${prev || '0'})^2`); break;
            case 'x^3': setExpression(prev => `(${prev || '0'})^3`); break;
            case 'e^x': setExpression(prev => `e^(${prev || '0'})`); break;
            case '10^x': setExpression(prev => `10^(${prev || '0'})`); break;
            case 'y√x': setExpression(prev => prev + ' nthRoot('); break;
            case 'Ans': setExpression(prev => prev + ans.toString()); break;
            case 'M+':
                try { 
                    const currentValue = evaluate(expression || display);
                    setMemory(mem => mem + currentValue);
                } catch { setDisplay('Error'); setExpression(''); }
                setIsResult(true);
                break;
            case 'M-':
                try { 
                    const currentValue = evaluate(expression || display);
                    setMemory(mem => mem - currentValue);
                } catch { setDisplay('Error'); setExpression(''); }
                setIsResult(true);
                break;
            case 'MR': setExpression(prev => prev + memory.toString()); break;
            case '±':
                setExpression(prev => {
                    if (prev.startsWith('-(') && prev.endsWith(')')) {
                        return prev.substring(2, prev.length -1);
                    }
                    if (prev.length > 0 && !isNaN(Number(prev))) {
                         return String(Number(prev) * -1);
                    }
                    return `-(${prev})`;
                });
                break;
            case 'Deg/Rad': setIsDeg(prev => !prev); break;
            case 'EXP': setExpression(prev => prev + 'e+'); break;
            case 'RND': setExpression(prev => prev + Math.random().toPrecision(8)); break;
            default:
                if (expression === '0' && value !== '.') {
                    setExpression(value);
                } else {
                    setExpression(prev => prev + value);
                }
        }
    }, [isResult, calculate, expression, display, ans, memory]);
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            event.preventDefault();
            const { key } = event;
             if (/[\d.]/.test(key) || ['(', ')'].includes(key)) {
                handleButtonClick(key);
            } else if (key === '+') {
                handleButtonClick('+');
            } else if (key === '-') {
                handleButtonClick('−');
            } else if (key === '*') {
                handleButtonClick('×');
            } else if (key === '/') {
                handleButtonClick('÷');
            } else if (key === 'Enter' || key === '=') {
                calculate();
            } else if (key === 'Backspace') {
                handleButtonClick('backspace');
            } else if (key === 'Escape') {
                handleButtonClick('AC');
            } else if (key === '^') {
                handleButtonClick('x^y');
            } else if (key === '%') {
                handleButtonClick('%');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleButtonClick, calculate]);
    
    useEffect(() => {
        if (expression === '') {
            setDisplay('0');
        } else {
            const formattedDisplay = expression
                .replace(/\*/g, '×')
                .replace(/\//g, '÷')
                .replace(/-/g, '−');
            setDisplay(formattedDisplay);
        }
    }, [expression]);

  const getVariant = (btn: any): "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined => {
    let value = '';
     if (typeof btn === 'string') {
        value = btn;
    } else if (React.isValidElement(btn)) {
        if (btn.type === Trash2) return 'secondary';
        if (btn.props?.children) value = React.Children.toArray(btn.props.children).join('');
    }
    
    if (['+', '−', '×', '÷'].includes(value)) return 'secondary';
    if (value === '=') return 'default';
    if (value === 'AC') return 'destructive';
    if ([...memoryButtons].includes(value)) return 'outline';

    if (/\d/.test(value) || value === '.' || value === '±') return 'outline';

    return 'outline';
  }
  
  const renderButton = (btn: string | React.ReactNode, index: number) => {
    let value: string;
    if (typeof btn === 'string') {
        value = btn;
    } else if (React.isValidElement(btn)) {
        if (btn.type === Trash2) value = 'backspace';
        else if (btn.props?.children) value = React.Children.toArray(btn.props.children).join('');
        else value = String(btn.key);
    } else {
        value = `btn-${index}`;
    }

      return (
        <Button 
            key={value + index} 
            variant={getVariant(btn)} 
            className={cn("h-10 text-xs p-1 text-base", {
                'col-span-2': btn === '='
            })}
            onClick={() => handleButtonClick(btn)}
        >
            {btn}
        </Button>
      )
  }

  return (
    <div className="bg-slate-900 dark:bg-slate-900 border rounded-lg p-2 sm:p-4 w-full max-w-[700px] mx-auto shadow-lg">
      <Input
        type="text"
        value={display}
        readOnly
        className="w-full h-20 text-4xl text-right mb-2 bg-slate-800 dark:bg-slate-800 pr-4 text-white border-slate-700 dark:border-slate-700"
        aria-label="Calculator display"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Scientific Panel */}
        <div className="space-y-1">
            <div className="grid grid-cols-3 gap-1">
                {scientificButtons.map((row, rowIndex) => 
                    row.map((btn, btnIndex) => renderButton(btn, rowIndex * 3 + btnIndex))
                )}
            </div>
            <Button variant={isDeg ? 'secondary' : 'outline'} className="w-full h-10 text-xs p-1 text-base" onClick={() => setIsDeg(prev => !prev)}>
                {isDeg ? 'Deg' : 'Rad'}
            </Button>
        </div>

        {/* Basic Panel */}
        <div className="space-y-1">
            <div className="grid grid-cols-4 gap-1">
                 {memoryButtons.map((btn, index) => renderButton(btn, index))}
            </div>
            <div className="grid grid-cols-4 gap-1 pt-1">
                 {basicButtons.map((row, rowIndex) => 
                    row.map((btn, btnIndex) => renderButton(btn, rowIndex * 4 + btnIndex))
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculator;
