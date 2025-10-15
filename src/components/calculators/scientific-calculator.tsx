
"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import { evaluate } from 'mathjs';

const scientificButtons = [
  ['sin', 'cos', 'tan'],
  [<span key="sin-1">sin<sup>-1</sup></span>, <span key="cos-1">cos<sup>-1</sup></span>, <span key="tan-1">tan<sup>-1</sup></span>],
  [<span key="x^y">x<sup>y</sup></span>, <span key="x^3">x<sup>3</sup></span>, <span key="x^2">x<sup>2</sup></span>],
  ['ln', 'log', '√'],
  ['(', ')', '%', 'n!'],
  ['π', 'e', '1/x', '±'],
];

const basicButtons = [
    'AC', <Trash2 key="back" />, '÷',
    '7', '8', '9', '×',
    '4', '5', '6', '−',
    '1', '2', '3', '+',
    '0', '.', '=',
];

const getVariant = (btn: any) => {
  let btnStr = '';
  if (typeof btn === 'string') {
    btnStr = btn;
  } else if (React.isValidElement(btn) && btn.key) {
      if (btn.key === 'back') {
        btnStr = 'Backspace';
      } else {
        btnStr = btn.key;
      }
  }

  if (['AC'].includes(btnStr) || btnStr === 'Backspace') return 'destructive';
  if (['+', '−', '×', '÷', '='].includes(btnStr)) return 'secondary';
  
  return 'outline';
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
        } else if (React.isValidElement(btn)) {
             if (btn.key) {
                value = btn.key;
             } else if (btn.type === Trash2) {
                value = 'Backspace';
             }
        }
        
        if (display === 'Error') {
          setExpression('');
        }

        if (isResult && !['+', '−', '×', '÷', '^', '%'].includes(value) && value !== '=') {
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
            case 'sin': case 'cos': case 'tan': case 'log': case 'ln': case '√':
                setExpression(prev => prev + value + '(');
                break;
            case 'sin-1': setExpression(prev => prev + 'asin('); break;
            case 'cos-1': setExpression(prev => prev + 'acos('); break;
            case 'tan-1': setExpression(prev => prev + 'atan('); break;
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
             case 'x^y':
                setExpression(prev => prev + '^');
                break;
            case 'x^2':
                setExpression(prev => `(${prev || '0'})^2`);
                break;
            case 'x^3':
                setExpression(prev => `(${prev || '0'})^3`);
                break;
            case '10^x':
                 setExpression(prev => `10^(${prev || '0'})`);
                break;
            case 'e^x':
                 setExpression(prev => `exp(${prev || '0'})`);
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
            } else if (key === '^') {
                event.preventDefault();
                handleButtonClick('x^y');
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

  return (
    <div className="bg-card border rounded-lg p-2 w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto shadow-lg">
      <Input
        type="text"
        value={display}
        readOnly
        className="w-full h-16 text-3xl text-right mb-2 bg-muted"
        aria-label="Calculator display"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        {/* Scientific Functions */}
        <div className="grid grid-cols-4 gap-1">
          <Button variant={isDeg ? "secondary" : "outline"} className="h-10 text-xs p-1" onClick={() => handleButtonClick('Deg')}>Deg</Button>
          <Button variant={!isDeg ? "secondary" : "outline"} className="h-10 text-xs p-1" onClick={() => handleButtonClick('Rad')}>Rad</Button>
          <div className="col-span-2"></div>
           {scientificButtons.flat().map((btn, index) => {
             let key: string | number;
             if (typeof btn === 'string') { key = btn; } 
             else if (React.isValidElement(btn)) { key = (btn.key as string) || index; } 
             else { key = index; }
             return (
              <Button key={`sci-${key}-${index}`} variant={getVariant(btn)} className="h-10 text-xs p-1" onClick={() => handleButtonClick(btn)}>
                {btn}
              </Button>
            );
          })}
        </div>
        {/* Basic Functions */}
        <div className="grid grid-cols-4 gap-1">
            {basicButtons.map((btn, index) => {
                let key: string | number;
                if (typeof btn === 'string') { key = btn; } 
                else if (React.isValidElement(btn)) { key = (btn.key as string) || index; } 
                else { key = index; }
                const wideButtons = ['0', '='];
                const isWide = wideButtons.includes(btn as string);
                
                return(
                    <Button key={`basic-${key}-${index}`} variant={getVariant(btn)} className={cn("h-10 text-lg", isWide && btn === '0' ? 'col-span-2' : 'col-span-1')} onClick={() => handleButtonClick(btn)}>
                        {btn}
                    </Button>
                )
            })}
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculator;

    