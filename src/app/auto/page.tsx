
import type { Metadata } from 'next';
import CategoryHubClient from '@/components/layout/category-hub-client';

export const metadata: Metadata = {
    title: 'Auto Calculators - Loan & Lease Payment Estimators',
    description: 'A suite of free auto calculators to help you make informed decisions. Estimate car loan payments, compare lease vs. buy, and determine which financing deal is best for you.',
    alternates: {
        canonical: '/financial-calculators',
    },
};

export default function AutoCalculatorsHub() {
  return (
    <main className="container mx-auto px-4 py-8" role="main">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Auto Calculators</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          A suite of free auto calculators to help you make informed decisions. Estimate car loan payments, compare lease vs. buy, and determine which financing deal is best for you.
        </p>
      </div>
      <CategoryHubClient categoryName="Auto" />
    </main>
  );
}
