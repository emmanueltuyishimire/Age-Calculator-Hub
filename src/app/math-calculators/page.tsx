
import type { Metadata } from 'next';
import CategoryHubClient from '@/components/layout/category-hub-client';

export const metadata: Metadata = {
    title: 'Math Calculators - From Basic to Advanced',
    description: 'Find a wide range of free online math calculators for all your needs, from basic arithmetic and fractions to statistics and scientific calculations.',
    alternates: {
        canonical: '/math-calculators',
    },
};

export default function MathCalculatorsHub() {
  return (
    <main className="container mx-auto px-4 py-8" role="main">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Math Calculators</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          A comprehensive suite of tools to help with your mathematical needs. More calculators coming soon!
        </p>
      </div>
      <CategoryHubClient categoryName="Math & Other" />
    </main>
  );
}
