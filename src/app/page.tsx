
"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/layout/search-bar';
import CalculatorHub from '@/components/layout/calculator-hub';
import ArticleList from '@/components/layout/article-list';
import SimpleCalculator from '@/components/calculators/simple-calculator';

export default function Home() {
  return (
    <main role="main">
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-foreground/80 text-transparent bg-clip-text">Calculators</h1>
                <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mt-4">
                    Your central hub for free, accurate online calculators. From finance and health to math and everyday conversions, find the tool you need.
                </p>
                <div className="mt-8 mx-auto lg:mx-0 max-w-md">
                    <SearchBar />
                </div>
            </div>
             <div className="flex flex-col items-center">
              <SimpleCalculator />
              <Button asChild variant="link" className="mt-4 text-primary">
                <Link href="/scientific-calculator">Need more power? Try our Scientific Calculator</Link>
              </Button>
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
