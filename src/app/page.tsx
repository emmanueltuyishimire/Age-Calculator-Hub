
"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/layout/search-bar';
import CalculatorHub from '@/components/layout/calculator-hub';
import ArticleList from '@/components/layout/article-list';
import ScientificCalculatorLoader from '@/components/calculators/scientific-calculator-loader';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const [loadCalculator, setLoadCalculator] = useState(false);
  const calculatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoadCalculator(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Load when it's 200px away from viewport
    );

    if (calculatorRef.current) {
      observer.observe(calculatorRef.current);
    }

    return () => {
      if (calculatorRef.current) {
        observer.unobserve(calculatorRef.current);
      }
    };
  }, []);

  return (
    <main role="main">
      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="flex justify-center">
              <div className="w-full max-w-2xl min-h-[500px]" ref={calculatorRef}>
                {loadCalculator ? (
                  <ScientificCalculatorLoader />
                ) : (
                  <Skeleton className="h-[500px] w-full max-w-xs mx-auto" />
                )}
              </div>
            </div>
            <div className="text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-foreground/80 text-transparent bg-clip-text">Calculators</h1>
                <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto md:mx-0 mt-4">
                    Your central hub for free, accurate online calculators. From finance and health to math and everyday conversions, find the tool you need.
                </p>
                <div className="mt-8 mx-auto md:mx-0 max-w-md">
                    <SearchBar />
                </div>
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
