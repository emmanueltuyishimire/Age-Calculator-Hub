
"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import { evaluate } from 'mathjs';

const buttonLayout = [
  ['sin', 'cos', 'tan', 'Deg', 'Rad'],
  ['asin', 'acos', 'atan', 'π', 'e'],
  ['^', 'x³', 'x²', 'exp', '10^'],
  ['y√x', '∛', '√', 'ln', 'log'],
  ['(', ')', '1/x', '%', 'n!'],
  ['7', '8', '9', '÷', <Trash2 key="back" />],
  ['4', '5', '6', '×', 'Ans'],
  ['1', '2', '3', '−', 'M+'],
  ['0', '.', 'E', '+', 'M-'],
  ['±', 'RND', 'AC', '=', 'MR'],
];

const getVariant = (btn: any) => {
  if (typeof btn !== 'string') return 'destructive';
  if (['+', '−', '×', '÷', '='].includes(btn)) return 'secondary';
  if (['AC'].includes(btn)) return 'destructive';
  if (['Deg', 'Rad', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'π', 'e', '^', 'x³', 'x²', 'exp', '10^', 'y√x', '∛', '√', 'ln', 'log', '(', ')', '1/x', '%', 'n!', 'Ans', 'M+', 'M-', 'MR', 'E', '±', 'RND'].includes(btn)) return 'outline';
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
                .replace(/√/g, 'sqrt')
                .replace(/∛/g, 'cbrt')
                .replace(/(\d+)!/g, 'factorial($1)');
            
            if (isDeg) {
                finalExpression = finalExpression.replace(/(sin|cos|tan|asin|acos|atan)\(/g, (match, p1) => `${p1}(`);
            }
            
            const scope = {
                sin: (x:number) => isDeg ? Math.sin(x * Math.PI / 180) : Math.sin(x),
                cos: (x:number) => isDeg ? Math.cos(x * Math.PI / 180) : Math.cos(x),
                tan: (x:number) => isDeg ? Math.tan(x * Math.PI / 180) : Math.tan(x),
                asin: (x:number) => isDeg ? Math.asin(x) * 180 / Math.PI : Math.asin(x),
                acos: (x:number) => isDeg ? Math.acos(x) * 180 / Math.PI : Math.acos(x),
                atan: (x:number) => isDeg ? Math.atan(x) * 180 / Math.PI : Math.atan(x),
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

        if (isResult && !['+', '−', '×', '÷', '^', 'y√x', '%', '='].includes(value)) {
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
            case 'sin': case 'cos': case 'tan': case 'asin': case 'acos': case 'atan': case 'log': case 'ln': case '√': case '∛': case 'exp':
                setExpression(prev => prev + value + '(');
                break;
            case 'x²':
                setExpression(prev => `(${prev})^2`);
                break;
            case 'x³':
                setExpression(prev => `(${prev})^3`);
                break;
            case '10^':
                setExpression(prev => `10^(${prev})`);
                break;
            case '1/x':
                setExpression(prev => `1/(${prev})`);
                break;
            case 'n!':
                try {
                    const num = evaluate(expression);
                    setExpression(factorial(num).toString());
                } catch { setDisplay('Error'); setExpression(''); }
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
                try { setMemory(mem => mem + evaluate(expression || display)); } catch { setDisplay('Error'); }
                break;
            case 'M-':
                try { setMemory(mem => mem - evaluate(expression || display)); } catch { setDisplay('Error'); }
                break;
            case 'MR':
                setExpression(prev => prev + memory.toString());
                break;
            case '±':
                setExpression(prev => prev.startsWith('-') ? prev.substring(1) : '-' + prev);
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
            event.preventDefault();
            const { key } = event;
            if (/\d/.test(key)) {
                handleButtonClick(key);
            } else if (key === '.') {
                handleButtonClick('.');
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
                handleButtonClick('Backspace');
            } else if (key === 'Escape') {
                handleButtonClick('AC');
            } else if (key === '(') {
                handleButtonClick('(');
            } else if (key === ')') {
                handleButtonClick(')');
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

  return (
    <div className="bg-card border rounded-lg p-2 sm:p-4 w-full max-w-sm sm:max-w-md shadow-lg">
      <Input
        type="text"
        value={display}
        readOnly
        className="w-full h-16 text-3xl sm:text-4xl text-right mb-4 bg-muted"
        aria-label="Calculator display"
      />
      <div className="grid grid-cols-5 gap-1 sm:gap-2">
        {buttonLayout.flat().map((btn, i) => {
            const btnStr = React.isValidElement(btn) ? 'Backspace' : btn;
            const isDegRad = btnStr === 'Deg' || btnStr === 'Rad';
          return (
            <Button
              key={i}
              variant={getVariant(btn)}
              className={cn("h-10 sm:h-12 text-sm sm:text-lg", {
                  'bg-primary/80 text-primary-foreground': (isDeg && btnStr === 'Deg') || (!isDeg && btnStr === 'Rad')
              })}
              onClick={() => handleButtonClick(btn)}
            >
              {btn}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default ScientificCalculator;
