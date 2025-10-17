
import SimpleCalculator from '@/components/calculators/simple-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

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

            <section className="mt-12 space-y-8 animate-fade-in w-full">
              <Card>
                <CardHeader>
                    <CardTitle>How to Use the Simple Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">You can use your mouse or your keyboard for calculations:</p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><strong>Input:</strong> Click the number and operator buttons, or use the number keys, +, -, *, and / on your keyboard.</li>
                        <li><strong>Calculate:</strong> Click the '=' button or press the 'Enter' key to see the result.</li>
                        <li><strong>Clear:</strong> Use 'AC' (All Clear) or the 'Escape' key to reset the calculator. Use the backspace button or the 'Backspace' key to delete the last character.</li>
                         <li><strong>For advanced functions</strong> like trigonometry or logarithms, try our <Link href="/scientific-calculator" className="text-primary hover:underline">Scientific Calculator</Link>.</li>
                    </ul>
                </CardContent>
              </Card>
            </section>

            <RelatedCalculators currentCategory="Math" currentHref="/simple-calculator" />
      </main>
    </div>
  );
}
