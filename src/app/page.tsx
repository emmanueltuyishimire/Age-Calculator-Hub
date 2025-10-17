
"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/layout/search-bar';
import CalculatorHub from '@/components/layout/calculator-hub';
import ArticleList from '@/components/layout/article-list';
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const ScientificCalculatorDisplay = dynamic(() => import('@/components/calculators/scientific-calculator'), {
  ssr: false,
  loading: () => <Skeleton className="h-[450px] w-full max-w-xs" />,
});


export default function Home() {
    const heroBgImage = PlaceHolderImages.find(img => img.id === 'hero_background');

  return (
    <main role="main">
      <section className="relative bg-muted/50 py-12 md:py-16 overflow-hidden">
        {heroBgImage && (
            <Image
                src={heroBgImage.imageUrl}
                alt={heroBgImage.description}
                fill
                className="object-cover opacity-10 dark:opacity-5"
                data-ai-hint={heroBgImage.imageHint}
                priority
            />
        )}
        <div className="container relative mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-foreground/80 text-transparent bg-clip-text">Calculators</h1>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mt-4">
                  Your central hub for free, accurate online calculators. From finance and health to math and everyday conversions, find the tool you need.
              </p>
              <div className="mt-8 mx-auto md:mx-0 max-w-md">
                  <SearchBar />
              </div>
            </div>
             <div className="flex justify-center">
                <ScientificCalculatorDisplay />
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
