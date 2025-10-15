
"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Trash2, Circle } from 'lucide-react';
import { evaluate } from 'mathjs';

const scientificButtons = [
    [<span key="sin">sin</span>, <span key="cos">cos</span>, <span key="tan">tan</span>],
    [<span key="sin-1">sin<sup>-1</sup></span>, <span key="cos-1">cos<sup>-1</sup></span>, <span key="tan-1">tan<sup>-1</sup></span>],
    [<span key="x^y">x<sup>y</sup></span>, <span key="x^3">x<sup>3</sup></span>, <span key="x^2">x<sup>2</sup></span>],
    [<span key="y√x"><sup>y</sup>√x</span>, <span key="3√x"><sup>3</sup>√x</span>, '√'],
    ['ln', 'log', <span key="1/x">1/x</span>],
    ['(', ')', '%', 'n!'],
];

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

    const renderButtonWithIndicator = (label: 'Deg' | 'Rad') => (
        <Button
            variant="outline"
            className="h-10 text-xs p-1 relative"
            onClick={() => setIsDeg(label === 'Deg')}
        >
            {isDeg === (label === 'Deg') && (
                 <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-blue-500 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                </div>
            )}
            {label}
        </Button>
    );

    const calculate = useCallback(() => {
        try {
            let finalExpression = expression
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/−/g, '-')
                .replace(/√\(/g, 'sqrt(')
                .replace(/(\d+)!/g, 'factorial($1)')
                .replace(/π/g, 'pi');
            
            // Handle implicit multiplication
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
                value = String(btn.key);
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
            case 'ex':
                 setExpression(prev => `exp(${prev || '0'})`);
                break;
            case '10x':
                 setExpression(prev => `10^(${prev || '0'})`);
                break;
            case 'y√x': setExpression(prev => prev + ' nthRoot('); break;
            case '3√x': setExpression(prev => prev + 'cbrt('); break;
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
            } else if (key === '%') {
                 event.preventDefault();
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

  const renderButtons = (buttons: (string | React.ReactNode)[], getVariant: (btn: any) => "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined, className: string = 'h-10 text-lg') => {
      return buttons.map((btn, index) => {
          let key: string | number;
          if (typeof btn === 'string') { key = btn; } 
          else if (React.isValidElement(btn)) { key = (btn.key as string) || index; } 
          else { key = index; }
          
          let colSpan = 'col-span-1';
          if (btn === '0') colSpan = 'col-span-2';
          
          return (
              <Button key={`btn-${key}-${index}`} variant={getVariant(btn)} className={cn(className, colSpan)} onClick={() => handleButtonClick(btn)}>
                  {btn}
              </Button>
          )
      });
  }

  return (
    <div className="bg-card border rounded-lg p-2 w-full max-w-sm sm:max-w-md md:max-w-xl mx-auto shadow-lg">
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
           <div className="col-span-2 flex gap-1">
                {renderButtonWithIndicator('Deg')}
                {renderButtonWithIndicator('Rad')}
            </div>
           <div className="col-span-2"></div>
           {scientificButtons.flat().map((btn, index) => {
             let key: string | number;
             if (typeof btn === 'string') { key = btn; } 
             else if (React.isValidElement(btn)) { key = (btn.key as string) || index; } 
             else { key = index; }
             return (
              <Button key={`sci-${key}-${index}`} variant="outline" className="h-10 text-xs p-1" onClick={() => handleButtonClick(btn)}>
                {btn}
              </Button>
            );
          })}
        </div>

        {/* Basic Functions */}
        <div className="grid grid-cols-4 gap-1">
            {/* Number Pad */}
            <div className="col-span-3 grid grid-cols-3 gap-1">
                {renderButtons(['AC', '%', <Trash2 key="back" />], () => 'outline')}
                {renderButtons(['7','8','9','4','5','6','1','2','3'], () => 'default')}
                {renderButtons(['0', '.'], () => 'default')}
            </div>
            {/* Operators Column */}
            <div className="col-span-1 grid grid-rows-5 gap-1">
                {renderButtons(['÷', '×', '−', '+', '='], () => 'secondary')}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculator;
