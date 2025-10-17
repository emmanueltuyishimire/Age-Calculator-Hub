
"use client";

import * as React from "react";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import { evaluate, format as mathFormat } from 'mathjs';

// --- Button Layouts ---
const scientificButtonsConfig = [
    { label: 'sin', value: 'sin' }, { label: 'cos', value: 'cos' }, { label: 'tan', value: 'tan' }, { label: 'M+', value: 'M+' }, { label: 'MR', value: 'MR' },
    { label: <span key="asin">sin<sup>-1</sup></span>, value: 'sin-1' }, { label: <span key="acos">cos<sup>-1</sup></span>, value: 'cos-1' }, { label: <span key="atan">tan<sup>-1</sup></span>, value: 'tan-1' }, { label: 'M-', value: 'M-' }, { label: 'Ans', value: 'Ans' },
    { label: 'ln', value: 'ln' }, { label: 'log', value: 'log' }, { label: 'n!', value: 'n!' }, { label: <span key="ex">e<sup>x</sup></span>, value: 'ex' }, { label: 'y√x', value: 'y√x' },
    { label: '(', value: '(' }, { label: ')', value: ')' }, { label: <span key="reciprocal">1/x</span>, value: '1/x' }, { label: <span key="10x">10<sup>x</sup></span>, value: '10x' }, { label: 'e', value: 'e' },
    { label: 'Deg', value: 'Deg' }, { label: 'Rad', value: 'Rad' }, { label: 'π', value: 'π' }, { label: <span key="powy">x<sup>y</sup></span>, value: 'xy' }, { label: '√x', value: '√x' },
    { label: <span key="pow2">x<sup>2</sup></span>, value: 'x2' }, { label: '³√x', value: '³√x' }, { label: 'EXP', value: 'EXP' }, { label: '%', value: '%' }, { label: '±', value: '±' },
];

const basicButtonsConfig = [
    { label: 'AC', value: 'AC' }, { label: <Trash2 key="backspace" className="h-5 w-5 mx-auto"/>, value: 'backspace' }, { label: '÷', value: '÷' },
    { label: '7', value: '7' }, { label: '8', value: '8' }, { label: '9', value: '9' }, { label: '×', value: '×' },
    { label: '4', value: '4' }, { label: '5', value: '5' }, { label: '6', value: '6' }, { label: '−', value: '−' },
    { label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }, { label: '+', value: '+' },
    { label: '0', value: '0', style: "col-span-2" }, { label: '.', value: '.' }, { label: '=', value: '=', style: "row-span-2 h-auto" },
];


const ariaLabels: Record<string, string> = {
    'sin': 'Sine', 'cos': 'Cosine', 'tan': 'Tangent', 'xy': 'Power', '√x': 'Square root', '³√x': 'Cube root',
    'sin-1': 'Inverse sine', 'cos-1': 'Inverse cosine', 'tan-1': 'Inverse tangent', 'x2': 'Square',
    'ln': 'Natural logarithm', 'log': 'Logarithm base 10', 'n!': 'Factorial', 'ex': 'e to the power of x', 'y√x': 'Nth root',
    '(': 'Open parenthesis', ')': 'Close parenthesis', '1/x': 'Reciprocal', '10x': '10 to the power of x', 'e': 'Euler\'s number',
    'Deg': 'Degrees mode', 'Rad': 'Radians mode', 'π': 'Pi', 'EXP': 'Exponent', '%': 'Percentage',
    'AC': 'All Clear', 'backspace': 'Backspace', 'Ans': 'Last Answer', 'M+': 'Memory Plus', 'MR': 'Memory Recall', 'M-': 'Memory Minus',
    '÷': 'Divide', '×': 'Multiply', '−': 'Subtract', '+': 'Add', '=': 'Equals', '±': 'Plus/Minus',
    '.': 'Decimal point'
};

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
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

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
             setExpression('');
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
            case 'sin': case 'cos': case 'tan': case 'log': case 'ln':
                setExpression(prev => prev + value + '(');
                break;
            case '√x': setExpression(prev => prev + 'sqrt('); break;
            case '³√x': setExpression(prev => prev + 'cbrt('); break;
            case 'sin-1': setExpression(prev => prev + 'asin('); break;
            case 'cos-1': setExpression(prev => prev + 'acos('); break;
            case 'atan-1': setExpression(prev => prev + 'atan('); break;
            case '1/x':
                 setExpression(prev => `(1/(${prev || '1'}))`);
                break;
            case 'n!': 
                 setExpression(prev => `factorial(${prev || '0'})`);
                break;
            case 'π': setExpression(prev => prev + 'pi'); break;
            case 'e': setExpression(prev => prev + 'e'); break;
            case 'xy': handleOperator('^'); break;
            case 'x2': 
                 setExpression(prev => {
                    const [lastNum, lastNumIndex] = getLastNumber(prev);
                    if (lastNum) {
                        return prev.slice(0, lastNumIndex) + `(${lastNum}^2)`;
                    }
                    return `((${prev || '0'})^2)`;
                });
                break;
            case 'ex': 
                 setExpression(prev => {
                    const [lastNum, lastNumIndex] = getLastNumber(prev);
                    if (lastNum) {
                        return prev.slice(0, lastNumIndex) + `(e^${lastNum})`;
                    }
                    return `(e^(${prev || '0'}))`;
                });
                break;
            case '10x': 
                setExpression(prev => {
                    const [lastNum, lastNumIndex] = getLastNumber(prev);
                    if (lastNum) {
                        return prev.slice(0, lastNumIndex) + `(10^${lastNum})`;
                    }
                    return `(10^(${prev || '0'}))`;
                });
                break;
            case 'y√x':
                setExpression(prev => {
                    const [lastNum, lastNumIndex] = getLastNumber(prev);
                    if (lastNum) {
                        return prev.slice(0, lastNumIndex) + `nthRoot(${lastNum}, `;
                    }
                    return `nthRoot(${prev || '0'}, `;
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
            case '%': setExpression(prev => prev + '/100'); break;
            case '(':
            case ')':
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
    if (['M+', 'M-', 'MR'].includes(btnValue)) return 'outline';
    if (['Deg', 'Rad'].includes(btnValue)) return 'ghost';
    return 'secondary';
  }
  
  const renderButton = (config: { label: React.ReactNode, value: string, style?: string }) => (
      <Button
          key={config.value}
          variant={getVariant(config.value)}
          className={cn(
            "h-8 text-xs p-1 shadow-md hover:shadow-sm active:shadow-inner active:translate-y-px", 
            config.style, {
              'bg-primary/80 text-primary-foreground': (config.value === 'Deg' && isDeg) || (config.value === 'Rad' && !isDeg),
          })}
          onClick={() => handleButtonClick(config.value)}
          aria-label={ariaLabels[config.value] || config.value}
      >
          {config.label}
      </Button>
  );

  return (
    <div className="bg-slate-700 dark:bg-slate-800 border-4 border-slate-600 dark:border-slate-700 rounded-xl p-2 w-full mx-auto shadow-2xl max-w-sm">
      <div className="bg-emerald-100/10 dark:bg-black/20 rounded p-2 mb-2 border-2 border-slate-800 dark:border-black shadow-inner">
        <div className="text-right text-emerald-300/80 font-mono text-xs pr-2 h-5">
            {currentTime}
        </div>
        <Input
            type="text"
            value={display}
            readOnly
            className="w-full h-10 text-xl text-right mb-1 bg-transparent pr-4 text-emerald-300 border-transparent font-mono tracking-wider shadow-inner"
            aria-label="Calculator display"
        />
      </div>
       <div className="space-y-2">
        <div className="grid grid-cols-5 gap-1.5">
          {scientificButtonsConfig.map(btn => renderButton(btn))}
        </div>
         <div className="grid grid-cols-4 grid-rows-5 gap-1.5">
          {basicButtonsConfig.map(btn => renderButton(btn))}
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculator;

    