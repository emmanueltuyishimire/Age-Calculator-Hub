
"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import { evaluate } from 'mathjs';

const basicButtons = [
  ['AC', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '=', <Trash2 key="back" />],
];

const scientificButtons = [
  ['sin', 'cos', 'tan', 'Deg', 'Rad'],
  ['asin', 'acos', 'atan', 'π', 'e'],
  ['(', ')', '^', '√', 'ln'],
  ['Ans', 'exp', 'log', 'n!', '1/x'],
  ['M+', 'M-', 'MR', 'RND', 'E'],
];

const getVariant = (btn: any) => {
  const btnStr = typeof btn === 'string' ? btn : 'Backspace';

  if (btnStr === 'Backspace' || btnStr === 'AC') return 'destructive';
  if (['+', '−', '×', '÷', '='].includes(btnStr)) return 'secondary';
  if (typeof btn !== 'string') return 'secondary';

  const scientificOps = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'π', 'e', '(', ')', '^', '√', 'ln', 'Ans', 'exp', 'log', 'n!', '1/x', 'M+', 'M-', 'MR', 'RND', 'E', 'Deg', 'Rad'];
  if (scientificOps.includes(btnStr)) return 'outline';

  return 'default';
};


const factorial = (n: number): number => {
    if (n < 0 || n !== Math.floor(n)) return NaN;
    if (n > 170) return Infinity;
    if (n === 0) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

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
                .replace(/√\(/g, 'sqrt(') // Handle √ as a function
                .replace(/(\d+)!/g, 'factorial($1)');
            
            // Handle implicit multiplication for parentheses, e.g. 5(3) -> 5*3
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
                factorial: factorial
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
        } else if (React.isValidElement(btn) && btn.key) {
            value = 'Backspace';
        }
        
        if (display === 'Error') {
          setExpression('');
        }

        if (isResult && !['+', '−', '×', '÷', '^', '%', '='].includes(value)) {
            setExpression('');
            setIsResult(false);
        } else {
            setIsResult(false);
        }

        switch (value) {
            case 'AC':
                setExpression('');
                setMemory(0);
                break;
            case 'Backspace':
                setExpression(prev => prev.slice(0, -1));
                break;
            case '=':
                calculate();
                break;
            case 'Deg':
                setIsDeg(true);
                break;
            case 'Rad':
                setIsDeg(false);
                break;
            case 'sin': case 'cos': case 'tan': case 'asin': case 'acos': case 'atan': case 'log': case 'ln': case '√': case 'exp':
                setExpression(prev => prev + value + '(');
                break;
            case '1/x':
                setExpression(prev => `1/(${prev || '0'})`);
                break;
            case 'n!':
                setExpression(prev => `(${prev || '0'})!`);
                break;
            case 'π':
                setExpression(prev => prev + 'pi');
                break;
            case 'e':
                setExpression(prev => prev + 'e');
                break;
            case 'Ans':
                setExpression(prev => prev + ans.toString());
                break;
            case 'M+':
                try { 
                    const currentValue = evaluate(expression || display);
                    setMemory(mem => mem + currentValue);
                } catch { setDisplay('Error'); setExpression(''); }
                break;
            case 'M-':
                try { 
                    const currentValue = evaluate(expression || display);
                    setMemory(mem => mem - currentValue);
                } catch { setDisplay('Error'); setExpression(''); }
                break;
            case 'MR':
                setExpression(prev => prev + memory.toString());
                break;
            case '±':
                setExpression(prev => {
                    if (prev.startsWith('-(') && prev.endsWith(')')) {
                        return prev.substring(2, prev.length -1);
                    }
                    return `-(${prev})`
                });
                break;
            case 'RND':
                setExpression(prev => prev + Math.random().toString());
                break;
            case 'E':
                setExpression(prev => prev + 'e');
                break;
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
            const { key } = event;
             if (/[\d.]/.test(key) || ['(', ')'].includes(key)) {
                event.preventDefault();
                handleButtonClick(key);
            } else if (key === '+') {
                event.preventDefault();
                handleButtonClick('+');
            } else if (key === '-') {
                event.preventDefault();
                handleButtonClick('−');
            } else if (key === '*') {
                event.preventDefault();
                handleButtonClick('×');
            } else if (key === '/') {
                event.preventDefault();
                handleButtonClick('÷');
            } else if (key === 'Enter' || key === '=') {
                event.preventDefault();
                calculate();
            } else if (key === 'Backspace') {
                event.preventDefault();
                handleButtonClick('Backspace');
            } else if (key === 'Escape') {
                event.preventDefault();
                handleButtonClick('AC');
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
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

    const renderButtonWithIndicator = (btn: string, isActive: boolean) => (
      <Button
          key={`sci-${btn}`}
          variant={getVariant(btn)}
          className={cn("h-10 sm:h-12 text-xs sm:text-sm p-1 relative")}
          onClick={() => handleButtonClick(btn)}
      >
          {isActive && (
              <div className="absolute top-1 right-1 h-3 w-3 rounded-full border border-blue-500 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
              </div>
          )}
          {btn}
      </Button>
  );


  return (
    <div className="bg-card border rounded-lg p-2 sm:p-3 w-full max-w-2xl shadow-lg">
      <Input
        type="text"
        value={display}
        readOnly
        className="w-full h-16 text-3xl sm:text-4xl text-right mb-2 sm:mb-3 bg-muted"
        aria-label="Calculator display"
      />
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {/* Scientific Calculator Part */}
        <div className="grid grid-cols-5 gap-1 sm:gap-2">
            {scientificButtons.flat().map((btn) => {
                if (btn === 'Deg') {
                    return renderButtonWithIndicator(btn, isDeg);
                }
                if (btn === 'Rad') {
                    return renderButtonWithIndicator(btn, !isDeg);
                }
                return (
                    <Button
                        key={`sci-${btn}`}
                        variant={getVariant(btn)}
                        className={cn("h-10 sm:h-12 text-xs sm:text-sm p-1")}
                        onClick={() => handleButtonClick(btn)}
                    >
                        {btn}
                    </Button>
                )
            })}
        </div>
        {/* Basic Calculator Part */}
        <div className="grid grid-cols-4 gap-1 sm:gap-2">
            {basicButtons.flat().map((btn, i) => (
                <Button
                    key={`basic-${i}`}
                    variant={getVariant(btn)}
                    className="h-10 sm:h-12 text-md sm:text-xl"
                    onClick={() => handleButtonClick(btn)}
                >
                    {btn}
                </Button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculator;
