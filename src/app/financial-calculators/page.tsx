
import type { Metadata } from 'next';
import CategoryHubClient from '@/components/layout/category-hub-client';

export const metadata: Metadata = {
    title: 'Financial Calculators - Loan, Investment & Savings Tools',
    description: 'Explore our free financial calculators for loans, mortgages, retirement, investment, and savings. Make informed decisions with our easy-to-use financial planning tools.',
    alternates: {
        canonical: '/financial-calculators',
    },
};

export default function FinancialCalculatorsHub() {
  return (
    <main className="container mx-auto px-4 py-8" role="main">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Financial Calculators</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Take control of your financial future with our suite of free planning tools. Estimate loan payments, plan for retirement, and make informed decisions to protect you and your family.
        </p>
      </div>
      <CategoryHubClient categoryName="Financial" />
    </main>
  );
}
