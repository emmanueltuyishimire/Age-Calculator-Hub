
"use client";

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const CalculatorDisplay = () => {
    const calculatorImage = PlaceHolderImages.find(img => img.id === 'scientific_calculator_hero');

    if (!calculatorImage) {
        return null;
    }

    return (
        <div className="bg-slate-700 dark:bg-slate-800 border-4 border-slate-600 dark:border-slate-700 rounded-xl p-2 w-full mx-auto shadow-2xl max-w-[320px]">
            <div className="bg-slate-800/50 rounded p-2 mb-2 border-2 border-slate-800 dark:border-black shadow-inner h-[112px] flex flex-col justify-center items-center">
                 <Image
                    src={calculatorImage.imageUrl}
                    alt={calculatorImage.description}
                    width={400}
                    height={500}
                    className="object-cover w-full h-full rounded-sm"
                    data-ai-hint={calculatorImage.imageHint}
                />
            </div>
        </div>
    );
};

export default CalculatorDisplay;
