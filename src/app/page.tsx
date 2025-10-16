
"use client";

import { useState } from 'react';
import ScientificCalculator from '@/components/calculators/scientific-calculator';
import CalculatorHub from '@/components/layout/calculator-hub';
import ArticleList from '@/components/layout/article-list';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/layout/search-bar';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

export default function Home() {
  const [calculatorSize, setCalculatorSize] = useState(70);

  return (
    <main role="main">
      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-foreground/80 text-transparent bg-clip-text">Calculators</h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Your central hub for free, accurate online calculators. From finance and health to math and everyday conversions, find the tool you need.
            </p>
            <div className="mt-8 w-full max-w-md">
                <SearchBar />
            </div>
             <div 
              className="mt-10 w-full transition-all duration-300 ease-in-out"
              style={{ maxWidth: `${calculatorSize}%` }}
             >
                <div className="mb-4">
                  <Label htmlFor="size-slider" className="text-sm text-muted-foreground">Adjust Calculator Size</Label>
                  <Slider
                    id="size-slider"
                    defaultValue={[calculatorSize]}
                    min={40}
                    max={100}
                    step={5}
                    onValueChange={(value) => setCalculatorSize(value[0])}
                    className="w-48 mx-auto mt-2"
                    aria-label="Calculator size slider"
                  />
                </div>
                <ScientificCalculator />
            </div>
          </div>
        </div>
      </section>
      
      <CalculatorHub />

      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Latest Articles & Insights</h2>
            <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore our articles to learn more about age, health, and wellness.
            </p>
        </div>
        <ArticleList articleCount={6} />
        <div className="text-center mt-10">
            <Link href="/articles" passHref>
                <Button size="lg" aria-label="View All Articles">View All Articles</Button>
            </Link>
        </div>
      </section>
    </main>
  );
}
