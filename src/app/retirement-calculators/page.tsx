
import type { Metadata } from 'next';
import CategoryHubClient from '@/components/layout/category-hub-client';

export const metadata: Metadata = {
    title: 'Retirement & Social Security Calculators',
    description: 'Plan for your future with confidence. Our retirement and financial calculators help you make informed decisions about your financial future.',
    alternates: {
        canonical: '/retirement-calculators',
    },
};

export default function RetirementCalculatorsHub() {
  return (
    <main className="container mx-auto px-4 py-8" role="main">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Retirement & Financial Calculators</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Plan for your future with confidence. Our calculators help you determine your full retirement age, estimate savings goals, and make other informed financial decisions.
        </p>
      </div>
      <CategoryHubClient categoryName="Financial" />
    </main>
  );
}
