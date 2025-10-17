
"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/layout/search-bar';
import CalculatorHub from '@/components/layout/calculator-hub';
import ArticleList from '@/components/layout/article-list';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main role="main">
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-foreground/80 text-transparent bg-clip-text">Calculators</h1>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mt-4">
                  Your central hub for free, accurate online calculators. From finance and health to math and everyday conversions, find the tool you need.
              </p>
              <div className="mt-8 mx-auto max-w-md">
                  <SearchBar />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 w-full max-w-sm mx-auto">
                 <Button asChild size="lg" className="w-full">
                     <Link href="/simple-calculator">Simple Calculator <ArrowRight className="ml-2 h-4 w-4"/></Link>
                 </Button>
                 <Button asChild size="lg" variant="secondary" className="w-full">
                     <Link href="/scientific-calculator">Scientific Calculator <ArrowRight className="ml-2 h-4 w-4"/></Link>
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
