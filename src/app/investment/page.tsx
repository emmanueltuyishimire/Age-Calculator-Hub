
import type { Metadata } from 'next';
import CategoryHubClient from '@/components/layout/category-hub-client';

export const metadata: Metadata = {
    title: 'Investment Calculators - Plan Your Financial Growth',
    description: 'A collection of free investment calculators to help you plan for the future. Estimate compound interest, savings growth, ROI, and more to make smart investment decisions.',
    alternates: {
        canonical: '/financial-calculators',
    },
};

export default function InvestmentCalculatorsHub() {
  return (
    <main className="container mx-auto px-4 py-8" role="main">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Investment Calculators</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          A collection of free investment calculators to help you plan for the future. Estimate compound interest, savings growth, ROI, and more to make smart investment decisions.
        </p>
      </div>
      <CategoryHubClient categoryName="Investment" />
    </main>
  );
}
