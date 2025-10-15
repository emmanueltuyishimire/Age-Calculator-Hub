
import type { Metadata } from 'next';
import CategoryHubClient from '@/components/layout/category-hub-client';

export const metadata: Metadata = {
    title: 'Other Calculators - Pet Age, Legal Estimators & More',
    description: 'Explore our collection of various free online calculators, including tools for pet age conversion, legal filing estimates, and other everyday utilities.',
    alternates: {
        canonical: '/other-calculators',
    },
};

export default function OtherCalculatorsHub() {
  return (
    <main className="container mx-auto px-4 py-8" role="main">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Other Calculators</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Discover a variety of useful tools, from pet age calculators to legal estimators and other everyday utilities.
        </p>
      </div>
      <CategoryHubClient categoryName="Other" />
    </main>
  );
}
