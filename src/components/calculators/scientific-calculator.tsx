
"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import { evaluate } from 'mathjs';

const scientificButtons = [
  ['sin', 'cos', 'tan', 'Deg/Rad'],
  [<span>sin<sup>-1</sup></span>, <span>cos<sup>-1</sup></span>, <span>tan<sup>-1</sup></span>, 'π', 'e'],
  [<span>x<sup>y</sup></span>, <span>x<sup>3</sup></span>, <span>x<sup>2</sup></span>, <span>e<sup>x</sup></span>, <span>10<sup>x</sup></span>],
  ['y√x', '∛x', '√', 'ln', 'log'],
  ['(', ')', '1/x', '%', 'n!'],
];


const getVariant = (btn: any) => {
  let btnStr = '';
  if (typeof btn === 'string') {
    btnStr = btn;
  } else if (React.isValidElement(btn) && btn.props.children) {
      if (Array.isArray(btn.props.children)) {
        btnStr = btn.props.children.map((c: any) => (typeof c === 'string' ? c : c.key)).join('');
      } else {
        btnStr = btn.props.children;
      }
  } else if (btn.type === Trash2) {
    btnStr = 'Backspace';
  }


  if (btnStr === 'Backspace' || btnStr === 'AC') return 'destructive';
  if (['+', '−', '×', '÷', '='].includes(btnStr)) return 'secondary';
  
  const scientificOps = [
    'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'π', 'e', 'x^y', 'x^3', 'x^2',
    'e^x', '10^x', 'y√x', '∛x', '√', 'ln', 'log', '(', ')', '1/x', '%', 'n!',
    'Deg/Rad', 'Ans', 'M+', 'M-', 'MR', 'RND', 'E'
  ];
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
                .replace(/√\(/g, 'sqrt(')
                .replace(/∛\(/g, 'cbrt(')
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
            if(btn.key) value = btn.key;
            else if (btn.props && btn.props.children) {
                 if (Array.isArray(btn.props.children)) {
                    value = btn.props.children.map((c: any) => typeof c === 'string' ? c : (c.props.children || '')).join('');
                 } else {
                    value = btn.props.children;
                 }
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
            case 'Deg/Rad':
                setIsDeg(prev => !prev);
                break;
            case 'sin': case 'cos': case 'tan': case 'log': case 'ln': case '√': case '∛x':
                setExpression(prev => prev + value.replace('x', '') + '(');
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
                setExpression(prev => prev + 'π');
                break;
            case 'e':
                setExpression(prev => prev + 'e');
                break;
             case 'xy':
                setExpression(prev => prev + '^');
                break;
            case 'x2':
                setExpression(prev => `(${prev || '0'})^2`);
                break;
            case 'x3':
                setExpression(prev => `(${prev || '0'})^3`);
                break;
            case '10x':
                 setExpression(prev => `10^(${prev || '0'})`);
                break;
            case 'ex':
                 setExpression(prev => `e^(${prev || '0'})`);
                break;
            case 'y√x':
                setExpression(prev => prev + 'nthRoot(');
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
            } else if (key === '^') {
                event.preventDefault();
                handleButtonClick('xy');
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

  const basicButtons = [
    'AC', '±', '%', '÷',
    '7', '8', '9', '×',
    '4', '5', '6', '−',
    '1', '2', '3', '+',
    '0', '.', <Trash2 key="back" />, '=',
  ];
  
  const allButtons = [...scientificButtons.flat(), ...basicButtons];
  
  const renderButtonWithIndicator = () => (
    <Button
      variant="outline"
      className={cn("h-10 text-xs p-1 relative")}
      onClick={() => handleButtonClick('Deg/Rad')}
    >
      <span className={!isDeg ? "text-muted-foreground" : ""}>Deg</span>
      <span className="mx-1">/</span>
      <span className={isDeg ? "text-muted-foreground" : ""}>Rad</span>
      <div className={cn("absolute top-1 right-1 h-2 w-2 rounded-full border border-blue-500 flex items-center justify-center transition-all", isDeg ? 'left-1' : 'right-1')}>
          <div className="h-1 w-1 rounded-full bg-green-500"></div>
      </div>
    </Button>
  );

  return (
    <div className="bg-card border rounded-lg p-2 w-full max-w-xs shadow-lg">
      <Input
        type="text"
        value={display}
        readOnly
        className="w-full h-16 text-3xl text-right mb-2 bg-muted"
        aria-label="Calculator display"
      />
      <div className="grid grid-cols-5 gap-1">
        {allButtons.map((btn, index) => {
            if (btn === 'Deg/Rad') {
                return <div key="deg-rad-toggle" className="col-span-2">{renderButtonWithIndicator()}</div>;
            }

            let key: string | number;
            if (typeof btn === 'string') {
                key = btn;
            } else if (React.isValidElement(btn)) {
                key = (btn.key as string) || index;
            } else {
                key = index;
            }

            const buttonKey = `btn-${key}-${index}`;
            const colSpan = btn === '=' || btn === '0' ? 'col-span-1' : 'col-span-1';
            const wideButtons = ['AC', '+', '−', '×', '÷', '='];
            
            let btnContent;
            if(React.isValidElement(btn) && btn.key) {
                switch(btn.key) {
                    case 'xy': btnContent = <span>x<sup>y</sup></span>; break;
                    case 'x3': btnContent = <span>x<sup>3</sup></span>; break;
                    case 'x2': btnContent = <span>x<sup>2</sup></span>; break;
                    case 'ex': btnContent = <span>e<sup>x</sup></span>; break;
                    case '10x': btnContent = <span>10<sup>x</sup></span>; break;
                    case 'sin-1': btnContent = <span>sin<sup>-1</sup></span>; break;
                    case 'cos-1': btnContent = <span>cos<sup>-1</sup></span>; break;
                    case 'tan-1': btnContent = <span>tan<sup>-1</sup></span>; break;
                    case 'y√x': btnContent = <span><sup>y</sup>√x</span>; break;
                    default: btnContent = btn;
                }
            } else {
                 btnContent = btn;
            }


            return (
              <Button
                  key={buttonKey}
                  variant={getVariant(btn)}
                  className={cn(
                      "h-10 text-xs p-1",
                      wideButtons.includes(btn as string) ? 'text-lg' : '',
                       colSpan,
                  )}
                  onClick={() => handleButtonClick(btn)}
              >
                  {btnContent}
              </Button>
            );
        })}
      </div>
    </div>
  );
};

export default ScientificCalculator;
