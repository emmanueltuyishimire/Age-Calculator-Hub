
import type { Metadata } from 'next';
import CategoryHubClient from '@/components/layout/category-hub-client';

export const metadata: Metadata = {
    title: 'Mortgage & Real Estate Calculators - Plan Your Home Purchase',
    description: 'Our suite of free mortgage and real estate calculators helps you plan your home purchase. Estimate mortgage payments, affordability, and analyze rental property investments.',
    alternates: {
        canonical: '/financial-calculators',
    },
};

export default function MortgageCalculatorsHub() {
  return (
    <main className="container mx-auto px-4 py-8" role="main">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Mortgage & Real Estate Calculators</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Our suite of free mortgage and real estate calculators helps you plan your home purchase. Estimate mortgage payments, affordability, and analyze rental property investments.
        </p>
      </div>
      <CategoryHubClient categoryName="Mortgage & Real Estate" />
    </main>
  );
}
