
import type { Metadata } from 'next';
import CategoryHubClient from '@/components/layout/category-hub-client';

export const metadata: Metadata = {
    title: 'General Financial Calculators - Debt, Loans & More',
    description: 'Explore our collection of general financial calculators. Tools for debt payoff, loan payments, inflation, discounts, and more to help you manage your finances.',
    alternates: {
        canonical: '/financial-calculators',
    },
};

export default function OtherFinancialCalculatorsHub() {
  return (
    <main className="container mx-auto px-4 py-8" role="main">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">General Financial Calculators</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore our collection of general financial calculators. Tools for debt payoff, loan payments, inflation, discounts, and more to help you manage your finances.
        </p>
      </div>
      <CategoryHubClient categoryName="Other" />
    </main>
  );
}
