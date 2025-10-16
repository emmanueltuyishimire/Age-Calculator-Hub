
import type { Metadata } from 'next';
import CategoryHubClient from '@/components/layout/category-hub-client';

export const metadata: Metadata = {
    title: 'Tax & Salary Calculators - Estimate Your Pay and Taxes',
    description: 'Free tax and salary calculators to help you understand your compensation. Estimate your take-home pay, calculate income tax liability, and convert salary between frequencies.',
    alternates: {
        canonical: '/financial-calculators',
    },
};

export default function TaxSalaryCalculatorsHub() {
  return (
    <main className="container mx-auto px-4 py-8" role="main">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Tax & Salary Calculators</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Free tax and salary calculators to help you understand your compensation. Estimate your take-home pay, calculate income tax liability, and convert salary between frequencies.
        </p>
      </div>
      <CategoryHubClient categoryName="Tax & Salary" />
    </main>
  );
}
