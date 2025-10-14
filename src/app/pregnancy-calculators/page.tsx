import type { Metadata } from 'next';
import CategoryHubClient from '@/components/layout/category-hub-client';

export const metadata: Metadata = {
    title: 'Pregnancy Calculators Hub - Due Date, Ovulation & More',
    description: 'Explore our free pregnancy tools to calculate your due date, pregnancy progress, and ovulation window. Simple, fast, and accurate calculators to support every stage of your journey.',
    alternates: {
        canonical: '/pregnancy-calculators',
    },
};

export default function PregnancyCalculatorsHub() {
  return (
    <main className="container mx-auto px-4 py-8" role="main">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Pregnancy Calculators Hub</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore our free pregnancy tools to calculate your due date, pregnancy progress, and ovulation window. Simple, fast, and accurate calculators to support every stage of your journey.
        </p>
      </div>
      <CategoryHubClient categoryName="Pregnancy Calculators" />
    </main>
  );
}
