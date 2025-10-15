
import type { Metadata } from 'next';
import CategoryHubClient from '@/components/layout/category-hub-client';

export const metadata: Metadata = {
    title: 'Pregnancy & Baby Calculators Hub - Due Date, Ovulation & More',
    description: 'Explore our free pregnancy and baby tools. Calculate your due date, track pregnancy progress, find your ovulation window, and calculate your baby\'s age in weeks and months.',
    alternates: {
        canonical: '/pregnancy-calculators',
    },
};

export default function PregnancyCalculatorsHub() {
  return (
    <main className="container mx-auto px-4 py-8" role="main">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Pregnancy & Baby Calculators Hub</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          From conception to your baby's first milestones, our free tools support you at every stage. Calculate your due date, track your ovulation window, and find out your baby's age in weeks and months.
        </p>
      </div>
      <CategoryHubClient categoryName="Pregnancy & Baby" />
    </main>
  );
}
