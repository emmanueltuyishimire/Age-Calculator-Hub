
import VolumeCalculator from '@/components/calculators/volume-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';

export const metadata: Metadata = {
    title: 'Volume Calculator – Sphere, Cube, Cylinder, Cone & More',
    description: 'A free online Volume Calculator to find the volume of common shapes, including a sphere, cone, cube, cylinder, capsule, and more. Formulas and diagrams included.',
    alternates: {
        canonical: '/volume-calculator',
    },
};

export default function VolumeCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <main role="main" className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Volume Calculator</h1>
          <p className="text-md md:text-lg text-muted-foreground">
            A list of volume calculators for several common shapes. Please fill in the corresponding fields and click the "Calculate" button.
          </p>
        </div>

        <VolumeCalculator />

        <section className="mt-12 space-y-8 animate-fade-in">
          {/* FAQs and other content can be added here later */}
        </section>
      </main>
      <RelatedCalculators currentCategory="Math Calculators" currentHref="/volume-calculator" />
    </div>
  );
}
