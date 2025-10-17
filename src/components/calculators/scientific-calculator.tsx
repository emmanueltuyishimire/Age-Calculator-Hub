
"use client";

import * as React from "react";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import { evaluate, format as mathFormat } from 'mathjs';

// --- Helper Functions ---
const factorial = (n: number): number => {
    if (n < 0 || n !== Math.floor(n)) return NaN;
    if (n > 170) return Infinity;
    if (n === 0) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
};

const nthRoot = (base: number, root: number) => Math.pow(base, 1 / root);


// --- Main Component ---
const ScientificCalculator = () => {
    const [display, setDisplay] = useState('0');
    const [isDeg, setIsDeg] = useState(true);
    const [memory, setMemory] = useState(0);
    const [ans, setAns] = useState(0);
    const [expression, setExpression] = useState('');
    const [isError, setIsError] = useState(false);
    const [isResult, setIsResult] = useState(false);
    const [isShifted, setIsShifted] = useState(false);

    const ariaLabels: { [key: string]: string } = {
        'AC': 'All Clear',
        'backspace': 'Backspace',
        '±': 'Toggle sign',
        '÷': 'Divide',
        '×': 'Multiply',
        '−': 'Subtract',
        '+': 'Add',
        '=': 'Equals',
        '.': 'Decimal point',
        'sin': 'Sine',
        'cos': 'Cosine',
        'tan': 'Tangent',
        'sin-1': 'Inverse sine',
        'cos-1': 'Inverse cosine',
        'tan-1': 'Inverse tangent',
        'ln': 'Natural logarithm',
        'log': 'Logarithm base 10',
        'π': 'Pi',
        'e': 'Euler\'s number',
        'x2': 'Square',
        'x3': 'Cube',
        'xy': 'Power',
        'y√x': 'nth root',
        '1/x': 'Reciprocal',
        'n!': 'Factorial',
        'ex': 'e to the power of x',
        '10x': '10 to the power of x',
        'Rad': 'Radians',
        'Deg': 'Degrees',
        '2nd': 'Second function',
        'EXP': 'Exponent',
        '(': 'Open parenthesis',
        ')': 'Close parenthesis',
        'Ans': 'Answer',
        'MC': 'Memory Clear',
        'MR': 'Memory Recall',
        'M+': 'Memory Add',
        'M-': 'Memory Subtract'
    };

    const calculate = () => {
        if (!expression) return;
        try {
            let finalExpression = expression
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/−/g, '-')
                .replace(/√\(/g, 'sqrt(')
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
            };

            const result = evaluate(finalExpression, scope);
            if (typeof result === 'undefined' || result === null || typeof result === 'function') {
              throw new Error('Invalid expression');
            }
            const resultString = mathFormat(result, { precision: 10 });
            setAns(result);
            setDisplay(resultString);
            setExpression(resultString);
            setIsResult(true);
            setIsError(false);

        } catch (error) {
            setDisplay('Error');
            setIsError(true);
            setExpression('');
        }
    };

     const handleButtonClick = (value: string) => {
        if (isError && value !== 'AC') return;
        
        const isOperator = ['+', '−', '×', '÷', '^'].includes(value);

        if (isResult && !isOperator && value !== '=' && value !== '±') {
             setIsResult(false);
             if(!['1/x', 'x2', 'ex', '10x', 'n!'].includes(value)){
                 setExpression('');
             }
        }
        
        const lastChar = expression.slice(-1);
        const lastIsOperator = ['+', '−', '×', '÷', '^'].includes(lastChar);
        
        const handleOperator = (op: string) => {
            if (expression === '' || expression.endsWith('(')) return;
            if (lastIsOperator) {
                setExpression(prev => prev.slice(0, -1) + op);
            } else {
                setExpression(prev => prev + op);
            }
        };

        const getLastNumber = (expr: string): [string, number] => {
             const match = expr.match(/(\(-?[\d.e+-]+\)|[\d.e+-]+|pi|e)$/i);
             if (match && match.index !== undefined) {
                 return [match[0], match.index];
             }
             return ['', -1];
        };

        switch (value) {
            case 'AC': setExpression(''); setDisplay('0'); setIsError(false); setIsResult(false); setMemory(0); break;
            case 'backspace': setExpression(prev => prev.slice(0, -1)); break;
            case '=': calculate(); break;
            case '+': handleOperator('+'); break;
            case '−': handleOperator('−'); break;
            case '×': handleOperator('×'); break;
            case '÷': handleOperator('÷'); break;
            case 'sin': setExpression(prev => prev + 'sin('); break;
            case 'cos': setExpression(prev => prev + 'cos('); break;
            case 'tan': setExpression(prev => prev + 'tan('); break;
            case 'log': setExpression(prev => prev + 'log('); break;
            case 'ln': setExpression(prev => prev + 'ln('); break;
            case '√x': setExpression(prev => prev + 'sqrt('); break;
            case '³√x': setExpression(prev => prev + 'cbrt('); break;
            case 'sin-1': setExpression(prev => prev + 'asin('); break;
            case 'cos-1': setExpression(prev => prev + 'acos('); break;
            case 'atan-1': setExpression(prev => prev + 'atan('); break;
            case '1/x': setExpression(prev => `(1/(${prev || '1'}))`); break;
            case 'n!': setExpression(prev => `factorial(${prev || '0'})`); break;
            case 'π': setExpression(prev => prev + 'pi'); break;
            case 'e': setExpression(prev => prev + 'e'); break;
            case 'xy': handleOperator('^'); break;
            case 'x2': 
                 setExpression(prev => `((${prev || '0'})^2)`);
                break;
            case 'x3': 
                 setExpression(prev => `((${prev || '0'})^3)`);
                break;
            case 'ex': 
                setExpression(prev => `(e^(${prev || '0'}))`);
                break;
            case '10x': 
                setExpression(prev => `(10^(${prev || '0'}))`);
                break;
            case 'y√x':
                setExpression(prev => {
                    const [lastNum] = getLastNumber(prev);
                    return `nthRoot(${lastNum || '0'}, `;
                });
                break;
            case 'Ans': setExpression(prev => prev + ans.toString()); break;
            case 'M+':
                try { 
                    const currentValue = evaluate(expression || display);
                    if (typeof currentValue === 'number') setMemory(mem => mem + currentValue);
                } catch {}
                setIsResult(true);
                break;
            case 'M-':
                try { 
                    const currentValue = evaluate(expression || display);
                    if (typeof currentValue === 'number') setMemory(mem => mem - currentValue);
                } catch {}
                setIsResult(true);
                break;
            case 'MC': setMemory(0); break;
            case 'MR': setExpression(prev => prev + memory.toString()); break;
            case '±':
                 setExpression(prev => {
                    if (isResult) {
                        try {
                           const currentVal = evaluate(prev);
                           if (typeof currentVal === 'number') {
                             return (-currentVal).toString();
                           }
                        } catch {
                           return prev;
                        }
                    }
                    const [lastNum, lastNumIndex] = getLastNumber(prev);
                    if (lastNum) {
                        const isNegativeInParens = lastNum.startsWith('(-') && lastNum.endsWith(')');
                        const newNum = isNegativeInParens ? lastNum.slice(2, -1) : `(-${lastNum})`;
                        return prev.slice(0, lastNumIndex) + newNum;
                    }
                    return prev;
                });
                break;
            case 'Deg': setIsDeg(true); break;
            case 'Rad': setIsDeg(false); break;
            case 'EXP': setExpression(prev => prev + 'e+'); break;
            case '2nd': setIsShifted(prev => !prev); break;
            case '(': case ')':
                setExpression(prev => prev + value);
                break;
            default:
                if (/[\d.]/.test(value)) {
                    if (isResult) {
                        setExpression(value);
                        setIsResult(false);
                    } else {
                        setExpression(prev => (prev === '0' && value !== '.') ? value : prev + value);
                    }
                }
        }
        if (value !== '2nd') setIsShifted(false);
    };
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
                return;
            }
            if ((event.metaKey || event.ctrlKey) && ['c', 'v', 'a', 'r', 'l'].includes(event.key.toLowerCase())) {
              return;
            }
            event.preventDefault();

            const keyMappings: { [key: string]: string | (() => void) } = {
                ...Object.fromEntries("0123456789.()".split('').map(k => [k, k])),
                '+': '+', '-': '−', '*': '×', '/': '÷',
                'Enter': () => calculate(), '=': () => calculate(),
                'Backspace': 'backspace', 'Escape': 'AC', 'c': 'AC',
                '^': 'xy', '%': '%',
                's': 'sin', 'p': 'π', 'e': 'e', 'l': 'log',
            };

            const action = keyMappings[event.key];
            if (action) {
                if (typeof action === 'function') {
                    action();
                } else {
                    handleButtonClick(action);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [calculate, expression]);
    
    useEffect(() => {
        if(isError) {
          setDisplay('Error');
          return;
        };
        if (expression === '') {
            setDisplay('0');
        } else {
            const formattedDisplay = expression
                .replace(/\*/g, '×')
                .replace(/\//g, '÷')
                .replace(/-/g, '−');
            setDisplay(formattedDisplay);
        }
    }, [expression, isError]);

  const getVariant = (btnValue: string): "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined => {
    if (['+', '−', '×', '÷', '='].includes(btnValue)) return 'default';
    if (btnValue === 'AC') return 'destructive';
    if (['2nd', 'Deg', 'Rad'].includes(btnValue)) return 'ghost';
    return 'secondary';
  }
  
  const buttons = [
    { primary: '2nd', shift: '2nd', label: <span key="2nd" className={cn(isShifted && "text-primary font-bold")}>2nd</span>},
    { primary: 'π', shift: 'e', label: <><span className="absolute top-1 left-1 text-xs opacity-50">e</span>π</> },
    { primary: 'AC', shift: 'AC', label: 'AC' },
    { primary: 'backspace', shift: 'backspace', label: <Trash2 key="backspace" className="h-5 w-5 mx-auto"/> },
    { primary: 'x2', shift: 'x3', label: <><span className="absolute top-1 left-1 text-xs opacity-50">x³</span>x²</> },
    { primary: '1/x', shift: '1/x', label: '1/x' },
    { primary: '(', shift: '(', label: '(' },
    { primary: ')', shift: ')', label: ')' },
    { primary: 'n!', shift: 'n!', label: 'n!' },
    { primary: '÷', shift: '÷', label: '÷' },
    { primary: 'xy', shift: 'y√x', label: <><span className="absolute top-1 left-1 text-xs opacity-50">y</span>√x</> },
    { primary: '7', shift: '7', label: '7' },
    { primary: '8', shift: '8', label: '8' },
    { primary: '9', shift: '9', label: '9' },
    { primary: '×', shift: '×', label: '×' },
    { primary: '10x', shift: 'ex', label: <><span className="absolute top-1 left-1 text-xs opacity-50">eˣ</span>10ˣ</> },
    { primary: '4', shift: '4', label: '4' },
    { primary: '5', shift: '5', label: '5' },
    { primary: '6', shift: '6', label: '6' },
    { primary: '−', shift: '−', label: '−' },
    { primary: 'log', shift: 'ln', label: <><span className="absolute top-1 left-1 text-xs opacity-50">ln</span>log</> },
    { primary: '1', shift: '1', label: '1' },
    { primary: '2', shift: '2', label: '2' },
    { primary: '3', shift: '3', label: '3' },
    { primary: '+', shift: '+', label: '+' },
    { primary: 'Rad', shift: 'Deg', label: <><span className={cn("absolute top-1 left-1 text-xs", !isDeg && "text-primary font-bold")}>Rad</span><span className={cn(isDeg && "text-primary font-bold")}>Deg</span></> },
    { primary: '±', shift: '±', label: '±' },
    { primary: '0', shift: '0', label: '0' },
    { primary: '.', shift: '.', label: '.' },
    { primary: '=', shift: '=', label: '=' },
  ];

  return (
    <div className="bg-slate-700 dark:bg-slate-800 border-4 border-slate-600 dark:border-slate-700 rounded-xl p-2 w-full mx-auto shadow-2xl max-w-sm">
      <div className="bg-emerald-100/10 dark:bg-black/20 rounded p-2 mb-2 border-2 border-slate-800 dark:border-black shadow-inner">
        <Input
            type="text"
            value={display}
            readOnly
            className="w-full h-12 text-2xl text-right mb-1 bg-transparent pr-4 text-emerald-300 border-transparent font-mono tracking-wider shadow-inner"
            aria-label="Calculator display"
        />
      </div>
       <div className="grid grid-cols-5 gap-1.5">
          {buttons.map(btn => {
            const value = isShifted ? btn.shift : btn.primary;
            return (
              <Button
                  key={btn.primary}
                  variant={getVariant(value)}
                  className={cn("h-12 text-sm p-1 shadow-md hover:shadow-sm active:shadow-inner active:translate-y-px relative", {
                    'bg-primary/80 text-primary-foreground': (value === 'Deg' && isDeg) || (value === 'Rad' && !isDeg) || (value === '2nd' && isShifted),
                    'col-span-2': value === '0',
                    'bg-yellow-500 hover:bg-yellow-600': value === '2nd',
                  })}
                  onClick={() => handleButtonClick(value)}
                  aria-label={ariaLabels[value] || value}
              >
                  {btn.label}
              </Button>
            )
          })}
        </div>
    </div>
  );
};

export default ScientificCalculator;
