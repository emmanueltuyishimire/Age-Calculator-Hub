
import type { Metadata } from 'next';
import CategoryHubClient from '@/components/layout/category-hub-client';

export const metadata: Metadata = {
    title: 'Pet Age Calculators - Dog & Cat Age in Human Years',
    description: 'Ever wonder how old your furry friend is in human years? Use our specialized calculators for dogs and cats to better understand their life stage, health, and care needs.',
    alternates: {
        canonical: '/pet-age-calculators',
    },
};

export default function PetAgeCalculatorsHub() {
  return (
    <main className="container mx-auto px-4 py-8" role="main">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Pet Age Calculators</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Ever wonder how old your furry friend is in human years? Use our specialized calculators for dogs and cats to better understand their life stage and care needs.
        </p>
      </div>
      <CategoryHubClient categoryName="Other Calculators" />
    </main>
  );
}
