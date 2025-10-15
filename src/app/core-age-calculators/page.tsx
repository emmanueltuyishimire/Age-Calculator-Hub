
import type { Metadata } from 'next';
import CategoryHubClient from '@/components/layout/category-hub-client';

export const metadata: Metadata = {
    title: 'Core Age Calculators - Chronological & Birthday Tools',
    description: 'Explore our fundamental tools for calculating chronological age. Find your exact age in years, months, and days, or count down to your next birthday with our precise and easy-to-use calculators.',
    alternates: {
        canonical: '/core-age-calculators',
    },
};

export default function CoreAgeCalculatorsHub() {
  return (
    <main className="container mx-auto px-4 py-8" role="main">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Age & Time Calculators</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Your fundamental tools for calculating chronological age. Find your exact age in years, months, and days, or count down to your next birthday with our precise and easy-to-use calculators.
        </p>
      </div>
      <CategoryHubClient categoryName="Core Age Calculators" />
    </main>
  );
}
