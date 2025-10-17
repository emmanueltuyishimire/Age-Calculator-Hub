
import SimpleCalculator from '@/components/calculators/simple-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';

export const metadata: Metadata = {
    title: 'Free Simple Calculator Online',
    description: 'A free, easy-to-use online calculator for basic arithmetic. Perform addition, subtraction, multiplication, and division quickly. Perfect for everyday math.',
    alternates: {
        canonical: '/simple-calculator',
    },
};

export default function SimpleCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <main role="main" className="max-w-xl mx-auto flex flex-col items-center">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Simple Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    A straightforward calculator for your everyday arithmetic needs.
                </p>
            </div>
            <SimpleCalculator />
            <RelatedCalculators currentCategory="Math" currentHref="/simple-calculator" />
      </main>
    </div>
  );
}
