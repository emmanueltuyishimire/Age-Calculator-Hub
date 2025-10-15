
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';

const buttonLayout = [
  ['sin', 'cos', 'tan', 'Deg', 'Rad'],
  ['sin-1', 'cos-1', 'tan-1', 'π', 'e'],
  ['xy', 'x3', 'x2', 'ex', '10x'],
  ['y√x', '3√x', '√x', 'ln', 'log'],
  ['(', ')', '1/x', '%', 'n!'],
  ['7', '8', '9', '÷', <Trash2 key="back" />],
  ['4', '5', '6', '×', 'Ans'],
  ['1', '2', '3', '−', 'M+'],
  ['0', '.', 'EXP', '+', 'M-'],
  ['±', 'RND', 'AC', '=', 'MR'],
];

const getVariant = (btn: any) => {
  if (typeof btn !== 'string') return 'destructive';
  if (['+', '−', '×', '÷', '='].includes(btn)) return 'secondary';
  if (['AC'].includes(btn)) return 'destructive';
  if (['Deg', 'Rad', 'sin', 'cos', 'tan', 'sin-1', 'cos-1', 'tan-1', 'π', 'e', 'xy', 'x3', 'x2', 'ex', '10x', 'y√x', '3√x', '√x', 'ln', 'log', '(', ')', '1/x', '%', 'n!', 'Ans', 'M+', 'M-', 'MR', 'EXP', '±', 'RND'].includes(btn)) return 'outline';
  return 'default';
};

const factorial = (n: number): number => {
    if (n < 0) return NaN;
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

    const handleButtonClick = (btn: string | React.ReactNode) => {
        let value = '';
        if (typeof btn === 'string') {
            value = btn;
        } else if (React.isValidElement(btn) && btn.key) {
            value = 'Backspace';
        }

        try {
            if (/\d/.test(value) || value === '.') {
                setExpression(prev => prev === '0' ? value : prev + value);
            } else if (value === 'AC') {
                setExpression('');
                setDisplay('0');
            } else if (value === 'Backspace') {
                setExpression(prev => prev.slice(0, -1));
            } else if (value === '=') {
                const finalExpression = expression
                    .replace(/×/g, '*')
                    .replace(/÷/g, '/')
                    .replace(/−/g, '-')
                    .replace(/π/g, 'Math.PI')
                    .replace(/e/g, 'Math.E');

                const result = eval(finalExpression);
                setDisplay(result.toString());
                setAns(result);
                setExpression(result.toString());
            } else {
                setExpression(prev => prev + value);
            }
        } catch (error) {
            setDisplay('Error');
            setExpression('');
        }
    };
    
    useEffect(() => {
        if (expression === '') {
            setDisplay('0');
        } else {
            setDisplay(expression);
        }
    }, [expression]);


  return (
    <div className="bg-card border rounded-lg p-4 w-full max-w-md shadow-lg">
      <Input
        type="text"
        value={display}
        readOnly
        className="w-full h-16 text-4xl text-right mb-4 bg-muted"
        aria-label="Calculator display"
      />
      <div className="grid grid-cols-5 gap-2">
        {buttonLayout.flat().map((btn, i) => {
            const btnStr = React.isValidElement(btn) ? 'Backspace' : btn;
          return (
            <Button
              key={i}
              variant={getVariant(btn)}
              className={cn("h-12 text-lg", {'bg-primary/80': !isDeg && btnStr === 'Rad'}, {'bg-primary/80': isDeg && btnStr === 'Deg'})}
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
