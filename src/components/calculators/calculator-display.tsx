
"use client";

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const CalculatorDisplay = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedDate = format(currentTime, 'E, MMM d, yyyy');
    const formattedTime = format(currentTime, 'h:mm:ss a');

    return (
        <div className="bg-slate-700 dark:bg-slate-800 border-4 border-slate-600 dark:border-slate-700 rounded-xl p-2 w-full mx-auto shadow-2xl max-w-[320px]">
            <div className="bg-slate-800/50 rounded p-2 mb-2 border-2 border-slate-800 dark:border-black shadow-inner h-[112px] flex flex-col justify-between">
                 <div className="text-right text-emerald-300/60 font-mono text-sm tracking-wider">
                    {formattedDate}
                </div>
                <div className="text-right text-emerald-300 font-mono text-4xl tracking-wider">
                    {formattedTime}
                </div>
            </div>
        </div>
    );
};

export default CalculatorDisplay;
