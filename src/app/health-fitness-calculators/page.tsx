
import type { Metadata } from 'next';
import CategoryHubClient from '@/components/layout/category-hub-client';

export const metadata: Metadata = {
    title: 'Fitness & Health Calculators - BMI, BMR, Body Fat & More',
    description: 'Explore our free health metric calculators. Calculate your BMI, BMR, Body Fat Percentage, and other key health markers to stay informed about your wellness.',
    alternates: {
        canonical: '/health-fitness-calculators',
    },
};

export default function HealthFitnessCalculatorsHub() {
  return (
    <main className="container mx-auto px-4 py-8" role="main">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Fitness & Health Calculators</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore our collection of free health metric calculators designed to help you stay informed about your wellness. From calculating your BMI and BMR to tracking your pregnancy, these calculators provide valuable insights.
        </p>
      </div>
      <CategoryHubClient categoryName="Health & Fitness" />
    </main>
  );
}
