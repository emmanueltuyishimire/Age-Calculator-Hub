
"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import { evaluate, format as mathFormat } from 'mathjs';

const scientificButtonsFirstPanel: (string | React.ReactNode)[][] = [
    ['sin', 'cos', 'tan', <span key="powy">x<sup>y</sup></span>, '√x'],
    [<span key="asin">sin<sup>-1</sup></span>, <span key="acos">cos<sup>-1</sup></span>, <span key="atan">tan<sup>-1</sup></span>, <span key="pow2">x<sup>2</sup></span>, '³√x'],
    ['ln', 'log', 'n!', <span key="ex">e<sup>x</sup></span>, 'y√x'],
    ['(', ')', <span key="reciprocal">1/x</span>, <span key="10x">10<sup>x</sup></span>, 'e'],
    ['Deg', 'Rad', 'π', 'EXP', '%']
];

const basicButtonsSecondPanel: (string | React.ReactNode)[][] = [
    ['AC', <Trash2 key="backspace" className="h-5 w-5 mx-auto"/>, 'Ans', 'M+', 'MR'],
    ['7', '8', '9', '÷', 'M-'],
    ['4', '5', '6', '−'],
    ['1', '2', '3', '×'],
    ['0', '.', '±', '+']
];

const memoryButtons = ['M+', 'M-', 'MR'];

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
    const [isError, setIsError] = useState(false);
    const [isResult, setIsResult] = useState(false);
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const calculate = useCallback(() => {
        if (!expression) return;
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
            if (typeof result === 'undefined' || result === null) {
              throw new Error('Invalid expression');
            }
            const resultString = mathFormat(result, { precision: 10 });
            setAns(result);
            setDisplay(resultString);
            setExpression(resultString);
            setIsResult(true);

        } catch (error) {
            setDisplay('Error');
            setIsError(true);
            setExpression('');
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
        
        if (isError) {
          if (value === 'AC') {
            setExpression('');
            setDisplay('0');
            setIsError(false);
          }
          return;
        }

        if (isResult && !['+', '−', '×', '÷', '^', '%', '=', 'M+', 'M-'].includes(value)) {
            setExpression('');
            setIsResult(false);
        } else {
            setIsResult(false);
        }
        
        const lastChar = expression.slice(-1);
        const isOperator = ['+', '−', '×', '÷'].includes(lastChar);
        
        const handleOperator = (op: string) => {
            if (isOperator) {
                setExpression(prev => prev.slice(0, -1) + op);
            } else if (expression !== '' && expression !== '(') {
                setExpression(prev => prev + op);
            }
        };

        const getLastNumber = (expr: string): string => {
            const match = expr.match(/(-?\d+\.?\d*e[+-]?\d+|-?\d+\.?\d*|pi|e)$/i);
            return match ? match[0] : '';
        };

        switch (value) {
            case 'AC': setExpression(''); setMemory(0); setAns(0); break;
            case 'backspace': setExpression(prev => prev.slice(0, -1)); break;
            case '=': calculate(); break;
            case '+': handleOperator('+'); break;
            case '−': handleOperator('−'); break;
            case '×': handleOperator('×'); break;
            case '÷': handleOperator('÷'); break;
            case 'sin': case 'cos': case 'tan': case 'log': case 'ln': case 'asin': case 'acos': case 'atan':
                setExpression(prev => prev + value + '(');
                break;
            case '√x': setExpression(prev => prev + 'sqrt('); break;
            case '³√x': setExpression(prev => prev + 'cbrt('); break;
            case 'sin-1': setExpression(prev => prev + 'asin('); break;
            case 'cos-1': setExpression(prev => prev + 'acos('); break;
            case 'tan-1': setExpression(prev => prev + 'atan('); break;
            case '1/x': 
                 setExpression(prev => {
                    const lastNum = getLastNumber(prev);
                    if (lastNum) {
                        return prev.slice(0, -lastNum.length) + `(1/${lastNum})`;
                    }
                    return `(1/${prev || '1'})`;
                });
                break;
            case 'n!': setExpression(prev => `factorial(${prev || '0'})`); break;
            case 'π': setExpression(prev => prev + 'pi'); break;
            case 'e': setExpression(prev => prev + 'e'); break;
            case 'xy': setExpression(prev => prev + '^'); break;
            case 'x2': setExpression(prev => `(${prev || '0'})^2`); break;
            case 'x3': setExpression(prev => `(${prev || '0'})^3`); break;
            case 'ex': setExpression(prev => `e^(${prev || '0'})`); break;
            case '10x': setExpression(prev => `10^(${prev || '0'})`); break;
            case 'y√x': setExpression(prev => prev + ' nthRoot('); break;
            case 'Ans': setExpression(prev => prev + ans.toString()); break;
            case 'M+':
                try { 
                    const currentValStr = getLastNumber(expression) || display;
                    const currentValue = evaluate(currentValStr);
                    if (typeof currentValue === 'number') {
                        setMemory(mem => mem + currentValue);
                    }
                } catch {}
                setIsResult(true);
                break;
            case 'M-':
                try { 
                    const currentValStr = getLastNumber(expression) || display;
                    const currentValue = evaluate(currentValStr);
                    if (typeof currentValue === 'number') {
                        setMemory(mem => mem - currentValue);
                    }
                } catch {}
                setIsResult(true);
                break;
            case 'MR': setExpression(prev => prev + memory.toString()); break;
            case '±':
                setExpression(prev => {
                    const lastNum = getLastNumber(prev);
                    if (lastNum) {
                         const newNum = lastNum.startsWith('(-') ? lastNum.slice(2, -1) : `(-${lastNum})`;
                         return prev.slice(0, -lastNum.length) + newNum;
                    }
                    return prev;
                });
                break;
            case 'Deg': setIsDeg(true); break;
            case 'Rad': setIsDeg(false); break;
            case 'EXP': setExpression(prev => prev + 'e+'); break;
            case 'RND': setExpression(prev => prev + Math.random().toPrecision(8)); break;
            case '%': setExpression(prev => prev + '/100'); break;
            case '(':
            case ')':
                setExpression(prev => prev + value);
                break;
            default:
                if (/[\d.]/.test(value)) {
                    setExpression(prev => {
                        if (isResult) return value;
                        if (prev === '0' && value !== '.') return value;
                        return prev + value;
                    });
                }
        }
    }, [isResult, calculate, expression, display, ans, memory, isError]);
    
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
    }, [handleButtonClick, calculate]);
    
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

  const getVariant = (btn: any): "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined => {
    let value = '';
     if (typeof btn === 'string') {
        value = btn;
    } else if (React.isValidElement(btn)) {
        if (btn.type === Trash2) return 'secondary';
        if (btn.props?.children) value = React.Children.toArray(btn.props.children).join('');
    }
    
    if (['+', '−', '×', '÷', '='].includes(value)) return 'default';
    if (value === 'AC') return 'destructive';
    if (memoryButtons.includes(value)) return 'outline';
    if (['Deg', 'Rad'].includes(value)) return 'ghost';

    return 'secondary';
  }
  
  const renderButton = (btn: string | React.ReactNode, index: number, style?: string) => {
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
            className={cn("h-10 text-xs p-1 text-base shadow-md hover:shadow-sm active:shadow-inner active:translate-y-px", style, {
                'bg-primary/80 text-primary-foreground': (value === 'Deg' && isDeg) || (value === 'Rad' && !isDeg),
                'bg-destructive/80 hover:bg-destructive/90 text-white': value === 'AC'
            })}
            onClick={() => handleButtonClick(btn)}
            aria-label={value}
        >
            {btn}
        </Button>
      )
  }

  return (
    <div className="bg-slate-700 dark:bg-slate-800 border-4 border-slate-600 dark:border-slate-700 rounded-xl p-2 sm:p-4 w-full max-w-[700px] mx-auto shadow-2xl">
      <div className="bg-slate-500/20 dark:bg-black/20 rounded p-2 mb-4 border-2 border-slate-800 dark:border-black shadow-inner">
        <div className="text-right text-emerald-300/80 font-mono text-xs pr-2 h-5">
            {currentTime}
        </div>
        <Input
            type="text"
            value={display}
            readOnly
            className="w-full h-20 text-4xl text-right mb-1 bg-transparent pr-4 text-emerald-300 border-transparent font-mono tracking-wider shadow-inner"
            aria-label="Calculator display"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Scientific Panel */}
        <div className="grid grid-cols-5 gap-2 p-2 rounded-lg bg-slate-600/20 dark:bg-black">
            {scientificButtonsFirstPanel.flat().map((btn, i) => renderButton(btn, i))}
        </div>

        {/* Basic Panel */}
        <div className="grid grid-cols-5 gap-2 p-2 rounded-lg bg-slate-600/20 dark:bg-black">
             {basicButtonsSecondPanel.slice(0,1).flat().map((btn, i) => renderButton(btn, i + 25))}
             {basicButtonsSecondPanel.slice(1,2).flat().map((btn, i) => renderButton(btn, i + 30))}
             {renderButton('=', 34, 'row-span-3 h-auto col-start-5')}
             {basicButtonsSecondPanel.slice(2,3).flat().map((btn, i) => renderButton(btn, i + 35))}
             {basicButtonsSecondPanel.slice(3,4).flat().map((btn, i) => renderButton(btn, i + 39))}
             {basicButtonsSecondPanel.slice(4).flat().map((btn, i) => renderButton(btn, i + 42))}
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculator;
