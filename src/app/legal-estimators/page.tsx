
import type { Metadata } from 'next';
import CategoryHubClient from '@/components/layout/category-hub-client';

export const metadata: Metadata = {
    title: 'Legal Estimator Calculators - Statute of Limitations & More',
    description: 'Explore our free legal estimator tools. Calculate the estimated statute of limitations for various claims. For informational and educational purposes only.',
    alternates: {
        canonical: '/legal-estimators',
    },
};

export default function LegalEstimatorsHub() {
  return (
    <main className="container mx-auto px-4 py-8" role="main">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Legal Estimator Calculators</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore our experimental legal estimator tools. These calculators are designed for informational purposes only and are not a substitute for professional legal advice.
        </p>
      </div>
      <CategoryHubClient categoryName="Legal Estimators" />
    </main>
  );
}
