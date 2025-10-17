
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

     const ariaLabels: { [key: string]: string } = {
        'AC': 'All Clear',
        'Back': 'Backspace',
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
        '√x': 'Square root',
        '³√x': 'Cube root',
        '1/x': 'Reciprocal',
        'n!': 'Factorial',
        'ex': 'e to the power of x',
        '10x': '10 to the power of x',
        'Rad': 'Radians',
        'Deg': 'Degrees',
        'EXP': 'Exponent',
        '(': 'Open parenthesis',
        ')': 'Close parenthesis',
        'Ans': 'Answer',
        'MC': 'Memory Clear',
        'MR': 'Memory Recall',
        'M+': 'Memory Add',
        'M-': 'Memory Subtract',
        'RND': 'Random Number'
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
             // Clear expression if starting a new calculation, unless using an operator that acts on the result
             if(!['1/x', 'x2', 'x3', 'ex', '10x', 'n!'].includes(value)){
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
            case 'Back': setExpression(prev => prev.slice(0, -1)); break;
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
            case 'tan-1': setExpression(prev => prev + 'atan('); break;
            case '1/x': 
                setExpression(prev => `(1/(${prev || '1'}))`);
                calculate();
                break;
            case 'n!': 
                setExpression(prev => `factorial(${prev || '0'})`); 
                calculate();
                break;
            case 'π': setExpression(prev => prev + 'pi'); break;
            case 'e': setExpression(prev => prev + 'e'); break;
            case 'xy': handleOperator('^'); break;
            case 'x2': 
                 setExpression(prev => `((${prev || '0'})^2)`);
                 calculate();
                break;
            case 'x3': 
                 setExpression(prev => `((${prev || '0'})^3)`);
                 calculate();
                break;
            case 'ex': 
                setExpression(prev => `(e^(${prev || '0'}))`);
                calculate();
                break;
            case '10x': 
                setExpression(prev => `(10^(${prev || '0'}))`);
                calculate();
                break;
            case 'y√x':
                setExpression(prev => {
                    const [lastNum] = getLastNumber(prev);
                    const base = prev.substring(0, prev.length - lastNum.length);
                    return `${base}nthRoot(${lastNum}, `;
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
            case '%':
                 setExpression(prev => {
                    const [lastNum, lastNumIndex] = getLastNumber(prev);
                    if (lastNum) {
                        const base = prev.substring(0, lastNumIndex);
                        return `${base}(${lastNum}/100)`;
                    }
                    return prev;
                });
                break;
            case 'RND':
                const randomNum = Math.random();
                if(isResult || expression === '0' || expression === '') {
                    setExpression(randomNum.toString());
                    setIsResult(false);
                } else {
                    setExpression(prev => prev + randomNum.toString());
                }
                break;
            case '±':
                if (isResult) {
                    setExpression(prev => (-parseFloat(prev)).toString());
                } else {
                    setExpression(prev => {
                        const [lastNum, lastNumIndex] = getLastNumber(prev);
                        if (lastNum) {
                            const isNegativeInParens = lastNum.startsWith('(-') && lastNum.endsWith(')');
                            const newNum = isNegativeInParens ? lastNum.slice(2, -1) : `(-${lastNum})`;
                            return prev.slice(0, lastNumIndex) + newNum;
                        }
                        return prev;
                    });
                }
                break;
            case 'DegRad': setIsDeg(prev => !prev); break;
            case 'EXP': setExpression(prev => prev + 'e+'); break;
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
                'Backspace': 'Back', 'Escape': 'AC', 'c': 'AC',
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
    return 'secondary';
  }
  
  const buttons = [
    'sin', 'cos', 'tan', 'DegRad', 
    'sin-1', 'cos-1', 'tan-1', 'π', 'e', 
    'xy', 'x3', 'x2', 'ex', '10x', 
    'y√x', '³√x', '√x', 'ln', 'log', 
    '(', ')', '1/x', '%', 'n!', 
    '7', '8', '9', '+', 'Back', 
    '4', '5', '6', '−', 'Ans', 
    '1', '2', '3', '×', 'M+', 
    '0', '.', 'EXP', '÷', 'M-', 
    '±', 'RND', 'AC', '=', 'MR',
  ];

  const getButtonLabel = (key: string) => {
    switch (key) {
        case 'Back': return <Trash2 className="h-5 w-5 mx-auto"/>;
        case 'xy': return <>x<sup>y</sup></>;
        case 'x2': return <>x<sup>2</sup></>;
        case 'x3': return <>x<sup>3</sup></>;
        case 'ex': return <>e<sup>x</sup></>;
        case '10x': return <>10<sup>x</sup></>;
        case 'y√x': return <>{'ʸ√x'}</>;
        case '³√x': return <>{'³√x'}</>;
        case '√x': return <>{'√x'}</>;
        case 'DegRad': return <span className="text-xs">{isDeg ? 'Deg' : 'Rad'}</span>;
        default: return key;
    }
  }

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
          {buttons.map(btn => (
              <Button
                  key={btn}
                  variant={getVariant(btn)}
                  className={cn("h-10 text-xs p-1 shadow-md hover:shadow-sm active:shadow-inner active:translate-y-px relative", {
                    'col-span-2': btn === '=',
                  })}
                  onClick={() => handleButtonClick(btn)}
                  aria-label={ariaLabels[btn] || btn}
              >
                  {getButtonLabel(btn)}
              </Button>
            )
          )}
        </div>
    </div>
  );
};

export default ScientificCalculator;
