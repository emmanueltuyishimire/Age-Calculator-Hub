
import RrefCalculator from '@/components/calculators/rref-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'RREF Calculator – Reduced Row Echelon Form',
    description: 'A free online RREF Calculator to find the Reduced Row Echelon Form of any matrix. Perfect for solving systems of linear equations using an augmented matrix.',
    alternates: {
        canonical: '/rref-calculator',
    },
};

export default function RrefCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <main role="main" className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">RREF Calculator</h1>
          <p className="text-md md:text-lg text-muted-foreground">
            A tool to compute the Reduced Row Echelon Form (RREF) of a matrix.
          </p>
        </div>

        <RrefCalculator />

        <section className="mt-12 space-y-8 animate-fade-in prose dark:prose-invert lg:prose-xl max-w-none">
           <Card>
            <CardHeader><CardTitle>How to Use the RREF Calculator</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <ol className="list-decimal list-inside space-y-2">
                    <li><strong>Set Dimensions:</strong> Use the '+' and '-' buttons to set the number of rows and columns for your matrix.</li>
                    <li><strong>Enter Values:</strong> Input the numbers into the matrix cells. To solve a system of linear equations, create an augmented matrix where the last column represents the constants.</li>
                    <li><strong>Calculate:</strong> Click the "Calculate RREF" button.</li>
                    <li><strong>View Result:</strong> The resulting RREF matrix will be displayed below.</li>
                </ol>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>What is Reduced Row Echelon Form (RREF)?</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>RREF is a simplified form of a matrix obtained by performing a series of elementary row operations. A matrix is in RREF if it meets the following conditions:</p>
                <ul className="list-disc list-inside">
                    <li>The first non-zero number in each row (the leading entry) is 1.</li>
                    <li>Each leading 1 is the only non-zero number in its column.</li>
                    <li>The leading 1 in a row is to the right of the leading 1 in the row above it.</li>
                    <li>All rows consisting entirely of zeros are at the bottom.</li>
                </ul>
                <p>RREF is most commonly used to solve systems of linear equations by using an augmented matrix. It provides a clear and definitive solution set for the system.</p>
            </CardContent>
          </Card>
        </section>
        <RelatedCalculators currentCategory="Math" currentHref="/rref-calculator" />
      </main>
    </div>
  );
}
